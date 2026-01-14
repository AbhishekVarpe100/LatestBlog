const User=require('../models/User')
const bcrypt=require('bcrypt')
const {validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const Blog = require('../models/Blog')
const cloudinary = require("cloudinary").v2;
require('dotenv').config()

exports.register=async(req,res)=>{
    const {username,email,password}=req.body
    const errors=validationResult(req)
    if(!errors.isEmpty()){

        res.json({errors:errors.array()})
        
    }
    else{
        let isUser=await User.findOne({$or:[{username},{email}]})
    if(isUser){
        res.json('failed')
    }
    else{
        let hashedPassword=await bcrypt.hash(password,12)
        let newUser=new User({username,email,password:hashedPassword})
        await newUser.save()
        res.json('success')
    }
    }
}


exports.login=async function(req,res){
    let {username,password}=await req.body
    let user=await User.findOne({username})
    if(!user){
        res.json('not found')
        // console.log('not found')
    }
    else{
        let isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
                 let payload={username:user.username,email:user.email}
                 let token=await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN})
                 res.json({token:token,msg:'login success'})
        }
        else{
            res.json('Incorrect password')
        }
        
   
    }
}


exports.addBlog = (req, res) => {
  const { title, desc } = req.body;
  const file = req.file ? req.file.path : null;

  const blog=new Blog({title,description:desc,file})
  blog.save()

  res.json({ message: "Blog saved"});
};


exports.getBlog=async(req,res)=>{
    const data=await Blog.find()
    res.json(data)
}
exports.deleteBlog=async(req,res)=>{
    const id=req.params.id
    const blog=await Blog.findOne({_id:id})
    const url=blog.file

    let urlArr=url.split("Blog_Images2")
    let publicId=`Blog_Images2${urlArr[1].split('.')[0]}`  

    try{
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result === 'ok') {
          await Blog.findByIdAndDelete(id);
          return res.json('deleted');
        } else {
          return res.status(400).json({ success: false, message: 'Failed to delete image' });
        }
      }
      catch(err){
        console.log(err)
      }
}


exports.getABlog=async(req,res)=>{
    const id=req.params.id;
    const blog=await Blog.findById({_id:id})
    res.json(blog)
}
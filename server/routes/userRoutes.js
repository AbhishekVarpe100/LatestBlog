const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const {body}=require('express-validator')
const {Storage}=require('../config/cloud')

const multer=require('multer')

router.post('/register',[
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 5 }).withMessage("Username must be at least 5 characters long"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email address"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long")
]
,userController.register)


router.post('/login',userController.login)


const upload=multer({storage:Storage})

router.post('/add-blog',upload.single('file'),userController.addBlog)
router.get('/get-blogs',userController.getBlog)
router.delete('/delete-blog/:id',userController.deleteBlog)
router.get('/get-a-blog/:id',userController.getABlog)

module.exports=router;
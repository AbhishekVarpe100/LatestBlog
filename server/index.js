const express=require('express')
const app=express()
const cors=require('cors')
const userRoutes=require('./routes/userRoutes')
// mongoose.connect('mongodb+srv://abhishek:shivba%40100@cluster0.v7fxirr.mongodb.net/blogapplication?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("Connected")).catch((e)=>console.log("Err"))
const {Connection}=require('./Connection')

Connection()

app.use(cors())
app.use(express.json())


app.use(userRoutes)



app.listen(3000,()=>{
    console.log("App is listening on port 3000");
})
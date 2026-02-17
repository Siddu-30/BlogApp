require('dotenv').config();

const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const blog=require('./models/blog');

const userRoute=require('./routes/user');
const blogRoute=require('./routes/blog');
const { authenticateUserCookie } = require('./middleware/authentication');

const app=express();
const port=process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL) //'mongodb://localhost:27017/blogapp'
.then((e)=>console.log('mongodb connected'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authenticateUserCookie('token'));
app.use(express.static(path.resolve('./public')));




app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.get('/',async (req,res)=>{
    const allBlogs=await blog.find({});
    
    res.render('home',{
        user:req.user,
        blogs:allBlogs,
    });
});

app.listen(port,()=>console.log(`server started at the port ${port}`));


const Blog=require('../models/blog');

function addBlogs(req,res){
    return res.render('addBlog',{
        user:req.user,
    });
};

async function uploadBlogs(req,res){
    const {title,body}=req.body;
    const blog=await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImg: `uploads/${req.file.filename}`,

    })
    return res.redirect(`/blog/${blog._id}`);
};

async function getUserBlogDetails(req,res){
    const blog=await Blog.findById(req.params.id)
    return res.render('blog',{
        user:req.user,
        blog,
    })
}

module.exports={
    addBlogs,
    uploadBlogs,
    getUserBlogDetails,
}
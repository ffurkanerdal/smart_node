const Category = require("../models/Category");
const Blog = require("../models/Blog");
const User = require("../models/User");

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      name: req.body.name,
      description: req.body.description,
      text: req.body.text,
      category: req.body.category,
      author: req.session.userID,
    });
    res.status(201).redirect("/blogs");
  } catch (err) {
    res.status(400).json({
      status: "bad request",
      error: err,
    });
    console.log(err)
  }
};

exports.getAllBlog = async (req,res) => {
  try {
    const blogs = await Blog.find()
    let alertMessage
    blogs.length === 0 ? alertMessage = 'Blogs matching None' : undefined
    res.status(200).render('blog',{
      alertMessage,
      page_name : 'blogs',
      blogs,
    })
  }catch(err){
    res.status(404).json({
      "status" : "500",
      "error": err
    })
  }
}


exports.getBlog = async (req,res) => {
  try {
    const blog = await Blog.findOne(req.param.slug).populate('author')
    const categories = await Category.find()
    console.log(blog)
    res.status(200).render('blog-single',{
      page_name:'Single Blog Page',
      categories,
      blog
    })
  }catch(err){
    res.status(404).json({
      status : 404,
      message : err
    })
  }
}
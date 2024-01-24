const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
const Blog = require('../models/Blog')


exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect("/");
  } catch (error) {
    const errors = validationResult(req);
    res.render('index',{
      page_name : 'index',
      message : errors.errors[0].msg
    })
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const same = await bcrypt.compare(password, user.password);

      if (same) {
        req.session.userID = user._id;
        res.status(200).redirect("/users/dashboard");
      } else {
        // Hatalı şifre durumu.
        res.status(400).send("WRONG PASSWORD");
      }
    } else {
      // Hatalı e-posta durumu.
      res.status(400).send("WRONG EMAIL");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate("courses");
  const users = await User.find()
  const categories = await Category.find();
  const courses = (await Course.find())
  const blogs = await Blog.find({author : req.session.userID}).populate('author')
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    categories,
    courses,
    blogs,
    users,
    user,
  });
};

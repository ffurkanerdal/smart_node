const Category = require("../models/Category");
const Course = require("../models/Course");
const User = require("../models/User")

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name : req.body.name,
      description: req.body.description,
      category : req.body.category,
      user : req.session.userID,
    });
    res.status(201).redirect('/courses')
  } catch (err) {
    res.status(400).json({
      status: "bad request",
      error: err,
    });
    console.log(err);
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }
    const courses = (await Course.find(filter).sort('-createdAt'));
    const categories = await Category.find();

    if (courses.length === 0) {
      return res.render('courses', {
        courses,
        categories,
        page_name: 'courses',
        alertMessage: 'Courses matching none',
        categorys: category,
      });
    }

    res.render('courses', {
      courses,
      categories,
      page_name: 'courses',
      categorys: category,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'try again later',
    });
  }
};



exports.getCourse  = async (req, res) => {
  try {
    const user = await User.findOne({_id:req.session.userID})
    const course = (await Course.findOne({slug:req.params.slug}).populate('user'));
    const categories = await Category.find()
    const courses = await Course.find()
    // const user = req.session.userID ? User.find({_id : req.session.userID}) : NaN
    


    if (course.length === 0) {
      return res.status(404).json({
        "status": "No courses found"
      });
    }
    res.render('course',{
      course,
      page_name : 'courses',
      courses,
      categories,
      user,
      isJoin : user ? user.courses.includes(course.id) : undefined
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      "status": "try again later",
    });
  }
}


exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const course = await Course.findById(req.body.course_id)

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    user.courses.push({ _id: req.body.course_id });
    course.employees.push({_id : req.session.userID})

    await user.save();
    await course.save();
    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const course = await Course.findById(req.body.course_id)

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    user.courses.pull({ _id: req.body.course_id });
    course.employees.pull({ _id : req.session.userID});

    await user.save();
    await course.save();
    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

exports.removeCourse = async (req,res) => {
  const course = await Course.findByIdAndDelete(req.body.courseID)
  res.redirect('/users/dashboard')
}

exports.updateCourse = async (req,res) => {
  const course = await Course.findById(req.body.courseID)
  course.name = req.body.name
  course.description = req.body.description
  await course.save()
  res.redirect('/users/dashboard')
}
const nodeMailer = require('nodemailer')
const Course = require('../models/Course')
const Category = require('../models/Category')

exports.getHomePage = (req, res) => {
  res.render("index", {
    page_name: "index",
  });
};

exports.getAboutPage = (req, res) => {
  res.render("about", {
    page_name: "about",
  });
};

exports.getSearchPage = async (req, res) => {
  try {
    const courses = await Course.find().exec();
    const categories = await Category.find()

    const getCourse = (key) => {
      let data = [];
      courses.forEach(course => {
        if (course.name.toLowerCase().includes(key)) {
          data.push(course);
        }
      });
      return data;
    };
    console.log(courses)
    res.render('courses',{
      page_name : 'courses',
      courses : getCourse(req.body.search),
      categorys : '',
      categories
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getContactPage = async (req,res) => {
  try{
    res.render('contact', {
      page_name:'contact'
    });
  } catch(err){
    console.log(err)
  }
};

exports.getSendMail = async (req,res) => {
  try {
    const outputMessage =  `
    <h1>Mail</h1>
    <ul>
      <li>Name: ${req.body.first_name}</li>
      <li>Surname: ${req.body.last_name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
      <h1>Message</h1>
      <p> ${req.body.message} </p>
    </ul>
    `
    const testAccount = await nodeMailer.createTestAccount();

    const transporter = nodeMailer.createTransport({
      host : 'smtp.gmail.com',
      port : 465,
      secure : true,
      auth : {
        user : '', // gmaill account
        pass : ''  // gmaill password
      },
    });

    const info = await transporter.sendMail({
      from : '"SmartEDU contract form" <>',
      to : "",
      subject : 'SmartEDU Mail',
      text : 'Hello World',
      html : outputMessage, 
    });

    console.log('message sent : %s', info.messageId)

    console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info))

    res.redirect('contact');
  
  }catch(err){
    console.log(err)
  }
}
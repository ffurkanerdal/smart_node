const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require('slugify')

const CourseSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  slug : {type:String, unique:true },
  category: {type : mongoose.Schema.Types.ObjectId,ref : 'Category'},
  user : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
  employees : [{
      type  : mongoose.Schema.ObjectId,
      ref   : 'User'
      }],
  createdAt: { type: Date, default: Date.now },
});

CourseSchema.pre('validate', function(next){
  this.slug = slugify(this.name,{
    lower : true,
    strict : true
  })
  next()
})


const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;

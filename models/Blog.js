const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const BlogSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  name: { type: String, required: true, trim: true, unique: true },
  description: { type: String, required: true, trim: true, unique: true },
  text: { type: String, required: true, trim: true },
  author: { type: mongoose.Types.ObjectId, ref: "User" },
  slug: { type: String, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  createdAt: { type: Date, default: Date.now },
});

BlogSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;

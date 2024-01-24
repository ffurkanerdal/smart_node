const User = require('../models/User')
const Category = require('../models/Category')


exports.getDashboard = async (req,res) => {
    res.send('admin dashboard')
}


exports.removeUser = async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.body.user_data)
        return res.redirect('/')
    }catch (err) {
        console.log(err)
    }
}


exports.appendCategory = async (req,res) => {
    try {
        const category = await Category.create({"name" : req.body.category_name})
        return res.redirect('/users/dashboard')
    }catch(err){
        console.log(err)
    }
}

exports.removeCategory = async (req,res) => {
    try {
        const category = await Category.findByIdAndDelete(req.body.cate_id)
        res.redirect('/users/dashboard')

    }catch(err){
        console.log(err)
    }
}
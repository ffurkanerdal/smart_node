const express = require('express')
const blogController = require('../controllers/blogController')
const roleMiddleware = require('../middlewares/roleMiddlewares')

const router = express.Router()


router.route('/').post(roleMiddleware(['teacher','admin','student']),blogController.createBlog)
router.route('/').get(blogController.getAllBlog)
router.route('/:slug').get(blogController.getBlog)


module.exports = router;
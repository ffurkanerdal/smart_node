const roleMiddleware = require('../middlewares/roleMiddlewares')
const express = require('express')
const adminController = require('../controllers/adminController')


const router = express.Router()


router.route('/').get(adminController.getDashboard);
router.route('/remove').post(adminController.removeUser);
router.route('/append-category').post(adminController.appendCategory);
router.route('/remove-category').post(adminController.removeCategory);

module.exports = router
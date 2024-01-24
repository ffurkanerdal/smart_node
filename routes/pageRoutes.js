const express = require('express')
const pageController = require("../controllers/pageController");
const router = express.Router();


router.route('/').get(pageController.getHomePage)
router.route('/home').get(pageController.getHomePage)

router.route('/about').get(pageController.getAboutPage)

router.route('/contact').get(pageController.getContactPage)
router.route('/contact').post(pageController.getSendMail)

router.route('/search').post(pageController.getSearchPage)



module.exports = router
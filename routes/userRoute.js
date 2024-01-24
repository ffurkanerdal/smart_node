const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const redirectMidlleware = require("../middlewares/redirectMiddleware");

const router = express.Router();

router.route("/signup").post(
    [
        body('first_name').not().isEmpty().withMessage('Please Enter Your Name')
    ], authController.createUser);
router.route("/login").post(redirectMidlleware, authController.loginUser);
router.route("/logout").get(authController.logoutUser);

router.route("/dashboard").get(authMiddleware, authController.getDashboardPage);

module.exports = router;

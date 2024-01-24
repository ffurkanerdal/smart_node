const User = require("../models/User");


module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userID);
    if (!user) {
      return res.redirect("/");
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

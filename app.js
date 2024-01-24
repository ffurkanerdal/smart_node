const express     =   require("express");
const mongoose    =   require("mongoose");
const MongoStore  =   require("connect-mongo");

const session     =   require("express-session");

const adminRoute = require('./routes/adminRoute')
const userRoute   =   require("./routes/userRoute");
const blogRoute   =   require("./routes/blogRoutes")
const pageRoute   =   require("./routes/pageRoutes");
const courseRoute =   require("./routes/courseRoutes");
const categoryRoute = require("./routes/categoryRoutes");

const app = express();

// Connect DB

mongoose
  .connect("") // mongo DB
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Template Engine

app.set("view engine", "ejs");

// Global Veriables

global.userIN = null;

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "", // Mongo DB
    }),
  })
);

// Routes
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/admin',adminRoute);
app.use("/", pageRoute);
app.use("/users", userRoute);
app.use('/blogs', blogRoute)
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`http://www.localhost:${port}`);
});

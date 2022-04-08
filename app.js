/**
 * External Import all file
 */
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

/**
 * internal import
 */
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const userRouter = require("./router/userRouter");
const inboxRouter = require("./router/inboxRouter");

/**
 * dotenv configure
 */
dotenv.config();

/**
 * database connection
 */
mongoose
  .connect(process.env.MONGO_CONNECTION_URL)
  .then(() => console.log("Database conenction succesffuly"))
  .catch((error) => console.log(error));

/**
 * request parser
 * for JSON data
 * Html form data
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * view engine set
 */
app.set("view engine", "ejs");

/**
 * Static folder set
 */
app.use(express.static(path.join(__dirname, "public")));

/**
 * cookie parser
 */
app.use(cookieParser(process.env.COOKIE_SECRET));

/**
 * routing handle
 */
app.use("/", loginRouter);
app.use("/users", userRouter);
app.use('/inbox', inboxRouter);

/**
 * 404 error handleing
 */
app.use(notFoundHandler);

/**
 * common error handlers
 */
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App listening tp port ${process.env.PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const advertisementRouter = require("./routers/advertisement");
const categoriesRouter = require("./routers/all-categories");
const productRouter = require("./routers/products");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const contactRouter = require("./routers/contact");


// ********** mongodb connection ************ mongodb://localhost:27017/supershop//
mongoose
  .connect("mongodb+srv://Nabijon:973619177@supershop.fviqra8.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("MongoDB is connected....");
  })
  .catch((error) => console.log(`Connection Error..., ${error}`));

// ********** MIDDLEWARE *********//
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/categories", categoriesRouter);
app.use("/api/advertisement", advertisementRouter);

app.use("/api/products", productRouter);
app.use("/api/contact-us", contactRouter);

// TODO Authentication
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//************* PORT ********************* */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening - ${port}`);
});

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/usercrudappnew", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

const Schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Usermodel = mongoose.model("User", Schema);

module.exports = Usermodel;

const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);

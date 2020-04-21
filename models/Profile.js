const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
<<<<<<< HEAD
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  city: {
    type: String,
  },
  publications: [
    {
      publication: {
        type: String,
      },
    },
  ],
=======
>>>>>>> b5040443
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
<<<<<<< HEAD
  avatar: {
    type: String,
=======
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  email: {
    type: String,
    required: true,
>>>>>>> b5040443
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);

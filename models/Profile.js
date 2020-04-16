const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
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
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
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
});

module.exports = User = mongoose.model("users", UserSchema);

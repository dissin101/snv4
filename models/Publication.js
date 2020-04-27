const mongoose = require("mongoose");

const PublicationSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
    ref: "users",
  },
  category: {
    type: String,
    //required: true
=======
    ref: "user",
  },
  category: {
    type: String,
    required: true,
>>>>>>> 6ee2403e7b46b973582a217aea64016c57a8826e
  },
  type: {
    type: String,
    require: true,
  },
  rooms: {
    type: Number,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  dateOfBuild: {
    type: Number,
    require: true,
  },
  floor: {
    type: Number,
  },
  floorsInBuilding: {
    type: Number,
  },
  area: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  images: [
    {
      image: {
        type: String,
      },
    },
  ],
});

module.exports = Publication = mongoose.model("publication", PublicationSchema);

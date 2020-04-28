const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const jwtDecode = require("jwt-decode");
const config = require("config");

const Publication = require("../models/Publication");
const User = require("../models/User");

// PROFILE IMAGE STORING STARTS
const s3 = new aws.S3({
  accessKeyId: config.get("accessKeyId"),
  secretAccessKey: config.get("secretAccessKey"),
  Bucket: config.get("Bucket"),
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Multiple File Uploads ( max 4 )
const uploadsBusinessGallery = multer({
  storage: multerS3({
    s3: s3,
    bucket: "keurentapp",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 4000000 }, // In bytes: 4000000 bytes = 4 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("galleryImage", 10);

// @route  POST /publications/add-publication
// @desc   Add new publication
// @access Private (FIX by add Auth)
router.post("/add-publication", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decode = jwtDecode(token);

  const publicationFields = {};
  publicationFields.author = decode.userId;

  uploadsBusinessGallery(req, res, (error) => {
    const {
      type,
      city,
      address,
      dateOfBuild,
      rooms,
      category,
      floor,
      floorsInBuilding,
      area,
      price,
      description,
      images,
      data,
    } = req.body;

    console.log(type, city, address);

    if (type) publicationFields.type = type;
    if (city) publicationFields.city = city;
    if (dateOfBuild) publicationFields.dateOfBuild = dateOfBuild;
    if (floor) publicationFields.floor = floor;
    if (rooms) publicationFields.rooms = rooms;
    if (address) publicationFields.address = address;
    if (category) publicationFields.category = category;
    if (floorsInBuilding) publicationFields.floorsInBuilding = floorsInBuilding;
    if (area) publicationFields.area = area;
    if (price) publicationFields.price = price;
    if (description) publicationFields.description = description;
    publicationFields.images = [];

    console.log("files", req.files);
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.files === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success
        let fileArray = req.files,
          fileLocation;
        const galleryImgLocationArray = [];
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].location;
          console.log("filenm", fileLocation);
          galleryImgLocationArray.push(fileLocation);
          let addImg = { image: fileLocation };
          publicationFields.images.push(addImg);
        }
        // Save the file name into databaseres.json
        ({
          filesArray: fileArray,
          locationArray: galleryImgLocationArray,
        });

        console.log("YI", publicationFields.images[0]);

        if (publicationFields.images[0] == undefined) {
          if (publicationFields.images[1] == undefined) {
            publicationFields.images[1] = {
              image:
                "https://ak9.picdn.net/shutterstock/videos/7138609/thumb/1.jpg",
            };
            if (publicationFields.images[2] == undefined) {
              publicationFields.images[2] = {
                image:
                  "https://ak9.picdn.net/shutterstock/videos/7138609/thumb/1.jpg",
              };
            }
          }
          publicationFields.images[0] = {
            image:
              "https://ak9.picdn.net/shutterstock/videos/7138609/thumb/1.jpg",
          };
        }

        try {
          let publication = new Publication(publicationFields);
          publication.save();
          res.json(publication);
          console.log(publication);
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server error");
        }
      }
    }
  });
});

// @route  GET api/publications/
// @desc   Get all publications
// @access Public

router.get("/publications", async (req, res) => {
  const publications = await Publication.find();
  res.json(publications);
});

// @route  GET api/publications/:id
// @desc   Get publication by ID
// @access Public

router.get("/publications/:id", async (req, res) => {
  try {
    const publicationId = await Publication.findById(req.params.id);
    console.log(publicationId);
    if (publicationId == null) {
      return res.status(404).json({ msg: "Publication not found" });
    }
    res.json(publicationId);
  } catch (error) {}
});

// @route  GET api/publications/sale
// @desc   Get Sale publications
// @access Public

router.get("/sale", async (req, res) => {
  const publications = await Publication.find({ category: "Продажа" });
  res.json(publications);
});

// @route  GET api/sale/:id
// @desc   Get publication by ID
// @access Public

router.get("/sale/:id", async (req, res) => {
  try {
    const publicationId = await Publication.findById(req.params.id);
    if (publicationId == null) {
      return res.status(404).json({ msg: "Publication not found" });
    }
    res.json(publicationId);
  } catch (error) {}
});

// @route  GET api/rent
// @desc   Get Rent publications
// @access Public

router.get("/rent", async (req, res) => {
  const publications = await Publication.find({ category: "Аренда" });
  res.json(publications);
});

// @route  GET api/rent/:id
// @desc   Get rent publications by ID
// @access Public

router.get("/rent/:id", async (req, res) => {
  try {
    const publicationId = await Publication.findById(req.params.id);
    if (publicationId == null) {
      return res.status(404).json({ msg: "Publication not found" });
    }
    res.json(publicationId);
  } catch (error) {}
});

module.exports = router;

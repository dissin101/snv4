const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Publication = require("../models/Publication");
const User = require("../models/User");

// @route  POST /publications/add-publication
// @desc   Add new publication
// @access Private (FIX by add Auth)
router.post(
  "/add-publication",
  [
    auth
    /*
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
    */
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      author,
      type,
      city,
      dateOfBuild,
      floor,
      floorsInBuilding,
      area,
      price,
      description,
      images
    } = req.body;

    // Build Publication Object
    const publicationFields = {};
    publicationFields.author = req.user.id;
    if (type) publicationFields.type = type;
    if (city) publicationFields.city = city;
    if (dateOfBuild) publicationFields.dateOfBuild = dateOfBuild;
    if (floor) publicationFields.floor = floor;
    if (floorsInBuilding) publicationFields.floorsInBuilding = floorsInBuilding;
    if (area) publicationFields.area = area;
    if (price) publicationFields.price = price;
    if (description) publicationFields.description = description;
    if (images) publicationFields.images = images;
    try {
      /* Fix in future */ let publication = new Publication(publicationFields);
      await publication.save();
      res.json(publication);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  GET /publications/
// @desc   Get all publications
// @access Public

router.get("/", async (req, res) => {
  const publications = await Publication.find();
  res.json(publications);
  console.log("/publications", req.params);
});

// @route  GET /sale/:id
// @desc   Get publication by ID
// @access Public

router.get("/sale/:id", async (req, res) => {
  try {
    const publicationId = await Publication.findById(req.params.id);
    if (!publicationId) {
      return res.status(404).json({ msg: "Publication not found" });
    }
    res.json(publicationId);
    console.log(publicationId);
  } catch (error) {}
});

module.exports = router;

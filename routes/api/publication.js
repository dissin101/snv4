const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Publication = require("../../models/Publication");
const User = require("../../models/User");

// @route  POST /publications/add-publication
// @desc   Add new publication
// @access Private (FIX by add Auth)
router.post(
  "/add-publication",
  auth,

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
      images,
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

router.get("/publications", async (req, res) => {
  const publications = await Publication.find();
  res.json(publications);
});

// @route  GET /publications/:id
// @desc   Get publication by ID
// @access Public

router.get("/publications/:id", async (req, res) => {
  try {
    const publicationId = await Publication.findById(req.params.id);
    if (!publicationId) {
      return res.status(404).json({ msg: "Publication not found" });
    }
    res.json(publicationId);
  } catch (error) {}
});

// @route  GET /publications/sale
// @desc   Get Sale publications
// @access Public

router.get("/sale", async (req, res) => {
  const publications = await Publication.find({ category: "Продажа" });
  res.json(publications);
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
  } catch (error) {}
});

// @route  GET /rent
// @desc   Get Rent publications
// @access Public

router.get("/rent", async (req, res) => {
  const publications = await Publication.find({ category: "Аренда" });
  res.json(publications);
});

// @route  GET /rent/:id
// @desc   Get rent publications by ID
// @access Public

router.get("/rent/:id", async (req, res) => {
  try {
    const publicationId = await Publication.findById(req.params.id);
    if (!publicationId) {
      return res.status(404).json({ msg: "Publication not found" });
    }
    res.json(publicationId);
  } catch (error) {}
});

module.exports = router;

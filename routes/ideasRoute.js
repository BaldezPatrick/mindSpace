const express = require("express");
const IdeasController = require("../controllers/ideasController");

const router = express.Router();

router.get("/", IdeasController.showIdeas);

module.exports = router;

const express = require("express");
const IdeasController = require("../controllers/ideasController");
const checkSession = require("../helpers/auth").checkSession;

const router = express.Router();

router.get("/dashboard-ideas", checkSession, IdeasController.dashboard);
router.get("/", IdeasController.showIdeas);

module.exports = router;

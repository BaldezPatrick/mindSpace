const express = require("express");
const IdeasController = require("../controllers/ideasController");
const checkSession = require("../helpers/auth").checkSession;

const router = express.Router();
router.post("/createIdea", checkSession, IdeasController.addIdeaSave);
router.get("/createIdea", checkSession, IdeasController.addIdea);
router.get("/dashboard-ideas", checkSession, IdeasController.dashboard);
router.post("/remove-idea", checkSession, IdeasController.removeIdea);
router.get("/edit/:id", checkSession, IdeasController.editIdea);
router.post("/edit", checkSession, IdeasController.editIdeaSave);
router.get("/", IdeasController.showIdeas);

module.exports = router;

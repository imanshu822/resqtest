const express = require("express");
const {
  addIncident,
  getAnIncident,
  getAllIncidents,
  updateIncident,
} = require("../controllers/incidentsCtrl");
// const { authMiddleware } = require("../middlewares/authMiddleware");
const { validationResult } = require("express-validator"); // Import validation functions if needed
const router = express.Router();

// Add a New Incident
router.post("/add-incident", addIncident);

// Get an Incident by ID
router.get("/:id", getAnIncident);

// Get All Incidents (Authenticated)
router.post("/getallincidents", getAllIncidents);

// Update an Incident by ID
router.put("/update-a-incident/:id", updateIncident);

module.exports = router;

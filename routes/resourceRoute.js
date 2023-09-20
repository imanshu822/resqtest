const express = require("express");
const { createResource } = require("../controllers/userCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-a-resource", authMiddleware, createResource);
// router.get("/get-all-resources", getAllResources);
// router.post("/get-a-resource", getAResource);

module.exports = router;

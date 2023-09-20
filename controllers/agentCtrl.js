const Agents = require("../models/agentModel");
const asyncHandler = require("express-async-handler");
const { sendEmail } = require("./emailCtrl");
const validateMongoDbId = require("../utils/validateMongodbId");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAgent = asyncHandler(async (req, res) => {
  const { agentID } = req.body;
  // Check if the agent already exists
  const findAgent = await Agents.findOne({ agentID });
  if (!findAgent) {
    // Create a new agent
    // randomly generate the password
    const password = Math.random().toString(36).slice(-8);
    req.body.password = password;

    const newAgent = await Agents.create(req.body);
    res.json(newAgent);
  } else {
    res.status(400).json({ error: "Agent already exists" });
  }
});
// Get an agent
const getaAgent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDbId(id); // Validate the MongoDB ID
    const getaAgent = await Agents.findById(id);
    if (!getaAgent) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(getaAgent);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Error getting user" });
  }
});

// get all agents
const getallAgents = asyncHandler(async (req, res) => {
  try {
    const agents = await Agents.find().sort({ distance: 1 });
    res.json(agents);
  } catch (error) {
    throw new Error(error);
  }
});

// Agent login
const agentLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the agent by email
  const agent = await Agents.findOne({ email });

  if (!agent) {
    return res.status(401).json({ error: "Invalid credentials" });
  } else if (agent.password === password) {
    res.json({ message: "Login Successflly" });
  } else {
    res.json({ message: "Login UnSuccessflly" });
  }
});

module.exports = { createAgent, getaAgent, getallAgents, agentLogin };

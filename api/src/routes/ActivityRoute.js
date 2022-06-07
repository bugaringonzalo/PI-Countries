const { Router } = require("express");
const {
  getActivities,
  createActivity,
} = require("../controllers/ActivityController");

const ActivityRoute = Router();

ActivityRoute.get("/", getActivities);
ActivityRoute.post("/", createActivity);

module.exports = ActivityRoute;

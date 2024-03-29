const { Country, Activity, Op } = require("../db");
const axios = require("axios");

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: {
        model: Country,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    });
    res.send(activities);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const createActivity = async (req, res) => {
  try {
    let { name, difficulty, duration, season, countries } = req.body;
    duration = parseInt(duration);
    difficulty = parseInt(difficulty);
    const newActivity = await Activity.create({
      name,
      difficulty,
      season,
      duration,
    });
    let countriesDb = await Country.findAll({
      attributes: {
        name: ["name"],
      },
      through: {
        attributes: [],
      },
      where: {
        name: {
          [Op.in]: countries, 
        },
      },
    });
    countriesDb.forEach((country) => {
      newActivity.addCountry(country);
    });
    res.send(newActivity);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getActivities,
  createActivity,
};

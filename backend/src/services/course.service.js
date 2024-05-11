const Course = require("../models/Course.js");

const createCourse = async (data, res) => {
  const course = await Course.create(data);
  res.status(201).json({
    success: true,
    course,
  });
};

module.exports = { createCourse };

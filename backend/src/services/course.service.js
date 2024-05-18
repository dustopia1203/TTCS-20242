const Course = require("../models/Course.js");

const createCourse = async (data, res) => {
  const course = await Course.create(data);
  res.status(201).json({
    success: true,
    course,
  });
};

const getAllCoursesService = async (res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    courses,
  });
};

module.exports = { createCourse, getAllCoursesService };

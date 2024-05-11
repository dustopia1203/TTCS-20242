const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/auth.js");
const {
  uploadCourse,
  editCourse,
  getCourse,
  getCourses,
  getCourseData,
  addQuestion,
  addAnswer,
} = require("../controllers/course.controller.js");

router.post("/upload-course", authenticate, authorize("admin"), uploadCourse);

router.put("/edit-course/:id", authenticate, authorize("admin"), editCourse);

router.get("/get-course/:id", getCourse);

router.get("/get-courses", getCourses);

router.get("/get-course-data/:id", authenticate, getCourseData);

router.post("/add-question", authenticate, addQuestion);

router.post("/add-answer", authenticate, addAnswer);

module.exports = router;

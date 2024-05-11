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
  addReview,
  addReviewReply,
} = require("../controllers/course.controller.js");

router.post("/upload-course", authenticate, authorize("admin"), uploadCourse);

router.put("/edit-course/:id", authenticate, authorize("admin"), editCourse);

router.get("/get-course/:id", getCourse);

router.get("/get-courses", getCourses);

router.get("/get-course-data/:id", authenticate, getCourseData);

router.put("/add-question", authenticate, addQuestion);

router.put("/add-answer", authenticate, addAnswer);

router.put("/add-review/:id", authenticate, addReview);

router.put("/add-review-reply", authenticate, addReviewReply);

module.exports = router;

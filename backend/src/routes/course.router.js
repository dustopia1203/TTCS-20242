const express = require("express");
const router = express.Router();
const { isAuthenticated, authorize } = require("../middlewares/auth.js");
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
  getAllCourses,
  deleteCourse,
  getCourseAnalytics,
} = require("../controllers/course.controller.js");

router.post(
  "/upload-course",
  isAuthenticated,
  authorize("admin"),
  uploadCourse
);

router.put("/edit-course/:id", isAuthenticated, authorize("admin"), editCourse);

router.get("/get-course/:id", getCourse);

router.get("/get-courses", getCourses);

router.get("/get-course-data/:id", isAuthenticated, getCourseData);

router.put("/add-question", isAuthenticated, addQuestion);

router.put("/add-answer", isAuthenticated, addAnswer);

router.put("/add-review/:id", isAuthenticated, addReview);

router.put("/add-review-reply", isAuthenticated, addReviewReply);

router.get(
  "/get-all-courses",
  isAuthenticated,
  authorize("admin"),
  getAllCourses
);

router.delete("/delete/:id", isAuthenticated, authorize("admin"), deleteCourse);

router.get(
  "/analytics",
  isAuthenticated,
  authorize("admin"),
  getCourseAnalytics
);

module.exports = router;

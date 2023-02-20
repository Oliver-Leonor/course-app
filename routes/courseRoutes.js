const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const auth = require("../auth");

// Routes
// Route for creating a course
router.post("/addCourse", (req, res) => {
	courseController.addCourse(req.body).then(resultFromController => res.send(resultFromController))
});

// Route for retrieving all the course
router.get("/all", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization)

	courseController.getAllCourses(userData).then(resultFromController => res.send(resultFromController))
});

// Route for retrieving all active courses
router.get("/", (req, res) => {
	courseController.getAllActive().then(resultFromController => res.send(resultFromController))
});

// Route for retrieving a specific course
router.get("/:courseId", (req, res) => {
	console.log(req.params.courseId)

	courseController.getCourse(req.params).then(resultFromController => res.send(resultFromController))
});

// Route for updating a course.
router.put("/:courseId", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization)

	if(userData.isAdmin) {
		courseController.updateCourse(req.params, req.body).then(resultFromController => res.send(resultFromController))
	} else {
		res.send({auth: "failed"})
	}
	
});

router.patch("/:courseId", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization)

	if(userData.isAdmin) {
		courseController.changeCourse(req.params, req.body).then(resultFromController => res.send(resultFromController))
	} else {
		res.send({auth: "failed"})
	}
});

module.exports = router;
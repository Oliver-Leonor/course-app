const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require("../auth.js")

// Routes

// Route for checking email
router.post("/checkEmail", (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController)) 
});

// Route for user registration
router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController))
});

// Route for user log in
router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController))
});

// User details~~~~

router.post("/details", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);
	console.log(userData)
	console.log(req.headers.authorization);

	userController.getProfile({id: userData.id}).then(resultFromController => res.send(resultFromController))
});


router.post("/enroll", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);
	//console.log(userData)
	//console.log(req.headers.authorization);

	let data = {
		courseId: req.body.courseId,
		userId: userData.id
	} 
	if(userData.isAdmin){
		res.send({auth: "failed"})
	} else {

	userController.enroll(data).then(resultFromController => res.send(resultFromController))
	}
});

module.exports = router;
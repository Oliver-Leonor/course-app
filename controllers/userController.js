const User = require('../models/User');
const Course = require("../models/Course");
const bcrypt = require("bcrypt");
const auth = require("../auth")

// Controller Functions

// Checking email
module.exports.checkEmailExists = (reqBody) => {
	return User.find({email: reqBody.email}).then(result => {
		if(result.length > 0) {
			return true
		} else {
			return false
		}
	}) 
};

// User Registration

module.exports.registerUser = (reqBody) => {
	
	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		password: (reqBody.password, 10)
	})

	return newUser.save().then((user, error) => {
		// User registration failed
		if(error) {
			return false
		// User registration successful
		} else {
			return true
		}
	})
};

// User Log In
module.exports.loginUser = (reqBody) => {
	return User.findOne({email: reqBody.email}).then(result => {
		if(result == null) {
			return false
		} else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)

			if(isPasswordCorrect){
				return {access: auth.createAccessToken(result)}
			} else {
				return false
			}
		}
	})
};

module.exports.getProfile = (userData) => {
	return User.findById(userData.id).then(result => {
		/*console.log(data.userId);
		console.log(result);*/

		if(result == null) {
			return false
		} else {
			result.password = "*****"
		}
		return result
	})
};

// Enroll User to a Class
module.exports.enroll = async (data) => {

	let isUserUpdated = await User.findById(data.userId).then(user => {

		user.enrollments.push({courseId: data.courseId});

		return user.save().then((user, error) => {
			if(error) {
				return false
			} else {
				return true
			}
		})
	});


	let isCourseUpdated = await Course.findById(data.courseId).then(course => {

		course.enrollees.push({userId: data.userId});

		return course.save().then((course, error) => {

			if(error) {
				return false
			} else {
				return true
			}
		})
	});

	if(isUserUpdated && isCourseUpdated) {

		// Enrollment successful
		return "enrolled"
	} else {

		return false
	};

};
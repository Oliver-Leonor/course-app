const Course = require("../models/Course");

// Controller Functions:

// Creating a new course
module.exports.addCourse = (reqBody) => {
	let newCourse = new Course({
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	});

	return newCourse.save().then((course, err) => {
		if(err) {
			return false //"Course creation failed."
		} else {
			return true
		}
	})
};

// Activity

module.exports.addCourse = (reqBody) => {
	let newCourse = new Course({
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	});

	return newCourse.save().then((course, err) => {
		if(err) {
			return false 
		} else {
			return true
		}
	})
};

// Retrieving All Courses
module.exports.getAllCourses = (data) => {

	if(data.isAdmin) {
		return Course.find({}).then(result => {

			return result
		})
	} else {
		return false // "You are not an Admin."
	}
};

// Retrieve All Active Courses
module.exports.getAllActive = () => {

	return Course.find({isActive: true}).then(result => {
		return result
	})
};

// Retrieve a Specific Course
module.exports.getCourse = (reqParams) => {

	return Course.findById(reqParams.courseId).then(result => {
		return result
	})
};

// Update a Specific Course
module.exports.updateCourse = (reqParams, reqBody) => {

	let updatedCourse = {
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	}

	return Course.findByIdAndUpdate(reqParams.courseId, updatedCourse).then((updatedCourse, error) => {

		console.log(updatedCourse)
		if(error) {
			return false
		} else {
			return true
		}
	})
};

// Activity 

module.exports.changeCourse = (reqParams, reqBody) => {

	let changedCourse = {
		isActive: reqBody.isActive
	}

	return Course.findByIdAndUpdate(reqParams.courseId, changedCourse).then((changedCourse, error) => {

		if(error) {
			return false
		} else {
			return true
		}
	})
};


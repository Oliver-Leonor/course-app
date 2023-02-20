// Basic Express Server Setup
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");


const app = express();
const port = process.env.PORT || 4000;

// Mongoose Connection Setup
mongoose.connect("mongodb+srv://leonor_224:admin123@224-leonor.xr9pdhl.mongodb.net/course-booking-API?retryWrites=true&w=majority", 
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

let db = mongoose.connection;

db.on("error", () => console.error("Connection error."));
db.once("open", () => console.log("Connected to MongoDB."));

// Middlewares
// Allows our frontend app to access our backend application.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Main URI
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);



app.listen(port, () => {console.log(`API is now running at port ${port}`)});
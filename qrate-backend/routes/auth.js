var express = require("express");
var router = express.Router();
const {
	signout,
	signup,
	signin,
	isSignedIn,
	isAuthenticated,
} = require("../controllers/auth");
const { check } = require("express-validator");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post(
	"/signup",
	check("name", "Name should be atleast 3 char").isLength({ min: 3 }),
	check("password", "Password should be atleast be 8 char").isLength({
		min: 8,
	}),
	check("email", "Email is required").isEmail(),
	signup
);

router.post(
	"/signin",
	check("password", "Password is required").isLength({ min: 1 }),
	check("email", "Email is required").isEmail(),
	signin
);

router.get("/signout/:userId", isSignedIn, isAuthenticated, signout);

router.get("/getSignedInUser", isSignedIn, (req, res) => {
	res.json(req.auth);
});

module.exports = router;

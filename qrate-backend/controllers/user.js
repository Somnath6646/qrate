const { ResCollection } = require("../models/rescollection");
const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: err,
			});
		}
		req.profile = user;
		next();
	});
};

exports.getUser = (req, res) => {
	User.findOne({ _id: req.profile._id })
		.populate("starred")
		.exec((error, user) => {
			if (error || !user) {
				res.status(400).json({ error: "Cannot get details" });
			} else {
				ResCollection.populate(
					user.starred,
					{ path: "user", select: "_id name" },
					(err, starred) => {
						if (err || !starred) {
							res.status(400).json({ error: "Cannot get details" });
						} else {
							user.starred = starred;
							res.status(200).json(user);
						}
					}
				);
			}
		});
};

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.profile._id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				return res.status(400).json({
					error: "You are not authorized to update this user",
				});
			}
			req.profile.salt = undefined;
			req.profile.encry_password = undefined;
			res.json(user);
		}
	);
};

exports.pushResourceCollection = (req, res, next) => {
	let links = [];
	req.body.rescollection.links.forEach((link) => {
		links.push({
			_id: link._id,
			url: link.url,
			title: link.title,
			publisher: link.publisher,
			description: link.description,
			extraData: link.extraData,
			type: link.type,
		});
	});

	User.findOneAndUpdate(
		{ _id: req.profile._id },
		{ $push: { resco: purchases } },
		{ new: true }, //jo error, obj aayega usme updated obj aayega
		(err, purchases) => {
			return res.status(400).json({
				error: "Unable to save resource collection",
			});
		}
	);

	next();
};

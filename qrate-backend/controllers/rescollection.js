const axios = require("axios");
var { JSDOM } = require("jsdom");
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));
const User = require("../models/user");
const { ResCollection, categories } = require("../models/rescollection");

const { validationResult } = require("express-validator");

const USER_FIELDS_TO_POPULATE = "_id username name";

exports.getErrorMesageInJson = (res, statusCode, errorMessage) => {
	return res.status(statusCode).json({ error: errorMessage });
};

exports.getResCollectionById = (req, res, next, rescollectionId) => {
	ResCollection.findById(rescollectionId).exec((error, rescollection) => {
		if (error || !rescollection) {
			return this.getErrorMesageInJson(
				res,
				400,
				"Sorry, we encountered an error in loading collection."
			);
		}
		rescollection
			.populate("user", USER_FIELDS_TO_POPULATE)
			.execPopulate()
			.then(() => {
				req.rescollection = rescollection;
				next();
			});
	});
};

exports.isHisOwn = (req, res, next) => {
	try {
		if (String(req.rescollection.user._id) === String(req.profile._id)) {
			next();
		} else {
			return res.status(401).json({
				error: "Access denied",
			});
		}
	} catch (error) {
		return res.status(404).json({
			error: "Couldn't load collection",
		});
	}
};

exports.isHisOwnOrPublic = (req, res, next) => {
	let isAuthenticated =
		req.profile && req.auth && req.profile._id == req.auth._id;
	if (isAuthenticated) {
		if (req.rescollection.visibility == "PRIVATE") {
			if (String(req.rescollection.user._id) === String(req.profile._id)) {
				next();
			} else {
				return res.status(401).json({
					error: "Access denied",
				});
			}
		} else next();
	} else {
		return res.status(401).json({
			error: "Unauthorized",
		});
	}
};

exports.getResCollection = (req, res) => {
	if (String(req.rescollection.user._id) === String(req.profile._id)) {
		res.status(200).json(req.rescollection);
	} else {
		ResCollection.findByIdAndUpdate(
			{ _id: req.rescollection._id },
			{ $inc: { views: 1 } },
			{ new: true }
		).exec((error, newResCollection) => {
			if (error || !newResCollection) {
				return res.status(404).json({
					error: "Sorry we cannot find this collection at this time.",
				});
			}
			res.status(200).json(newResCollection);
		});
	}
};

exports.getNameAndIdOfCollection = (req, res) => {
	const user = req.profile;
	User.findById(user._id).exec((error, user) => {
		if (error || !user) {
			return this.getErrorMesageInJson(
				res,
				400,
				"Error faced in fetching resource collection"
			);
		}
		user
			.populate("rescollection", "_id name")
			.execPopulate()
			.then(() => {
				res.status(200).json(user.rescollection);
			});
	});
};

exports.getResourcesOfTheUser = (req, res) => {
	const user = req.profile;
	User.findById(user._id).exec((error, user) => {
		if (error || !user) {
			return this.getErrorMesageInJson(
				res,
				400,
				"Sorry, we encountered an error in loading your collections."
			);
		}
		user
			.populate("rescollection", "_id name links category")
			.execPopulate()
			.then(() => {
				res.status(200).json(user.rescollection);
			});
	});
};

exports.createResourceCollection = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(401).json({
			error: errors.array()[0].msg,
			parameter: errors.array()[0].param,
		});
	}
	const body = req.body;

	const rescollection = {
		name: body.rescollection.name,
		user: req.profile._id,
		links: [req.metadata],
	};

	ResCollection.create(rescollection, (error, newResCollection) => {
		if (error || !newResCollection) {
			return getErrorMesageInJson(res, 400, "Failed to create collection");
		}

		User.findOneAndUpdate(
			{ _id: req.profile._id },
			{ $push: { rescollection: newResCollection._id } },
			{ new: true },
			(err, user) => {
				if (err || !user) {
					return getErrorMesageInJson(res, 400, "Failed to create collection");
				}
				newResCollection
					.populate("user", USER_FIELDS_TO_POPULATE)
					.execPopulate()
					.then(() => res.status(200).json(newResCollection));
			}
		);
	});
};

exports.addALinktoResCollection = (req, res) => {
	const rescollection = req.rescollection;
	const link = req.metadata;

	rescollection.links.push(link);
	return rescollection.save().then((newRescollection, err) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to add link into this Collection",
			});
		}
		res.json({
			message: "Addition successful",
			newRescollection,
		});
	});
};

exports.deleteALinkFromResCollection = (req, res) => {
	const rescollection = req.rescollection;
	const linkId = req.body.link_id;

	rescollection.links.pull(linkId);
	if (rescollection.links.length > 0) {
		return rescollection.save().then((deletedCollection, err) => {
			if (err) {
				return res.status(400).json({
					error: "Failed to delete link from this Collection",
				});
			}
			res.json({
				message: "Deletion successful",
				deletedCollection,
			});
		});
	} else {
		return rescollection.remove((err, deletedCollection) => {
			if (err) {
				return res.status(400).json({
					error: "Failed to delete this Collection",
				});
			}
			res.json({
				message: "Deletion successful",
				deletedCollection,
			});
		});
	}
};

exports.deleteResCollection = (req, res) => {
	const rescollection = req.rescollection;
	rescollection.remove((err, deletedCollection) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to delete this Collection",
			});
		}
		res.json({
			message: "Deletion successful",
			deletedCollection,
		});
	});
};

exports.changeVisibilityOfResCollection = (req, res) => {
	const rescollection = req.rescollection;
	const visibility = req.body.visibility;

	rescollection.visibility = visibility;
	return rescollection.save().then((newRescollection, err) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to change visibility of this collection",
			});
		}
		res.json({
			message: "Collection's visiblity changed",
			newRescollection,
		});
	});
};

exports.changeCategoryOfResCollection = (req, res) => {
	const rescollection = req.rescollection;
	const category = req.body.category;

	rescollection.category = category;
	return rescollection.save().then((newRescollection, err) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to change category of this collection",
			});
		}
		res.json({
			message: "Collection's category changed",
			newRescollection,
		});
	});
};

exports.changeTagsOfResCollection = (req, res) => {
	const rescollection = req.rescollection;
	const tags = req.body.tags;
	rescollection.tags = tags;
	return rescollection.save().then((newRescollection, err) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to change tags of this collection",
			});
		}
		res.json({
			message: "Collection's tags Changed",
			newRescollection,
		});
	});
};

exports.changeDescriptionOfResCollection = (req, res) => {
	const rescollection = req.rescollection;
	const descr = req.body.description;
	rescollection.description = descr;
	return rescollection.save().then((newRescollection, err) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to change description of this collection",
			});
		}
		res.json({
			message: "Collection's description Changed",
			newRescollection,
		});
	});
};

exports.searchResCollections = (req, res, searchQuery) => {
	var searchQuery = req.query.q;

	ResCollection.aggregate([
		{
			$match: {
				$or: [
					{
						name: { $regex: searchQuery, $options: "sxi" },
					},
					{
						tags: { $regex: searchQuery, $options: "sxi" },
					},
				],
			},
		},
	]).exec((error, rescols) => {
		if (error || !rescols) {
			return this.getErrorMesageInJson(
				res,
				400,
				"Sorry, we cannot search collections for " + searchQuery
			);
		} else {
			ResCollection.populate(
				rescols,
				{ path: "user", select: "_id name" },
				(err, rescollections) => {
					if (err || !rescollections) {
						res.status(400).json({ error: "Cannot get top picks" });
					} else {
						const rescols = rescollections.filter(
							(rc) => rc.visibility === "PUBLIC"
						);
						res.status(200).json({ resCollection: rescols });
					}
				}
			);
		}
	});
};

exports.getCategories = (req, res) => {
	res.status(200).json({ categories: categories });
};

exports.star = (req, res) => {
	const collectionId = req.rescollection._id;
	const userId = req.profile._id;
	User.findOneAndUpdate(
		{ _id: userId },
		{ $addToSet: { starred: collectionId } },
		{ new: true },
		(error, user) => {
			if (error) {
				return getErrorMesageInJson(res, 400, "Cannot star this collection");
			}
			if (!user)
				return getErrorMesageInJson(res, 400, "Cannot star this collection");

			ResCollection.findOneAndUpdate(
				{ _id: collectionId },
				{ $addToSet: { stars: userId } },
				{ new: true },
				(error, rescol) => {
					if (error) {
						return getErrorMesageInJson(
							res,
							400,
							"Cannot star this collection"
						);
					}
					if (!rescol)
						return getErrorMesageInJson(
							res,
							400,
							"Cannot star this collection"
						);

					res.status(200).json(rescol);
				}
			);
		}
	);
};

exports.unstar = (req, res) => {
	const collectionId = req.rescollection._id;
	const userId = req.profile._id;
	User.findOneAndUpdate(
		{ _id: userId },
		{ $pullAll: { starred: [collectionId] } },
		{ new: true },
		(error, user) => {
			if (error) {
				return getErrorMesageInJson(res, 400, "Cannot unstar this collection");
			}
			if (!user)
				return getErrorMesageInJson(res, 400, "Cannot unstar this collection");

			ResCollection.findOneAndUpdate(
				{ _id: collectionId },
				{ $pullAll: { stars: [userId] } },
				{ new: true },
				(error, rescol) => {
					if (error) {
						return getErrorMesageInJson(
							res,
							400,
							"Cannot unstar this collection"
						);
					}
					if (!rescol)
						return getErrorMesageInJson(
							res,
							400,
							"Cannot unstar this collection"
						);

					res.status(200).json(rescol);
				}
			);
		}
	);
};

exports.getTopPicks = (req, res) => {
	ResCollection.aggregate([
		{
			$match: {
				$and: [{ visibility: "PUBLIC" }],
			},
		},
		{
			$project: {
				starsCount: { $size: { $ifNull: ["$stars", []] } },
				name: 1,
				links: 1,
				description: 1,
				views: 1,
				stars: 1,
				category: 1,
				user: 1,
			},
		},
		{
			$sort: { starsCount: -1 },
		},
	])
		.limit(3)
		.exec((error, rescols) => {
			if (error || !rescols) {
				res.status(400).json({ error: "Cannot get top picks" });
			} else {
				ResCollection.populate(
					rescols,
					{ path: "user", select: "_id name" },
					(err, nRescols) => {
						if (err || !nRescols) {
							res.status(400).json({ error: "Cannot get top picks" });
						} else {
							res.status(200).json(nRescols);
						}
					}
				);
			}
		});
};

exports.getResCollectionByCategory = (req, res) => {
	ResCollection.find({
		category: req.body.category,
		visibility: "PUBLIC",
	})
		.populate("user", "_id name")
		.exec((error, rescols) => {
			if (error || !rescols) {
				res.status(400).json({ error: "Cannot collections by category" });
			} else {
				res.status(200).json(rescols);
			}
		});
};

exports.extractMetadata = (req, res, next) => {
	async function extractMetadataInner(link) {
		var publisher,
			ogType = "",
			ogSiteName = "",
			ogImage = "",
			ogTitle = "",
			ogDescription = "",
			customtype = "",
			author = "",
			date = "",
			_url = "",
			extra = "",
			twitterData1 = "";
		favicon = "";

		_url = link;

		const response = await fetch(link);
		const body = await response.text();
		try {
			const { body: html, url } = await got(link);

			const metadata = await metascraper({ html, url });
			author = metadata.author;
			date = metadata.date;
		} catch (err) {
			author = "";
			date = "";
		}

		var doc = new JSDOM(body, {
			url: link,
		});

		var regex = "^(.*:)//([A-Za-z0-9-.]+)(:[0-9]+)?(.*)$";
		let newRegEx = new RegExp(regex, "g");

		var matches = link.match(newRegEx);

		if (matches.length > 0) {
			publisher = link.replace(newRegEx, "$2");
		}
		var titles = doc.window.document.getElementsByTagName("title");
		if (titles.length > 0) {
			ogTitle = titles[0].text;
		}
		var ic = doc.window.document.querySelector("link[rel*='icon']");
		if (ic) {
			favicon = ic.href;
		}
		var metas = doc.window.document.querySelectorAll("meta");
		for (var i = 0; i < metas.length; i++) {
			var content = metas[i].getAttribute("content");

			if (metas[i].getAttribute("name") === "author") author = content;

			if (metas[i].getAttribute("property") === "og:type") ogType = content;
			if (metas[i].getAttribute("property") === "og:image") ogImage = content;
			if (metas[i].getAttribute("property") === "og:description")
				ogDescription = content;
			if (metas[i].getAttribute("property") === "og:title") ogTitle = content;
			if (metas[i].getAttribute("property") === "og:site_name")
				ogSiteName = content;
			if (metas[i].getAttribute("name") === "twitter:data1")
				twitterData1 = content;
		}

		if (ogSiteName.toLowerCase() == "medium" && ogType == "article") {
			customtype = "Medium";
			extra = twitterData1;

			var reso = {
				author: author,
				date: date,
				image: ogImage,
				type: customtype,
				extraData: extra,
				publisher: publisher,
				description: ogDescription,
				title: ogTitle,
				ogType: ogType,
				url: _url,
				favicon: favicon,
			};

			req.metadata = reso;
			next();
		} else if (ogSiteName.toLowerCase() == "youtube") {
			customtype = "Youtube";

			if (link.toLowerCase().includes("playlist")) {
				customtype = "YT Playlist";
			}

			let options = {
				headers: {
					"User-Agent": "UA",
				},
			};

			axios
				.get("https://www.youtube.com/oembed?url=" + link, options)
				.then((response) => {
					author = response.data.author_name;
					ogTitle = response.data.title;
					var reso = {
						author: author,
						date: date,
						image: ogImage,
						type: customtype,
						extraData: extra,
						publisher: publisher,
						description: ogDescription,
						title: ogTitle,
						ogType: ogType,
						url: _url,
						favicon: favicon,
					};

					req.metadata = reso;
					next();
				})
				.catch((error) => {
					var reso = {
						author: author,
						date: date,
						image: ogImage,
						type: customtype,
						extraData: extra,
						publisher: publisher,
						description: ogDescription,
						title: ogTitle,
						ogType: ogType,
						url: _url,
						favicon: favicon,
					};

					req.metadata = reso;
					next();
				});
		} else if (ogSiteName.toLowerCase() == "twitter") {
			customtype = "Twitter";

			var reso = {
				author: author,
				date: date,
				image: ogImage,
				type: customtype,
				extraData: extra,
				publisher: publisher,
				description: ogDescription,
				title: ogTitle,
				ogType: ogType,
				url: _url,
				favicon: favicon,
			};

			if (link.includes("/status/")) {
				axios
					.get("https://publish.twitter.com/oembed?url=" + link)
					.then((response) => {
						// fs.writeFileSync('yehu3.html', response.data.html)
						var document = new JSDOM(response.data.html, {
							url: link,
						}).window.document;
						var root = document.getElementsByClassName("twitter-tweet");
						if (root.length > 0) {
							author = response.data.author_name;
							var firstChild =
								document.getElementsByClassName("twitter-tweet")[0].firstChild;
							var tweet = firstChild.innerHTML;
							ogTitle = tweet.substring(0, tweet.indexOf("<"));
							ogType = "article";
						}

						var reso = {
							author: author,
							date: date,
							image: ogImage,
							type: customtype,
							extraData: extra,
							publisher: publisher,
							description: ogDescription,
							title: ogTitle,
							ogType: ogType,
							url: _url,
							favicon: favicon,
						};

						req.metadata = reso;
						next();
					})
					.catch((error) => {
						var reso = {
							author: author,
							date: date,
							image: ogImage,
							type: customtype,
							extraData: extra,
							publisher: publisher,
							description: ogDescription,
							title: ogTitle,
							ogType: ogType,
							url: _url,
							favicon: favicon,
						};

						req.metadata = reso;
						next();
					});
			} else {
				req.metadata = reso;
				next();
			}
		} else {
			customtype = ogType;
			var reso = {
				author: author,
				date: date,
				image: ogImage,
				type: customtype,
				extraData: extra,
				publisher: publisher,
				description: ogDescription,
				title: ogTitle,
				ogType: ogType,
				url: _url,
				favicon: favicon,
			};

			req.metadata = reso;
			next();
		}
	}

	extractMetadataInner(req.body.rescollection.link);
};

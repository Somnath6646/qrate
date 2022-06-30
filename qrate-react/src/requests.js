const requests = {
	auth: {
		signIn: "auth/signin",
		signUp: "auth/signup",
		signOut: "auth/signout",
	},
	user: {
		all: "user/all",
		getUser: "user",
	},
	collection: "collection",
	collections: {
		user: "collection/user/all",
		collection: "collection",
		new: "collection/create",
		update: "collection/update",
		nameAndId: "collection/name/id",
		star: "star",
		unstar: "unstar",
		changeVisibility: "collection/change/visibility",
		getCategories: "collection/categories",
		changeCategory: "collection/change/category",
		changeTags: "collection/change/tags",
		changeDescription: "collection/change/description",
		getByCategory: "collection/by/category",
		topPicks: "collection/top/picks",
		delete: "collection/delete",
		deleteLink: "collection/delete/link",
	},
	search: {
		search: "collection/search?q=",
	},
};

export default requests;

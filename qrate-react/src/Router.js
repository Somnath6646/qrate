import React, { Component } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Authentication from "./components/auth/Authentication";
import CategoryCollections from "./components/collections/CategoryCollections";
import CollectionDetails from "./components/collections/CollectionDetails";
import Explore from "./components/explore/Explore";
import Home from "./components/home/Home";
import { LandingPage } from "./components/landing/LandingPage";
import MobileSettings from "./components/settings/MobileSettings";
import Starred from "./components/star/Starred";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/home" element={<Home />} />
				<Route path="explore" element={<Explore />} />
				<Route path="starred" element={<Starred />} />
				<Route path="auth" element={<Authentication />} />
				<Route
					path="collection/:collectionId/settings"
					element={<MobileSettings />}
				/>
				<Route
					path="collection/:collectionId"
					element={<CollectionDetails />}
				/>
				<Route
					path=":category/collections/"
					element={<CategoryCollections />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;

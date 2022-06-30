import React from "react";
import { useCookies } from "react-cookie";
import Sidebar from "../navigation/Sidebar";
import BottomBar from "../navigation/BottomBar";

import "../../css/Home.css";
import "../../css/BaseDialog.css";
import "../../css/Starred.css";
import axios from "../../axios";
import requests from "../../requests";
import { useState, useEffect } from "react";
import CollectionItem from "../collections/CollectionItem";
import { NoCollectionContent } from "../collections/NoCollectionContent";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Starred = () => {
	const [user, setUser] = useState({
		name: "",
		starred: [],
		avatar: "",
		bio: "",
	});
	const [cookies] = useCookies(["userData"]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		function getData() {
			if (cookies.userData.user !== undefined) {
				axios
					.get(`${requests.user.getUser}/${cookies.userData.user._id}`, {
						headers: {
							Authorization: `Bearer ${cookies.userData.token}`,
						},
					})
					.then((sync) => sync.data)
					.then((data) => {
						setUser(data);
						setIsLoading(false);
					})
					.catch((err) => {
						setIsLoading(false);
						alert(err.response.data.error);
					});
			} else {
				navigate("/auth", { replace: true });
			}
		}
		getData();
	}, []);

	const content =
		user.starred.length > 0 ? (
			user.starred.map((collection) => {
				if (collection.name != "")
					return (
						<CollectionItem
							key={collection._id}
							collection={collection}
							name={true}
						/>
					);
			})
		) : (
			<NoCollectionContent title="Hey 👋 you haven't starred any collection yet">
				<li>
					Go to explore section search the topics you wanna learn{" "}
					<i>e.g design</i> and star the curated collection you find valuable{" "}
				</li>
				<li>
					By Starring a collection you get access to all the future updates.
				</li>
				<li>Also the curator gets rewarded for his/her contribution.</li>
			</NoCollectionContent>
		);

	const loading = (
		<div
			style={{
				maxWidth: "100%",
				height: "100%",
				margin: "auto auto",
				zIndex: "999",
				padding: "10px 20px 40px",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<div className="loader"></div>
		</div>
	);

	return (
		<div class="container">
			<Helmet>
				<title>Starred Collections</title>
			</Helmet>
			<div class="sidebar-">
				<Sidebar select={2} />
			</div>
			<div
				class="middle-content-without-side-explore"
				style={{ padding: "0px" }}
			>
				<div class="stars-section">
					<div class="stars-text">Starred Collections</div>
				</div>
				{isLoading ? loading : content}
			</div>
			<div class="bottom-bar">
				<BottomBar select={2} />
			</div>
		</div>
	);
};

export default Starred;

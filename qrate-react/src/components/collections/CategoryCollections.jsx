import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/Home.css";
import axios from "../../axios";
import requests from "../../requests";
import Sidebar from "../navigation/Sidebar";
import SideExplore from "../utils/SideExplore";
import CollectionItem from "./CollectionItem";
import BottomBar from "../navigation/BottomBar";
import { Helmet } from "react-helmet";

const CategoryCollections = () => {
	const [cookies] = useCookies(["userData"]);
	const [isLoading, setIsLoading] = useState(true);
	const [collections, setCollections] = useState([]);
	const { category } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		function getData() {
			if (
				cookies.userData != undefined &&
				cookies.userData.user !== undefined
			) {
				axios
					.post(
						`${requests.collections.getByCategory}/${cookies.userData.user._id}`,
						{
							category: String(category).toUpperCase(),
						},
						{
							headers: {
								Authorization: `Bearer ${String(cookies.userData.token)}`,
							},
						}
					)
					.then((sync) => sync.data)
					.then((data) => {
						setIsLoading(false);
						setCollections(data);
					})
					.catch((err) => {
						alert(err.response.data.error);
					});
			} else {
				navigate("/auth", { replace: true });
			}
		}
		getData();
	}, [category]);

	const middleContent =
		collections.length > 0 ? (
			collections.map((collection) => {
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
			<div className="no-collection-in-this-category-text">
				Sorry no collections in this category.
			</div>
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
				<title>{category}</title>
			</Helmet>
			<div class="sidebar-">
				<Sidebar />
			</div>
			<div class="middle-content" style={{ padding: "0px" }}>
				<div class="stars-text">{category}</div>
				<div>{isLoading ? loading : middleContent}</div>
			</div>

			<div class="end-content">
				<SideExplore />
			</div>
			<div class="bottom-bar">
				<BottomBar select={1} />
			</div>
		</div>
	);
};

export default CategoryCollections;

import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../../css/Home.css";
import axios from "../../axios";
import requests from "../../requests";
import TopPicksItem from "./TopPicksItem";

const TopPicks = () => {
	const [cookies] = useCookies(["userData"]);
	const navigate = useNavigate();
	const [collections, setCollections] = useState([]);

	useEffect(() => {
		function getData() {
			if (
				cookies.userData != undefined &&
				cookies.userData.user !== undefined
			) {
				axios
					.get(
						`/${requests.collections.topPicks}/${cookies.userData.user._id}`,
						{
							headers: {
								Authorization: `Bearer ${String(cookies.userData.token)}`,
							},
						}
					)
					.then((sync) => sync.data)
					.then((data) => {
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
	}, []);
	const middleContent = (
		<div style={{ width: "100%" }}>
			<div class="toppicks-dropdown">
				<div class="toppicks-section-title">TOP PICKS</div>
			</div>
			<div>
				{collections.map((collection) => {
					if (collection.links.length > 0)
						return (
							<TopPicksItem key={collection._id} collection={collection} />
						);
				})}
			</div>
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
		<div class="toppicks-container">
			{collections.length == 0 ? loading : middleContent}
		</div>
	);
};

export default TopPicks;

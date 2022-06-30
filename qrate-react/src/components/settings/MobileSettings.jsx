import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import requests from "../../requests";
import Settings from "./Settings";

const MobileSettings = () => {
	const collectionInit = {
		category: "",
		links: [],
		name: "",
		stars: [],
		tags: "",
		user: {
			name: "",
			_id: "",
		},
		visibility: "",
		_id: "",
	};

	const [cookies] = useCookies(["userData"]);
	const [collection, setCollection] = useState(collectionInit);
	const [isLoading, setIsLoading] = useState(true);
	var { collectionId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		function getData() {
			if (cookies.userData.user !== undefined) {
				axios
					.get(
						`${requests.collections.collection}/${cookies.userData.user._id}/${collectionId}`,
						{
							headers: {
								Authorization: `Bearer ${String(cookies.userData.token)}`,
							},
						}
					)
					.then((sync) => sync.data)
					.then((data) => {
						setIsLoading(false);
						if (String(cookies.userData.user._id) === String(data.user._id)) {
							setCollection(data);
						} else {
							navigate(-1, { replace: true });
							alert(
								"You are not authorized to change settings of this collection"
							);
						}
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

	const content = <Settings collection={collection} />;

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

	return <div>{isLoading ? loading : content}</div>;
};

export default MobileSettings;

import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import Collections from "../collections/Collections";
import Sidebar from "../navigation/Sidebar";
import SideExplore from "../utils/SideExplore";
import BottomBar from "../navigation/BottomBar";

import "../../css/Home.css";

import "../../css/BaseDialog.css";
import { Helmet } from "react-helmet";

const Home = () => {
	const [cookies] = useCookies(["userData"]);
	const navigate = useNavigate();

	useEffect(() => {
		function getData() {
			if (
				cookies.userData != undefined &&
				cookies.userData.user !== undefined
			) {
			} else {
				navigate("/auth", { replace: true });
			}
		}
		getData();
	}, []);

	return (
		<div class="container">
			<div class="sidebar-">
				<Sidebar select={0} />
			</div>
			<div class="middle-content">
				<Collections />
			</div>

			<div class="end-content">
				<SideExplore />
			</div>
			<div class="bottom-bar">
				<BottomBar select={0} />
			</div>
			<Helmet>
				<title>Home</title>
			</Helmet>
		</div>
	);
};

export default Home;

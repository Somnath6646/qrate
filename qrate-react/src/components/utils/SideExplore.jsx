import React from "react";
import { useEffect, useState } from "react";
import "../../css/SideExplore.css";
import ExploreChip from "../explore/ExploreChip";
import axios from "../../axios";
import requests from "../../requests";
import { useNavigate } from "react-router-dom";
import TopPicks from "./TopPicks";

const SideExplore = () => {
	const [categories, setCatgories] = useState([]);
	var navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`${requests.collections.getCategories}`)
			.then((sync) => sync.data)
			.then((data) => {
				setCatgories(data.categories);
			})
			.catch((err) => {
				alert(err.response.data.error);
			});
	}, []);

	return (
		<div class="side-explore">
			<div class="side-explore-header">
				<div
					class="search-"
					onClick={() => {
						navigate("/explore");
					}}
				>
					<svg
						class="search-icon"
						width="30"
						height="29"
						viewBox="0 0 30 29"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M18.0207 18.611C14.859 21.1433 10.2309 20.944 7.29997 18.0131C4.15522 14.8683 4.15522 9.76967 7.29997 6.62492C10.4447 3.48017 15.5434 3.48017 18.6881 6.62492C21.619 9.55582 21.8183 14.1839 19.286 17.3456L25.4366 23.4962C25.786 23.8456 25.786 24.4121 25.4366 24.7616C25.0872 25.111 24.5207 25.111 24.1713 24.7616L18.0207 18.611ZM8.56532 16.7477C6.1194 14.3018 6.1194 10.3362 8.56532 7.89027C11.0112 5.44435 14.9768 5.44435 17.4228 7.89027C19.8669 10.3344 19.8687 14.296 17.4281 16.7423C17.4263 16.7441 17.4245 16.7459 17.4227 16.7477C17.4209 16.7495 17.4192 16.7513 17.4174 16.7531C14.971 19.1936 11.0094 19.1918 8.56532 16.7477Z"
							fill="#B3B3B3"
						/>
					</svg>
					<input
						class="search-in-community"
						type="text"
						placeholder="Search in community"
					/>
				</div>
				<div class="category-list">
					<div class="category-row">
						{categories.map((category) => {
							return (
								<ExploreChip
									explore={{
										title:
											category.charAt(0) + category.substring(1).toLowerCase(),
									}}
								/>
							);
						})}
					</div>
				</div>
				<TopPicks />
			</div>
		</div>
	);
};

export default SideExplore;

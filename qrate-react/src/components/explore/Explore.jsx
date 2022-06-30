import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import Sidebar from "../navigation/Sidebar";
import BottomBar from "../navigation/BottomBar";

import axios from "../../axios";
import requests from "../../requests";
import "../../css/Explore.css";
import "../../css/Home.css";
import ExploreChip from "./ExploreChip";
import CollectionItem from "../collections/CollectionItem";
import LinkItem from "../utils/LinkItem";
import LoadingDialog from "../dialogs/LoadingDialog";
import { Helmet } from "react-helmet";
import { NoCollectionContent } from "../collections/NoCollectionContent";

const Explore = () => {
	const [cookies] = useCookies(["userData"]);
	const [searchQuery, setSearchQuery] = useState("");
	const [collections, setCollections] = useState([]);
	const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const navigate = useNavigate();

	const [categories, setCatgories] = useState([]);

	useEffect(() => {
		function getData() {
			if (cookies.userData.user !== undefined) {
				axios
					.get(`${requests.collections.getCategories}`)
					.then((sync) => sync.data)
					.then((data) => {
						setCatgories(data.categories);
					})
					.catch((err) => {
						setIsLoadingDialogOpen(false);
						alert(err.response.data.error);
					});
			} else {
				navigate("/auth", { replace: true });
			}
		}
		getData();
	}, []);

	const search = (query) => {
		setIsLoadingDialogOpen(true);
		axios
			.get(`${requests.search.search}${query}`, {
				headers: {
					Authorization: `Bearer ${cookies.userData.token}`,
				},
			})
			.then((sync) => sync.data)
			.then((data) => {
				const links = data.resCollection;
				setCollections(links);
				setIsLoadingDialogOpen(false);
				setHasSearched(true);
			})
			.catch((err) => {
				setIsLoadingDialogOpen(false);
				alert(err.response.data.error);
			});
	};

	const noResult = hasSearched ? (
		<NoCollectionContent
			title="Sorry 😞 we could not find any collections based on your search. Please try again with something
		different."
		></NoCollectionContent>
	) : null;

	return (
		<div class="container">
			<Helmet>
				<title>Explore</title>
			</Helmet>
			<div class="sidebar-">
				<Sidebar select={1} />
			</div>
			<div class="middle-content-without-side-explore">
				<div class="search-explore">
					<div class="search-input">
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
							type="text"
							id="simple-search"
							class="search-in-community"
							placeholder="Search in community"
							required
							autoComplete="off"
							onChange={(event) => {
								const value = event.target.value;
								setSearchQuery(value);
							}}
						/>
					</div>

					<div
						class="search-button"
						onClick={() => {
							search(searchQuery);
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
								fill="#ffffff"
							/>
						</svg>
					</div>
				</div>
				<div class="category-container">
					<div class="column-1" style={{ marginTop: "16px" }}>
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
				<div>
					{collections.length > 0
						? collections.map((collection) => {
								if (collection.name != "")
									return (
										<CollectionItem
											key={collection._id}
											collection={collection}
											name={true}
										/>
									);
								else {
									return <LinkItem link={collection.links[0]} />;
								}
						  })
						: noResult}
				</div>
			</div>
			<div class="bottom-bar">
				<BottomBar select={1} />
			</div>
			<LoadingDialog isOpen={isLoadingDialogOpen} />
		</div>
	);
};

export default Explore;

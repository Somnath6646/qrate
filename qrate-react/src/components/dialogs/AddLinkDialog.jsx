import React from "react";
import { useState, useEffect } from "react";
import "../../css/AddLinkDialog.css";
import "../../css/BaseDialog.css";

import AddLinkDialogCollection from "./AddLinkDialogCollection";
import axios from "../../axios";
import requests from "../../requests";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AddLinkDialog = ({
	isOpen,
	saveDirectly,
	createCollectionAndSave,
	saveInCollection,
	closeDialog,
}) => {
	const [cookies] = useCookies(["userData"]);
	const navigate = useNavigate();
	const [collections, setCollections] = useState([]);
	const [newColName, setNewColName] = useState("");
	const [filterCol, setFilterCol] = useState("");

	useEffect(() => {
		function getData() {
			if (
				cookies.userData != undefined &&
				cookies.userData.user !== undefined
			) {
				axios
					.get(
						`${requests.collections.nameAndId}/${cookies.userData.user._id}`,
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

	var loader = <div class="loader"></div>;

	var dialog = (
		<div
			class="base-dialog"
			onClick={() => {
				closeDialog();
			}}
		>
			<div
				class="dialog-container"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div class="dialog-content">
					<div class="select-a-collection-section">
						<div class="select-collection-main">
							<div class="select-a-collection-title">Select a collection</div>
							<div class="input-and-option-container">
								<input
									type="text"
									id="simple-search"
									class="name-input"
									placeholder="Type collection name to search"
									required
									autoComplete="off"
									onChange={(event) => {
										setFilterCol(event.target.value);
									}}
								/>

								<div class="collection-name-list">
									{collections
										.filter((c) =>
											String(c.name)
												.toLowerCase()
												.includes(filterCol.toLowerCase())
										)
										.map((collection) => {
											if (collection.name != "")
												return (
													<AddLinkDialogCollection
														collection={collection}
														saveInCollection={saveInCollection}
													/>
												);
										})}
								</div>
							</div>
						</div>
						<div class="or-divider">
							<div class="or">or</div>
						</div>
					</div>
					<div class="create-collection-section">
						<div class="create-collection-main">
							<div class="create-collection-title">Create a collection</div>
							<div class="input-and-save-container">
								<input
									type="text"
									id="simple-search"
									class="name-input2"
									placeholder="Type a name to create collection"
									required
									autoComplete="off"
									onChange={(event) => {
										const value = event.target.value;
										setNewColName(value);
									}}
								/>
								<div
									class="save-button-dialog"
									onClick={() => {
										if (newColName.length > 0) {
											createCollectionAndSave(newColName);
										}
									}}
								>
									<svg
										class="save-1-dialog"
										width="23"
										height="23"
										viewBox="0 0 23 23"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M18.2935 20.0266H5.11634C4.61708 20.0266 4.13827 19.8282 3.78524 19.4752C3.43222 19.1222 3.23389 18.6434 3.23389 18.1441V4.96693C3.23389 4.46767 3.43222 3.98886 3.78524 3.63583C4.13827 3.2828 4.61708 3.08447 5.11634 3.08447H15.4698L20.176 7.79061V18.1441C20.176 18.6434 19.9776 19.1222 19.6246 19.4752C19.2716 19.8282 18.7928 20.0266 18.2935 20.0266Z"
											stroke={newColName.length > 0 ? "#1ca1f1" : "#B9B9B9"}
											stroke-width="1.88245"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M16.4115 20.0264V12.4966H6.99927V20.0264"
											stroke={newColName.length > 0 ? "#1ca1f1" : "#B9B9B9"}
											stroke-width="1.88245"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M6.99927 3.08447V7.79061H14.5291"
											stroke={newColName.length > 0 ? "#1ca1f1" : "#B9B9B9"}
											stroke-width="1.88245"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
							</div>
						</div>
						<div class="or-section">
							<div class="or2">or</div>
						</div>
					</div>
					<div
						class="save-directly-button"
						onClick={() => {
							saveDirectly();
						}}
					>
						<div class="save-directly-content">
							<div class="icon-dialog">
								<svg
									class="save-12"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M18.5904 20.8001H5.21455C4.70777 20.8001 4.22174 20.5988 3.86338 20.2404C3.50503 19.8821 3.30371 19.3961 3.30371 18.8893V5.51338C3.30371 5.00659 3.50503 4.52056 3.86338 4.16221C4.22174 3.80386 4.70777 3.60254 5.21455 3.60254H15.7242L20.5013 8.37964V18.8893C20.5013 19.3961 20.3 19.8821 19.9416 20.2404C19.5833 20.5988 19.0972 20.8001 18.5904 20.8001Z"
										stroke="white"
										stroke-width="1.91084"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M16.6799 20.8001V13.1567H7.12573V20.8001"
										stroke="white"
										stroke-width="1.91084"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M7.12573 3.60254V8.37964H14.7691"
										stroke="white"
										stroke-width="1.91084"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<div class="save-directly-button-text">Save directly</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	if (!isOpen) dialog = null;

	return <div>{dialog}</div>;
};

export default AddLinkDialog;

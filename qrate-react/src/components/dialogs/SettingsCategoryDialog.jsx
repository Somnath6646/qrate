import React from "react";
import { useEffect } from "react";
import SettingsDialogItem from "./SettingsDialogItem";
import axios from "../../axios";
import requests from "../../requests";
import { useState } from "react";
import "../../css/BaseDialog.css";
import "../../css/SettingsDropdown.css";

const SettingsCategoryDialog = ({ isOpen, closeDialog, changeCategory }) => {
	const [categories, setCatgories] = useState([]);

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

	var dialog = (
		<div
			className="base-dialog"
			onClick={() => {
				closeDialog();
			}}
		>
			<div
				class="delete-tag-dialog-container"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="delete-dialog-title-text">Category</div>
				<div class="collection-name-list">
					{categories.map((category) => {
						return (
							<SettingsDialogItem
								value={category.charAt(0) + category.substring(1).toLowerCase()}
								click={changeCategory}
							/>
						);
					})}
				</div>
				<div class="close-dialog-button">
					<div
						class="close-dialog-text"
						onClick={() => {
							closeDialog();
						}}
					>
						Close
					</div>
				</div>
			</div>
		</div>
	);

	if (!isOpen) dialog = null;

	return <div>{dialog}</div>;
};

export default SettingsCategoryDialog;

import React, { useState } from "react";
import "../../css/Settings.css";
import SettingsVisibilityDialog from "../dialogs/SettingsVisibilityDialog";
import axios from "../../axios";
import requests from "../../requests";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import SettingsCategoryDialog from "../dialogs/SettingsCategoryDialog";
import SettingsTag from "./SettingsTag";
import AddTagDialog from "../dialogs/AddTagDialog";
import YesNoDialog from "../dialogs/YesNoDialog";
import LoadingDialog from "../dialogs/LoadingDialog";

const Settings = ({ collection }) => {
	const [cookies] = useCookies(["userData"]);
	const { collectionId } = useParams();
	const [isVisibilityDialogOpen, setIsVisibilityDialogOpen] = useState(false);
	const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
	const [isAddTagDialogOpen, setIsAddTagDialogOpen] = useState(false);
	const [isYesNoDialogOpen, setIsYesNoDialogOpen] = useState(false);
	const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false);
	const [tagToDelete, setTagToDelete] = useState("");

	var tagsArr = String(collection.tags).split(" ");

	const handleCloseVisibilityDialog = () => {
		setIsVisibilityDialogOpen(false);
	};
	const handleOpenVisibilityDialog = () => {
		setIsVisibilityDialogOpen(!isVisibilityDialogOpen);
	};
	const handleVisibilityChange = (v) => {
		setIsLoadingDialogOpen(true);
		setIsVisibilityDialogOpen(false);
		axios
			.post(
				`${requests.collections.changeVisibility}/${collectionId}/${cookies.userData.user._id}`,
				{
					visibility: v,
				},
				{
					headers: {
						Authorization: `Bearer ${String(cookies.userData.token)}`,
					},
				}
			)
			.then((sync) => sync.data)
			.then((data) => {
				collection.visibility = data.newRescollection.visibility;
				setIsLoadingDialogOpen(false);
			});
	};

	const handleCloseCategoryDialog = () => {
		setIsCategoryDialogOpen(false);
	};
	const handleOpenCategoryDialog = () => {
		setIsCategoryDialogOpen(!isCategoryDialogOpen);
	};
	const handleCategoryChange = (c) => {
		setIsLoadingDialogOpen(true);
		setIsCategoryDialogOpen(false);
		axios
			.post(
				`${requests.collections.changeCategory}/${collectionId}/${cookies.userData.user._id}`,
				{
					category: c,
				},
				{
					headers: {
						Authorization: `Bearer ${String(cookies.userData.token)}`,
					},
				}
			)
			.then((sync) => sync.data)
			.then((data) => {
				collection.category = data.newRescollection.category;
				setIsLoadingDialogOpen(false);
			});
	};

	const handleCloseAddTagDialog = () => {
		setIsAddTagDialogOpen(false);
	};
	const handleOpenAddTagDialog = () => {
		setIsAddTagDialogOpen(!isAddTagDialogOpen);
	};
	const handleAddTagChange = (t) => {
		tagsArr.push(t);
		var tags = tagsArr.join(" ");

		setIsLoadingDialogOpen(true);
		setIsAddTagDialogOpen(false);

		axios
			.post(
				`${requests.collections.changeTags}/${collectionId}/${cookies.userData.user._id}`,
				{
					tags: tags,
				},
				{
					headers: {
						Authorization: `Bearer ${String(cookies.userData.token)}`,
					},
				}
			)
			.then((sync) => sync.data)
			.then((data) => {
				collection.tags = data.newRescollection.tags;
				setIsLoadingDialogOpen(false);
			});
	};
	const handleDeleteTagChange = (t) => {
		setTagToDelete(t);
		handleOpenYesNoDialog();
	};
	const deleteTag = (t) => {
		const index = tagsArr.indexOf(t);
		if (index > -1) {
			tagsArr.splice(index, 1);
		}
		var tags = tagsArr.join(" ");
		setIsLoadingDialogOpen(true);
		setIsYesNoDialogOpen(false);

		axios
			.post(
				`${requests.collections.changeTags}/${collectionId}/${cookies.userData.user._id}`,
				{
					tags: tags,
				},
				{
					headers: {
						Authorization: `Bearer ${String(cookies.userData.token)}`,
					},
				}
			)
			.then((sync) => sync.data)
			.then((data) => {
				collection.tags = data.newRescollection.tags;
				setIsLoadingDialogOpen(false);
			});
	};
	const handleCloseYesNoDialog = () => {
		setIsYesNoDialogOpen(false);
	};
	const handleOpenYesNoDialog = () => {
		setIsYesNoDialogOpen(!isYesNoDialogOpen);
	};
	const handleYesAction = () => {
		deleteTag(tagToDelete);
		return true;
	};

	return (
		<div class="sidesettings">
			<div class="settings-container">
				<div class="settings-title-text">Settings</div>
				<div class="change-visibility-section">
					<div class="change-visibility-main-container">
						<div class="settings-title">Change Visibility</div>
						<div
							class="settings-dialog"
							onClick={() => {
								handleOpenVisibilityDialog();
							}}
						>
							<div class="settings-dialog-content">
								<div class="settings-dialog-text">
									{collection.visibility.charAt(0) +
										collection.visibility.substring(1).toLowerCase()}
								</div>
								<svg
									class="arrow-down-icon"
									width="9"
									height="6"
									viewBox="0 0 9 6"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M8.77312 0.847436C9.03259 1.10691 9.03259 1.52759 8.77312 1.78707L5.22956 5.33063C4.97008 5.5901 4.5494 5.5901 4.28993 5.33063L0.746361 1.78707C0.48689 1.52759 0.48689 1.10691 0.746361 0.847436C1.00583 0.587964 1.42652 0.587964 1.68599 0.847436L4.75974 3.92119L7.83349 0.847436C8.09296 0.587964 8.51365 0.587964 8.77312 0.847436Z"
										fill="white"
									/>
								</svg>
							</div>
						</div>
					</div>
					<div class="settings-description">
						When the visibility is set to public then it means that your
						collections could searched, followed and seen by anyone
					</div>
				</div>
				<div class="change-visibility-section">
					<div class="change-visibility-main-container">
						<div class="settings-title">Change Category</div>
						<div
							class="settings-dialog"
							onClick={() => {
								handleOpenCategoryDialog();
							}}
						>
							<div class="settings-dialog-content">
								<div class="settings-dialog-text">
									{collection.category.charAt(0) +
										collection.category.substring(1).toLowerCase()}
								</div>
								<svg
									class="arrow-down-icon"
									width="9"
									height="6"
									viewBox="0 0 9 6"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M8.77312 0.847436C9.03259 1.10691 9.03259 1.52759 8.77312 1.78707L5.22956 5.33063C4.97008 5.5901 4.5494 5.5901 4.28993 5.33063L0.746361 1.78707C0.48689 1.52759 0.48689 1.10691 0.746361 0.847436C1.00583 0.587964 1.42652 0.587964 1.68599 0.847436L4.75974 3.92119L7.83349 0.847436C8.09296 0.587964 8.51365 0.587964 8.77312 0.847436Z"
										fill="white"
									/>
								</svg>
							</div>
						</div>
					</div>
					<div class="settings-description">
						The Category you set here will be used for filtering for you when
						the collection is private. when the collection is public, other
						users can find this collection easily{" "}
					</div>
				</div>
				<div class="change-tags-section">
					<div class="change-tags-title">Change Tags</div>
					<div class="tags-list">
						<div class="tags-row">
							{tagsArr.map((tag) => {
								return tag != "" ? (
									<SettingsTag
										tag={String(tag)}
										deleteTag={handleDeleteTagChange}
									/>
								) : null;
							})}
							<li
								class="add-tag-button"
								onClick={() => {
									handleOpenAddTagDialog();
								}}
							>
								<svg
									class="icon-add"
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M11.2705 10.8857H4.13232M11.2705 18.0238V10.8857V18.0238ZM11.2705 10.8857V3.74756V10.8857ZM11.2705 10.8857H18.4086H11.2705Z"
										stroke="#C9C6C6"
										stroke-width="1.78453"
										stroke-linecap="round"
									/>
								</svg>
							</li>
						</div>
					</div>
				</div>

				<SettingsVisibilityDialog
					isOpen={isVisibilityDialogOpen}
					closeDialog={handleCloseVisibilityDialog}
					changeVisibility={handleVisibilityChange}
				/>
				<SettingsCategoryDialog
					isOpen={isCategoryDialogOpen}
					closeDialog={handleCloseCategoryDialog}
					changeCategory={handleCategoryChange}
				/>
				<AddTagDialog
					isOpen={isAddTagDialogOpen}
					closeDialog={handleCloseAddTagDialog}
					addTag={handleAddTagChange}
				/>
				<YesNoDialog
					isOpen={isYesNoDialogOpen}
					closeDialog={handleCloseYesNoDialog}
					action={handleYesAction}
					message={"Do you want to delete this tag?"}
				/>
				<LoadingDialog isOpen={isLoadingDialogOpen} />
			</div>
		</div>
	);
};

export default Settings;

import React from "react";
import SettingsDialogItem from "./SettingsDialogItem";

const SettingsVisibilityDialog = ({
	isOpen,
	closeDialog,
	changeVisibility,
}) => {
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
				<div className="title">Visibility</div>
				<div class="collection-name-list">
					<SettingsDialogItem value={"Private"} click={changeVisibility} />
					<SettingsDialogItem value={"Public"} click={changeVisibility} />
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

export default SettingsVisibilityDialog;

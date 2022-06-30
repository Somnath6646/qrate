import React from "react";
import { useState } from "react";
import "../../css/AddTagDialog.css";
import "../../css/BaseDialog.css";

const AddTagDialog = ({ isOpen, addTag, closeDialog }) => {
	const [tag, setTag] = useState("");
	var dialog = (
		<div
			className="base-dialog"
			onClick={() => {
				closeDialog();
			}}
		>
			<div
				class="add-tag-dialog-container"
				style={{
					maxWidth: "100%",
					margin: "0 auto",
					position: "fixed",
					left: "50%",
					top: "50%",
					transform: "translate(-50%,-50%)",
					zIndex: "999",
					padding: "10px 20px 40px",
					display: "flex",
					flexDirection: "column",
				}}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div class="add-tag-dialog-content">
					<div class="upper-container">
						<div class="add-tags">Add Tags</div>
						<input
							type="text"
							id="simple-search"
							class="taginput"
							placeholder="Write tag here ...."
							required
							onChange={(event) => {
								var value = event.target.value;
								setTag(value);
							}}
						/>
					</div>
					<div
						class="done-button"
						onClick={() => {
							addTag(tag);
						}}
					>
						<div class="done">Done</div>
					</div>
				</div>
			</div>
		</div>
	);

	if (!isOpen) dialog = null;

	return <div>{dialog}</div>;
};

export default AddTagDialog;

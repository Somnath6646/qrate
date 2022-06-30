import React from "react";
import "../../css/LoadingDialog.css";
import "../../css/BaseDialog.css";

const LoadingDialog = ({ isOpen, message, closeDialog, action }) => {
	var dialog = (
		<div class="base-dialog">
			<div class="loading-container ">
				<div class="loading-content">
					<div className="loader"></div>
				</div>
			</div>
		</div>
	);

	if (!isOpen) dialog = null;

	return <div>{dialog}</div>;
};

export default LoadingDialog;

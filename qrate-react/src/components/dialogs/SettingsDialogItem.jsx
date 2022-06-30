import React from "react";
import "../../css/Settings.css";
import "../../css/SettingsDropdown.css";

const SettingsDialogItem = ({ value, click }) => {
	return (
		<div
			class="option-container2"
			onClick={() => click(String(value).toUpperCase())}
		>
			<div class="option-text">{value}</div>
		</div>
	);
};

export default SettingsDialogItem;

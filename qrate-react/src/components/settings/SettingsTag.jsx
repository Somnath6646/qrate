import React from "react";
import "../../css/Settings.css";

const SettingsTag = ({ tag, deleteTag }) => {
	return (
		<li class="tag">
			<div class="tag-text">{tag}</div>
			<svg
				class="cross-icon"
				width="9"
				height="8"
				viewBox="0 0 9 8"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				onClick={() => {
					deleteTag(tag);
				}}
			>
				<path
					d="M0.667969 0.121582L8.2317 7.68532M8.2317 0.121582L0.667969 7.68532L8.2317 0.121582Z"
					stroke="#A9A4A4"
					stroke-width="1.74548"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</li>
	);
};

export default SettingsTag;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/SideExplore.css";

const ExploreChip = ({ explore }) => {
	var navigate = useNavigate();
	return (
		<li
			class="category"
			onClick={() => {
				navigate(`/${explore.title}/collections`);
			}}
		>
			<div class="category-text">{explore.title}</div>
		</li>
	);
};

export default ExploreChip;

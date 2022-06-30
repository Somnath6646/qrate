import React, { useState } from "react";
import "../../css/Star.css";

const Star = ({ fill, handleStar, count }) => {
	const [isFilled, setIsFilled] = useState(fill);
	return (
		<div
			class="star"
			onClick={() => {
				setIsFilled(!isFilled);
				handleStar();
			}}
		>
			<div class="star-content">
				<div class="star-text">{count}</div>
				<svg
					class="star-icon"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill={isFilled ? "white" : "none"}
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12.436 6.85313L12.6686 7.32473L13.189 7.40035L18.6382 8.19231L14.6949 12.0369L14.3184 12.4039L14.4074 12.9221L15.3386 18.3487L10.4653 15.7866L9.99998 15.5419L9.53462 15.7866L4.66134 18.3487L5.59261 12.9221L5.68153 12.4039L5.3051 12.0369L1.36174 8.19231L6.81099 7.40035L7.33138 7.32473L7.564 6.85313L9.99998 1.91463L12.436 6.85313Z"
						stroke="white"
						stroke-width="2"
					/>
				</svg>
			</div>
		</div>
	);
};

export default Star;

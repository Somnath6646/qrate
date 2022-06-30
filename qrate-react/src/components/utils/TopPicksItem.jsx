import React from "react";
import { Link } from "react-router-dom";
import "../../css/TopPicksCollection.css";

const TopPicksItem = ({ collection }) => {
	const setImage = () => {
		if (collection.links[collection.links.length - 1].image)
			return (
				<img
					class="toppicks-image-2"
					src={collection.links[collection.links.length - 1].image}
					alt=""
				/>
			);
		else <div></div>;
	};
	return (
		<div>
			<Link
				to={"/collection/" + collection._id}
				state={{ collections: collection }}
				class="toppicks-collection"
			>
				<div class="toppicks-data">
					<div class="toppicks-overlinetext">{collection.user.name}</div>
					<div class="toppicks-title">{collection.name}</div>
					<div class="toppicks-totalitemcount">
						<div class="toppicks-collection-chip">
							<div class="toppicks-count-text">
								{collection.links.length} resource items
							</div>
						</div>
					</div>
				</div>
				{setImage()}
			</Link>
		</div>
	);
};

export default TopPicksItem;

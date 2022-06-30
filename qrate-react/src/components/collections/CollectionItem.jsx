import React from "react";
import { Link } from "react-router-dom";
import "../../css/Collection.css";

const CollectionItem = ({ collection, openDialog, key, name }) => {
	const showName = name != undefined ? true : false;
	const setImage = () => {
		if (collection.links[collection.links.length - 1].image)
			return (
				<img
					class="image-2"
					src={collection.links[collection.links.length - 1].image}
					alt=""
				/>
			);
		else <div></div>;
	};
	return (
		<div key={key}>
			<Link
				to={"/collection/" + collection._id}
				state={{ collections: collection }}
				class="collection"
				onContextMenu={(event) => {
					event.preventDefault();
					openDialog(collection);
				}}
			>
				<div class="data">
					<div class="overlinetext">
						{collection.category
							? collection.category.charAt(0) +
							  collection.category.substring(1).toLowerCase()
							: "Collection"}
					</div>
					<div class="title">{collection.name}</div>
					<div class="totalitemcount">
						{showName == true &&
						collection.user !== undefined &&
						collection.user.name !== undefined ? (
							<div class="overlinetext">{"by " + collection.user.name}</div>
						) : null}
						<div class="collection-chip">
							<div class="count-text">
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

export default CollectionItem;

import React from "react";
import "../../css/Collection.css";

const LinkItem = ({ collection, openDialog }) => {
	var link = collection.links !== undefined ? collection.links[0] : collection;
	var descr = link.description !== undefined ? link.description : "";

	const setImage = () => {
		if (link.image) return <img class="image-2" src={link.image} alt="" />;
		else <div></div>;
	};

	const setBottomData = () => {
		if (link.type.toLowerCase() == "medium") {
			return (
				<div>
					<div class="author-time-chip">
						<div class="author-time-text">
							by {link.author}
							<span style={{ marginLeft: "10px", marginRight: "4px" }}>
								{" "}
								•{" "}
							</span>{" "}
							{link.extraData}
						</div>
					</div>
				</div>
			);
		} else {
			return <div class="description">{descr}</div>;
		}
	};

	const setOverlineData = () => {
		if (link.type.toLowerCase() == "medium") {
			return link.publisher;
		} else {
			return author ? link.author : link.publisher;
		}
	};

	var favicon = link.favicon;
	var author = link.author;

	return (
		<div
			key={link._id}
			onContextMenu={(event) => {
				event.preventDefault();
				openDialog(collection);
			}}
		>
			<a href={link.url} target="_blank" class="collection">
				<div class="data">
					<div class="overlinetext">
						{favicon ? (
							<img
								src={link.favicon}
								width="15px"
								height="15px"
								class="favicon"
							/>
						) : null}
						{setOverlineData()}
					</div>
					<div class="title">{link.title !== "" ? link.title : link.url}</div>
					<div class="totalitemcount">{setBottomData()}</div>
				</div>
				{setImage()}
			</a>
		</div>
	);
};

export default LinkItem;

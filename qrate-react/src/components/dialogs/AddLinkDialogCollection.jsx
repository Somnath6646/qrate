import React from "react";
import "../../css/AddLinkDialog.css";

const AddLinkDialogCollection = ({ collection, saveInCollection }) => {
	return (
		<div
			class="namecontainer"
			onClick={() => {
				saveInCollection(collection._id);
			}}
		>
			<div class="dialog-collection-name-text">{collection.name}</div>
		</div>
	);
};

export default AddLinkDialogCollection;

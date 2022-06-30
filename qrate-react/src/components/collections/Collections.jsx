import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import requests from "../../requests";
import CollectionItem from "./CollectionItem";
import LinkItem from "../utils/LinkItem";
import LinkInput from "../utils/LinkInput";
import AddLinkDialog from "../dialogs/AddLinkDialog";
import LoadingDialog from "../dialogs/LoadingDialog";
import YesNoDialog from "../dialogs/YesNoDialog";
import { SearchInCollection } from "../utils/SearchInCollection";
import { NoCollectionContent } from "./NoCollectionContent";

const Collections = () => {
	const [cookies] = useCookies(["userData"]);
	const [collections, setCollections] = useState([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false);
	const [link, setLink] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [filterCol, setFilterCol] = useState("");
	const [isYesNoDialogOpen, setIsYesNoDialogOpen] = useState(false);
	const [colToDel, setColToDel] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		function getData() {
			if (
				cookies.userData != undefined &&
				cookies.userData.user !== undefined
			) {
				axios
					.get(`${requests.collections.user}/${cookies.userData.user._id}`, {
						headers: {
							Authorization: `Bearer ${cookies.userData.token}`,
						},
					})
					.then((sync) => sync.data)
					.then((data) => {
						const links = data;
						links.reverse();
						setCollections(links);
						setIsLoading(false);
					})
					.catch((err) => {
						setIsLoading(false);
						setIsLoadingDialogOpen(false);
						alert(err.response.data.error);
					});
			} else {
				navigate("/auth", { replace: true });
			}
		}
		getData();
	}, []);

	const handleLinkInput = (l) => {
		setLink(l);
		setIsDialogOpen(!isDialogOpen);
	};

	const handleSaveDirectly = () => {
		setIsLoadingDialogOpen(true);
		setIsDialogOpen(false);

		axios
			.post(
				`${requests.collections.new}/${cookies.userData.user._id}`,
				{
					rescollection: {
						name: "",
						link: link,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${String(cookies.userData.token)}`,
					},
				}
			)
			.then((sync) => sync.data)
			.then((data) => {
				var cols = collections;
				cols.splice(0, 0, data);
				setCollections(cols);
				setIsLoadingDialogOpen(false);
				return false;
			})
			.catch((err) => {
				setIsLoadingDialogOpen(false);
				alert(err.response.data.error);
			});
	};

	const replaceCollection = (cols, col) =>
		cols && cols.map((c) => (c._id === col._id ? col : c));

	const handleSaveInCollection = (collectionId) => {
		setIsLoadingDialogOpen(true);
		setIsDialogOpen(false);
		axios
			.post(
				`${requests.collections.update}/${collectionId}/${cookies.userData.user._id}`,
				{
					rescollection: {
						link: link,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${String(cookies.userData.token)}`,
					},
				}
			)
			.then((sync) => sync.data)
			.then((data) => {
				const nCol = data.newRescollection;
				var cols = replaceCollection(collections, nCol);
				setCollections(cols);
				setIsDialogOpen(false);
				setIsLoadingDialogOpen(false);
				return false;
			})
			.catch((err) => {
				setIsLoadingDialogOpen(false);
				alert(err.response.data.error);
			});
	};

	const handleCreateCollectionAndSave = (collectionName) => {
		setIsLoadingDialogOpen(true);
		setIsDialogOpen(false);
		axios
			.post(
				`${requests.collections.new}/${cookies.userData.user._id}`,
				{
					rescollection: {
						name: collectionName,
						link: link,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${String(cookies.userData.token)}`,
					},
				}
			)
			.then((sync) => sync.data)
			.then((data) => {
				var cols = collections;
				cols.splice(0, 0, data);
				setCollections(cols);
				setIsDialogOpen(false);
				setIsLoadingDialogOpen(false);
				return false;
			})
			.catch((err) => {
				setIsLoadingDialogOpen(false);
				alert(err.response.data.error);
			});
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
	};

	const handleCloseYesNoDialog = () => {
		setIsYesNoDialogOpen(false);
	};
	const handleOpenYesNoDialog = (col) => {
		setColToDel(col._id);
		setIsYesNoDialogOpen(!isYesNoDialogOpen);
	};
	const deleteCollection = () => {
		setIsYesNoDialogOpen(false);
		setIsLoadingDialogOpen(true);
		axios
			.delete(
				`${requests.collections.delete}/${colToDel}/${cookies.userData.user._id}`,
				{
					headers: {
						Authorization: `Bearer ${String(cookies.userData.token)}`,
					},
				}
			)
			.then((sync) => sync.data)
			.then((data) => {
				collections.splice(
					collections.findIndex((c) => c._id === colToDel),
					1
				);
				setIsLoadingDialogOpen(false);
			})
			.catch((err) => {
				setIsLoadingDialogOpen(false);
				alert(err.response.data.error);
			});
	};
	const handleYesAction = () => {
		deleteCollection();
		return true;
	};

	const content =
		collections.length > 0 ? (
			collections
				.filter((c) =>
					c.name != ""
						? String(c.name).toLowerCase().includes(filterCol.toLowerCase())
						: String(c.links[0].title)
								.toLowerCase()
								.includes(filterCol.toLowerCase())
				)
				.map((collection) => {
					if (collection.name != "")
						return (
							<CollectionItem
								key={collection._id}
								collection={collection}
								openDialog={handleOpenYesNoDialog}
							/>
						);
					else {
						return (
							<LinkItem
								collection={collection}
								openDialog={handleOpenYesNoDialog}
							/>
						);
					}
				})
		) : (
			<NoCollectionContent title="Hey 👋 you don’t have any collections saved up here.">
				<li>You can start by pasting the link above.</li>
				<li>
					If you’re looking for collections to learn you can search them from
					the explore page.
				</li>
				<li>You can also browse all the collections by their category.</li>
				<li> Star them to get their updates as new links are added</li>
			</NoCollectionContent>
		);

	const loading = (
		<div
			style={{
				maxWidth: "100%",
				height: "100%",
				margin: "auto auto",
				zIndex: "999",
				padding: "10px 20px 40px",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<div className="loader"></div>
		</div>
	);

	return (
		<div>
			<LinkInput linkInput={handleLinkInput} />

			<div class="dropdown">
				<div class="dropdown-text">Your Collections</div>
			</div>
			<div class="container-collection">
				<SearchInCollection setFilterCol={setFilterCol} />
				{isLoading ? loading : content}
			</div>
			<AddLinkDialog
				isOpen={isDialogOpen}
				saveDirectly={handleSaveDirectly}
				saveInCollection={handleSaveInCollection}
				createCollectionAndSave={handleCreateCollectionAndSave}
				closeDialog={handleCloseDialog}
				loading={false}
			/>
			<LoadingDialog isOpen={isLoadingDialogOpen} />

			<YesNoDialog
				isOpen={isYesNoDialogOpen}
				closeDialog={handleCloseYesNoDialog}
				action={handleYesAction}
				message={"Do you want to delete this collection?"}
			/>
		</div>
	);
};

export default Collections;

import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/Home.css";
import axios from "../../axios";
import requests from "../../requests";
import LinkItem from "../utils/LinkItem";
import Sidebar from "../navigation/Sidebar";
import LinkInput from "../utils/LinkInput";
import Settings from "../settings/Settings";
import SideExplore from "../utils/SideExplore";
import Star from "../star/Star";
import BottomBar from "../navigation/BottomBar";
import YesNoDialog from "../dialogs/YesNoDialog";
import LoadingDialog from "../dialogs/LoadingDialog";
import { Helmet } from "react-helmet";

const CollectionDetails = () => {
  const collectionInit = {
    category: "",
    links: [],
    name: "",
    stars: [],
    tags: "",
    user: {
      name: "",
      _id: "",
    },
    visibility: "",
    _id: "",
  };

  const [cookies] = useCookies(["userData"]);
  var { collectionId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [collection, setCollection] = useState(collectionInit);
  const [isYesNoDialogOpen, setIsYesNoDialogOpen] = useState(false);
  const [linkToDel, setLinkToDel] = useState("");
  const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false);
  useEffect(() => {
    function getData() {
      if (
        cookies.userData != undefined &&
        cookies.userData.user !== undefined
      ) {
        axios
          .get(
            `${requests.collections.collection}/${cookies.userData.user._id}/${collectionId}`,
            {
              headers: {
                Authorization: `Bearer ${String(cookies.userData.token)}`,
              },
            }
          )
          .then((sync) => sync.data)
          .then((data) => {
            var col = data;
            col.links.reverse();
            setUser(data.user);
            setCollection(col);
          })
          .catch((err) => {
            setIsLoadingDialogOpen(false);
            alert(err.response.data.error);
            navigate(-1);
          });
      } else {
        navigate("/auth", { replace: true });
      }
    }
    getData();
  }, [collectionId]);
  if (cookies.userData) {
    const handleUpdate = (link) => {
      setIsLoadingDialogOpen(true);
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
          var col = data.newRescollection;
          col.links.reverse();
          setCollection(col);
          setIsLoadingDialogOpen(false);
        })
        .catch((err) => {
          setIsLoadingDialogOpen(false);
          alert(err.response.data.error);
        });
    };

    const handleLinkInput = (l) => {
      handleUpdate(l);
    };

    const handleStar = () => {
      if (collection.stars.includes(cookies.userData.user._id)) {
        axios
          .get(
            `${requests.collection}/${cookies.userData.user._id}/${requests.collections.unstar}/${collection._id}`,
            {
              headers: {
                Authorization: `Bearer ${String(cookies.userData.token)}`,
              },
            }
          )
          .then((res) => res.data)
          .then((data) => {
            var col = data;
            col.links.reverse();
            setCollection(col);
          })
          .catch((err) => {
            setIsLoadingDialogOpen(false);
            alert(err.response.data.error);
          });
      } else {
        axios
          .get(
            `${requests.collection}/${cookies.userData.user._id}/${requests.collections.star}/${collection._id}`,
            {
              headers: {
                Authorization: `Bearer ${String(cookies.userData.token)}`,
              },
            }
          )
          .then((res) => res.data)
          .then((data) => {
            var col = data;
            col.links.reverse();
            setCollection(col);
          })
          .catch((err) => {
            setIsLoadingDialogOpen(false);
            alert(err.response.data.error);
          });
      }
    };

    const handleCloseYesNoDialog = () => {
      setIsYesNoDialogOpen(false);
    };
    const handleOpenYesNoDialog = (l) => {
      setLinkToDel(l._id);
      setIsYesNoDialogOpen(!isYesNoDialogOpen);
    };
    const deleteLink = () => {
      setIsYesNoDialogOpen(false);
      setIsLoadingDialogOpen(true);
      axios
        .post(
          `${requests.collections.deleteLink}/${collection._id}/${cookies.userData.user._id}`,
          {
            link_id: linkToDel,
          },
          {
            headers: {
              Authorization: `Bearer ${String(cookies.userData.token)}`,
            },
          }
        )
        .then((sync) => sync.data)
        .then((data) => {
          setIsLoadingDialogOpen(false);
          if (collection.links.length > 1) {
            collection.links.splice(
              collection.links.findIndex((l) => l._id === linkToDel),
              1
            );
          } else {
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          setIsLoadingDialogOpen(false);
          alert(err.response.data.error);
        });
    };
    const handleYesAction = () => {
      deleteLink();
      return true;
    };

    const marginTop =
      cookies.userData !== undefined && cookies.userData.user !== undefined
        ? String(cookies.userData.user._id) == String(user._id)
          ? {}
          : { marginTop: "0px" }
        : { marginTop: "0px" };

    const middleContent =
      cookies.userData.user !== undefined ? (
        <div className="container-collection">
          {String(cookies.userData.user._id) == String(user._id) ? (
            <LinkInput linkInput={handleLinkInput} />
          ) : null}

          <div class="dropdown" style={marginTop}>
            <div class="collection-name-text ">{collection.name}</div>
            {String(cookies.userData.user._id) == String(user._id) ? null : (
              <Star
                fill={collection.stars.includes(cookies.userData.user._id)}
                handleStar={handleStar}
                count={collection.stars.length}
              />
            )}
            {String(cookies.userData.user._id) ===
            String(collection.user._id) ? (
              <div
                className="settings-icon"
                onClick={() => {
                  if (
                    String(cookies.userData.user._id) ===
                    String(collection.user._id)
                  )
                    navigate("settings");
                }}
              >
                <svg
                  class="solid-interface-settings-alt"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.75 11.9999C8.75 10.205 10.2051 8.74989 12 8.74989C13.7949 8.74989 15.25 10.205 15.25 11.9999C15.25 13.7948 13.7949 15.2499 12 15.2499C10.2051 15.2499 8.75 13.7948 8.75 11.9999Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.4607 1.8384C11.7555 1.53336 12.2445 1.53336 12.5393 1.8384L15.1116 4.49989H18.75C19.1642 4.49989 19.5 4.83567 19.5 5.24989V8.88828L22.1615 11.4606C22.4665 11.7554 22.4665 12.2444 22.1615 12.5392L19.5 15.1115V18.7499C19.5 19.1641 19.1642 19.4999 18.75 19.4999H15.1116L12.5393 22.1614C12.2445 22.4664 11.7555 22.4664 11.4607 22.1614L8.88839 19.4999H5.25001C4.8358 19.4999 4.50001 19.1641 4.50001 18.7499V15.1115L1.83852 12.5392C1.53348 12.2444 1.53348 11.7554 1.83852 11.4606L4.50001 8.88828V5.24989C4.50001 4.83567 4.83579 4.49989 5.25001 4.49989H8.8884L11.4607 1.8384ZM12 7.24989C9.37665 7.24989 7.25 9.37653 7.25 11.9999C7.25 14.6232 9.37665 16.7499 12 16.7499C14.6234 16.7499 16.75 14.6232 16.75 11.9999C16.75 9.37653 14.6234 7.24989 12 7.24989Z"
                    fill="white"
                  />
                </svg>
              </div>
            ) : null}
          </div>
          <div>
            {collection.links.map((link) => {
              return (
                <LinkItem
                  key={link._id}
                  collection={link}
                  openDialog={handleOpenYesNoDialog}
                />
              );
            })}
          </div>
        </div>
      ) : null;

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
    console.log(collection);
    return (
      <div class="container">
        <Helmet>
          <title>{collection.name}</title>
        </Helmet>

        <div class="sidebar-">
          <Sidebar />
        </div>
        <div class="middle-content">
          {collection.links.length == 0 ? loading : middleContent}
        </div>

        <div class="end-content">
          {collection._id != "" ? (
            String(cookies.userData.user._id) == String(user._id) ? (
              <Settings collection={collection} />
            ) : (
              <SideExplore />
            )
          ) : null}
        </div>
        <div class="bottom-bar">
          <BottomBar select={-1} />
        </div>
        <LoadingDialog isOpen={isLoadingDialogOpen} />
        <YesNoDialog
          isOpen={isYesNoDialogOpen}
          closeDialog={handleCloseYesNoDialog}
          action={handleYesAction}
          message={"Do you want to delete this link?"}
        />
      </div>
    );
  } else {
    navigate("/auth", { replace: true });
  }
};

export default CollectionDetails;

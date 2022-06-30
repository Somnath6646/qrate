import axios from "../../axios";
import React, { useState } from "react";
import "../../css/Authentication.css";
import AuthComponent from "./AuthComponent";
import requests from "../../requests";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import LoadingDialog from "../dialogs/LoadingDialog";

const Authentication = () => {
	const navigate = useNavigate();
	const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
	const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false);
	var signIn = false;

	const handleAuth = (name, email, password, isSignIn) => {
		setIsLoadingDialogOpen(true);
		const body = { name: name, email: email, password: password };
		if (isSignIn) {
			axios
				.post(`${requests.auth.signIn}`, body)
				.then((res) => res.data)
				.then((data) => {
					setIsLoadingDialogOpen(false);
					setCookie("userData", data, {
						path: "/",
					});
					navigate("/", { replace: true });
				})
				.catch((err) => {
					alert(err.response.data.error);
					setIsLoadingDialogOpen(false);
				});
		} else {
			axios
				.post(`${requests.auth.signUp}`, body)
				.then((res) => res.data)
				.then((data) => {
					setIsLoadingDialogOpen(false);
					setCookie("userData", data, {
						path: "/",
					});
					navigate("/", { replace: true });
				})
				.catch((err) => {
					alert(err.response.data.error);
					setIsLoadingDialogOpen(false);
				});
		}
	};
	return (
		<div>
			<AuthComponent auth={handleAuth} />
			<LoadingDialog isOpen={isLoadingDialogOpen} />
		</div>
	);
};

export default Authentication;

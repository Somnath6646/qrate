import React, { Component } from "react";
import { CookiesProvider } from "react-cookie";
import App from "./App";

const CookieApp = () => {
	return (
		<CookiesProvider>
			<App />
		</CookiesProvider>
	);
};

export default CookieApp;

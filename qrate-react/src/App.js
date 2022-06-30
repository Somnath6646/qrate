import { CookiesProvider } from "react-cookie";
import { React } from "react";
import Router from "./Router";

function App() {
	return (
		// if()
		<CookiesProvider>
			<Router />
		</CookiesProvider>
	);
}

export default App;

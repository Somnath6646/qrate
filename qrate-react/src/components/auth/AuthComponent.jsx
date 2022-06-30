import React, { useState } from "react";

import "../../css/Authentication.css";

const AuthComponent = ({ auth }) => {
	const [isSignIn, setIsSignIn] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [buttonGray, setButtonGray] = useState(true);

	const buttonColour = () => {
		if (isSignIn) {
			if (email.length > 0 && password.length > 4) setButtonGray(false);
			else setButtonGray(true);
		} else {
			if (name.length > 0 && email.length > 0 && password.length > 4)
				setButtonGray(false);
			else setButtonGray(true);
		}
	};

	return (
		<div class="content">
			<div class="auth-container">
				<div class="authheading">
					<div class="auth-title">{isSignIn ? "Sign in" : "Sign up"}</div>
					<div class="authinputs">
						{isSignIn ? (
							""
						) : (
							<input
								type="text"
								id="form3Example1c"
								class="email-input"
								placeholder="Your Name"
								onChange={(event) => {
									const value = event.target.value;
									setName(value);
									buttonColour();
								}}
							/>
						)}

						<input
							type="email"
							id="form3Example3c"
							class="email-input"
							placeholder="Email"
							onChange={(event) => {
								setEmail(event.target.value);
								buttonColour();
							}}
						/>
						<input
							type="password"
							id="form3Example4c"
							class="password-input"
							placeholder="Password"
							onChange={(event) => {
								setPassword(event.target.value);
								buttonColour();
							}}
						/>
					</div>
				</div>
				<div class="option-text">
					<span>
						<span class="option-text-span">Don’t have an account? </span>
						<span
							class="option-text-span2"
							onClick={() => {
								setIsSignIn(!isSignIn);
							}}
						>
							{" "}
							{isSignIn ? "Sign up" : "Sign in"}
						</span>
					</span>
				</div>
				<div
					class={buttonGray ? "authbutton-gray" : "authbutton"}
					onClick={() => {
						if (buttonGray) alert("Please fill all the details");
						else auth(name, email, password, isSignIn);
					}}
				>
					<div class="auth-action-text">{isSignIn ? "Sign in" : "Sign up"}</div>
				</div>
			</div>
		</div>
	);
};

export default AuthComponent;

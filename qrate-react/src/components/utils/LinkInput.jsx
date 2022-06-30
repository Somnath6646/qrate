import React, { useState } from "react";
import "../../css/LinkPaste.css";

const LinkInput = ({ linkInput }) => {
	const [link, setLink] = useState("");
	return (
		<div>
			<div class="saverheader">
				<input
					type="text"
					id="simple-search"
					class="linkinput"
					placeholder="Paste your link here..."
					required
					value={link}
					autoComplete="off"
					onChange={(event) => {
						const value = event.target.value;
						setLink(value);
					}}
				/>

				<div
					class="saving-button"
					onClick={() => {
						var l = link;
						linkInput(l);
					}}
				>
					<svg
						class="group-2"
						width="23"
						height="23"
						viewBox="0 0 23 23"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M18.088 19.9711H4.91078C4.41152 19.9711 3.93271 19.7728 3.57968 19.4198C3.22665 19.0668 3.02832 18.5879 3.02832 18.0887V4.91151C3.02832 4.41225 3.22665 3.93344 3.57968 3.58041C3.93271 3.22738 4.41152 3.02905 4.91078 3.02905H15.2643L19.9704 7.73519V18.0887C19.9704 18.5879 19.7721 19.0668 19.4191 19.4198C19.066 19.7728 18.5872 19.9711 18.088 19.9711Z"
							stroke="white"
							stroke-width="1.88245"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M16.2062 19.9712V12.4414H6.79395V19.9712"
							stroke="white"
							stroke-width="1.88245"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M6.79395 3.02905V7.73519H14.3238"
							stroke="white"
							stroke-width="1.88245"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default LinkInput;

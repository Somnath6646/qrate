import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Bottombar.css";

const BottomBar = (select) => {
	const [selected, setSelected] = useState(select.select);
	var navigate = useNavigate();

	return (
		<div className="bottombar">
			<div class="bottombar-tabs">
				<div
					class={
						selected === 0
							? "bottombar-home bottombar-selected"
							: "bottombar-home"
					}
					onClick={() => {
						setSelected(0);
						navigate("/home");
					}}
					home
				>
					<svg
						class="bottombar-icon"
						width="16"
						height="19"
						viewBox="0 0 16 19"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9.77281 1.05434C8.80311 0.052852 7.19693 0.0528504 6.22723 1.05433L1.49085 5.94593C1.21884 6.22686 1.03605 6.58202 0.965516 6.96665C0.390298 10.1035 0.347838 13.3148 0.83992 16.4658L1.01414 17.5814C1.06917 17.9337 1.37265 18.1935 1.72928 18.1935H5.03885C5.31142 18.1935 5.53238 17.9725 5.53238 17.7V10.7906H10.4677V17.7C10.4677 17.9725 10.6886 18.1935 10.9612 18.1935H14.2707C14.6273 18.1935 14.9308 17.9337 14.9859 17.5814L15.1601 16.4658C15.6522 13.3148 15.6097 10.1035 15.0345 6.96665C14.964 6.58202 14.7812 6.22686 14.5092 5.94593L9.77281 1.05434Z"
							fill={selected == 0 ? "#ffffff" : "#CECECE"}
						/>
					</svg>

					<div
						class={
							selected === 0
								? "bottombar-home-text-selected"
								: "bottombar-home-text"
						}
					>
						Home
					</div>
				</div>
				<div
					class={
						selected === 1
							? "bottombar-explore bottombar-selected"
							: "bottombar-explore"
					}
					onClick={() => {
						setSelected(1);
						navigate("/explore");
					}}
				>
					<svg
						class="bottombar-icon2"
						width="21"
						height="21"
						viewBox="0 0 21 21"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M10.5 1.96258C5.92393 1.96258 2.21429 5.67222 2.21429 10.2483C2.21429 14.8244 5.92393 18.534 10.5 18.534C15.0761 18.534 18.7857 14.8244 18.7857 10.2483C18.7857 5.67222 15.0761 1.96258 10.5 1.96258ZM0.5 10.2483C0.5 4.72544 4.97715 0.248291 10.5 0.248291C16.0228 0.248291 20.5 4.72544 20.5 10.2483C20.5 15.7711 16.0228 20.2483 10.5 20.2483C4.97715 20.2483 0.5 15.7711 0.5 10.2483Z"
							fill={selected == 1 ? "#ffffff" : "#CECECE"}
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M9.18547 7.17258C8.11854 8.05034 7.40575 9.28492 7.17905 10.6478L6.67855 13.6567C6.41865 15.2193 8.23549 16.2682 9.45873 15.2619L11.8143 13.324C12.8812 12.4462 13.594 11.2116 13.8207 9.84874L14.3212 6.83979C14.5811 5.27726 12.7643 4.2283 11.541 5.23465L9.18547 7.17258ZM10.5 8.53401C9.55323 8.53401 8.78571 9.30152 8.78571 10.2483C8.78571 11.1951 9.55323 11.9626 10.5 11.9626C11.4468 11.9626 12.2143 11.1951 12.2143 10.2483C12.2143 9.30152 11.4468 8.53401 10.5 8.53401Z"
							fill={selected == 1 ? "#ffffff" : "#CECECE"}
						/>
					</svg>
					<div
						class={
							selected === 1
								? "bottombar-explore-text-selected"
								: "bottombar-explore-text"
						}
					>
						Explore
					</div>
				</div>
				<div
					class={
						selected === 2
							? "bottombar-profile bottombar-selected"
							: "bottombar-profile"
					}
					onClick={() => {
						setSelected(2);
						navigate("/starred");
					}}
				>
					<svg
						class="bottombar-icon3"
						width="21"
						height="23"
						viewBox="0 0 21 23"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.8649 0.996283C11.4796 0.332132 10.5204 0.33213 10.1351 0.996283L7.42101 5.67359C7.23064 6.00168 6.90159 6.22557 6.52653 6.28222L1.44021 7.05044C0.58593 7.17947 0.28627 8.25808 0.951576 8.80928L4.74067 11.9485C5.09141 12.2391 5.25633 12.6975 5.17113 13.1449L4.17996 18.35C4.02327 19.1729 4.88706 19.8122 5.62821 19.4219L10.4176 16.9001C10.7821 16.7082 11.2178 16.7082 11.5824 16.9001L16.3718 19.4219C17.1129 19.8122 17.9767 19.1729 17.82 18.35L16.8289 13.1449C16.7437 12.6975 16.9086 12.2391 17.2593 11.9485L21.0484 8.80928C21.7137 8.25808 21.4141 7.17947 20.5598 7.05044L15.4735 6.28222C15.0984 6.22557 14.7694 6.00168 14.579 5.67359L11.8649 0.996283Z"
							fill={selected == 2 ? "#ffffff" : "#CECECE"}
						/>
					</svg>
					<div
						class={
							selected === 2
								? "bottombar-profile-text-selected"
								: "bottombar-profile-text "
						}
					>
						Starred
					</div>
				</div>
			</div>
		</div>
	);
};

export default BottomBar;

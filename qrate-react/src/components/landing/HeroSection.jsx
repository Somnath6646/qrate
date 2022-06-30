import { useNavigate } from "react-router-dom";

export const HeroSection = ({ ...props }) => {
	const navigate = useNavigate();
	return (
		<div className="hero-content">
			<div className="hero-title-text-and-description">
				<div className="hero-title">
					Curate your links <br /> the{" "}
					<span className="u-text-mark">smart</span> way
				</div>
				<div className="hero-description">
					We enable you to save your links in folder like collections which is
					synced on all your devices. Also when you make it public you can share
					those collections with anyone. The app enables productivity of both
					you and the one who is getting help by your publicly available curated
					collection,
				</div>
			</div>
			<div className="hero-ctas">
				<div className="get-started-button">
					<div
						className="get-started-button-text"
						onClick={() => {
							navigate("/auth");
						}}
					>
						get started
					</div>
				</div>
			</div>
		</div>
	);
};

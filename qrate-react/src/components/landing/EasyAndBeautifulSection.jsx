import Background from "./SecondSectionImagelarge.png";
import MobilScreenBackground from "./mobilescreen.jpg";

export const EasyAndBeautifulSection = ({ ...props }) => {
	return (
		<div className="easy-and-beautiful-section">
			<div className="hero-title">Easy &amp; Beautiful</div>
			<img
				className="second-section-image"
				src={window.innerWidth > 500 ? Background : MobilScreenBackground}
			></img>
		</div>
	);
};

import "../../css/landing.css";
import { EasyAndBeautifulSection } from "./EasyAndBeautifulSection";
import { HeroSection } from "./HeroSection";
import { Navbar } from "./Navbar";
import { WhySection } from "./WhySection";
import DMImage from "./DMImage.png";
import ComparisionImage from "./ComparisionImage.png";
import { Footer } from "./Footer";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
	const [cookies] = useCookies(["userData"]);
	const navigate = useNavigate();

	useEffect(() => {
		function getData() {
			if (
				cookies.userData != undefined &&
				cookies.userData.user !== undefined
			) {
				navigate("/home", { replace: true });
			}
		}
		getData();
	}, []);

	return (
		<div className="landing">
			<Navbar />
			<HeroSection />
			<EasyAndBeautifulSection />
			<WhySection image={DMImage} imageWidth={"30%"}>
				<span>
					<span>
						Most of the ones who can guide beginners are busy hustling. they
						barely have time to do so. There has to be some product that enables
						them to be{" "}
					</span>
					<span className="why-text-span">helpful</span>
					<span> and </span>
					<span className="why-text-span">productive</span>
					<span>
						{" "}
						at the same time. With qrate they can share the links to resources
						that they saved while learning the tech stack. Which would help the
						curators build personal brand and learners save time.
					</span>
				</span>
			</WhySection>

			<WhySection image={ComparisionImage} imageWidth={"50%"}>
				Also the current experience of bookmarking links for future refrences is
				either too ugly (using brower’s bookmarks) or too time taking (notion
				etc.) We enable you to store it beautifully that also in minimest time
			</WhySection>
			<Footer></Footer>
		</div>
	);
};

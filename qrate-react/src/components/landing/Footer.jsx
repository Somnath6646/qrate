export const Footer = ({ ...props }) => {
	return (
		<div className="footer">
			<p className="footer-hackathon-text ">
				Made for{" "}
				<span style={{ color: "white" }}>
					<a
						style={{ color: "white" }}
						target="_blank"
						href="https://www.linode.com/?utm_source=hashnode&utm_medium=article&utm_campaign=hackathon_announcement"
					>
						linode
					</a>{" "}
					x{" "}
					<a
						style={{ color: "white" }}
						target="_blank"
						href="https://hashnode.com/"
					>
						hashnode
					</a>
				</span>{" "}
				hackathon
			</p>
		</div>
	);
};

import { Link } from "react-router-dom";
import "./index.css"

const Navbar = () => (
	<>
		<Link to="/" className="topnav-item">
			Phone Book
		</Link>
		<div className="nav-items">
			<Link to="/" className="topnav-item">
				Home
			</Link>
			<Link to="/about" className="topnav-item">
				About
			</Link>
		</div>
	</>
);

export default Navbar;

import { Link } from "react-router-dom";
import "./NavigationBar.css"

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <div>
                <Link to="/">Home</Link><span style={{ marginRight: '20px'}}></span>
                <Link to="/data">Data Chart</Link>
            </div>
        </nav>
    )
}

export default NavigationBar
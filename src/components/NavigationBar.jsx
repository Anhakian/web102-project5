import { Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <nav>
            <div>
                <Link to="/">Home</Link><span style={{ marginRight: '20px'}}></span>
                <Link to="/data">Data Chart</Link>
            </div>
        </nav>
    )
}

export default NavigationBar
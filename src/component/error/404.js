import React from "react";
import "./error.css"
import { Link } from "react-router-dom";

class Error404 extends React.Component {
    render() {
        return (
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>4<span></span>4</h1>
                    </div>
                    <h2>Oops! Page Not Be Found</h2>
                    <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
                    <Link to="/protected/main" style={{ backgroundColor: "blue" }}> Back to Main Menu</Link>
                </div>
            </div>
        )
    }
}

export default Error404;
import React from "react";
import "./error.css"
import { Link } from "react-router-dom";

class Error extends React.Component {
    render() {
        return (
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                    </div>
                    <h2>Error</h2>
                    <p>Sorry there is an Error , be patient for this error .</p>
                    <Link to="/protected/main" style={{ backgroundColor: "blue" }}> Back to Main Menu</Link>
                </div>
            </div>
        )
    }
}

export default Error;
import React from "react";
import "./error.css"
import { Link } from "react-router-dom";

class Error400 extends React.Component {
    render() {
        return (
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>4<span></span>0</h1>
                    </div>
                    <h2>Bad Request: Error 400</h2>
                    <p>The request could not be understood by the server due to malformed syntax. The client should not repeat the request without modifications.</p>
                    <Link to="/protected/main" style={{ backgroundColor: "blue" }}> Back to Main Menu</Link>
                </div>
            </div>
        )
    }
}

export default Error400;
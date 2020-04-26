/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import "./login.css"
import { changeUserSession } from "../../actions/user/index";
import { connect } from "react-redux";
import swal from "sweetalert";
import { Text, TextInput } from "grommet";
import { MagicSpinner } from "react-spinners-kit";


export class Login extends React.Component {
    state = { username: "", password: "", loading: false }

    doLogin = async (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        })
        try {
            console.log(this.state.username, this.state.password)
            if (this.state.username === "admin" && this.state.password === "admin") {
                await this.props.changeUserSession(true);
                await swal("Successfully");
                await this.props.history.push({
                    pathname: '/protected/main'
                })
            } else {
                swal("Sorry Your Password is Wrong :(")
            }
        } catch (error) {
            console.log(error)
        }
        this.setState({
            loading: false,
        });
    }

    onChangeUsername = (event) => {
        try {
            this.setState({
                username: event.target.value
            })
        } catch (err) {
            console.log(err)
        }
    }

    onChangePassword = (event) => {
        try {
            this.setState({
                password: event.target.value
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <>
                <div class="wrapper fadeInDown">
                    <div id="formContent" style={{ marginTop: "250px" }}>
                        <form onSubmit={this.doLogin}>
                            <img src="https://upload.wikimedia.org/wikipedia/id/8/89/Jenius-logo.png" style={{ width: "200px", height: "70px" }} alt=""></img>
                            <br></br>
                            <Text textAlign="start" style={{ marginRight: "290px" }}>Username</Text>
                            <TextInput style={{ width: "85%", marginTop: "10px" }} id="login" name="login" required="true" placeholder="Your Username is = admin" onChange={this.onChangeUsername} />
                            <br></br>
                            <MagicSpinner size={60} color="#686769" loading={this.state.loading} />
                            <Text textAlign="start" style={{ marginRight: "290px" }}>Password</Text>
                            <TextInput type="password" style={{ width: "85%", marginTop: "10px" }} required="true" class="fadeIn third mt-4" id="password" name="login" placeholder="Your Password is = admin" onChange={this.onChangePassword} />
                            <input type="submit" class="fadeIn fourth mt-4" value="Log In" />
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = {
    changeUserSession: changeUserSession,
};

export default connect(null, mapDispatchToProps)(Login)
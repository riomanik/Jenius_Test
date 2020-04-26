import React from "react";
import {
    Box,
    Button,
    Collapsible,
    Heading,
    Grommet,
    Layer,
    ResponsiveContext,
} from 'grommet';
import { FormClose } from 'grommet-icons';
import MainFooter from "../footer/footer";
import { Dashboard } from 'grommet-icons';
import { Archive } from 'grommet-icons';
import { Logout } from 'grommet-icons';
import Contact from "../contact/contact";
import Dashboard2 from "../dashboard/dashboard";
import swal from "sweetalert";
import { logout } from "../../actions/user";
import { connect } from "react-redux";

const theme = {
    global: {
        colors: {
            brand: '#228BE6'
        },
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        },
    },
};

const AppBar = (props) => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation='medium'
        style={{ zIndex: '1' }}
        {...props}
    />
);

export class LandingPage extends React.Component {
    state = {
        showSidebar: false,
        Dashboard: true,
        Contact: false,
        isActive: false,
        active: "Dashboard"
    }

    doEventContact = () => {
        try {
            this.setState({ Contact: !this.state.Contact })
        } catch (err) {
            console.log(err)
        }
    }

    doEventDashboard = () => {
        try {
            this.setState({ Dashboard: !this.state.Dashboard })
        } catch (err) {
            console.log(err)
        }
    }

    doEventLogout = (event) => {
        event.preventDefault();
        try {
            swal("Are you sure?", {
                buttons: true,
                dangerMode: true
            })
                .then(async willDelete => {
                    if (willDelete) {
                        await swal("Successfully Logout");
                        this.props.logout();
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }

    doError = () => {
        try {
            this.props.history.push({
                pathname: "/protected/error"
            })
        } catch (err) {
            console.log(err)
        }
    }

    doError400 = () => {
        try {
            this.props.history.push({
                pathname: "/protected/error-400"
            })
        } catch (err) {
            console.log(err)
        }
    }

    doError404 = () => {
        try {
            this.props.history.push({
                pathname: "/protected/error-404"
            })
        } catch (err) {
            console.log(err)
        }
    }

    doError500 = () => {
        try {
            this.props.history.push({
                pathname: "/protected/error-500"
            })
        } catch (err) {
            console.log(err)
        }
    }

    formIsActive = () => {
        try {
            this.setState({ isActive: true })
        } catch (err) {
            console.log(err)
        }
    }

    doDashboard = () => {
        this.setState({ active: "Dashboard" })
        this.setState({ showSidebar: false })
    }

    doContact = () => {
        this.setState({ active: "Contact" })
        this.setState({ showSidebar: false })
    }

    render() {
        const { showSidebar } = this.state;
        return (
            <Grommet theme={theme} full>
                <ResponsiveContext.Consumer>
                    {size => (
                        <Box fill>
                            <AppBar background="#03a5df">
                                <Heading level='3' margin='none'> <Button icon={<img src="https://apkdl.in/apkimage/bmW78ooeOboSNnpZKGxfJgXFUfacJ5Ye7Af8MHKKoKpVMNsDXnxyExShw30nGwS55QjY" style={{ width: "50px", height: "50px", borderRadius: "70%" }} alt="" />}
                                    onClick={() => this.setState(prevState => ({ showSidebar: !prevState.showSidebar }))} hoverIndicator /> {this.state.active === "Dashboard" ? "Jenius" : ""} {this.state.active === "Contact" ? "Contact" : ""} </Heading>
                                <Button
                                    onClick={this.doEventLogout}
                                ><h5 className="mr-3">Logout <Logout /> </h5></Button>
                            </AppBar>
                            <Box direction='row' flex overflow={{ horizontal: 'hidden' }} >
                                {(!showSidebar || size !== 'small') ? (
                                    <Collapsible direction="horizontal" open={showSidebar}>
                                        <Box height="full" background="#CAEAFF">
                                            <Button onClick={this.doDashboard}>
                                                <Box
                                                    background=""
                                                    direction="row"
                                                    width="medium"
                                                    pad="small"
                                                >
                                                    <h5><Dashboard></Dashboard> Dashboard</h5>
                                                </Box>
                                            </Button>
                                            <Button onClick={this.doContact}>
                                                <Box
                                                    background=""
                                                    direction="row"
                                                    width="medium"
                                                    pad="small"
                                                >
                                                    <h5><Archive></Archive> Contact</h5>
                                                </Box>
                                            </Button>
                                        </Box>
                                    </Collapsible>
                                ) : (
                                        <Layer>
                                            <Box
                                                background='light-2'
                                                tag='header'
                                                justify='end'
                                                align='center'
                                                direction='row'
                                            >
                                                <Button
                                                    icon={<FormClose />}
                                                    onClick={() => this.setState({ showSidebar: false })}
                                                />
                                            </Box>
                                            <Box height="full" background="#CAEAFF">
                                                <Button onClick={this.doDashboard}>
                                                    <Box
                                                        background=""
                                                        direction="row"
                                                        width="medium"
                                                        pad="small"
                                                    >
                                                        <h5><Dashboard></Dashboard> Dashboard</h5>
                                                    </Box>
                                                </Button>
                                                <Button onClick={this.doContact}>
                                                    <Box
                                                        background=""
                                                        direction="row"
                                                        width="medium"
                                                        pad="small"
                                                    >
                                                        <h5><Archive></Archive> Contact</h5>
                                                    </Box>
                                                </Button>
                                            </Box>
                                        </Layer>
                                    )}
                                {this.state.active === "Dashboard" ?
                                    <Dashboard2 contact={this.doContact} />
                                    : ""}
                                {this.state.active === "Contact" ?
                                    <Contact
                                        error={this.doError}
                                        error400={this.doError400}
                                        error404={this.doError404}
                                        error500={this.doError500} />
                                    : ""}
                            </Box>
                            <MainFooter />
                        </Box>
                    )}
                </ResponsiveContext.Consumer>
            </Grommet >
        );
    }
}

const mapDispatchToProps = {
    logout: logout
};
export default connect(null, mapDispatchToProps)(LandingPage);


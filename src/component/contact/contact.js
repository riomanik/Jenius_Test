
import React from "react";
import "./contact.css"
import { AddCircle, ContactInfo, UserAdd, Edit, Clipboard } from 'grommet-icons';
import { Box } from "grommet";
import { doGetContact } from "../../api/contact";
import ListContact from "./listContact/listContact";
import { Button } from 'reactstrap';
import AddContact from "./addContact/addContact";
import UpdateContact from "./updateContact/updateContact";
import DetailContact from "./detailContact/detailContact";

export class Contact extends React.Component {

    state = { dataContact: [], Add: false, Update: false, Detail: false, ListContact: true, button: true, title: "Manage" }

    componentDidMount = async () => {
        try {
            const response = await doGetContact()
            const data = await response.json()
            this.setState({ dataContact: data.data })
        } catch (err) {
            console.log(err)
        }
    }

    doAddContact = () => {
        try {
            this.setState({ Add: true, Update: false, Detail: false, ListContact: false, title: "Add", button: false })
        } catch (err) {
            console.log(err)
        }
    }

    doUpdateContact = () => {
        try {
            this.setState({ Update: true, Add: false, Detail: false, ListContact: false, title: "Update", button: false })
        } catch (err) {
            console.log(err)
        }
    }

    doDetailContact = () => {
        try {
            this.setState({ Detail: true, Add: false, Update: false, ListContact: false, title: "Information", button: false })
        } catch (err) {
            console.log(err)
        }
    }

    doListContact = () => {
        try {
            this.setState({ Detail: false, Add: false, Update: false, ListContact: true, title: "Manage", button: true })
        } catch (err) {
            console.log(err)
        }
    }

    doError = () => {
        try {
            this.props.error()
        } catch (err) {
            console.log(err)
        }
    }

    doError400 = () => {
        try {
            this.props.error400()
        } catch (err) {
            console.log(err)
        }
    }

    doError404 = () => {
        try {
            this.props.error404()
        } catch (err) {
            console.log(err)
        }
    }

    doError500 = () => {
        try {
            this.props.error500()
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <>
                <Box height="95%" width="60%" align="center" margin="auto"  >
                    <div className="container"  >
                        <div className="table-wrapper" >
                            <div className="table-title" style={{ backgroundColor: "#00A4CCFF" }}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h2 style={{ color: "white" }}>
                                            {this.state.title === "Manage" ? <Clipboard color="white" size="large" className="mr-2" /> : ""}
                                            {this.state.title === "Add" ? <UserAdd color="white" size="large" className="mr-2" /> : ""}
                                            {this.state.title === "Update" ? <Edit color="white" size="large" className="mr-2" /> : ""}
                                            {this.state.title === "Information" ? <ContactInfo color="white" size="large" className="mr-2" /> : ""}
                                            {`${this.state.title} ${"Contact"}`}
                                        </h2>
                                    </div>
                                    {this.state.button ?
                                        <div className="col-sm-6">
                                            <Button onClick={this.doAddContact} style={{ backgroundColor: "white", border: "1px solid blue", marginTop: "10px" }}> <span style={{ color: "blue" }}> <b><AddCircle size='medium' color='blue' style={{ marginTop: "-3px" }} /> Add Contact</b></span></Button>
                                        </div> : ""
                                    }
                                </div>
                            </div>
                            {this.state.ListContact ?
                                <ListContact
                                    update={this.doUpdateContact} detail={this.doDetailContact} error={this.doError} error400={this.doError400} error404={this.doError404} error500={this.doError500} />
                                : ""
                            }
                            {this.state.Add ?
                                <AddContact
                                    back={this.doListContact} error={this.doError} error400={this.doError400} error404={this.doError404} error500={this.doError500} /> : ""
                            }
                            {this.state.Update ?
                                <UpdateContact back={this.doListContact} error={this.doError} error400={this.doError400} error404={this.doError404} error500={this.doError500} /> : ""
                            }
                            {this.state.Detail ?
                                <DetailContact back={this.doListContact} /> : ""
                            }
                        </div>
                    </div>
                </Box>
            </>
        )
    }
}
export default Contact
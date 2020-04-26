import React from "react";
import { Form, FormField, Text, Box, Image } from "grommet";
import { Button } from "reactstrap";
import { doAddContact } from "../../../api/contact";
import swal from "sweetalert";
import storage from "../../../firebase/index.js";
import { MagicSpinner } from "react-spinners-kit";

export class AddContact extends React.Component {

    state = { dataContact: [], FirstName: null, LastName: null, Age: null, Photo: null, image: null, url: "", progress: 0, loading: false, imageUrl: "" }

    doAddContact = async () => {
        try {
            swal("Are you sure you want to add this contact ? ", {
                buttons: true,
                dangerMode: true
            })
                .then(async willDelete => {
                    if (willDelete) {
                        if (this.state.imageUrl === "") {
                            let contact = await {
                                firstName: this.state.FirstName,
                                lastName: this.state.LastName,
                                age: this.state.Age,
                                photo: "https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png"
                            }
                            const response = await doAddContact(contact)
                            if (response.status === 201) {
                                swal("Your Contact has been Add");
                                this.doBackContact();
                            } else if (response.status === 400) {
                                this.props.error400()
                            } else if (response.status === 404) {
                                this.props.error404()
                            } else if (response.status === 500) {
                                this.props.error500()
                            } else {
                                this.props.error()
                            }
                        } else {
                            this.setState({ loading: true })
                            const { image } = this.state;
                            storage.ref(`images/${image.name}`).put(image).on(
                                "state_changed",
                                snapshot => {
                                    const progress = Math.round(
                                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                    );
                                    this.setState({ progress });
                                },
                                error => {
                                    console.log(error);
                                },
                                () => {
                                    storage
                                        .ref("images")
                                        .child(image.name)
                                        .getDownloadURL()
                                        .then(async url => {
                                            this.setState({ url });
                                            let contact = await {
                                                firstName: this.state.FirstName,
                                                lastName: this.state.LastName,
                                                age: this.state.Age,
                                                photo: url
                                            }
                                            const response = await doAddContact(contact)
                                            if (response.status === 201) {
                                                swal("Your Contact has been Add");
                                                this.doBackContact();
                                            } else if (response.status === 400) {
                                                this.props.error400()
                                            } else if (response.status === 404) {
                                                this.props.error404()
                                            } else if (response.status === 500) {
                                                this.props.error500()
                                            } else {
                                                this.props.error()
                                            }
                                        });
                                }
                            );
                        }
                    } else {
                        await swal("That's Ok !")
                    }
                })
        } catch (error) {
            console.log(error)
        }
        this.setState({ loading: false })
    }

    doBackContact = () => {
        try {
            this.props.back();
        } catch (err) {
            console.log(err)
        }
    }

    doChangeFirstName = (event) => {
        try {
            this.setState({ FirstName: event.target.value })
        } catch (err) {
            console.log(err)
        }
    }

    doChangeLastName = (event) => {
        try {
            this.setState({ LastName: event.target.value })
        } catch (err) {
            console.log(err)
        }
    }

    doChangeAge = (event) => {
        if (event.target.value > 100) {
            swal("The maximum age has been reached , please input age between 1 and 100")
            this.setState({ Age: "" })
        } else if (event.target.value < 1) {
            swal("The minimum age has been reached , please input age between 1 and 100")
            this.setState({ Age: "" })
        } else {
            this.setState({ Age: event.target.value })
        }
    }

    doChangePhoto = (event) => {
        try {
            this.setState({ Photo: event.target.value })
        } catch (err) {
            console.log(err)
        }
    }

    onUploadPhoto = async (event) => {
        try {
            await this.setState({
                image: event.target.files[0]
            })
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    imageUrl: reader.result
                })
            }
            if (this.state.image) {
                reader.readAsDataURL(this.state.image);
                this.setState({
                    imageUrl: reader.result
                })
            }
            else {
                this.setState({
                    imageUrl: ""
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="d-flex justify-content-center mb-5" >
                    <MagicSpinner size={60} color="red" loading={this.state.loading} />
                </div>
            )
        } else {
            return (
                <>
                    <Form onSubmit={this.doAddContact}>
                        <br />
                        <FormField name="firstName" label="First Name" value={this.state.FirstName} required="true" patern="[ -]+" onChange={this.doChangeFirstName} />
                        <FormField name="lastName" label="Last Name" required="true" pattern="[^\s]+" onChange={this.doChangeLastName} />
                        <FormField type="number" name="age" label="Age" required="true" onChange={this.doChangeAge} />
                        <br />
                        <Text className="ml-2">Photo</Text>
                        <br /> <br />
                        {this.state.imageUrl === "" ? "" :
                            <Box height="xsmall" width="xsmall"  >
                                <Image
                                    fit="cover"
                                    src={this.state.imageUrl}
                                />
                            </Box>
                        }
                        <input type="file" name="file" onChange={this.onUploadPhoto} style={{ marginTop: "10px" }} />
                        <br /><br />
                        <Button color="primary" size="lg" >Create</Button>
                        <Button color="secondary" className="ml-2" onClick={this.doBackContact} size="lg">Back</Button>
                    </Form>
                </>
            )

        }
    }

}

export default AddContact;
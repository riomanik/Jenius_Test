import React from "react";
import { Form, FormField, Text, Box, Image } from "grommet";
import { Button } from "reactstrap";
import { doUpdateContact } from "../../../api/contact";
import { connect } from "react-redux";
import swal from "sweetalert";
import storage from "../../../firebase/index.js";
import { MagicSpinner } from "react-spinners-kit";


export class UpdateContact extends React.Component {

    state = { dataContact: [], FirstName: null, LastName: null, Age: null, Photo: null, image: null, url: "", progress: 0, loading: false, imageUrl: "" }

    componentWillMount = () => {
        try {
            this.setState({
                FirstName: this.props.contactDetailReducer.firstName,
                LastName: this.props.contactDetailReducer.lastName,
                Age: this.props.contactDetailReducer.age,
                Photo: this.props.contactDetailReducer.photo,
                imageUrl: this.props.contactDetailReducer.photo
            })
        } catch (err) {
            console.log(err)
        }
    }

    doUpdateContact = async () => {
        try {
            swal("Are you sure you want to Update this contact ? ", {
                buttons: true,
                dangerMode: true
            })
                .then(async willDelete => {
                    this.setState({ loading: true })
                    if (this.state.image === null) {
                        let contact = await {
                            firstName: this.state.FirstName,
                            lastName: this.state.LastName,
                            age: this.state.Age,
                            photo: this.state.Photo
                        }
                        const response = await doUpdateContact(this.props.contactDetailReducer.id, contact)
                        if (response.status === 201) {
                            swal("Your Contact has been Update");
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
                        if (willDelete) {
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
                                            const response = await doUpdateContact(this.props.contactDetailReducer.id, contact)
                                            if (response.status === 201) {
                                                swal("Your Contact has been Update");
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
                        } else {
                            await swal("That's Ok !")
                        }
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
        try {
            this.setState({ Age: event.target.value })
        } catch (err) {
            console.log(err)
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
                    <Form onSubmit={this.doUpdateContact}>
                        <br />
                        <FormField name="firstName" label="First Name" value={this.state.FirstName} onChange={this.doChangeFirstName} />
                        <FormField name="lastName" label="Last Name" value={this.state.LastName} onChange={this.doChangeLastName} />
                        <FormField type="number" name="age" label="Age" value={this.state.Age} onChange={this.doChangeAge} />
                        <br />
                        <Text className="ml-2">Photo</Text>
                        <br />
                        <Box height="xsmall" width="xsmall"  >
                            <Image
                                fit="cover"
                                fallback="https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png"
                                src={this.state.imageUrl}
                            />
                        </Box>
                        <input type="file" name="file" onChange={this.onUploadPhoto} style={{ marginTop: "10px" }} />
                        <br /><br />
                        <Button color="primary" size="lg" >Update</Button>
                        <Button color="secondary" size="lg" className="ml-2" onClick={this.doBackContact}>Back</Button>
                    </Form>
                </>
            )
        }
    }

}

const mapStateToProps = (state) => {
    return {
        contactDetailReducer: state.contactDetailReducer
    };
};
export default connect(mapStateToProps, null)(UpdateContact);
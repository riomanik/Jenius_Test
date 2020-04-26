import React from "react";
import { Trash } from 'grommet-icons';
import { Edit } from 'grommet-icons';
import { Button } from "grommet";
import { Login } from 'grommet-icons';
import { doGetContact, doDeleteContactById } from "../../../api/contact";
import swal from "sweetalert";
import { contactDetail } from "../../../actions/user/contact";
import { connect } from "react-redux";
import { MagicSpinner } from "react-spinners-kit";


export class ListContact extends React.Component {

    state = { dataContact: [], Add: false, Update: false, loading: false }

    componentDidMount = async () => {
        try {
            this.setState({ loading: true })
            const response = await doGetContact()
            const data = await response.json()
            this.setState({ dataContact: data.data })
        } catch (err) {
            console.log(err)
        }
        this.setState({ loading: false })
    }

    doUpdate = (contact) => {
        try {
            this.setState({ loading: true })
            this.props.update();
            this.props.contactDetail(contact)
        } catch (err) {
            console.log(err)
        }
        this.setState({ loading: false })
    }

    doDetail = (contact, i) => {
        try {
            this.setState({ loading: true })
            this.props.detail();
            this.props.contactDetail(contact)
        } catch (err) {
            console.log(err)
        }
        this.setState({ loading: false })
    }

    doDelete = (id) => {
        try {
            swal("Are you sure you want to delete this contact ? ", {
                buttons: true,
                dangerMode: true
            })
                .then(async willDelete => {
                    if (willDelete) {
                        this.setState({ loading: true })
                        const response = await doDeleteContactById(id)
                        if (response.status === 201) {
                            swal("Your Data has been Deleted");
                        } else if (response.status === 400) {
                            this.props.error400();
                        } else if (response.status === 404) {
                            this.props.error404();
                        } else if (response.status === 500) {
                            this.props.error500();
                        } else {
                            this.props.error();
                        }
                    } else {
                        await swal("Be Carefull for your data !")
                    }
                });
        } catch (error) {
            console.log(error)
        }
        this.setState({ loading: false })
    }

    doRenderListContact = () => {
        let i = 0;
        return this.state.dataContact.map(list => {
            i++;
            return (
                <tr className="text-center" key={i}>
                    <td style={{ paddingTop: "20px" }}>{i}</td>
                    <td style={{ paddingTop: "20px" }}>{list.firstName}</td>
                    <td style={{ paddingTop: "20px" }}>{list.lastName}</td>
                    <td style={{ paddingTop: "20px" }}>{list.age}</td>
                    <td className="text-center"><Button><Login color="green" onClick={() => this.doDetail(list)}></Login></Button></td>
                    <td>
                        <Button><Trash color="red" onClick={() => this.doDelete(list.id)}></Trash></Button>
                        <Button className="ml-3" onClick={() => this.doUpdate(list)}><Edit color="blue"></Edit></Button>
                    </td>
                </tr >
            )
        })
    };

    render() {
        return (
            <>
                <div className="overflow-auto" style={{ maxHeight: "35rem" }} >
                    <table className="table table-striped table-hover">
                        <thead >
                            <tr className="text-center" >
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Detail</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                            {this.doRenderListContact()}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center mb-5">
                        <MagicSpinner size={60} color="red" loading={this.state.loading} />
                    </div>
                </div>
            </>
        )
    }

}

const mapDispatchToProps = {
    contactDetail: contactDetail
};
export default connect(null, mapDispatchToProps)(ListContact);
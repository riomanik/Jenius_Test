import React from "react";
import { Box, Image, Heading, List } from "grommet"
import { Button } from "reactstrap";
import { connect } from "react-redux";


export class DetailContact extends React.Component {

    doBackContact = () => {
        try {
            this.props.back()
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <>
                <Box
                    direction="row"
                    pad="medium"
                >
                    <Box height="medium" width="medium" >
                        <Image
                            fit="cover"
                            src={this.props.contactDetailReducer.photo}
                            fallback="https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png"
                        />
                    </Box>
                    <Box height="medium" width="large" style={{
                        marginLeft: "30px"
                    }} >
                        <Heading marginTop="none" alignSelf="center" color="dark">{`${this.props.contactDetailReducer.firstName} ${this.props.contactDetailReducer.lastName}`}</Heading>
                        <List
                            style={{ marginTop: "35px" }}
                            primaryKey="name"
                            secondaryKey="value"
                            data={[
                                { name: 'Id         ', value: this.props.contactDetailReducer.id },
                                { name: 'First Name ', value: this.props.contactDetailReducer.firstName },
                                { name: 'Last Name  ', value: this.props.contactDetailReducer.lastName },
                                { name: 'Age        ', value: this.props.contactDetailReducer.age },
                            ]}
                        />
                        <Button color="secondary" className="mt-5" onClick={this.doBackContact}>Back</Button>
                    </Box>
                </Box>
            </>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        contactDetailReducer: state.contactDetailReducer
    };
};
export default connect(mapStateToProps, null)(DetailContact);
import React from "react";
import {
    Footer,
    Text,
} from 'grommet';

class MainFooter extends React.Component {
    render() {
        return (
            <>
                <Footer background="brand" pad="medium">
                    <Text>Copyright</Text>
                </Footer>
            </>
        )
    }
}
export default MainFooter;
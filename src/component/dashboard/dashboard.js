import React from "react";
import { Box, Main, Heading, Paragraph, Image, WorldMap, Clock } from "grommet";
import { Action } from 'grommet-icons';
import { Link } from "react-router-dom";

class Dashboard extends React.Component {

  doContact = () => {
    this.props.contact();
  }

  render() {
    return (
      <>
        <Box height="95%" width="60%" align="center" margin="auto" >
          <Main pad="full">
            <Box height="small" width="large">
              <Image
                fit="fit"
                src="https://upload.wikimedia.org/wikipedia/id/8/89/Jenius-logo.png"
              />
            </Box>
            <Heading size="small" style={{ textAlign: "end" }}>WELCOME</Heading>
            <Paragraph><b> <Link to="/protected/main" className="btn" onClick={this.doContact}> <Action /> Contact our people from around the world <Clock type="digital" style={{ position: "right" }} /></Link></b></Paragraph>
            <WorldMap
              color="neutral-1"
              continents={[
                {
                  name: 'Africa',
                  color: 'light-5',
                  onClick: (name) => { },
                },
              ]}
              onSelectPlace={(lat, lon) => { }}
              places={[
                {
                  name: 'Sydney',
                  location: [-33.8830555556, 151.216666667],
                  color: 'accent-2',
                  onClick: (name) => { },
                },
              ]}
              selectColor="accent-2"
            />
          </Main>
        </Box>
      </>
    )
  }
}

export default Dashboard;
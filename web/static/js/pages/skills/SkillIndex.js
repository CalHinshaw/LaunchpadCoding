import React from 'react'
import Relay from 'react-relay'

class SkillIndex extends React.Component {

  render() {
    console.log(this.props.viewer.skills.edges)
    return (
      <p>Hello from SkillIndex!</p>
    );
  }

}

export default Relay.createContainer(SkillIndex, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        skills(first: 100) {
          edges {
            node {
              name
              description
              nextSkills(first: 10) {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `
  }
});

import React from 'react'
import Relay from 'react-relay'

class SkillIndex extends React.Component {

  render() {
    const skills = this.props.viewer.skills.edges.map((e) => e.node);
    
    return (
      <div>
        {skills.map((skill, k) => <div key={k} className="skill-node">
          <b>{skill.name}</b>
          <br />
          {skill.description}
        </div>)}
      </div>
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

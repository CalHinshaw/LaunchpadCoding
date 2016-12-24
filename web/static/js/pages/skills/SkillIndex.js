import React from 'react'


console.log(Vertex)

const toVertex = (skill) => {
  return (
    <div key={skill.id} className="skill-node">
      <b>{skill.name}</b>
      <br />
      {skill.description}
    </div>
  );
};


class SkillIndex extends React.Component {
  render() {
    const skills = this.props.viewer.skills.edges.map((e) => e.node);
    
    return (
      <div>
        {skills.map(toVertex)}
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
              id
              name
              description
            }
          }
        }
        skillArrows(first: 100) {
          edges {
            node {
              prevSkill {
                id
              }
              nextSkill {
                id
              }
            }
          }
        }
      }
    `
  }
});

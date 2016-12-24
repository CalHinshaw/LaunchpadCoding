import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const toVertex = (skill, k) => {
  return (
    <div key={k} className="skill-node">
      <b>{skill.name}</b>
      <br />
      {skill.description}
    </div>
  );
};


class SkillIndex extends React.Component {
  render() {
    if (this.props.data.loading) return <div />;

    const skills = this.props.data.skills;
    
    return (
      <div>
        {skills.map(toVertex)}
      </div>
    );
  }

}

const query = gql`query skillIndex {
  skills {
    name
    description
  }

  skillArrows {
    prevSkill { name }
    nextSkill { name }
  }
}`;

export default graphql(query)(SkillIndex)

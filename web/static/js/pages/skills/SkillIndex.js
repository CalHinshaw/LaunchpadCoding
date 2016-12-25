import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router'

const toVertex = (skill, k) => {
  return (
    <Link to={`/skills/${skill.id}`} key={k}>
      <div className="skill-node">
      <b>{skill.name}</b>
      <br />
      {skill.description}
      </div>
    </Link>
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
    id
    name
    description
  }
}`;

export default graphql(query)(SkillIndex)

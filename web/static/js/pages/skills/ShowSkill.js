import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import HelloWorldSkill from '../../skills/HelloWorld'


class ShowSkill extends React.Component {
  render() {
    if (this.props.data.loading) return <div />;

    const skill = this.props.data.skill;
    
    return (
      <div style={{width: 1050, display: "block", marginLeft: "auto", marginRight: "auto"}}>
        {/*<h1>{skill.name}</h1>
        <p>{skill.description}</p>*/}

        <HelloWorldSkill />
      </div>
    );
  }

}

const query = gql`
  query skillIndex($skillId: ID!) {
    skill(skillId: $skillId) {
      name
      description
    }
  }
`;

export default graphql(query, {
  options: ({params: {skillId}}) => ({variables: {skillId}})
})(ShowSkill)

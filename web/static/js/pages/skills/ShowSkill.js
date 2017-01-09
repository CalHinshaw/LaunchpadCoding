import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import skillFromId from '../../curriculum/skills/skillFromId'


class ShowSkill extends React.Component {
  render() {
    const skillId = this.props.routeParams.skillId;

    return (
      <div style={{width: 1015, display: "block", marginLeft: "auto", marginRight: "auto"}}>
        {skillFromId(skillId)}
      </div>
    );
  }

}
/*
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
})(ShowSkill)*/

export default ShowSkill;

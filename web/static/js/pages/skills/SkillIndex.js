import React from 'react'
import Relay from 'react-relay'
import {Graph, Vertex, Edge} from '../../components/graph'

console.log(Vertex)

const toVertex = (skill) => {
  return (
    <Vertex key={skill.id} width={200} height={200}>
      <b>{skill.name}</b>
      <br />
      {skill.description}
    </Vertex>
  );
};

const arrow = "<marker id=\"markerArrow\" markerWidth=\"6\" markerHeight=\"4\" \
                refx=\"5\" refy=\"2\" orient=\"auto\"> \
                 <path d=\"M 0,0 V 4 L6,2 Z\" class=\"arrow\" /> \
               </marker>";


class SkillIndex extends React.Component {
  render() {
    const skills = this.props.viewer.skills.edges.map((e) => e.node);
    
    return (
      <svg width="500" height="500">
        <defs dangerouslySetInnerHTML={{__html: arrow}} />

        <Graph className="graph">
            {skills.map(toVertex)}

            {/*<Edge markerEnd="url(#markerArrow)" source="foo" target="baz" />
            <Edge source="bar" target="baz" />*/}
        </Graph>
      </svg>
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

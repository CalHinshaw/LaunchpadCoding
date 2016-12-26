import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import Interpreter from 'js-interpreter';


function onChange(newValue) {
  //const myInterpreter = new Interpreter(newValue);
  //console.log(myInterpreter);
}

class ShowSkill extends React.Component {
  onRun() {
    const code = this.refs.editor.editor.getValue();
    const curInterpreter = new Interpreter(code);
    curInterpreter.run();
    console.log(curInterpreter.value);
  }

  render() {
    if (this.props.data.loading) return <div />;

    const skill = this.props.data.skill;
    
    return (
      <div>
        <h1>{skill.name}</h1>
        <p>{skill.description}</p>

        <AceEditor
          ref="editor"
          mode="javascript"
          theme="tomorrow"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
        />

        <button onClick={this.onRun.bind(this)}>Run</button>
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

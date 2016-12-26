import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { observer } from 'mobx-react'
import { observable } from 'mobx'

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import Interpreter from 'js-interpreter';


const initFunc = function(interpreter, scope) {
  const setState = this.setState;

  const alertWrapper = (text) => {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(alert(text));
  };
  interpreter.setProperty(
    scope,
    'alert',
    interpreter.createNativeFunction(alertWrapper)
  );

  const printWrapper = (text) => {
    text = text ? text.toString() : '';
    this.interpOutput.push(text)
    return interpreter.createPrimitive(null);
  };
  interpreter.setProperty(
    scope,
    'print',
    interpreter.createNativeFunction(printWrapper)
  );
};


@observer class ShowSkill extends React.Component {
  @observable interpOutput = [];
  @observable editorText = "";

  updateEditorText(text) {
    this.editorText = text;
  }

  onRun() {
    this.interpOutput.length = 0;

    const code = this.refs.editor.editor.getValue();
    const curInterpreter = new Interpreter(code, initFunc.bind(this));
    curInterpreter.run();
  }

  render() {
    if (this.props.data.loading) return <div />;

    const skill = this.props.data.skill;
    
    return (
      <div style={{width: 1050, display: "block", marginLeft: "auto", marginRight: "auto"}}>
        <h1>{skill.name}</h1>
        <p>{skill.description}</p>

        <div>
          <div style={{display: "inline-block"}}>
            <AceEditor
              height="300"
              width="500"
              ref="editor"
              mode="javascript"
              theme="tomorrow"
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
              onChange={this.updateEditorText.bind(this)}
              value={this.editorText}
            />
          </div>

          <div style={{display: "inline-block", width: 500, marginLeft: 15}}>
            {this.interpOutput.map((out, k) => <div key={k}>{">>  "+out}<br /></div>)}
          </div>
        </div>

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

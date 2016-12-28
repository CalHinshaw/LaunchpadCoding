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

const ConsoleLine = ({line}) => {
  const type = line.type;

  if (type === "print") {
    return (
      <div style={{marginLeft: 10}}>
        {line.text}
        <br />
      </div>
    );
  } else if (type === "prompt") {
    const resizeTextArea = (e) => {
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight+'px';
    };

    // line.callback("i'm a callback")
    // line.interpreter.run();
    return (
      <div style={{marginLeft: 10}}>
        {line.text}
        <br />
        <span style={{verticalAlign: "top"}}>>> </span>
        <textarea onChange={resizeTextArea} rows="1" className="console-input" />
        <br />
      </div>
    );
  }
  
};

const initFunc = function(interpreter, scope) {
  const printWrapper = (text) => {
    text = text ? text.toString() : '';
    this.interpOutput.push({type: 'print', text})
    return interpreter.createPrimitive(null);
  };
  interpreter.setProperty(
    scope,
    'print',
    interpreter.createNativeFunction(printWrapper)
  );

  const promptWrapper = (text, callback) => {
    text = text ? text.toString() : '';
    this.interpOutput.push({type: 'prompt', text, callback, interpreter})
    // add a map to the array that descripts the prompt action
    // and store a ref to the callback. may need to call
    // interpreter.run, idk. also need to change format of print and the render function
  };
  interpreter.setProperty(
    scope,
    'prompt',
    interpreter.createAsyncFunction(promptWrapper)
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

          <div className="editor-output">
            {this.interpOutput.map((line, k) => <ConsoleLine key={k} line={line} />)}
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

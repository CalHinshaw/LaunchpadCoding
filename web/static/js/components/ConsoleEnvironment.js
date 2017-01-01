import React from 'react'

import { observer } from 'mobx-react'
import { observable } from 'mobx'

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import Interpreter from 'js-interpreter';

import Dropdown from './Dropdown'


const initInterpForUI = function(interpreter, scope) {
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

  const promptWrapper = (prompt, callback) => {
    prompt = prompt ? prompt.toString() : '';
    this.interpOutput.push({type: 'prompt', prompt, callback, interpreter})
  };
  interpreter.setProperty(
    scope,
    'prompt',
    interpreter.createAsyncFunction(promptWrapper)
  );
};


const ConsoleLine = observer(({line}) => {
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

    const handlePrompt = (event) => {
      if (event.key !== 'Enter') return;

      line.type = "answered-prompt";
      line.answer = event.target.value;

      line.callback(event.target.value);
      line.interpreter.run();

      line.callback = null;
    }

    return (
      <div style={{marginLeft: 10}}>
        {line.prompt}
        <br />
        <span style={{verticalAlign: "top"}}>>> </span>
        <textarea
          onChange={resizeTextArea}
          onKeyPress={handlePrompt}
          rows="1"
          className="console-input"
        />
        <br />
      </div>
    );
  } else if (type === "answered-prompt") {
    return (
      <div style={{marginLeft: 10}}>
        {line.prompt}
        <br />
        <span style={{verticalAlign: "top"}}>>> </span>
        <div className="console-input">{line.answer}</div>
        <br />
      </div>
    );
  }
  
});


@observer class ConsoleEnvironment extends React.Component {
  @observable interpOutput = [];
  @observable editorText = "";

  updateEditorText(text) {
    this.editorText = text;
  }

  _onRun() {
    this.interpOutput.length = 0;

    const code = this.refs.editor.editor.getValue();
    const curInterpreter = new Interpreter(code, initInterpForUI.bind(this));
    curInterpreter.run();
  }

  _runTests(event) {
    event.stopPropagation();
    console.log('run tests')
  }

  render() {
    return (
      <div>
        <div className="console-env-row">
          <div style={{display: "inline-block"}}>
            <AceEditor
              height="300"
              width="500"
              ref="editor"
              mode="javascript"
              theme="tomorrow"
              tabSize={2}
              editorProps={{$blockScrolling: true}}
              onChange={this.updateEditorText.bind(this)}
              value={this.editorText}
            />
          </div>

          <div className="editor-output">
            {this.interpOutput.map((line, k) => <ConsoleLine key={k} line={line} />)}
            <button className="run-button" onClick={this._onRun.bind(this)}>Run</button>
          </div>
        </div>

        <Dropdown>
          <span>
            <img className='test-status' src="/images/red_x.svg" />
            <strong>3/4 tests passing</strong>
            &nbsp; (click to see more info)
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this._runTests.bind(this)}>Run Tests</a>
          </span>
          <div>
            <img className='test-status' src="/images/green_check.svg" />
            Got 843*-69 correct.
          </div>

          <div>
            <img className='test-status' src="/images/red_x.svg" />
            Supposed to prompt for a name and print "Hello name!". Didn't prompt for a name.
          </div>

          <div>
            <img className='test-status' src="/images/red_x.svg" />
            Suposed to prompt for an age and print "You can drink!" if it is greater than 21 or the number of years until they can drink if they're under 21. Printed you can drink when the age entered was 18.
          </div>
        </Dropdown>
        
      </div>
    );
  }
}

export default ConsoleEnvironment;
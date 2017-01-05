import React from 'react'

import { observer } from 'mobx-react'
import { observable, transaction } from 'mobx'

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

const runTest = (program, test) => {
    // create interpreter, run test, return result

  let currentStepIndex = 0;
  let result = null;

  const initInterpForTest = function(interpreter, scope) {
    const printWrapper = (text) => {
      text = text ? text.toString() : '';

      const currentStep = test.testData[currentStepIndex];
      currentStepIndex++;

      if (currentStep.type === "prompt") {
        result = {
          status: "failure",
          reason: "Expecting prompt for "+currentStep.for+", program printed \""+text+"\" instead."
        };
      } else if (text !== currentStep.require) {
        result = {
          status: "failure",
          reason: "Expected program to print \""+currentStep.require+"\", program printed \""+text+"\" instead."
        };
      }

      return interpreter.createPrimitive(null);
    };
    interpreter.setProperty(
      scope,
      'print',
      interpreter.createNativeFunction(printWrapper)
    );

    const promptWrapper = (prompt, callback) => {
      prompt = prompt ? prompt.toString() : '';

      const currentStep = test.testData[currentStepIndex];
      currentStepIndex++;

      if (currentStep.type === "print") {
        result = {
          status: "failure",
          reason: "Expecting program to print "+currentStep.require+", program prompted for \""+prompt+"\" instead."
        };
      }

      return interpreter.createPrimitive(currentStep.provide);
    };
    interpreter.setProperty(
      scope,
      'prompt',
      interpreter.createNativeFunction(promptWrapper)
    );
  };

  const interp = new Interpreter(program, initInterpForTest);
  while(interp.step() && currentStepIndex < test.testData.length) {
    if (result != null) {
      return result;
    }
  }

  if (currentStepIndex < test.testData.length) {
    const next = test.testData[currentStepIndex];
    if (next.type === "print") {
      return {
        status: "failure",
        reason: "Should have printed \""+next.require+"\", ended execution instead."
      };
    } else if (next.type === "prompt") {
      return {
        status: "failure",
        reason: "Should have prompted for "+next.for+", ended execution instead."
      };
    } else {
      return {
        status: "failure",
        reason: "unknown"
      };
    }
  }

  return {status: "success"};
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

const TestResult = observer(({testResult}) => {
  console.log("Test")
  return (
    <div>
      {testResult.status === "success"
        ? <img className='test-status' src="/images/green_check.svg" />
        : <img className='test-status' src="/images/red_x.svg" />
      }
      {testResult.reason}
    </div>
  );
});


@observer class ConsoleEnvironment extends React.Component {
  @observable interpOutput = [];
  @observable editorText = "";
  @observable testResults = [];

  _updateEditorText(text) {
    this.editorText = text;
  }

  _onRun() {
    this.interpOutput.length = 0;

    const code = this.refs.editor.editor.getValue();
    const curInterpreter = new Interpreter(code, initInterpForUI.bind(this));
    curInterpreter.run();
  }

  _runTests(event, tests, program) {
    if (event) event.stopPropagation();

    const testResults = [];

    for (let test of tests) {
      testResults.push(runTest(program, test));
    }


    console.log(testResults)
    return testResults;
  }

  componentDidMount() {
    this._runTests(null, this.props.tests, this.editorText);
  }

  render() {
    const numPassingTests = this.testResults.filter((r) => r.status === "success").length;
    const numTests = this.props.tests.length;

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
              onChange={this._updateEditorText.bind(this)}
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
            {numPassingTests === numTests
              ? <img className='test-status' src="/images/green_check.svg" />
              : <img className='test-status' src="/images/red_x.svg" />
            }
            <strong>{numPassingTests}/{numTests} tests passing</strong>
            &nbsp; (click to see more info)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a onClick={event => this.testResults = this._runTests(event, this.props.tests, this.editorText)}>Run Tests</a>
          </span>

          {this.testResults.map((result, key) => <TestResult key={key} testResult={result} />)}
        </Dropdown>
        
      </div>
    );
  }
}

export default ConsoleEnvironment;
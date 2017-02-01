import React from 'react'

import { observer } from 'mobx-react'
import { observable, transaction } from 'mobx'

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import Interpreter from 'js-interpreter';

import Dropdown from './Dropdown'
import ConsoleOutput from './ConsoleOutput'


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
  let currentStepIndex = 0;
  let result = null;

  const initInterpForTest = function(interpreter, scope) {
    const printWrapper = (text) => {
      text = text ? text.toString() : '';

      const currentStep = test.testData[currentStepIndex];
      currentStepIndex++;

      if (!currentStep) {
        return interpreter.createPrimitive(null);
      }

      if (currentStep.type === "prompt") {
        result = {
          status: "failure",
          name: test.name,
          reason: "Expecting prompt for "+currentStep.for+", program printed \""+text+"\" instead."
        };
      } else if (text !== currentStep.require) {
        console.log("ding")
        result = {
          status: "failure",
          name: test.name,
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

      if (!currentStep) {
        return interpreter.createPrimitive("");
      }

      if (currentStep.type === "print") {
        result = {
          status: "failure",
          name: test.name,
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

  try {
    while(interp.step() && currentStepIndex < test.testData.length) {
      if (result != null) {
        return result;
      }
    }

    if (result != null) {
      return result;
    }
  } catch (e) {
    return {
      status: "failure",
      name: test.name,
      reason: "error: "+e.toString()
    };
  }

  if (currentStepIndex < test.testData.length) {
    const next = test.testData[currentStepIndex];
    if (next.type === "print") {
      return {
        status: "failure",
        name: test.name,
        reason: "Should have printed \""+next.require+"\", ended execution instead."
      };
    } else if (next.type === "prompt") {
      return {
        status: "failure",
        name: test.name,
        reason: "Should have prompted for "+next.for+", ended execution instead."
      };
    } else {
      return {
        status: "failure",
        name: test.name,
        reason: "unknown"
      };
    }
  }

  return {status: "success", name: test.name,};
};


const TestResult = observer(({testResult}) => {
  return (
    <div>
      {testResult.status === "success"
        ? <img className='test-status' src="/images/green_check.svg" />
        : <img className='test-status' src="/images/red_x.svg" />
      }
      <strong>{testResult.name+": "}</strong>
      {testResult.reason || "passing!"}
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
    try {
      curInterpreter.run();
    } catch(e) {
      this.interpOutput.push({
        type: "error",
        error: e.toString()
      });
    }
  }

  _runTests(event, tests, program) {
    if (event) event.stopPropagation();

    const testResults = [];
    for (let test of tests) {
      testResults.push(runTest(program, test));
    }
    return testResults;
  }

  componentDidMount() {
    if (!this.props.tests) return;

    this.testResults.replace(
      this._runTests(null, this.props.tests, this.editorText)
    );
  }

  render() {
    const numPassingTests = this.testResults.filter((r) => r.status === "success").length;
    const numTests = this.props.tests ? this.props.tests.length : 0;

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
            <ConsoleOutput interpOutput={this.interpOutput} />
            <button className="run-button" onClick={this._onRun.bind(this)}>Run</button>
          </div>
        </div>

        {this.props.tests
          ? <Dropdown>
              <span>
                {numPassingTests === numTests
                  ? <img className='test-status' src="/images/green_check.svg" />
                  : <img className='test-status' src="/images/red_x.svg" />
                }
                <strong>{numPassingTests}/{numTests} tests passing</strong>
                &nbsp; (click to see more info)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a onClick={event => this.testResults.replace(this._runTests(event, this.props.tests, this.editorText))}>Run Tests</a>
              </span>

              {this.testResults.map((result, key) => <TestResult key={key} testResult={result} />)}
            </Dropdown>
          : null
        }
      </div>
    );
  }
}

export default ConsoleEnvironment;
import React from 'react';

import { observer } from 'mobx-react'
import { observable, transaction } from 'mobx'

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import Interpreter from 'js-interpreter';

import ConsoleOutput from './ConsoleOutput'
import StateVisualizer from './StateVisualizer'


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

export default @observer class CodeAnalyser extends React.Component {
  @observable interpOutput = [];
  @observable editorText = "";

  @observable stateStack = [];

  @observable interp = null;

  _updateEditorText(text) {
    this.editorText = text;
  }

  _start() {
    this.interpOutput.length = 0;
    this.interp = new Interpreter(this.editorText, initInterpForUI.bind(this));

    this._next();
  }

  _next() {
    try {
      if (!this.interp.step()) {
        this._reset();
      } else {
        this.stateStack = this.interp.stateStack;
      }
    } catch(e) {
      this.interpOutput.push({
        type: "error",
        error: e.toString()
      });
    }
  }

  _reset() {
    this.interp = null;
    this.stateStack = [];
  }

  render() {
    return (
      <div>
        <div style={{display: "inline-block"}}>
          <div style={{marginLeft: 15, marginBottom: 15}}>
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
              readOnly={this.interp ? true : false}
            />
          </div>

          <div className="editor-output" style={{height: 200}}>
            <ConsoleOutput interpOutput={this.interpOutput} />
          </div>

          {
            this.interp
            ? <div style={{marginLeft: 15}}>
                <button onClick={this._next.bind(this)}>Next</button>
                <button>Run until complete</button>
                <button onClick={this._reset.bind(this)}>Edit Code</button>
              </div>
            : <div style={{marginLeft: 15}}>
                <button onClick={this._start.bind(this)}>Start</button>
              </div>
          }

          </div>

        <StateVisualizer stateStack={this.stateStack}/>

      </div>
    );
  }
}

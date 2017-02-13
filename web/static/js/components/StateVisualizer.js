import React from 'react'
import Interpreter from 'js-interpreter'

const propertyBlacklist = [
  "Infinity",
  "NaN",
  "undefined",
  "window",
  "self",
  "Function",
  "Object",
  "Array",
  "Number",
  "String",
  "Boolean",
  "Date",
  "Math",
  "RegExp",
  "JSON",
  "Error",
  "EvalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError",
  "isNaN",
  "isFinite",
  "parseFloat",
  "parseInt",
  "eval",
  "escape",
  "unescape",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "print",
  "prompt"
];

const stringify = (data) => {
  if (data.type === "object") {
    return "";
  } else if (data.type === "function") {
    return "";
  } else if (data.type === "undefined") {
    return "undefined";
  } else if (!data.data) {
    return data;
  } else {
    return data.data;
  }
};

const StackObject = ({obj}) => {
  return (
    <div />
  );
};

const StackFrame = ({frame}) => {
  console.log(frame)
  return (
    <div className="stack-frame">
      {Object.keys(frame).map((key) => <p key={key}>{key.toString()}: {stringify(frame[key])}</p>)}
    </div>
  );
}

export default ({interpStack}) => {
  const renderHeap = {};

  const renderStack = interpStack
    .filter((frame) => frame.scope)
    .map(
      (frame) => {
        const props = frame.scope.properties;
        const keys = Object.keys(props)
          .filter((prop) => !propertyBlacklist.includes(prop.toString()));

        const cleanFrame = {};
        keys.forEach((key) => {
          cleanFrame[key] = props[key]
          if (props[key].type === "object" || props[key].type === "function") {
            if (!renderHeap[props[key]]) {
              renderHeap[props[key]] = true;
            }
          }
          
        });

        return cleanFrame;
      }
    );

  let y = -100;

  return (
    <div style={{display: "inline-block", position: "relative"}}>
        {
          renderStack.reverse().map((frame, frameKey) => (
            <div key={frameKey} className="stack-frame" style={{left: 10, bottom: y+=100, width: 200}}>
              {Object.keys(frame).map((key) => <p key={key}>{key.toString()}: {stringify(frame[key])}</p>)}
            </div>
          ))
        }

        {Object.keys(renderHeap).map((item) => <div style={{position: "relative", left: 200}}>{stringify(item)}</div>)}
    </div>
  );
};

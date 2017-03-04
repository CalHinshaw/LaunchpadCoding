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

  const cleanedStack = interpStack
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

  console.log(cleanedStack)

  let bottomCounter = 0;

  const renderStack = cleanedStack.reverse().map((frame) => {
    const toReturn = {
      frame,
      bottom: bottomCounter
    };

    bottomCounter += Object.keys(frame).length*30 + 18;

    return toReturn;
  })

  return (
    <div style={{display: "inline-block", position: "relative"}}>
        {
          renderStack.map((frame, frameKey) => (
            <div key={frameKey} className="stack-frame" style={{left: 10, bottom: frame.bottom, width: 200}}>
              {Object.keys(frame.frame).map((key) => <p key={key}>{key.toString()}: {stringify(frame.frame[key])}</p>)}
            </div>
          ))
        }

        {Object.keys(renderHeap).map((item) => <div style={{position: "relative", left: 300}}>{stringify(item)}</div>)}
    </div>
  );
};

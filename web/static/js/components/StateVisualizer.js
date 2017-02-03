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
    console.log(data)

    let s = "{";
    Object.keys(data.properties).forEach((k) => s += k+': '+data.properties[k].data+', ')
    s += '}';

    return s;
  } else if (data.type === "function") {
    return "coming soon"
  } else if (data.type === "undefined") {
    return "undefined";
  } else if (!data.data) {
    return data;
  } else {
    return data.data;
  }
};

const StackFrame = ({frame}) => {
  console.log(frame)
  return (
    <div>
      {Object.keys(frame).map((key) => <p key={key}>{key.toString()}: {stringify(frame[key])}</p>)}
      <br />
      <br />
    </div>
  );
}

export default ({interpStack}) => {
  const renderHeap = {};

  console.log(interpStack)

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

  return (
    <div style={{display: "inline-block"}}>
      <div style={{display: "inline-block"}}>
        {
          renderStack.map((frame, frameKey) => (
            <div key={frameKey}>
              <StackFrame frame={frame} />
            </div>
          ))
        }
      </div>

      <div style={{display: "inline-block"}}>
        {Object.keys(renderHeap).map((item) => <div>{stringify(item)}</div>)}
      </div>
    </div>
  );
};

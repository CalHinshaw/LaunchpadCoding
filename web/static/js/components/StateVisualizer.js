import React from 'react'

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

export default ({stateStack}) => {
  const state = stateStack
    .filter((frame) => frame.scope)
    .map(
      (frame) => {
        const props = frame.scope.properties;
        const keys = Object.keys(props)
          .filter((prop) => !propertyBlacklist.includes(prop.toString()));

        const cleanFrame = {};
        keys.forEach((key) => cleanFrame[key] = props[key]);

        return cleanFrame;
      }
    )

  return (
    <div style={{display: "inline-block"}}>
      {
        state.map((frame, frameKey) => (
          <div key={frameKey}>
            <StackFrame frame={frame} />
          </div>
        ))
      }
    </div>
  );
};

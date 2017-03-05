import React from 'react'
import Interpreter from 'js-interpreter'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/styles';

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
  "prompt",
  "arguments"
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

export default ({interpStack, programText}) => {
  const rawHeap = [];

  const cleanedStack = interpStack
    .filter((frame) => frame.scope)
    .map(
      (frame) => {
        const props = frame.scope.properties;
        const keys = Object.keys(props)
          .filter((prop) => !propertyBlacklist.includes(prop.toString()));

        const cleanFrame = {};
        keys.forEach((key) => {
          cleanFrame[key] = props[key];
          if (props[key].type === "object" || props[key].type === "function") {
            const objectIndex = rawHeap.indexOf(props[key]);
            if (objectIndex === -1) {
              rawHeap.push(props[key]);
              props[key].heapIndex = rawHeap.length-1;
            } else {
              props[key].heapIndex = objectIndex;
            }
          }
        });

        return cleanFrame;
      }
    );

  // renderHeap has to come first
  const renderHeap = rawHeap.map((item, i) => {
    console.log(item)

    if (item.type === "function") {
      return {
        type: "function",
        text: programText.substring(item.node.start, item.node.end)
      }
    } else if (item.type === "object") {
      return item;
    }
  });

  // add head/tail coordinate pairs to referenceArrows arr while
  // calculating renderStack
  const refrenceArrows = [];

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

        {renderHeap.map((item, i) => {
          // render based on item type (ie object, function)
          if (item.type === "function") {
            return (
              <div key={i} style={{position: "relative", left: 300}}>
                <SyntaxHighlighter language='javascript' style={tomorrow}>
                  {item.text}
                </SyntaxHighlighter>
              </div>
            );
          }
        })}
    </div>
  );
};

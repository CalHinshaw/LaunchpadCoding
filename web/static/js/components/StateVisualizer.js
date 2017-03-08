import React from 'react'
import Interpreter from 'js-interpreter'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/styles';

/*
TODO:
- group interpreter steps
- smooth arrows
- right-justify stack frame keys so arrow associations are clearer
- draw reference arrows between objects in the heap on the right side
- show what just changed more explicitly
- as the interpreter runs sub-expressions annotate the code with their
  results so users can see exactly how their progam state is changing
*/

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

// Seperate the data from the interpreter's stateStack into callstack and
// heap data structures ready to lay out. Returns an Array for each.
const cleanStackAndHeap = ( interpStack ) => {
  const cleanHeap = [];

  const cleanStack = interpStack
    .filter((frame) => frame.scope)
    .map((frame) => {
      const props = frame.scope.properties;
      const keys = Object.keys(props)
        .filter((prop) => !propertyBlacklist.includes(prop.toString()));

      const cleanFrame = {};
      keys.forEach((key) => {
        cleanFrame[key] = props[key];
        if (props[key].type === "object" || props[key].type === "function") {
          const objectIndex = cleanHeap.indexOf(props[key]);
          if (objectIndex === -1) {
            cleanHeap.push(props[key]);
            props[key].heapIndex = cleanHeap.length-1;
          } else {
            props[key].heapIndex = objectIndex;
          }
        }
      });

      return cleanFrame;
    });

  return {
    cleanStack,
    cleanHeap
  };
};


export default ({interpStack, programText}) => {
  // 1) clean the data from the interpreter. The interpreter implicitly uses
  // the native JS runtime's heap as it's own, so we need to assemble an
  // explicit heap as we clean the globally scoped identifiers from each frame.
  // 2) lay the heap out calculating where arrows are going to point
  // 3) lay the stack out and populate an array of arrows we're going to draw
  // 4) render
  const {cleanStack, cleanHeap} = cleanStackAndHeap(interpStack);

  // renderHeap has to come first so we can do arrow layout in single pass
  let heapBottomCounter = 0;
  const renderHeap = cleanHeap.reverse().map((item, i) => {
    if (item.type === "function") {
      const fnText = programText.substring(item.node.start, item.node.end);
      const itemHeight = 25 + 18 * fnText.split('\n').length;

      const toReturn = {
        type: "function",
        text: fnText,
        bottom: heapBottomCounter,
        arrowY: heapBottomCounter + itemHeight/2
      }

      heapBottomCounter += itemHeight;
      return toReturn;

    } else if (item.type === "object") {
      const itemHeight = 25 + 18 * (Object.keys(item.properties).length + 2);

      const toReturn = {
        type: "object",
        properties: item.properties,
        bottom: heapBottomCounter,
        arrowY: heapBottomCounter + itemHeight/2
      }

      heapBottomCounter += itemHeight;
      return toReturn;
    }
  }).reverse();


  const refrenceArrows = [];

  let stackBottomCounter = 0;
  const renderStack = cleanStack.reverse().map((frame) => {
    const cleanFrame = Object.keys(frame).map((key, keyIndex) => {
      const val = frame[key];

      if (val.type === "object" || val.type === "function") {
        refrenceArrows.push({
          tail: {
            x: 100,
            y: stackBottomCounter + 4 + (Object.keys(frame).length - (keyIndex + 1))*24 + 12
          },
          head: {
            x: 290,
            y: renderHeap[val.heapIndex].arrowY
          }
        });

        return key+": ";
      } else if (val.type === "undefined") {
        return key+": undefined";
      } else if (!val.data) {
        return key + ": " + val;
      } else {
        return key + ": " + val.data;
      }
    });

    const toReturn = {
      frame,
      bottom: stackBottomCounter
    };

    stackBottomCounter += Object.keys(frame).length*24 + 18;
    return toReturn;
  });

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
              <div key={i} style={{position: "absolute", bottom: item.bottom, left: 300, width: 400}}>
                <SyntaxHighlighter language='javascript' style={tomorrow}>
                  {item.text}
                </SyntaxHighlighter>
              </div>
            );
          } else if (item.type === "object") {
            return (
              <div key={i} style={{position: "absolute", bottom: item.bottom, left: 300, width: 400, border: "1px solid #ccc", borderRadius: 4, padding: 6.5, marginBottom: 10}}>
                {Object.keys(item.properties).map((key) => {
                  return <p key={key} style={{marginBottom: 5}}>{key + ': ' + item.properties[key]}</p>
                })}
              </div>
            )
          }
        })}


        
        <svg width={800} height={546} style={{position: "absolute", bottom: 0, left: 0}} >
          <defs>
            <marker id="markerArrow1" markerWidth="13" markerHeight="13" refX="2" refY="6" orient="auto">
              <path d="M2,2 L2,11 L10,6 L2,2" />
            </marker>
          </defs>
          {refrenceArrows.map((arrow, key) => {
            return (
              <line
                key={key}
                x1={arrow.tail.x}
                y1={546-arrow.tail.y}
                x2={arrow.head.x}
                y2={546-arrow.head.y}
                style={{stroke: "#006600", markerEnd: "url(#markerArrow1)"}}
              />
            );
          })}
        </svg>
    </div>
  );
};

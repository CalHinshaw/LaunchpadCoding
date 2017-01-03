import React from 'react'

import ConsoleEnvironment from '../components/ConsoleEnvironment'

/*
  static analysis: regex? 'contans string "hello world"'

  behavior/integration tests: interact with program using prompt, test output

  unit tests: call functions - standard

  behavior tests are gonna be the most useful to start with, i can add
  the others later as needed.

  specify as a list of actions and mock out print/prompt?
  [
    {type: "print", require: "Hello World!"},
    {type: "skip-until-next"},
    {type: "prompt", provide: "Susan"},
    {type: "print", require: "Hello Susan!"}
  ]

  could add generative extension

*/

/*const testtests = [
  {
    name: "Prompt for name'",
    type: "functional",
    testData: [
      {type: "prompt", provide: "Susan"}
    ]
  },
  {
    name: "Prompt for name and print 'Hello name!'",
    type: "functional",
    testData: [
      {type: "prompt", provide: "Arnold"},
      {type: "print", require: "Hello Arnold!"}
    ]
  },
  {
    name: "Handle empty name string",
    type: "functional",
    testData: [
      {type: "prompt", for: "name", provide: ""},
      {type: "print", require: "Hello !"}
    ]
  }
];*/


const testtests = [
  {
    name: "Prompt for name and print hello name",
    type: "functional",
    testData: [
      {type: "prompt", for: "name", provide: "Cal"},
      {type: "print", require: "Hello Cal!"}
    ]
  },
  {
    name: "handle empty response",
    type: "functional",
    testData: [
      {type: "prompt", for: "name", provide: ""},
      {type: "prompt", for: "name", provide: ""},
      {type: "prompt", for: "name", provide: "Steve"},
      {type: "print", require: "Hello Steve!"}
    ]
  }
];


export default class HelloWorldSkill extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div style={{display: 'inline-block', width: 350, marginRight: 15}}>
            <h3>Simple Calculator</h3>
            <p>
              Program a calculator that takes an arbetrary arithmatic expression
              and calculates the result.
            </p>
          </div>
        </div>

        <ConsoleEnvironment tests={testtests}/>
      </div>
    );
  }
}

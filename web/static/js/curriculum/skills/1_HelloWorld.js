import React from 'react'

import ConsoleEnvironment from '../../components/ConsoleEnvironment'

const testtests = [
  {
    name: "Prompt for name and print 'Hello name!'",
    type: "functional",
    testData: [
      {type: "prompt", for: "name", provide: "Cal"},
      {type: "print", require: "Hello Cal!"}
    ]
  },
  {
    name: "Disallow empty name",
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

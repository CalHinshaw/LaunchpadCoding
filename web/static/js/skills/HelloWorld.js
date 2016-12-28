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

const testtest = [
  {type: "print", require: "Hello World!"},
  {type: "prompt", provide: "Susan"},
  {type: "print", require: "Hello Susan!"}
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
          <div style={{display: 'inline-block', width: 650}}>
            <div>
              <img className='test-status' src="/images/green_check.svg" />
              Got 843*-69 correct.
            </div>

            <div>
              <img className='test-status' src="/images/red_x.svg" />
              Supposed to prompt for a name and print "Hello name!". Didn't prompt for a name.
            </div>

            <div>
              <img className='test-status' src="/images/red_x.svg" />
              Suposed to prompt for an age and print "You can drink!" if it is greater than 21 or the number of years until they can drink if they're under 21. Printed you can drink when the age entered was 18.
            </div>
          </div>
        </div>

        <ConsoleEnvironment test={testtest}/>
      </div>
    );
  }
}

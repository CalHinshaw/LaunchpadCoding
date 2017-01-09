import React from 'react'

import ConsoleEnvironment from '../../components/ConsoleEnvironment'
import sayHello from '../exercises/1_sayHello'


export default class HelloWorldSkill extends React.Component {
  render() {
    return (
      <div>
        <h1> Hello World: the Simplest Program</h1>
        <p>
          We're going to use the 'print' function to write the simplest
          program possible - printing words to the console. In order to
          print to the console you type 'print("whatever you want to
          print")'. Type your code in the left box below and click the
          run button to see it go. Why don't you start by typing
          'print("Learning new things is fun")' into the left box and
          clicking run.
        </p>
        <h3>Exercise 1: Say Hello</h3>
        <p>
          Write a program that prints "Hello World!" to the console.
        </p>
        <ConsoleEnvironment {...sayHello} />
        <p>
          TODO: anatomy of a print statement diagram
        </p>

        <p>TODO: order of operations description and exercise</p>
      </div>
    );
  }
}

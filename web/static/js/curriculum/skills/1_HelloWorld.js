import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/styles';

import ConsoleEnvironment from '../../components/ConsoleEnvironment'
import sayHello from '../exercises/1_sayHello'
import printingAnyString from '../exercises/2_printingAnyString'


export default class HelloWorldSkill extends React.Component {
  render() {
    return (
      <div>
        <h1>Printing to the Console: Let's Say Hello</h1>
        <p className="lcol">
          NOTE: THIS IS ALL FILLER TEXT
        </p>
        <p className="lcol">
          Printing is an exciting skill because it's both the only one we need to
          write our first program and is the easiest way to see what
          our code is doing. In the next few minutes we're going to take
          a look at printing things to the console using the
          <code>print</code> function and get some practice with it.
        </p>
        <p className="lcol">
          Printing to the console is done using the <code>print</code>
          function. We'll talk more about functions in later skills - 
          for now all you need to know is that you can print a message
          by replacing "your text here" in the block below with it.

          <SyntaxHighlighter language='javascript' style={tomorrow}>
            print("your text here");
          </SyntaxHighlighter>
        </p>

        <h3>Exercise 1: Say Hello</h3>
        <p className="lcol">
          Write a program in the editor on the left that prints
          "Hello World!" to the console, run it by clicking on
          the Run button, and test it to make sure it works correctly
          by clicking 'run tests' below.
        </p>
        <ConsoleEnvironment {...sayHello} />

        <h3>Exercise 2: Print Something Else</h3>
        <p className="lcol">
          You can print anything you want by changing the text inside of the quotation
          marks in your last program. Anything you put inside of quotes is called
          a <b>string</b> (we'll talk about them more later, too). Paste your last program
          into the editor below and change it so it prints "Computers are cool.".
        </p>
        <ConsoleEnvironment {...printingAnyString} />
        
        <h3>Exercise 3: Experiment with Printing</h3>
        <p className="lcol">
          I don't know of anything that will help you improve faster than experimenting
          for yourself and asking your own questions. There are no tests
          in this exercise - it's for you to experiment however you want.
          I do have a few questions to prompt your exploration, though, if
          you want them:
        </p>
        <ul>
          <li>Can you print numbers?</li>
          <li>Can you print multiple times in the same program?</li>
          <li>Is there anything you can't print?</li>
        </ul>
        <p className="lcol">
          I don't expect you to be able to answer all of these right away, but
          that shouldn't stop you from fearlessly playing around for a few minutes. 
        </p>
        <ConsoleEnvironment />
      </div>
    );
  }
}




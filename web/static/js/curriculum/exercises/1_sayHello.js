const tests = [
  {
    name: "Print 'Hello World!'",
    type: "functional",
    testData: [
      {type: "print", require: "Hello World!"}
    ]
  }
];

export default {
  tests: tests
};


/* EXAMPLE TESTS

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
*/

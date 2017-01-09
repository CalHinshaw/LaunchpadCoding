import React from 'react';

import HelloWorld from './1_HelloWorld';

const skills = {
  1: HelloWorld
};

export default (id) => {
  return React.createElement(skills[id]);
};

import React from 'react'

const chunk = (arr, chunkSize) => {
  const chunks = [];

  for(let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i+chunkSize));
  }
  return chunks;
};


export default ({ children, numColumns }) => {
  const cols = chunk(children, numColumns);

  console.log(cols)

  return (
    <div>
      {cols.map((col, k) => <div key={k} style={{display: 'inline-block', width: 100/(cols+0.1)+"%"}}>{col}</div>)}
    </div>
  );
};

import React, { useState } from 'react';
import Intermediate from '../components/intermediate';

export default function Parent() {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <p>Counter: {counter}</p>
      <Intermediate counter={counter} onIncrement={handleIncrement} />
    </div>
  );
}

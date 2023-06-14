import React from 'react';

const Child = ({ counter, onIncrement, label, onDelete }) => {
  return (
    <div>
      <h4>{label}</h4>
      <p>Counter from Parent: {counter}</p>
      <button onClick={onIncrement}>Increment Counter</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Child;

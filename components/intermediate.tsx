import React, { useState } from 'react';
import Child from './child';

const Intermediate = ({ counter, onIncrement }) => {
  const [childCount, setChildCount] = useState(1);
  const [childComponents, setChildComponents] = useState([]);

  const handleAddChild = () => {
    setChildCount((prevCount) => prevCount + 1);
    setChildComponents((prevComponents) => [...prevComponents, childCount]);
  };

  const handleDeleteChild = (id) => {
    setChildComponents((prevComponents) =>
      prevComponents.filter((componentId) => componentId !== id),
    );
  };
  return (
    <div>
      <h3>Intermediate Component</h3>
      <button onClick={handleAddChild}>Add Child</button>
      <div>
        {childComponents.map((id) => (
          <Child
            key={id}
            counter={counter}
            onIncrement={onIncrement}
            label={`Child Component ${id}`}
            onDelete={() => handleDeleteChild(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Intermediate;

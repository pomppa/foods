import React, { useState } from 'react';

export default function EditMeal({ meal, handler }) {
  const [mealData, setMealData] = useState(meal);

  function handleSetWeight(
    i: string | number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setMealData({ ...mealData });
    const newMealData = [...mealData];
    newMealData[i][e.target.name] = e.target.value;
    setMealData(newMealData);
    //pass changed data to parent component
    handler(mealData);
  }
  return (
    <>
      <div>
        <h2>Edit your meal</h2>
      </div>
      <div>
        <div>
          {mealData.map(
            (
              data: {
                id: React.Key;
                ingredient: { name: string };
                ingredient_weight: string;
                ingredient_id: React.Key;
              },
              i: string | number,
            ) => {
              return (
                <div key={data.id}>
                  <p>{data.ingredient.name + ' ' + data.ingredient_weight}</p>
                  <label htmlFor="new_weight">New weight: </label>
                  <input
                    name="ingredient_weight"
                    key={data.ingredient_id}
                    value={data.ingredient_weight || ''}
                    onChange={(e) => handleSetWeight(i, e)}
                  ></input>
                  <br />
                  <button>Remove from meal</button>
                </div>
              );
            },
          )}
          <br />
          <button>Add new ingredient</button>
        </div>
      </div>
    </>
  );
}

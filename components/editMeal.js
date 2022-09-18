import React, { useState, useEffect } from 'react';
import { calculateMacros } from '../lib/calculator';

export default function EditMeal({ meal, handler }) {
    const [mealData, setMealData] = useState(meal)

    useEffect(() => {
        console.log("used effect")
        handler(mealData)
    }, [])

    function handleSetWeight(i, e) {
        setMealData({ ...mealData, })
        console.log(`change detected, i was: ${i}, e value was: ${e.target.value} for e name ${e.target.name}`)
        let newMealData = [...mealData];
        newMealData[i][e.target.name] = e.target.value;
        setMealData(newMealData);
        //pass changed data to parent component 
        handler(mealData)
    }
    return (
        <div>
            <div>
                <h2>Edit your meal</h2>
                {/* <pre>{JSON.stringify(mealData, null, 2)}</pre> */}
            </div>
            <div>
                <div>
                    {mealData.map((data, i) => {
                        return (
                            <div>
                                <p>{data.ingredient.name + ' ' + data.ingredient_weight}</p>
                                <label htmlFor="new_weight">New weight: </label>
                                <input name="ingredient_weight" key={data.ingredient_id} value={data.ingredient_weight || ""} onChange={e => handleSetWeight(i, e)}></input >
                                <br />
                                <button>Remove from meal</button>
                            </div>
                        )
                    })}
                    <br />
                    <button>Add new ingredient</button>
                </div>
            </div>
        </div>
    )
}

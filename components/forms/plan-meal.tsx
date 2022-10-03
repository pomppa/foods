import { useState } from "react";
import { plannerMacroCalculator } from "../../lib/plan-calculator";

export default function PlanMealForm(data) {
  const [mealMacros, setMealMacros] = useState({});
  const [formValues, setFormValues] = useState([
    { ingredient: "", weight: "0" },
  ]);

  const handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    setMealMacros(plannerMacroCalculator(formValues, data.data));
  };

  const addFormFields = () => {
    setFormValues([...formValues, { ingredient: "", weight: "0" }]);
  };

  const removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
    setMealMacros(plannerMacroCalculator(formValues, data.data));
  };

  return (
    <>
      {formValues.map((element, index) => {
        return (
          <div key={index}>
            <label>Pick an ingredient:</label>
            <select
              name="ingredient"
              value={element.ingredient || ""}
              onChange={(e) => handleChange(index, e)}
            >
              <option>Select</option>
              {data.data.map((ingredient, index) => (
                <option key={index} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
            <br></br>
            <label>Weight:</label>
            <input
              type="text"
              name="weight"
              value={element.weight || ""}
              onChange={(e) => handleChange(index, e)}
            />
            <br></br>
            {index ? (
              <button
                type="button"
                className="button remove"
                onClick={() => removeFormFields(index)}
              >
                Remove
              </button>
            ) : null}
          </div>
        );
      })}
      <div className="button-section">
        <button
          className="button add"
          type="button"
          onClick={() => addFormFields()}
        >
          Add
        </button>
        <br></br>
      </div>
      <h2>Meal Macros</h2>
      <pre>{JSON.stringify(mealMacros, null, 2)}</pre>
    </>
  );
}

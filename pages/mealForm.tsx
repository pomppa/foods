import { useState, useEffect } from "react";

export default function MealForm() {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [meals, setMeals] = useState([]);
  const [formValues, setFormValues] = useState([
    { ingredient: "", weight: "" },
  ]);

  const [selectedMeal, setSelectedMeal] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/ingredients")
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data);
        setLoading(false);
      });

    fetch("/api/meals")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
        setLoading(false);
      });
  }, []);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { ingredient: "", weight: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      meal_id: selectedMeal,
      ingredients: formValues,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/meals/create";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    await fetch(endpoint, options);
    setRefresh(true);
  };

  const handleMealSubmit = async (e) => {
    e.preventDefault();
    const mealName = e.target.newmeal.value;
    const data = {
      name: mealName,
    };

    const endpoint = "/api/meals/";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
  };
  console.log(ingredients);
  if (!loading)
    return (
      <div>
        <form onSubmit={handleMealSubmit}>
          <span>create a new meal</span>
          <label htmlFor="newmeal"></label>
          <input type="text" name="newmeal" placeholder="name"></input>
          <button>submit</button>
        </form>

        <span>or</span>
        <form onSubmit={handleSubmit}>
          <label>pick a meal</label>
          <select
            name="meal"
            value={selectedMeal}
            onChange={(e) => setSelectedMeal(e.target.value)}
          >
            <option>Select</option>
            {meals.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <br></br>
          <br />
          <div></div>
          {formValues.map((element, index) => {
            return (
              <div key={index}>
                <label>pick an ingredient</label>
                <select
                  name="ingredient"
                  value={element.ingredient || ""}
                  onChange={(e) => handleChange(index, e)}
                >
                  <option>Select</option>
                  {ingredients.map((ingredient, ingredientIndex) => (
                    <option key={ingredientIndex} value={ingredient.id}>
                      {ingredient.name}
                    </option>
                  ))}
                </select>
                <br></br>
                <label>Weight</label>
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
            <button className="button submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
}

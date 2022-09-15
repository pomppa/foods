import { useState, useEffect } from 'react';

export default function MealForm() {

  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [meals, setMeals] = useState([]);
  const [formValues, setFormValues] = useState([{ ingredient: "", weight: "" }])
  const [selectedMeal, setSelectedMeal] = useState(0)


  useEffect(() => {
    fetch('/api/ingredients')
      .then((res) => res.json())
      .then(setLoading(true))
      .then((data) => {
        setIngredients(data)
      })

    fetch('/api/meals')
      .then((res) => res.json())
      .then((data) => {
        setMeals(data)
      })
      .then(setLoading(false))
  }, [])

  let handleChange = (i, e) => {
    console.log(`change detected, i was: ${i}, e value was: ${e.target.value} for e name ${e.target.name}`)
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }


  let addFormFields = () => {
    setFormValues([...formValues, { ingredient: "", weight: "" }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  // Handles the submit event on form submit.
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(JSON.stringify(formValues, null, 2));

    //return;
    // Get data from the form.
    const data = {
      "meal_id": selectedMeal,
      "ingredients": formValues
    }

    const JSONdata = JSON.stringify(data)
    console.log(JSONdata);

    const endpoint = '/api/meals/create'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    console.log('result ' + JSON.stringify(result, null, 2));
  }
  if (!loading) return (
    // We pass the event to the handleSubmit() function on submit.
    <form onSubmit={handleSubmit}>
      <label>pick a meal</label>
      <select name="meal" value={selectedMeal} onChange={e => setSelectedMeal(e.target.value)}>
        <option defaultValue>Select</option>
        {meals.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <br></br>

      {
        formValues.map((element, index) => {
          return (
            <div key={index}>
              <label>pick an ingredient</label>
              <select name="ingredient" value={element.ingredient || ""} onChange={e => handleChange(index, e)}>
                <option defaultValue>Select</option>
                {ingredients.map((ingredient, ingredientIndex) => (
                  <option key={ingredientIndex} value={ingredient.id}>
                    {ingredient.name}
                  </option>
                ))}
              </select>
              <br></br>
              <label>Weight</label>
              <input type="text" name="weight" value={element.weight || ""} onChange={e => handleChange(index, e)} />
              <br></br>
              {
                index ?
                  <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                  : null
              }
            </div>

          )
        })
      }
      <div className="button-section">
        <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
        <button className="button submit" type="submit">Submit</button>
      </div>
    </form >
  )
}

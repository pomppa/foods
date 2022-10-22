export default function IngredientForm() {
  const handleSubmit = async (event) => {
    await fetch('/api/ingredients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: event.target.name.value,
        kcal: event.target.kcal.value,
        protein: event.target.protein.value,
        fat: event.target.fat.value,
        carbs: event.target.carbs.value,
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="name" id="name" name="name" />
      <br></br>
      <label htmlFor="kcal">kcal:</label>
      <input type="text" id="kcal" name="kcal" />
      <br></br>
      <label htmlFor="fat">fat:</label>
      <input type="text" id="fat" name="fat" />
      <br></br>
      <label htmlFor="carbs">carbs:</label>
      <input type="text" id="carbs" name="carbs" />
      <br></br>
      <label htmlFor="protein">prot:</label>
      <input type="text" id="protein" name="protein" />
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
}

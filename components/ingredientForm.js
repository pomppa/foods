export default function Form() {
    const handleSubmit = async (event) => {
        const data = {
            category: event.target.category.value,
            name: event.target.name.value,
            kcal: event.target.kcal.value,
            protein: event.target.protein.value,
            carbs: event.target.carbs.value,
            fat: event.target.fat.value,
        }
        
        const JSONdata = JSON.stringify(data);

        const endPoint = '/api/ingredients';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata
        }

        const response = await fetch(endPoint, options);

    }
    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="category">Category</label>
                <input type="text" id="category" name="category" /><br></br>
                
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" /><br></br>
                
                <label htmlFor="kcal">kcal</label>
                <input type="text" id="kcal" name="kcal" /><br></br>
                
                <label htmlFor="protein">protein</label>
                <input type="text" id="protein" name="protein" /><br></br>
                
                <label htmlFor="carbs">carbs</label>
                <input type="text" id="carbs" name="carbs" /><br></br>
                
                <label htmlFor="fat">fat</label>
                <input type="text" id="fat" name="fat" /><br></br>
                
                <button type="submit">Submit</button>
            </form> 
        </div>
    )
  }
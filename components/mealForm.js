export default function MealForm() {
    const handleSubmit = async (event) => {
        const data = {
            category: event.target.category.value,
            name: event.target.name.value,

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
                
                <label for="ingredients">Choose ingredients:</label>
                <select name="ingredients" id="ingredients" multiple>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
                <button type="submit">Submit</button>
            </form> 
        </div>
    )
  }
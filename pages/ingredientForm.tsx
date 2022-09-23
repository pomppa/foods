import React, { useState, useEffect } from 'react';
import Head from 'next/head'

export default function IngredientForm() {
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      name: event.target.name.value,
      kcal: event.target.kcal.value,
      protein: event.target.protein.value,
      fat: event.target.fat.value,
      carbs: event.target.carbs.value,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/ingredients'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
  }
  return (
    // We pass the event to the handleSubmit() function on submit.
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="name" id="name" name="name" />
      <label htmlFor="kcal">kcal:</label>
      <input type="text" id="kcal" name="kcal" />
      <label htmlFor="protein">prot:</label>
      <input type="text" id="protein" name="protein" />
      <label htmlFor="carbs">carbs:</label>
      <input type="text" id="carbs" name="carbs" />
      <label htmlFor="fat">fat:</label>
      <input type="text" id="fat" name="fat" />
      <button type="submit">Submit</button>
    </form>

  )
}

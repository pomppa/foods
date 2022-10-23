import { useEffect, useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

interface FormData {
  name: string;
  kcal: string;
  fat: string;
  carbs: string;
  protein: string;
}

export default function IngredientForm() {
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleSubmit = async (event) => {
    await fetch('/api/ingredients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ m: 2 }}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          onChange={(event) => {
            setFormData((prevState) => ({
              ...prevState,
              name: event.target.value,
            }));
          }}
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <TextField
          label="Calories"
          variant="outlined"
          name="kcal"
          onChange={(event) => {
            setFormData((prevState) => ({
              ...prevState,
              kcal: event.target.value,
            }));
          }}
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <TextField
          label="Fats"
          variant="outlined"
          name="fat"
          onChange={(event) => {
            setFormData((prevState) => ({
              ...prevState,
              fat: event.target.value,
            }));
          }}
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <TextField
          label="Carbs"
          variant="outlined"
          name="carbs"
          onChange={(event) => {
            setFormData((prevState) => ({
              ...prevState,
              carbs: event.target.value,
            }));
          }}
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <TextField
          label="Proteins"
          variant="outlined"
          name="protein"
          onChange={(event) => {
            setFormData((prevState) => ({
              ...prevState,
              protein: event.target.value,
            }));
          }}
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <Button variant="contained" onClick={(event) => handleSubmit(event)}>
          Submit
        </Button>
      </Box>
    </form>
  );
}

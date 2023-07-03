import { useState } from 'react';
import { Alert, Snackbar, TextField, Box, Button } from '@mui/material';
import { IngredientFormData } from '../../interfaces';

/**
 * Form for submitting new ingredient
 * @returns
 */
export default function IngredientForm() {
  const [formData, setFormData] = useState<IngredientFormData>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    await fetch('/api/ingredients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setFormData(null);
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 2500);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Ingredient saved!
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 2 }}>
          <TextField
            required
            label="Name"
            variant="outlined"
            name="name"
            value={formData?.name || ''}
            onChange={(event) => {
              setFormData((prevState) => ({
                ...prevState,
                name: event.target.value,
              }));
            }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            required
            label="Calories"
            variant="outlined"
            name="kcal"
            value={formData?.kcal || ''}
            inputProps={{
              type: 'number',
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
            onChange={(event) => {
              setFormData((prevState) => ({
                ...prevState,
                kcal: parseFloat(event.target.value),
              }));
            }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            required
            label="Fats"
            variant="outlined"
            name="fat"
            value={formData?.fat || ''}
            inputProps={{
              type: 'number',
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
            onChange={(event) => {
              setFormData((prevState) => ({
                ...prevState,
                fat: parseFloat(event.target.value),
              }));
            }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            required
            label="Carbs"
            variant="outlined"
            name="carbs"
            value={formData?.carbs || ''}
            inputProps={{
              type: 'number',
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
            onChange={(event) => {
              setFormData((prevState) => ({
                ...prevState,
                carbs: parseFloat(event.target.value),
              }));
            }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            required
            label="Protein"
            variant="outlined"
            name="protein"
            value={formData?.protein || ''}
            inputProps={{
              type: 'number',
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
            onChange={(event) => {
              setFormData((prevState) => ({
                ...prevState,
                protein: parseFloat(event.target.value),
              }));
            }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Box>
      </form>
    </>
  );
}

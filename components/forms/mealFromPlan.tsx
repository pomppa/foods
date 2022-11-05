import { Button, Box, TextField } from '@mui/material';
import { useState } from 'react';

export default function MealFromPlan(props) {
  const [mealName, setMealName] = useState('');

  return (
    <>
      <TextField
        label="Meal name"
        variant="outlined"
        name="name"
        value={mealName || ''}
        sx={{ width: 300, mt: 4 }}
        onChange={(event) => {
          setMealName(event.target.value);
          props.setMealName(event.target.value);
        }}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            setMealName('');
            props.saveMealFromPlan();
          }}
        >
          Save
        </Button>
        <Button
          sx={{ ml: 2 }}
          color="error"
          variant="contained"
          onClick={() => props.setDisplayMealSave(false)}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
}

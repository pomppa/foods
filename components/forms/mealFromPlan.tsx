import { Button, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { store } from '../../lib/redux/store';

export default function MealFromPlan(props) {
  const [mealName, setMealName] = useState('');

  //   useEffect(() => {
  //     console.log(mealName);
  //     console.log(store.getState().valueUpdated);
  //   }, [mealName]);

  const saveNewMeal = () => {
    console.log('saving');
    console.log(mealName);
    console.log(store.getState().valueUpdated);
  };

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
        <Button variant="contained" onClick={() => saveNewMeal()}>
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

import { Button, Box, TextField } from '@mui/material';
import { useState } from 'react';

/**
 * Save meal from plan, input meal name only
 * @param props
 * @returns
 */
export default function MealFromPlan(props) {
  const [mealName, setMealName] = useState(props.mealName);
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
        }}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            props.saveMealFromPlan(mealName);
            props.setMealName('');
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

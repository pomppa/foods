import React, { useState } from 'react';
import { Grid, TextField, Button, Grow } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { green, grey } from '@mui/material/colors';

const SaveMeal = ({ hasNullValues, onSave }) => {
  const [isSavingEnabled, setIsSavingEnabled] = useState(false);
  const [mealName, setMealName] = useState('');

  const handleSaveButtonClick = () => {
    setIsSavingEnabled(true);
  };

  const handleMealNameChange = (event) => {
    setMealName(event.target.value);
  };

  const handleConfirmSaveClick = () => {
    onSave(mealName);
    setMealName('');
    setIsSavingEnabled(false);
  };

  const handleCancelClick = () => {
    setIsSavingEnabled(false);
  };

  return (
    <Grid container spacing={2}>
      {isSavingEnabled && (
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Grow in={isSavingEnabled}>
            <TextField
              label="Meal Name"
              variant="outlined"
              value={mealName}
              onChange={handleMealNameChange}
            />
          </Grow>
        </Grid>
      )}

      <Grid item xs={12}>
        {!isSavingEnabled && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveButtonClick}
            disabled={hasNullValues}
            style={{
              backgroundColor: hasNullValues ? grey[850] : green[500],
            }}
            startIcon={<SaveIcon />}
          >
            Save Meal
          </Button>
        )}

        {isSavingEnabled && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmSaveClick}
              disabled={!mealName.trim() || hasNullValues}
              sx={{
                backgroundColor:
                  !mealName.trim() || hasNullValues ? grey[850] : green[500],
                marginRight: '8px',
              }}
              startIcon={<SaveIcon />}
            >
              Confirm & Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCancelClick}
              sx={{ backgroundColor: grey[300] }}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default SaveMeal;

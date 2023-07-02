import React, { useState } from 'react';
import { Grid, TextField, Button, Grow, ButtonGroup } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { green, grey } from '@mui/material/colors';

const SaveMeal = ({
  meal = '',
  hasNullValues,
  onSave,
  isSavingEnabled,
  onButtonClick,
}) => {
  const [mealName, setMealName] = useState(meal);

  const handleButtonClick = (value: boolean) => {
    onButtonClick(value);
  };

  const handleMealNameChange = (event) => {
    setMealName(event.target.value);
  };

  const handleConfirmSaveClick = () => {
    onSave(mealName);
    setMealName('');
    onButtonClick(false);
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
              sx={{
                width: { xs: '100%', md: '33%' },
              }}
            />
          </Grow>
        </Grid>
      )}
      <Grid item xs={12} sx={{ mt: 1 }}>
        {!isSavingEnabled && (
          <Grid
            item
            xs={12}
            sx={{
              display: { xs: 'flex', sm: 'initial' },
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleButtonClick(true)}
              disabled={hasNullValues}
              sx={{
                backgroundColor: hasNullValues ? grey[850] : green[500],
                width: { xs: '80%', md: 'auto' },
                display: {
                  xs: 'none',
                  sm: 'initial',
                },
              }}
              startIcon={<SaveIcon />}
            >
              Save Meal
            </Button>
          </Grid>
        )}
        {isSavingEnabled && (
          <Grid
            item
            xs={12}
            sx={{
              display: { xs: 'flex', sm: 'initial' },
              justifyContent: 'center',
            }}
          >
            <ButtonGroup>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmSaveClick}
                disabled={!mealName.trim() || hasNullValues}
                style={{
                  backgroundColor:
                    !mealName.trim() || hasNullValues ? grey[850] : green[500],
                }}
                startIcon={<SaveIcon />}
              >
                Confirm & Save
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleButtonClick(false)}
                style={{ backgroundColor: grey[300] }}
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default SaveMeal;

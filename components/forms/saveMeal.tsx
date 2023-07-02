import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Grow,
  ButtonGroup,
  CircularProgress,
  Box,
} from '@mui/material';
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
  const [loading, setLoading] = useState(false);

  const handleButtonClick = (value: boolean) => {
    onButtonClick(value);
  };

  const handleMealNameChange = (event) => {
    setMealName(event.target.value);
  };

  const handleConfirmSaveClick = () => {
    setLoading(true);
    onSave(mealName);
  };

  return (
    <Grid container spacing={2}>
      {isSavingEnabled && (
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Grow in={isSavingEnabled}>
            <TextField
              label="Name"
              disabled={loading}
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
                onClick={() => handleButtonClick(false)}
                style={{ backgroundColor: grey[400] }}
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmSaveClick}
                disabled={!mealName.trim() || hasNullValues || loading}
                style={{
                  backgroundColor:
                    !mealName.trim() || hasNullValues || loading
                      ? grey[850]
                      : green[500],
                }}
                startIcon={<SaveIcon />}
              >
                <Box>
                  Save
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                  )}
                </Box>
              </Button>
            </ButtonGroup>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default SaveMeal;

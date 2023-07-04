import {
  InputAdornment,
  Slider,
  Typography,
  TextField,
  Grid,
  Input,
} from '@mui/material';
import { useEffect } from 'react';

export default function IngredientForm(props) {
  const {
    initialIngredient,
    name,
    setName,
    kcal,
    setKcal,
    fat,
    setFat,
    carbs,
    setCarbs,
    protein,
    setProteins,
    onStateChange,
  } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <TextField
          required
          fullWidth
          label="Name"
          variant="standard"
          value={name}
          onChange={(event) => {
            onStateChange(false);
            setName(event.target.value);
          }}
          sx={{ mb: 3 }}
        />
        <Typography variant="overline" display="block" gutterBottom>
          Calories
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              value={kcal}
              onChange={(event, newValue) => {
                onStateChange(false);
                setKcal(Number(newValue));
              }}
              min={0}
              max={1000}
              step={1}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item>
            <Input
              value={kcal}
              size="small"
              fullWidth
              onChange={(event) => {
                onStateChange(false);
                setKcal(Number(event.target.value));
              }}
              inputProps={{
                min: 0,
                max: 1000,
                type: 'number',
              }}
              endAdornment={<InputAdornment position="end">g</InputAdornment>}
            />
          </Grid>
        </Grid>
        <Typography variant="overline" display="block" gutterBottom>
          Fats
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              value={fat}
              onChange={(event, newValue) => {
                onStateChange(false);
                setFat(Number(newValue));
              }}
              min={0}
              max={200}
              step={1}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item>
            <Input
              value={fat}
              size="small"
              onChange={(event) => {
                onStateChange(false);
                setFat(Number(event.target.value));
              }}
              inputProps={{
                min: 0,
                max: 1000,
                type: 'number',
              }}
              endAdornment={<InputAdornment position="end">g</InputAdornment>}
            />
          </Grid>
        </Grid>
        <Typography variant="overline" display="block" gutterBottom>
          Carbs
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              value={carbs}
              onChange={(event, newValue) => {
                onStateChange(false);
                setCarbs(Number(newValue));
              }}
              min={0}
              max={500}
              step={1}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item>
            <Input
              value={carbs}
              size="small"
              onChange={(event) => {
                onStateChange(false);
                setCarbs(Number(event.target.value));
              }}
              inputProps={{
                min: 0,
                max: 1000,
                type: 'number',
              }}
              endAdornment={<InputAdornment position="end">g</InputAdornment>}
            />
          </Grid>
        </Grid>
        <Typography variant="overline" display="block" gutterBottom>
          Proteins
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              value={protein}
              onChange={(event, newValue) => {
                onStateChange(false);
                setProteins(Number(newValue));
              }}
              min={0}
              max={200}
              step={1}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item>
            <Input
              value={protein}
              size="small"
              onChange={(event) => {
                onStateChange(false);
                setProteins(Number(event.target.value));
              }}
              inputProps={{
                min: 0,
                max: 1000,
                type: 'number',
              }}
              endAdornment={<InputAdornment position="end">g</InputAdornment>}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid
        item
        xs={12}
        sm={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          position: 'sticky',
          bottom: '16px',
          marginLeft: { xs: 'unset', sm: '280px' },
          zIndex: 1,
        }}
      >
        <Fab
          aria-label="Save"
          color="primary"
          disabled={!name.trim() || !isAnyValueNonZero || !saveEnabled}
          onClick={handleSubmit}
          sx={{ marginBottom: '8px' }}
        >
          {isSaving ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <SaveIcon />
          )}
        </Fab>
        <Fab
          aria-label="Back"
          color="secondary"
          disabled={isSaving}
          onClick={handleBack}
        >
          <BackIcon />
        </Fab>
      </Grid> */}
    </Grid>
  );
}

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  InputAdornment,
  Slider,
  Box,
  Typography,
  TextField,
  Grid,
  Input,
  Fab,
  CircularProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BackIcon from '@mui/icons-material/ArrowBack';

export default function IngredientForm(props) {
  const { initialIngredient } = props;

  const [saveEnabled, setSaveEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  const [name, setName] = useState('');
  const [kcal, setKcal] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProteins] = useState(0);

  useEffect(() => {
    if (initialIngredient) {
      setName(initialIngredient.name);
      setKcal(Number(initialIngredient.kcal));
      setFat(Number(initialIngredient.fat));
      setCarbs(Number(initialIngredient.carbs));
      setProteins(Number(initialIngredient.protein));
    }
  }, [initialIngredient]);

  const handleSubmit = async () => {
    setIsSaving(true);

    try {
      const url = initialIngredient
        ? '/api/updateIngredient'
        : '/api/createIngredient';

      const method = initialIngredient ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: initialIngredient?.id,
          name,
          kcal,
          fat,
          carbs,
          protein,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save ingredient');
      }
      router.push(`/ingredient/list`);
    } catch (error) {
      router.push(`/ingredient/create`);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const isAnyValueNonZero =
    kcal !== 0 || fat !== 0 || carbs !== 0 || protein !== 0;

  return (
    <Box sx={{ width: 250, mb: 2, ml: 2, mt: 1 }}>
      <TextField
        required
        fullWidth
        label="Name"
        variant="standard"
        value={name}
        onChange={(event) => {
          setSaveEnabled(true);
          setName(event.target.value);
        }}
        sx={{ mb: 3 }}
      />
      <Box>
        <Typography variant="overline" display="block" gutterBottom>
          Calories
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              value={kcal}
              onChange={(event, newValue) => {
                setSaveEnabled(true);
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
                setSaveEnabled(true);
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
                setSaveEnabled(true);
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
                setSaveEnabled(true);
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
                setSaveEnabled(true);
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
                setSaveEnabled(true);
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
                setSaveEnabled(true);
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
                setSaveEnabled(true);
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
      </Box>

      <Fab
        aria-label="Save"
        color="primary"
        disabled={!name.trim() || !isAnyValueNonZero || !saveEnabled}
        sx={{
          position: 'fixed',
          bottom: '80px',
          right: '16px',
        }}
        onClick={handleSubmit}
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
        sx={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
        }}
      >
        <BackIcon />
      </Fab>
    </Box>
  );
}

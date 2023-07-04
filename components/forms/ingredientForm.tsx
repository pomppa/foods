import {
  InputAdornment,
  Slider,
  Typography,
  TextField,
  Grid,
  Input,
  Paper,
  Box,
} from '@mui/material';

export default function IngredientForm(props) {
  const {
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
      <Grid item xs={12} mt={2}>
        <Paper
          sx={{
            padding: '16px',
            borderRadius: '8px',
          }}
        >
          <Box>
            <Typography variant="overline" display="block" gutterBottom>
              Calories
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Slider
                  value={kcal}
                  onChange={(event, newValue) => {
                    onStateChange(false);
                    setKcal(Number(newValue));
                  }}
                  min={0}
                  max={999}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid>
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
                      max: 999,
                      type: 'number',
                    }}
                    endAdornment={
                      <InputAdornment position="end">kcal/100g</InputAdornment>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box mt={3}>
            <Typography variant="overline" display="block" gutterBottom>
              Fats
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Slider
                  value={fat}
                  onChange={(event, newValue) => {
                    onStateChange(false);
                    setFat(Number(newValue));
                  }}
                  min={0}
                  max={100}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid container justifyContent="flex-end">
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
                      max: 100,
                      type: 'number',
                    }}
                    endAdornment={
                      <InputAdornment position="end">g</InputAdornment>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box mt={3}>
            <Typography variant="overline" display="block" gutterBottom>
              Carbs
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Slider
                  value={carbs}
                  onChange={(event, newValue) => {
                    onStateChange(false);
                    setCarbs(Number(newValue));
                  }}
                  min={0}
                  max={100}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid container justifyContent="flex-end">
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
                      max: 100,
                      type: 'number',
                    }}
                    endAdornment={
                      <InputAdornment position="end">g</InputAdornment>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box mt={3}>
            <Typography variant="overline" display="block" gutterBottom>
              Protein
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Slider
                  value={protein}
                  onChange={(event, newValue) => {
                    onStateChange(false);
                    setProteins(Number(newValue));
                  }}
                  min={0}
                  max={100}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid container justifyContent={'flex-end'}>
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
                      max: 100,
                      type: 'number',
                    }}
                    endAdornment={
                      <InputAdornment position="end">g</InputAdornment>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box mt={6}>
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
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

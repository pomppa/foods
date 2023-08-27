import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

function About() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h5" mt={2}>
          Foods
        </Typography>
        <Typography variant="body1" mt={2}>
          A meal planner and macronutrient calculator for tracking nutrient
          intake
        </Typography>
        <Typography variant="body2" mt={5}>
          1509 food items from Finnish national Food Composition Database{' '}
          <Link href="https://fineli.fi/fineli/fi/index">
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecoration: 'underline',
              }}
            >
              Fineli
            </a>
          </Link>
          .
        </Typography>
      </Grid>
    </Grid>
  );
}

export default About;

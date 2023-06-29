import { Grid, List, ListItem } from '@mui/material';

function Dashboard() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h3>Foods</h3>
          <small>
            A meal planner and macronutrients calculator to calculate your
            nutrient intake
          </small>
        </Grid>
        <Grid item xs={6}>
          <h3>How to use?</h3>
          <p>Foods enables meal planning and nutrient tracking</p>
          <List>
            <ListItem>1. Left hand menu displays all pages in Foods</ListItem>
            <ListItem>2. Use Plan a meal -page to create your meal</ListItem>
            <ListItem>
              3. Plan a meal by selecting ingredients and their weights
            </ListItem>
            <ListItem>
              4. Inspect your meal macro percentages and contents
            </ListItem>
            <ListItem>5. Save your meal</ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <h3>Adding ingredients</h3>
          <p>
            Foods has over thousand ingredients that you can use. Ingredients
            are from{' '}
            <a
              href="https://fineli.fi/fineli/fi/index"
              rel="noopener noreferrer"
              target="_blank"
            >
              Fineli Database
            </a>
          </p>
          <List>
            <ListItem>
              1. You can add your own ingredients from Ingredients -page
            </ListItem>
            <ListItem>2. Input name and nutrients</ListItem>
            <ListItem>3. Save your ingredient</ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <h3>Browsing and editing meals</h3>
          <p>From Meals -page you can inspect your meals</p>
          <List>
            <ListItem>1. Choose a meal you want to edit or inspect</ListItem>
            <ListItem>2. Click Edit</ListItem>
            <ListItem>
              3. Edit meal contents and inspect changes realtime
            </ListItem>
            <ListItem>4. Save edited meal</ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;

import { Grid, List, ListItem, ListItemText } from '@mui/material';
import Link from 'next/link';

function Main() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <h3>Foods</h3>
          <p>
            A meal planner and macronutrients calculator to calculate your
            nutrient intake
          </p>
        </Grid>
        <Grid item xs={12} sm={4}>
          <h3>How to use</h3>
          <p>Foods enables meal planning and nutrient tracking</p>
          <List>
            <ListItem>
              <ListItemText>
                1. Left hand menu displays all pages in Foods
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                2. Use <Link href="/plan">Plan a meal</Link> -page to create
                your meal
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                3. Plan a meal by selecting ingredients and their weights
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                4. Inspect your meal macro percentages and contents
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>5. Save your meal</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={4}>
          <h3>Adding ingredients</h3>
          <p>
            Foods has over thousand ingredients that you can use. Ingredients
            are from{' '}
            <a
              href="https://fineli.fi/fineli/fi/index"
              rel="noopener noreferrer"
              target="_blank"
            >
              Fineli
            </a>{' '}
            Food Composition Database (THL).
          </p>
          <List>
            <ListItem>
              <ListItemText>
                1. You can add your own ingredients from{' '}
                <Link href="/ingredients">Ingredients</Link> -page
              </ListItemText>
            </ListItem>
            <ListItem>2. Input name and nutrients</ListItem>
            <ListItem>3. Save your ingredient</ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}

export default Main;

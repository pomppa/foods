import { Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { IngredientInterface } from '../types';
import prisma from '../lib/prisma';

type Props = {
  ingredientsJson: string;
};

export const getServerSideProps = async () => {
  const ingredients = await prisma.fineli_Ingredient.findMany();
  const ingredientsJson = JSON.stringify(ingredients);

  return { props: { ingredientsJson } };
};

export default function Fineli(props: Props) {
  const data: IngredientInterface[] = JSON.parse(props.ingredientsJson);
  const fineliData = data.map((x) => {
    return { label: x.name, id: x.id };
  });

  return (
    <Grid container spacing="{}">
      <h2>Fineli</h2>
      <Autocomplete
        disablePortal
        id="fineli-combo-box"
        options={fineliData}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Search Fineli data" />
        )}
      />
    </Grid>
  );
}

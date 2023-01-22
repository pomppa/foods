import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import prisma from '../lib/prisma';

export const getServerSideProps = async ({ req }) => {
  const ingredients = await prisma.fineli_Ingredient.findMany();

  const ingredientsJson = JSON.stringify(ingredients, null, 2);

  return { props: { ingredientsJson } };
};

export default function Fineli(props) {
  const data = JSON.parse(props.ingredientsJson);
  //   console.log(props.ingredientsJson);
  const fineliData = data.map((x, i) => {
    return { label: x.name, id: x.id };
  });

  return (
    <>
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
    </>
  );
}

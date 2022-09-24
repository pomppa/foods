import Link from 'next/link'
import Navigator from './navigator'
import Box from '@mui/material/Box';
import Meals from './meals';
import Ingredients from './ingredients';
import React, { SetStateAction } from 'react';
import { Divider, Drawer } from '@mui/material';
import { useState } from 'react';

function Home() {
  const [mainPage, setMainPage] = useState('');

  function setPageToDisplay(page: SetStateAction<string>) {
    setMainPage(page);
  }
  return (
    <React.Fragment>
      <Drawer variant="permanent">
        <Navigator handler={setPageToDisplay}></Navigator>
      </Drawer>
      <Divider></Divider>
      <Box sx={{ flex: 1, px: 20}}>
        {
          mainPage === 'meals' ? <Meals></Meals> : ''
        }
        {
          mainPage === 'ingredients' ? <Ingredients></Ingredients> : ''

        }
      </Box>
    </React.Fragment>

  )
}

export default Home

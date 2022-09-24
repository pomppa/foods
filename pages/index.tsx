import Head from "next/head";
import Box from "@mui/material/Box";
import Meals from "./meals";
import Ingredients from "./ingredients";
import React, { SetStateAction } from "react";
import { useState } from "react";
import ResponsiveDrawer from "../components/responsiveDrawer";
function Home() {
  const [mainPage, setMainPage] = useState("");

  function setPageToDisplay(page: SetStateAction<string>) {
    setMainPage(page);
  }
  return (
    <>
      <ResponsiveDrawer handler={setPageToDisplay}></ResponsiveDrawer>
      <Head>
        <title>Foods</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ flex: 1, px: 35 }}>
        {mainPage === "meals" ? <Meals></Meals> : ""}
        {mainPage === "ingredients" ? <Ingredients></Ingredients> : ""}
      </Box>
    </>
  );
}

export default Home;

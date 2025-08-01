import React from "react";
import { Box, CssBaseline } from "@mui/material";
import {
  Hero,
  HowItWorks,
  TrendingServices,
  BrowseTalent,
  Testimonials,
  TalentStats,
} from "@/components/home/";

const Home = () => {
  return (
    <>
      <CssBaseline />
      <Box component="main">
        <Hero />
        <HowItWorks />
        <TrendingServices />
        <BrowseTalent />
        <TalentStats />
        <Testimonials />
      </Box>
    </>
  );
};

export default Home;

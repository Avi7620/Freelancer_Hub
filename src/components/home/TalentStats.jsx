import React from "react";
import { Box, Typography, Grid, Container, Stack } from "@mui/material";
import {
  People as PeopleIcon,
  ThumbUp as ThumbUpIcon,
  ShoppingCart as ShoppingCartIcon,
  TaskAlt as TaskAltIcon,
} from "@mui/icons-material";

const statsData = [
  { label: "Total Freelancers", value: "890M", icon: PeopleIcon },
  { label: "Positive Reviews", value: "750M", icon: ThumbUpIcon },
  { label: "Orders Received", value: "98M", icon: ShoppingCartIcon },
  { label: "Projects Completed", value: "336M", icon: TaskAltIcon },
];

const TalentStats = () => (
  <Container maxWidth="lg" sx={{ py: 10 }}>
    <Box sx={{ textAlign: "center", mb: 6 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "2.5rem" },
          mb: 2,
        }}
      >
        Find the talent needed to get your business growing.
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          maxWidth: 600,
          mx: "auto",
        }}
      >
        Work with the largest network of independent professionals and get
        things done—from quick turnarounds.
      </Typography>
    </Box>

    <Grid container spacing={4} justifyContent="center">
      {statsData.map(({ label, value, icon: Icon }, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Box
            sx={{
              p: 3,
              height: "100%",
              textAlign: "center",
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: "background.paper",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <Stack spacing={1} alignItems="center">
              <Icon sx={{ fontSize: 40 }} color="primary" />
              <Typography variant="h4" color="primary" fontWeight={700}>
                {value}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {label}
              </Typography>
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default TalentStats;

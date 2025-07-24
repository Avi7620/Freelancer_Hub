import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import heroImage from "../../assets/images/main.png";

const Hero = () => {
  return (
    <Box sx={{ backgroundColor: "white", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} columns={12} alignItems="center">
          {/* Text Section */}
          <Grid sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" },
                lineHeight: 1.2,
                color: "text.primary",
              }}
            >
              Hire the mobile freelancers for
              <br />
              any project.
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: "text.secondary",
                fontSize: "1.25rem",
                fontWeight: 400,
              }}
            >
              Millions of people use freelo.com to turn their ideas into
              reality.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ px: 4, py: 1.5, fontWeight: 600, whiteSpace: "nowrap" }}
              >
                Find Work
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderWidth: 2,
                  whiteSpace: "nowrap",
                  "&:hover": { borderWidth: 2 },
                }}
              >
                Find Talent
              </Button>
            </Box>
          </Grid>

          {/* Image Section */}
          <Grid
            sx={{
              gridColumn: { xs: "span 12", md: "span 6" },
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={heroImage}
              alt="Freelancers working"
              sx={{
                width: "100%",
                maxWidth: 500,
                height: "auto",
                borderRadius: 2,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;

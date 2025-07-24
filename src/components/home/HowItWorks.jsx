import React from "react";
import { Box, Typography, Card, CardContent, Container } from "@mui/material";
import { PostAdd, People, Payment } from "@mui/icons-material";

const HowItWorks = () => {
  const steps = [
    {
      icon: <PostAdd color="primary" sx={{ fontSize: 40 }} />,
      title: "Post a job",
      description:
        "It's free and easy to post a job. Simply fill in a title and description of your mobile app project.",
    },
    {
      icon: <People color="primary" sx={{ fontSize: 40 }} />,
      title: "Choose freelancers",
      description:
        "Browse profiles, reviews, and portfolios. Interview candidates and hire the best fit for your mobile project.",
    },
    {
      icon: <Payment color="primary" sx={{ fontSize: 40 }} />,
      title: "Pay safely",
      description:
        "Our secure payment system ensures you only pay when you're satisfied with the delivered mobile app.",
    },
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4 }}>
          How It Works
        </Typography>

        {/* Horizontal scroll container (unchanged visually) */}
        <Box
          sx={{
            display: "flex",
            overflowX: { xs: "auto", md: "visible" },
            gap: 3,
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            px: { xs: 2, md: 0 },
            // Hide scrollbar while keeping functionality
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {steps.map((step, index) => (
            <Box
              key={index}
              sx={{
                minWidth: { xs: 280, sm: 300 },
                flex: { xs: "0 0 auto", md: "1" },
                scrollSnapAlign: "start",
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 3 }}>{step.icon}</Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;

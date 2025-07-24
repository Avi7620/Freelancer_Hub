import React from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Button,
} from "@mui/material";
import Slider from "react-slick";

const TrendingServices = () => {
  const services = [
    {
      title: "iOS App Development",
      description:
        "Professional iOS app development with Swift and modern UI design principles",
      rating: 4.5,
      reviews: 128,
      price: 89,
      freelancer: "Sarah Johnson",
      category: "Development & IT",
      color1: "#4F6BED", // Added fixed gradient colors
      color2: "#25B7D3",
    },
    {
      title: "Android App Development",
      description:
        "Native Android app development with Kotlin for your business needs",
      rating: 4.8,
      reviews: 95,
      price: 75,
      freelancer: "Michael Chen",
      category: "Development & IT",
      color1: "#6E48AA",
      color2: "#9D50BB",
    },
    {
      title: "Flutter Cross-Platform",
      description:
        "Build beautiful cross-platform apps for iOS and Android using Flutter",
      rating: 4.2,
      reviews: 76,
      price: 65,
      freelancer: "David Wilson",
      category: "Development & IT",
      color1: "#11998E",
      color2: "#38EF7D",
    },
    {
      title: "React Native Development",
      description: "JavaScript-based mobile apps with React Native framework",
      rating: 4.3,
      reviews: 82,
      price: 70,
      freelancer: "Emily Rodriguez",
      category: "Programming & Tech",
      color1: "#FC466B",
      color2: "#3F5EFB",
    },
    {
      title: "SwiftUI Animations",
      description: "Modern iOS animations using SwiftUI",
      rating: 4.6,
      reviews: 40,
      price: 100,
      freelancer: "Olivia White",
      category: "Design & Animation",
      color1: "#C471F5",
      color2: "#FA71CD",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          dots: false, // Better mobile UX
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ mb: 2, fontWeight: 700 }}
        >
          Trending Mobile Development Services
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 6, color: "text.secondary" }}
        >
          Most viewed and all-time top-selling services
        </Typography>

        {/* Slider - Visuals remain identical */}
        <Slider {...sliderSettings}>
          {services.map((service, index) => (
            <Box key={index} sx={{ px: 2 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-5px)" }, // Added subtle hover effect
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 160,
                    background: `linear-gradient(45deg, ${service.color1}, ${service.color2})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1.2rem",
                    textAlign: "center",
                    p: 2,
                  }}
                >
                  {service.title}
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, minHeight: 60 }}
                  >
                    {service.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Rating
                      value={service.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {service.rating} ({service.reviews} reviews)
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Category:</strong> {service.category}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Freelancer:</strong> {service.freelancer}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" color="primary">
                    ${service.price}/hr
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  >
                    Hire Now
                  </Button>
                </Box>
              </Card>
            </Box>
          ))}
        </Slider>

        {/* View All Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Button variant="outlined" size="large" sx={{ px: 4 }}>
            View All Services
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TrendingServices;

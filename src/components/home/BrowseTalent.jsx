import React from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { Star } from "@mui/icons-material";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const BrowseTalent = () => {
  const topFreelancers = [
    { name: "Thomas Powell", role: "Mobile Designer", rating: 4.0 },
    { name: "Tom Wilson", role: "Marketing Manager", rating: 4.5 },
    { name: "Robert Fox", role: "iOS Developer", rating: 4.5 },
    { name: "Ali Tufan", role: "UX/UI Designer", rating: 4.5 },
    { name: "Agent Pakulla", role: "Android Developer", rating: 4.0 },
    { name: "John Smith", role: "Flutter Developer", rating: 4.7 },
  ];

  return (
    <Box sx={{ py: 8, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h4" fontWeight={700}>
            Highest Rated Freelancers
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mt={1}>
            Top mobile development experts ready for your projects
          </Typography>
        </Box>

        <Swiper
          spaceBetween={24} // Increased spacing
          slidesPerView={3}
          pagination={{
            clickable: true,
            dynamicBullets: true, // Better pagination UI
          }}
          autoplay={{
            delay: 2500,
            pauseOnMouseEnter: true, // Pause on hover
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            600: { slidesPerView: 2, spaceBetween: 20 },
            900: { slidesPerView: 3, spaceBetween: 24 },
          }}
          style={{
            paddingBottom: 40, // Space for pagination
          }}
        >
          {topFreelancers.map((freelancer, index) => (
            <SwiperSlide key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  height: "100%",
                  minHeight: 300, // Fixed height
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1, // Ensures content fills space
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    py: 4,
                    px: 3,
                  }}
                >
                  <Avatar
                    sx={{ width: 80, height: 80, mb: 2 }}
                    alt={freelancer.name}
                    src={`https://i.pravatar.cc/150?img=${index + 10}`}
                  />
                  <Typography variant="h6" fontWeight={600}>
                    {freelancer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {freelancer.role}
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mt: "auto" }}
                  >
                    <Star sx={{ color: "gold", mr: 0.5 }} />
                    <Typography variant="body1">{freelancer.rating}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default BrowseTalent;

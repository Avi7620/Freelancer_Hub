import React from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { FormatQuote } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    quote:
      "I found an excellent iOS developer for my startup app. The quality of work exceeded my expectations and the communication was excellent throughout the project.",
    name: "Courtney Henry",
    role: "Startup Founder",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    quote:
      "The Android developer I hired through Freeio delivered our app on time and within budget. His insights actually improved our initial concept significantly.",
    name: "James Wilson",
    role: "Product Manager",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    quote:
      "Our Flutter developer created a beautiful cross-platform app that works perfectly on both iOS and Android. Highly recommended for any mobile project!",
    name: "Sophia Chen",
    role: "Marketing Director",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const Testimonials = () => (
  <Box sx={{ py: 8, bgcolor: "background.default" }}>
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h2"
        align="center"
        sx={{ mb: 2, fontWeight: 700 }}
      >
        What Our Clients Say
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ mb: 6, color: "text.secondary" }}
      >
        Success stories from businesses that found their perfect mobile
        developer
      </Typography>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 3500,
          pauseOnMouseEnter: true, // Better UX
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true, // Smoher pagination
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: 3,
                position: "relative",
              }}
            >
              <FormatQuote
                sx={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  fontSize: 60,
                  color: "action.disabled",
                  opacity: 0.3,
                  transform: "scaleX(-1)",
                }}
              />
              <CardContent sx={{ p: 4, pt: 8 }}>
                <Typography variant="body1" sx={{ mb: 3, fontStyle: "italic" }}>
                  "{testimonial.quote}"
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={testimonial.avatar}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="500">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  </Box>
);

export default Testimonials;

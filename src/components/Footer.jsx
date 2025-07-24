import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  Divider,
} from "@mui/material";

const footerLinks = [
  {
    title: "About",
    links: [
      { text: "About Us", path: "/about" },
      { text: "Become Seller", path: "/seller" },
      { text: "Jobs on Freeio", path: "/jobs" },
      { text: "Pricing", path: "/pricing" },
      { text: "Services", path: "/services" },
      { text: "Terms of Service", path: "/terms" },
    ],
  },
  {
    title: "Categories",
    links: [
      { text: "iOS Development", path: "/categories/ios" },
      { text: "Android Development", path: "/categories/android" },
      { text: "React Native", path: "/categories/react-native" },
      { text: "Flutter", path: "/categories/flutter" },
      { text: "Mobile UI/UX", path: "/categories/ui-ux" },
      { text: "Mobile Testing", path: "/categories/testing" },
    ],
  },
  {
    title: "Support",
    links: [
      { text: "Help & Support", path: "/support" },
      { text: "FAQ Freeio", path: "/faq" },
      { text: "Contact Us", path: "/contact" },
      { text: "Services", path: "/services" },
      { text: "Terms of Service", path: "/terms" },
    ],
  },
];

const Footer = () => (
  <Box sx={{ bgcolor: "primary.dark", color: "white", pt: 8, pb: 4 }}>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            Freeio.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: 400 }}>
            The premier platform connecting businesses with top mobile
            development talent worldwide.
          </Typography>

          <Box component="form" sx={{ display: "flex", mt: 3, maxWidth: 500 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your email address"
              size="small"
              sx={{
                bgcolor: "background.paper",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "transparent" },
                  "&.Mui-focused fieldset": { borderColor: "transparent" },
                },
              }}
            />
            <Button variant="contained" color="secondary" sx={{ ml: 1, px: 3 }}>
              Subscribe
            </Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">Download our app:</Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Button variant="outlined" color="inherit" size="small">
                iOS App
              </Button>
              <Button variant="outlined" color="inherit" size="small">
                Android App
              </Button>
            </Box>
          </Box>
        </Grid>

        {footerLinks.map((section, index) => (
          <Grid item xs={12} sm={6} md={2} key={index}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {section.title}
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} style={{ marginBottom: "8px" }}>
                  <Link
                    href={link.path}
                    color="inherit"
                    underline="hover"
                    sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 4 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          © Freeio. {new Date().getFullYear()} CreativeLayers. All rights
          reserved.
        </Typography>
        <Box sx={{ mt: { xs: 2, sm: 0 } }}>
          {["Terms of Service", "Privacy Policy", "Site Map"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              color="inherit"
              underline="hover"
              sx={{ mx: 1, opacity: 0.8, "&:hover": { opacity: 1 } }}
            >
              {item}
            </Link>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
);

export default Footer;

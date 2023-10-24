import React from "react";
import { AppBar, Container, Typography, Toolbar } from "@mui/material";

const Footer = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Container maxWidth="md">
          <Typography
            variant="h6"
            color="textPrimary"
            align="center"
            sx={{ color: "white" }}
          >
           {"Copyright "} &copy; CryptoHub {new Date().getFullYear()}
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;



// import * as React from "react";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import { Box } from "@mui/material";

// export default function Footer() {
//   return (
//     <Box
//       sx={{
//         backgroundColor: (theme) =>
//           theme.palette.mode === "light"
//             ? theme.palette.grey[200]
//             : theme.palette.grey[800],
//         p: 6,
//       }}
//       component="footer"
//     >
//       <Container maxWidth="sm">
//         <Typography variant="body2" color="text.secondary" align="center">
//           {"Copyright © "}
//           <Link color="inherit" href="https://your-website.com/">
//             Your Website
//           </Link>{" "}
//           {new Date().getFullYear()}
//           {"."}
//         </Typography>
//       </Container>
//     </Box>
//   );
// }
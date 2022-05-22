import { Typography, Box } from "@mui/material";

function Header() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h1" component="div" gutterBottom>
        Search for books
      </Typography>
    </Box>
  );
}

export default Header;

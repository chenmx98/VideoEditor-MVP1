import { MovieFilter} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  InputBase,
  Grid,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Grid container direction="row" alignItems="center">
          <MovieFilter /> Video4Kids
        </Grid>

        <Button variant="contained" size="large">
          Sign In
        </Button>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;

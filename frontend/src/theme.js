import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1e40af" },
    secondary: { main: "#0284c7" },
    background: { default: "#f8fafc", paper: "#ffffff" }
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h5: { fontWeight: 700 }
  },
  shape: {
    borderRadius: 12
  }
});

export default theme;

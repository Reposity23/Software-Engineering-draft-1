import { createTheme } from "@mui/material/styles";

const getTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#1e40af" },
      secondary: { main: "#0284c7" },
      background: mode === "dark"
        ? { default: "#0f172a", paper: "#111827" }
        : { default: "#f8fafc", paper: "#ffffff" }
    },
    typography: {
      fontFamily: "Inter, sans-serif",
      h5: { fontWeight: 700 }
    },
    shape: {
      borderRadius: 12
    }
  });

export default getTheme;

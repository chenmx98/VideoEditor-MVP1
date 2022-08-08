import Tools from "./components/Tools";
import Preview from "./components/Preview";
import VideoLibrary from "./components/VideoLibrary";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Tools setMode={setMode} mode={mode} />
          <Stack direction="column" spacing={2}>
            <Preview />
            {/* <Scroll /> */}
          </Stack>
          <VideoLibrary />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";
import Loading from "./components/loading/Loading";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


import "./index.css";
import { Dashboard } from "./screens/Dashbord";
import { Evaluation } from "./screens/evaluation/Evaluation";
import { Event } from "./screens/event/Event";


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Dashboard/>}>
            <Route path ="/" element={<Evaluation/>} />
            <Route path="/events" element={<Event/>}/>
             
            </Route>
          </Routes>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;

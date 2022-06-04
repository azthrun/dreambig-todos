import { Box, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import FirebaseSignin from "./pages/FirebaseSignin";
import useStyles from "./hooks/useStyles";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import ItemDetail from "./pages/ItemDetail";
import RequireAuth from "./components/RequireAuth";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  const { theme, getAppBasicStyles } = useStyles();
  const styles = getAppBasicStyles();

  return (
    <ThemeProvider theme={ theme }>
      <Box sx={ styles.mainContent }>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route>
              <Route path="/" element={
                <RequireAuth>
                    <Home />
                </RequireAuth>
                } 
                />
              <Route path="/login" element={ <FirebaseSignin /> } />
              <Route path="/details" element={                  
                <RequireAuth>                    
                    <ItemDetail />
                </RequireAuth> 
                } 
                />
              <Route path="/about" element={ <About /> } />
            </Route>
          </Routes>
        </AuthProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;

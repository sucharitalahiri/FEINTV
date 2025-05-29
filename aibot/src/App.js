import { Outlet } from 'react-router-dom';
import { useState, useEffect, useMemo, createContext } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { ThemeProvider, createTheme, CssBaseline, Grid } from '@mui/material';


export const ThemeContext = createContext();

function App() {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');
  const [chat, setChat] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Save mode in localStorage
  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  // Create MUI theme inline based on mode
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#7b61ff',
              light: '#d5d2ff',
            },
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
          }
        : {
            primary: {
              main: '#b39ddb',
              light: '#d1c4e9',
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
          }),
    },
    typography: {
      fontWeightBold: 700,
    },
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Grid
          container
          sx={{
            background: 'linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))',
          }}
        >
          <Grid
            item
            xs={12}
            md={2.5}
            sx={{
              bgcolor: 'primary.light',
              '@media (max-width:800px)': {
                width: '70%',
                transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 400ms ease',
              },
            }}
            position={{ xs: 'fixed', md: 'relative' }}
            height="100vh"
            zIndex={{ xs: 9999, md: 1 }}
            boxShadow={{ xs: menuOpen ? 10 : 0, md: 0 }}
          >
            <Sidebar setChat={setChat} closeMenu={() => setMenuOpen(false)} />
          </Grid>

          <Grid item xs={12} md={9.5}>
            <Outlet context={{ chat, setChat, handleMobileMenu: setMenuOpen }} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;

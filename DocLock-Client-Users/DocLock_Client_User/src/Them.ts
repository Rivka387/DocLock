import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
          main: "#555F69", // אפור-כחול עמוק
        },
        secondary: {
          main: "#3C434E", // כחול-אפור כהה
        },
        background: {
          default: "#545E68", // רקע כללי אפור-כחלחל
          paper:"#e8eef1",
          // "#38BDF8", // רקע של כרטיסים/אלמנטים
          /*#535D67 */
        },
        text: {
          primary: "#3D4450", // צבע טקסט כהה#38BDF8
          secondary: "#555F69", // צבע טקסט נוסף#38BDF8
        },
      },
      typography: {
        fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
        h1: {
          fontFamily: "'Montserrat', sans-serif",
        },
        h2: {
          fontFamily: "'Montserrat', sans-serif",
        },
        button: {
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              overflowX: 'hidden',
              width: '100%',
              maxWidth: '100vw',
            },
            '#root': {
              overflowX: 'hidden',
              width: '100%',
              maxWidth: '100vw',
            }
          }
        }
      }
});

export default theme;
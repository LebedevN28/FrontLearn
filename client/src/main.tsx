import { createRoot } from 'react-dom/client';
import App from './1_app/App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/styles.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: { main: '#A91AB0' },
    secondary: { main: '#568F6F' },
    background: { default: '#FCFDF5' },
  },
});

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
);

import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import LoginPage from './components/login';
import SignUpPage from './components/signup';
import ProfilePage from './components/profile';
import themes from "./theme"
import { ThemeProvider,createTheme } from '@mui/material';

const theme =createTheme(
    {palette:themes["light"]},
  )



function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Routes>
      <Route path="" element={<Dashboard/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Navbar from './navegation/Navbar';
import RegisterPage from './components/RegisterPage';
import Featured from './components/Featured';
import MainGame from './components/MainPage';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {

  <title>oi</title>

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path ="/featured" element={<Featured />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

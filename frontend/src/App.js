import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/user/Dashboard';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Header from './components/Header';
import Profile from './pages/user/Profile';

function App() {
  return (
    <>
        <Router>
          <div className="container">
            <Header />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </div>
        </Router>
      <ToastContainer />
    </>
  );
}

export default App;

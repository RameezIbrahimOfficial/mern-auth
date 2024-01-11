import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Header from './components/Header';
import Profile from './pages/user/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/Adminlogin';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path='/admin/*' element={null} />
            <Route path='*' element={<Header />} />
          </Routes>

          <Routes>
            {/* User Route */}
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />

            {/* Admin Route */}
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/admin/login' element={<AdminLogin />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

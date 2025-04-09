import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
// import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginRegister />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/stocks" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/mutual-funds" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/fixed-deposits" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/banks" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </Router>
  );
}

export default App;
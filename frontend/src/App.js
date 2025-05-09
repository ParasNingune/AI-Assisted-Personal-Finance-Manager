import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginRegister from "./pages/Auth/LoginRegister"
import Homepage from "./pages/Dashboard/Homepage"
import Income from "./pages/Dashboard/Income"
import Expense from "./pages/Dashboard/Expense"
import PrivateRoute from "./utils/PrivateRoute"
import UserProvider from './context/UserContext';
import AiChat from './pages/Dashboard/AiChat';
import Report from './pages/Dashboard/Report';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/dashboard" element={<PrivateRoute><Homepage /></PrivateRoute>} />
          <Route path='/income' element={<PrivateRoute><Income /></PrivateRoute>} />
          <Route path='/expense' element={<PrivateRoute><Expense /></PrivateRoute>} />
          <Route path='/aiChat' element={<PrivateRoute><AiChat /></PrivateRoute>} />
          <Route path='/report' element={<PrivateRoute><Report /></PrivateRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
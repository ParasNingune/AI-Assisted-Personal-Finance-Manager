import { Router, Routes, Route } from 'react-router-dom';
import PersonalInfoForm from './components/Registration/PersonalInfoForm';
import FinancialInfoForm from './components/Registration/FinancialInfoForm';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/register" element={<PersonalInfoForm />} />
          <Route path="/financial-info" element={<FinancialInfoForm />} />
          {/* ... other routes ... */}
        </Routes>
      </Router>
  );
}

export default App;
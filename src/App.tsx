import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from '@/pages/Landing';
import SignIn from '@/pages/SignIn';
import Register from '@/pages/Register';
import Scan from '@/pages/Scan';
import Processing from '@/pages/Processing';
import Dashboard from '@/pages/Dashboard';
import Meal from '@/pages/Meal';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meal/:mealId" element={<Meal />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

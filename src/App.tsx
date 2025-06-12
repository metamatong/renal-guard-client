import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing.tsx';
import Register from './pages/Register.tsx';
import Scan from './pages/Scan.tsx';
import Processing from './pages/Processing.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Meal from './pages/Meal.tsx';
import SignIn from './pages/SignIn.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The default page that loads at '/' */}
        <Route path="/" element={<Landing />} />

        {/* Other pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* This route includes a parameter for the meal ID */}
        <Route path="/meal/:mealId" element={<Meal />} />

        {/* A fallback route for any other path */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import {BrowserRouter, Route, Routes} from 'react-router-dom';


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Landing />} />
        <Route path="/login"       element={<SignIn />} />
        <Route path="/register"    element={<Register />} />
        <Route path="/scan"        element={<Scan />} />
        <Route path="/processing"  element={<Processing />} />
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="/meal/:id"    element={<Meal />} />
      </Routes>
    </BrowserRouter>
  );
}

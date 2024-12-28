import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { ProtectedRoute } from '../components/ProtectedRoute';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RootLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Add other protected routes here */}
      </Route>
    </Routes>
  );
}

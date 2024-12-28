import { Routes, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import NotFoundPage from '../pages/NotFound';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import ProfilePage from '../pages/Profile';
import VerifyEmailPage from '../pages/VerifyEmail';

export function RouterContent() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />} errorElement={<NotFoundPage />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

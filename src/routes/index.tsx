import { Routes, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import NotFoundPage from '../pages/NotFound';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { RedirectAuthenticated } from '../components/auth/RedirectAuthenticated';
import ProfilePage from '../pages/Profile';
import VerifyEmailPage from '../pages/VerifyEmail';
import ForgotPasswordPage from '../pages/ForgotPassword';
import ResetPasswordPage from '../pages/ResetPassword';

export function RouterContent() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />} errorElement={<NotFoundPage />}>
        <Route index element={<HomePage />} />
        <Route
          path="login"
          element={
            <RedirectAuthenticated>
              <LoginPage />
            </RedirectAuthenticated>
          }
        />
        <Route
          path="register"
          element={
            <RedirectAuthenticated>
              <RegisterPage />
            </RedirectAuthenticated>
          }
        />
        <Route
          path="verify-email"
          element={
            <RedirectAuthenticated>
              <VerifyEmailPage />
            </RedirectAuthenticated>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <RedirectAuthenticated>
              <ForgotPasswordPage />
            </RedirectAuthenticated>
          }
        />
        <Route
          path="reset-password"
          element={
            <RedirectAuthenticated>
              <ResetPasswordPage />
            </RedirectAuthenticated>
          }
        />
      </Route>
    </Routes>
  );
}

import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { NotFoundPage } from './pages/NotFound';
import { HomePage } from './pages/Home';
import { RedirectAuthenticated } from './components/auth/RedirectAuthenticated';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/Login';
import { ProfilePage } from './pages/Profile';

export const RouterContent = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
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
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

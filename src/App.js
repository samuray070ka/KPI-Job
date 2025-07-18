import { Routes, Route } from 'react-router-dom';
import Login from './router/login/Login';
import Home from './router/home/Home';
import Admin from './router/admin/Admin';
import NotAuthorized from './NotAuthorized';
import ProtectedRoute from './router/login/ProtectedRoute';
import UniquePage from './router/home/UniquePage';
import { LanguageProvider } from './LanguageContext';
import NotFound from "./NotFound";
import Layout from "./Layout";

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />

        <Route
          path="/"
          element={
            <Layout>
              <ProtectedRoute role={["user", "admin"]}>
                <Home />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/job/:slug"
          element={
            <Layout>
              <UniquePage />
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
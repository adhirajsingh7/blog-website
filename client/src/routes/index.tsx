import ErrorPage from "../pages/ErrorPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage.tsx";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute>
      <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage/>
  }
]);

export default router;
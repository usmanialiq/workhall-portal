import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/LogIn";
import RegisterPage from "./pages/auth/Register";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
]);

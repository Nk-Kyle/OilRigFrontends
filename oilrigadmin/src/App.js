import React, { useEffect } from "react";
import {
    Routes,
    Route,
    BrowserRouter,
    useNavigate,
    useLocation,
} from "react-router-dom";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Map from "./pages/map/map";
import { checkLoggedIn } from "./utils/auth";

function ProtectedRoute({ element }) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!checkLoggedIn()) {
            // Redirect to the login page with the current location as a referrer
            navigate("/login", { state: { referrer: location.pathname } });
        }
    }, [navigate, location]);

    return checkLoggedIn() ? element : null;
}

function App() {
    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={<ProtectedRoute element={<Dashboard />} />}
                />
                <Route
                    path="/map"
                    element={<ProtectedRoute element={<Map />} />}
                />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

function MainApp() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default MainApp;

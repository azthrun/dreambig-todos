import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children } : { children : JSX.Element }) => {
    const auth = useAuth();
    const location = useLocation();

    if (auth.isLoggedIn) {
        return children;
    } else {
        return (
            <Navigate to='/login' state={{ from: location }} replace />
        );
    }
}

export default RequireAuth;
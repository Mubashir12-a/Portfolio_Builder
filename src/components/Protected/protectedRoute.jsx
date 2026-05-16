import { Navigate } from "react-router-dom";
import { getValidToken } from "../../utils/auth";

/**
 * Protects routes that require authentication.
 * - Validates the JWT expiry locally (no network call).
 * - Removes stale/expired tokens automatically.
 * - Redirects unauthenticated users to /auth.
 */
function ProtectedRoute({ children }) {
    const token = getValidToken();

    if (!token) {
        return <Navigate to="/auth" replace />;
    }

    return children;
}

export default ProtectedRoute;
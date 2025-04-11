import React from "react";
import { Navigate } from "react-router-dom";

/** Protects a route by checking for an authenticated admin */
function PrivateRoute({ currAdmin, children }) {
    if (!currAdmin || currAdmin.is_admin) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoute;

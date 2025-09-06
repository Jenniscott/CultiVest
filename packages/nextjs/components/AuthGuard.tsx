"use client";

import { useEffect } from "react";
import { useAuth } from "~~/contexts/AuthContext";
import { useImmediateRedirect } from "~~/hooks/useRedirect";

interface AuthGuardProps {
    children: React.ReactNode;
    requiredRole?: "farmer" | "investor";
    redirectTo?: string;
}

const AuthGuard = ({ children, requiredRole, redirectTo = "/" }: AuthGuardProps) => {
    const { isAuthenticated, user, isLoading } = useAuth();
    const { redirectToRole, redirectToHome } = useImmediateRedirect();

    useEffect(() => {
        if (!isLoading) {
            // If not authenticated, redirect to home
            if (!isAuthenticated) {
                redirectToHome();
                return;
            }

            // If role is required and user doesn't have the right role, redirect to their dashboard
            if (requiredRole && user?.role && user.role !== requiredRole) {
                redirectToRole(user.role);
                return;
            }
        }
    }, [isAuthenticated, user, isLoading, requiredRole, redirectToHome, redirectToRole]);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If not authenticated, don't render children
    if (!isAuthenticated) {
        return null;
    }

    // If role is required and user doesn't have the right role, don't render children
    if (requiredRole && user?.role && user.role !== requiredRole) {
        return null;
    }

    return <>{children}</>;
};

export default AuthGuard;

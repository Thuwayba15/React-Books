import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "../providers/auth";

type WithAuthGuardOptions = {
  redirectTo?: string;
};

const withAuthGuard = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthGuardOptions = {},
) => {
  const { redirectTo = "/login" } = options;

  const GuardedComponent = (props: P) => {
    const { isAuthenticated } = useAuthState();

    if (!isAuthenticated) {
      return <Navigate to={redirectTo} replace />;
    }
 
    return <WrappedComponent {...props} />;
  };

  GuardedComponent.displayName = `withAuthGuard(${WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"})`;

  return GuardedComponent;
};

export default withAuthGuard;
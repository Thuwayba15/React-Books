import React, { useContext, useEffect, useReducer } from "react";
import {
  AuthActionContext,
  AuthStateContext,
  INITIAL_STATE,
  type IAuthActionContext,
  type IAuthStateContext,
} from "./context";
import { AuthReducer } from "./reducer";
import {
  authHydrate,
  authLoginError,
  authLoginPending,
  authLoginSuccess,
  authLogout,
} from "./actions";
import { userStorage, hashPassword } from "./userStorage";

const AUTH_KEY = "bookapp.auth";

type StoredAuth = {
  isAuthenticated: boolean;
  user: { email: string } | null;
};

const readAuthFromStorage = (): IAuthStateContext | null => {
  const fromLocal = localStorage.getItem(AUTH_KEY);
  const fromSession = sessionStorage.getItem(AUTH_KEY);
  const raw = fromLocal ?? fromSession;
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredAuth;

    const isAuthenticated = Boolean(
      parsed?.isAuthenticated && parsed?.user?.email,
    );

    return {
      ...INITIAL_STATE,
      isAuthenticated,
      user: isAuthenticated ? { email: String(parsed.user!.email) } : null,
    };
  } catch {
    return null;
  }
};

const writeAuthToStorage = (state: IAuthStateContext) => {
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);

  if (!state.isAuthenticated || !state.user?.email) return;

  const payload: StoredAuth = {
    isAuthenticated: true,
    user: { email: state.user.email },
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
};

const clearAuthStorage = () => {
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    userStorage.seedDefaultUsers();
  }, []);

  useEffect(() => {
    const hydrated = readAuthFromStorage();
    if (hydrated) dispatch(authHydrate(hydrated));
  }, []);

  useEffect(() => {
    if (state.isAuthenticated) writeAuthToStorage(state);
    else clearAuthStorage();
  }, [state.isAuthenticated, state.user]);

  const login = async (email: string, password: string) => {
    dispatch(authLoginPending());

    try {
        const cleanedEmail = String(email).trim().toLowerCase();
        const cleanedPassword = String(password);

        if (!cleanedEmail) {
        dispatch(authLoginError("Email is required"));
        return;
        }
        if (!cleanedPassword) {
        dispatch(authLoginError("Password is required"));
        return;
        }

        const users = userStorage.loadUsers();
        const found = users.find((u) => u.email === cleanedEmail);

        if (!found) {
        dispatch(authLoginError("Account not found"));
        return;
        }

        const passHash = hashPassword(cleanedPassword);
        if (found.passwordHash !== passHash) {
        dispatch(authLoginError("Incorrect password"));
        return;
        }

        dispatch(
        authLoginSuccess({
            user: { email: cleanedEmail },
        }),
        );
    } catch (e) {
        dispatch(authLoginError("Login failed"));
    }
    };

  const logout = () => {
    dispatch(authLogout());
  };

  const actions: IAuthActionContext = {
    login,
    logout,
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionContext.Provider value={actions}>
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
};

export const useAuthActions = () => {
  const context = useContext(AuthActionContext);
  if (!context) {
    throw new Error("useAuthActions must be used within an AuthProvider");
  }
  return context;
};
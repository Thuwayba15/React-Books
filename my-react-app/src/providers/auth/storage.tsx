//Local storage for login

const AUTH_KEY = "bookapp.auth";

export type AuthUser = {
  email: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
};

const defaultState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authStorage = {
  load(): AuthState {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return defaultState;

    try {
      const parsed = JSON.parse(raw) as AuthState;
      return {
        ...defaultState,
        ...parsed,
        isAuthenticated: Boolean(parsed.isAuthenticated && parsed.user),
      };
    } catch {
      return defaultState;
    }
  },

  save(state: AuthState) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(state));
  },

  clear() {
    localStorage.removeItem(AUTH_KEY);
  },
};
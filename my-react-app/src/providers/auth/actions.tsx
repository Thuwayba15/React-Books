import { createAction } from "redux-actions";
import type { IAuthStateContext, IAuthUser } from "./context";
import { INITIAL_STATE } from "./context";

export enum AuthActionEnums {
  loginPending = "AUTH_LOGIN_PENDING",
  loginSuccess = "AUTH_LOGIN_SUCCESS",
  loginError = "AUTH_LOGIN_ERROR",

  logout = "AUTH_LOGOUT",

  hydrate = "AUTH_HYDRATE",
}

export const authHydrate = createAction<IAuthStateContext, IAuthStateContext>(
  AuthActionEnums.hydrate,
  (payload) => ({
    ...payload,
  }),
);

// Login
export const authLoginPending = createAction<IAuthStateContext>(
  AuthActionEnums.loginPending,
  () => ({
    ...INITIAL_STATE,
    isPending: true,
  }),
);

export const authLoginSuccess = createAction<
  IAuthStateContext,
  { user: IAuthUser; }
>(AuthActionEnums.loginSuccess, ({ user }) => ({
  isPending: false,
  isSuccess: true,
  isError: false,

  isAuthenticated: true,
  user,
  errorMessage: undefined,
}));

export const authLoginError = createAction<IAuthStateContext, string>(
  AuthActionEnums.loginError,
  (message) => ({
    ...INITIAL_STATE,
    isError: true,
    errorMessage: message,
  }),
);

// Logout
export const authLogout = createAction<IAuthStateContext>(
  AuthActionEnums.logout,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: false,

    isAuthenticated: false,
    user: null,
    errorMessage: undefined,
  }),
);
import { handleActions } from "redux-actions";
import type { IAuthStateContext } from "./context";
import { INITIAL_STATE } from "./context";
import { AuthActionEnums } from "./actions";

export const AuthReducer = handleActions<IAuthStateContext, IAuthStateContext>(
  {
    [AuthActionEnums.hydrate]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.loginPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.loginSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.loginError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.logout]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE,
);
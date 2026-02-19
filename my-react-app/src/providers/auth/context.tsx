import { createContext } from "react";

export interface IAuthUser {
  email: string;
}

export interface IAuthStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;

  isAuthenticated: boolean;

  user?: IAuthUser | null;
  errorMessage?: string;
}

export interface IAuthActionContext {
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const INITIAL_STATE: IAuthStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,

  isAuthenticated: false,

  user: null,
  errorMessage: undefined,
};

export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);

export const AuthActionContext =
  createContext<IAuthActionContext | undefined>(undefined);
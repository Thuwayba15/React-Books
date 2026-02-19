import { createContext } from "react";

export interface IOpenLibraryDoc {
  key?: string; 
  title?: string;
  author_name?: string[];
  cover_i?: number;
}

export interface IBook {
  key: string;
  title: string;
  authorName: string;
  coverId?: number;
}

export interface IBooksStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;

  query: string;
  total: number;

  books: IBook[];
  errorMessage?: string;
}

export interface IBooksActionContext {
  searchBooks: (query: string) => void;
  clearSearch: () => void;
}


export const INITIAL_STATE: IBooksStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,

  query: "",
  total: 0,
  books: [],
  errorMessage: undefined,
};

export const BooksStateContext = createContext<IBooksStateContext>(INITIAL_STATE);

export const BooksActionContext =
  createContext<IBooksActionContext | undefined>(undefined);
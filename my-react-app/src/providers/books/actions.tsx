import { createAction } from "redux-actions";
import { INITIAL_STATE, type IBooksStateContext, type IBook } from "./context";

export enum BooksActionEnums {
  searchPending = "BOOKS_SEARCH_PENDING",
  searchSuccess = "BOOKS_SEARCH_SUCCESS",
  searchError = "BOOKS_SEARCH_ERROR",
  clear = "BOOKS_CLEAR",
}

export const booksSearchPending = createAction<IBooksStateContext, string>(
  BooksActionEnums.searchPending,
  (query) => ({
    ...INITIAL_STATE,
    isPending: true,
    query,
  }),
);

export const booksSearchSuccess = createAction<
  IBooksStateContext,
  { query: string; total: number; books: IBook[] }
>(BooksActionEnums.searchSuccess, ({ query, total, books }) => ({
  ...INITIAL_STATE,
  isSuccess: true,
  query,
  total,
  books,
}));

export const booksSearchError = createAction<IBooksStateContext, { query: string; message: string }>(
  BooksActionEnums.searchError,
  ({ query, message }) => ({
    ...INITIAL_STATE,
    isError: true,
    query,
    errorMessage: message,
  }),
);

export const booksClear = createAction<IBooksStateContext>(
  BooksActionEnums.clear,
  () => ({
    ...INITIAL_STATE,
  }),
);
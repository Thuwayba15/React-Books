import { createAction } from "redux-actions";
import { INITIAL_STATE, type IBooksStateContext, type IBook } from "./context";

export enum BooksActionEnums {
  searchPending = "BOOKS_SEARCH_PENDING",
  searchSuccess = "BOOKS_SEARCH_SUCCESS",
  searchError = "BOOKS_SEARCH_ERROR",
  clear = "BOOKS_CLEAR",
}

export const booksSearchPending = createAction<IBooksStateContext, { query: string; page: number; limit: number}>(
  BooksActionEnums.searchPending,
  ({ query, page, limit }) => ({
    ...INITIAL_STATE,
    isPending: true,
    query,
    page,
    limit,
  }),
);

export const booksSearchSuccess = createAction<
  IBooksStateContext,
  { query: string; total: number; books: IBook[], page: number; limit: number }
>(BooksActionEnums.searchSuccess, ({ query, total, books, page, limit }) => ({
  ...INITIAL_STATE,
  isSuccess: true,
  query,
  total,
  page,
  limit,
  books,
}));

export const booksSearchError = createAction<IBooksStateContext, { query: string; message: string; page: number; limit: number }>(
  BooksActionEnums.searchError,
  ({ query, message, page, limit }) => ({
    ...INITIAL_STATE,
    isError: true,
    query,
    page,
    limit,
    errorMessage: message,
  }),
);

export const booksClear = createAction<IBooksStateContext>(
  BooksActionEnums.clear,
  () => ({
    ...INITIAL_STATE,
  }),
);
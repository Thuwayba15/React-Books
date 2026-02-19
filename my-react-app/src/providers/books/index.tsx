import React, { useContext, useReducer } from "react";
import { BooksActionContext, BooksStateContext, INITIAL_STATE, type IBook, type IOpenLibraryDoc } from "./context";
import { BooksReducer } from "./reducer";
import { booksClear, booksSearchError, booksSearchPending, booksSearchSuccess } from "./actions";
import { getAxiosInstance } from "../../utils/axiosInstance";

type OpenLibrarySearchResponse = {
  numFound?: number;
  docs?: IOpenLibraryDoc[];
};

const mapDocToBook = (doc: IOpenLibraryDoc): IBook | null => {
  const key = doc.key;
  const title = doc.title;

  if (!key || !title) return null;

  return {
    key,
    title,
    authorName: doc.author_name?.[0] ?? "Unknown author",
    coverId: doc.cover_i,
  };
};

export const BooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(BooksReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const searchBooks = async (query: string) => {
    const q = String(query ?? "").trim();
    if (!q) {
      dispatch(booksClear());
      return;
    }

    dispatch(booksSearchPending(q));

    const endpoint = import.meta.env.VITE_OPEN_LIBRARY_SEARCH_ENDPOINT;
    const limit = Number(import.meta.env.VITE_OPEN_LIBRARY_LIMIT ?? 20);

    const fields = "key,title,author_name";

    await instance
      .get<OpenLibrarySearchResponse>(endpoint, {
        params: {
          q,
          limit,
          fields,
        },
      })
      .then((response) => {
        const data = response.data;

        const books = (data.docs ?? [])
          .map(mapDocToBook)
          .filter((b): b is IBook => Boolean(b));

        dispatch(
          booksSearchSuccess({
            query: q,
            total: data.numFound ?? books.length,
            books,
          }),
        );
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          booksSearchError({
            query: q,
            message: "Failed to fetch books",
          }),
        );
      });
  };
  const clearSearch = () => dispatch(booksClear());

  return (
    <BooksStateContext.Provider value={state}>
      <BooksActionContext.Provider value={{ searchBooks, clearSearch }}>
        {children}
      </BooksActionContext.Provider>
    </BooksStateContext.Provider>
  );
};

export const useBooksState = () => {
  const ctx = useContext(BooksStateContext);
  if (!ctx) throw new Error("useBooksState must be used within a BooksProvider");
  return ctx;
};

export const useBooksActions = () => {
  const ctx = useContext(BooksActionContext);
  if (!ctx) throw new Error("useBooksActions must be used within a BooksProvider");
  return ctx;
};
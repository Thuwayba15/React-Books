import React, { useContext, useReducer } from "react";
import { BooksActionContext, BooksStateContext, INITIAL_STATE, type IBook, type IOpenLibraryDoc } from "./context";
import { BooksReducer } from "./reducer";
import { booksClear, booksSearchError, booksSearchPending, booksSearchSuccess } from "./actions";
import { getAxiosInstance } from "../../utils/axiosInstance";

type OpenLibrarySearchResponse = {
  numFound?: number;
  docs?: IOpenLibraryDoc[];
};

const getCoverUrl = (coverId?: number) => {
  if(!coverId) return undefined;

  const base = import.meta.env.VITE_OPEN_LIBRARY_COVERS_BASE_URL;
  const size = import.meta.env.VITE_OPEN_LIBRARY_COVER_SIZE;

  return `${base}/b/id/${coverId}-${size}.jpg`;
}

const mapDocToBook = (doc: IOpenLibraryDoc): IBook | null => {
  const key = doc.key;
  const title = doc.title;

  if (!key || !title) return null;

  return {
    key,
    title,
    authorName: doc.author_name?.[0] ?? "Unknown author",
    coverId: doc.cover_i,
    coverUrl: getCoverUrl(doc.cover_i),
  };
};

export const BooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(BooksReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const searchBooks = async (query: string, page: number=1) => {
    const q = String(query ?? "").trim();
    if (!q) {
      dispatch(booksClear());
      return;
    }

    const endpoint = import.meta.env.VITE_OPEN_LIBRARY_SEARCH_ENDPOINT;
    const limit = Number(import.meta.env.VITE_OPEN_LIBRARY_LIMIT ?? 20);

    dispatch(booksSearchPending({ query: q, page, limit }));

    const fields = "key,title,author_name,cover_i";

    await instance
      .get<OpenLibrarySearchResponse>(endpoint, {
        params: {
          q,
          page,
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
            page,
            limit,
          }),
        );
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          booksSearchError({
            query: q,
            message: "Failed to fetch books",
            page,
            limit,  
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
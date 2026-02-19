import { createContext } from "react";

export interface IWishlistBook {
  key: string;
  title: string;
  authorName: string;
  isRead: boolean;
}

export interface IWishlistStateContext {
  items: IWishlistBook[];
}

export interface IWishlistActionContext {
  addToWishlist: (book: Omit<IWishlistBook, "isRead">) => void;
  removeFromWishlist: (key: string) => void;
  toggleRead: (key: string) => void;
  clearWishlist: () => void;
}

export const INITIAL_STATE: IWishlistStateContext = {
  items: [],
};

export const WishlistStateContext =
  createContext<IWishlistStateContext>(INITIAL_STATE);

export const WishlistActionContext =
  createContext<IWishlistActionContext | undefined>(undefined);
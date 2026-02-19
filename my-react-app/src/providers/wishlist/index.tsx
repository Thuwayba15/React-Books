import React, { useContext, useEffect, useReducer } from "react";
import {
  INITIAL_STATE,
  WishlistActionContext,
  WishlistStateContext,
  type IWishlistActionContext,
  type IWishlistBook,
} from "./context";
import { WishlistReducer } from "./reducer";
import {
  wishlistAdd,
  wishlistClear,
  wishlistHydrate,
  wishlistRemove,
  wishlistToggleRead,
} from "./actions";

const WISHLIST_KEY = "bookapp.wishlist";

const loadWishlist = (): IWishlistBook[] => {
  const raw = localStorage.getItem(WISHLIST_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as IWishlistBook[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveWishlist = (items: IWishlistBook[]) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
};

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(WishlistReducer, INITIAL_STATE);

  useEffect(() => {
    dispatch(wishlistHydrate(loadWishlist()));
  }, []);

  const addToWishlist = (book: { key: string; title: string; authorName: string }) => {
    const exists = state.items.some((i) => i.key === book.key);
    if (exists) return;

    const updated: IWishlistBook[] = [
      {
        ...book,
        isRead: false,
      },
      ...state.items,
    ];

    saveWishlist(updated);
    dispatch(wishlistAdd(updated));
  };

  const removeFromWishlist = (key: string) => {
    const updated = state.items.filter((i) => i.key !== key);
    saveWishlist(updated);
    dispatch(wishlistRemove(updated));
  };

  const toggleRead = (key: string) => {
    const updated = state.items.map((i) =>
      i.key === key ? { ...i, isRead: !i.isRead } : i,
    );
    saveWishlist(updated);
    dispatch(wishlistToggleRead(updated));
  };

  const clearWishlist = () => {
    saveWishlist([]);
    dispatch(wishlistClear());
  };

  const actions: IWishlistActionContext = {
    addToWishlist,
    removeFromWishlist,
    toggleRead,
    clearWishlist,
  };

  return (
    <WishlistStateContext.Provider value={state}>
      <WishlistActionContext.Provider value={actions}>
        {children}
      </WishlistActionContext.Provider>
    </WishlistStateContext.Provider>
  );
};

export const useWishlistState = () => {
  const ctx = useContext(WishlistStateContext);
  if (!ctx) throw new Error("useWishlistState must be used within WishlistProvider");
  return ctx;
};

export const useWishlistActions = () => {
  const ctx = useContext(WishlistActionContext);
  if (!ctx) throw new Error("useWishlistActions must be used within WishlistProvider");
  return ctx;
};
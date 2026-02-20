import { createAction } from "redux-actions";
import { INITIAL_STATE, type IWishlistBook, type IWishlistStateContext } from "./context";

export enum WishlistActionEnums {
  hydrate = "WISHLIST_HYDRATE",
  add = "WISHLIST_ADD",
  remove = "WISHLIST_REMOVE",
  toggleRead = "WISHLIST_TOGGLE_READ",
  clear = "WISHLIST_CLEAR",
}

export const wishlistHydrate = createAction<IWishlistStateContext, IWishlistBook[]>(
  WishlistActionEnums.hydrate,
  (items) => ({
    ...INITIAL_STATE,
    items,
  }),
);

export const wishlistAdd = createAction<IWishlistStateContext, IWishlistBook[]>(
  WishlistActionEnums.add,
  (items) => ({
    ...INITIAL_STATE,
    items,
  }),
);

export const wishlistRemove = createAction<IWishlistStateContext, IWishlistBook[]>(
  WishlistActionEnums.remove,
  (items) => ({
    ...INITIAL_STATE,
    items,
  }),
);

export const wishlistToggleRead = createAction<IWishlistStateContext, IWishlistBook[]>(
  WishlistActionEnums.toggleRead,
  (items) => ({
    ...INITIAL_STATE,
    items,
  }),
);

export const wishlistClear = createAction<IWishlistStateContext>(
  WishlistActionEnums.clear,
  () => ({
    ...INITIAL_STATE,
    items: [],
  }),
);
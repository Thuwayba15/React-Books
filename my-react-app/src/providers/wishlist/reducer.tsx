import { handleActions } from "redux-actions";
import { INITIAL_STATE, type IWishlistStateContext } from "./context";
import { WishlistActionEnums } from "./actions";

export const WishlistReducer = handleActions<IWishlistStateContext, IWishlistStateContext>(
  {
    [WishlistActionEnums.hydrate]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [WishlistActionEnums.add]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [WishlistActionEnums.remove]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [WishlistActionEnums.toggleRead]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [WishlistActionEnums.clear]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE,
);
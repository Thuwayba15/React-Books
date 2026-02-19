import { handleActions } from "redux-actions";
import { INITIAL_STATE, type IBooksStateContext } from "./context";
import { BooksActionEnums } from "./actions";

export const BooksReducer = handleActions<IBooksStateContext, IBooksStateContext>(
  {
    [BooksActionEnums.searchPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BooksActionEnums.searchSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BooksActionEnums.searchError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BooksActionEnums.clear]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE,
);
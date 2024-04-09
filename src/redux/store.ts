import { configureStore } from "@reduxjs/toolkit";
import blocksSlice from "./reducers/blocksSlice";

export const store = configureStore({
  reducer: {
    block: blocksSlice,
  },
});

import { createSlice } from "@reduxjs/toolkit";
import { Block } from "../../utils/blocks";

interface State {
  block: Block;
}

const initialState: State = {
  block: {} as Block, // Initialize with an empty block or appropriate default values
};

const blocksSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    add_block: (state, action) => {
      ///add logic
    },
  },
});

export const { add_block } = blocksSlice.actions;
export default blocksSlice.reducer;

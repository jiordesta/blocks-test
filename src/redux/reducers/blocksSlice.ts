import { createSlice } from "@reduxjs/toolkit";
import { Block } from "../../utils/blocks";

interface State {
  block: Block;
}

const initialState: State = {
  block: {
    type: "Column",
    id: "main",
    options: { height: "100%", width: "100%" },
    children: [
      {
        type: "Layout",
        id: "dasd",
        options: { width: "100%", display: "flex" },
        children: [
          {
            type: "Column",
            id: "main22",
            options: { width: "50%", minHeight: "100px" },
            children: [],
          },
          {
            type: "Column",
            id: "main22d",
            options: { width: "50%", minHeight: "100px" },
            children: [],
          },
        ],
      },
      {
        type: "Layout",
        id: "dasd",
        options: { width: "100%", display: "flex" },
        children: [
          {
            type: "Column",
            id: "main22",
            options: { width: "100%", minHeight: "100px" },
            children: [],
          },
        ],
      },
    ],
  } as Block, // Initialize with an empty block or appropriate default values
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

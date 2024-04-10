import { createSlice } from "@reduxjs/toolkit";
import { Block, BlockId } from "../../utils/blocks";

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
        id: "dasdd",
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
        children: [],
      },
    ],
  } as Block, // Initialize with an empty block or appropriate default values
};

const findBlockAndAddNewBlock = (
  block: Block,
  newBlock: Block,
  id: BlockId
) => {
  ///recursively find the block given the id
  if (block.id === id) {
    block.children?.push(newBlock);
  } else {
    if (block.children && block.children.length > 0) {
      block.children.forEach((block) => {
        findBlockAndAddNewBlock(block, newBlock, id);
      });
    }
  }
  return block;
};

const blocksSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    add_block: (state, action) => {
      state.block = findBlockAndAddNewBlock(
        state.block,
        {
          type: "Column",
          id: "main22d",
          options: { width: "50%", minHeight: "100px" },
          children: [],
        },
        "dasd"
      );
    },
  },
});

export const { add_block } = blocksSlice.actions;
export default blocksSlice.reducer;

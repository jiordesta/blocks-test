import { createSlice } from "@reduxjs/toolkit";
import { Block, BlockId, BlockType, createNewBlock } from "../../utils/blocks";
// @ts-ignore
import { v4 } from "uuid";
import { Children } from "react";

interface State {
  block: Block;
}

const initialState: State = {
  block: {
    type: "Column",
    id: "main",
    options: { height: "100%", width: "100%", overflow: "auto" },
    children: [],
  } as Block, // Initialize with an empty block or appropriate default values
};

const findBlockAndAddNewBlock = (
  block: Block,
  type: BlockType,
  id: BlockId
) => {
  const newBlock: Block = createNewBlock(type);

  if (block.id === id) {
    ///if the block is equla to the id push the new block to its children
    block.children?.push(newBlock);
  } else {
    ///recursively find the block given the id
    if (block.children && block.children.length > 0) {
      block.children.forEach((block) => {
        findBlockAndAddNewBlock(block, type, id);
      });
    }
  }
  return block;
};

const findBlockAndDelete = (block: Block, id: BlockId): Block => {
  if (block.children && block.children.length > 0) {
    block.children.map((childBlock) => {
      if (childBlock.id === id) {
        if (block.children) {
          block.children = block.children.filter((block) => block.id !== id);
        }
      } else {
        findBlockAndDelete(childBlock, id);
      }
    });
  }
  return block;
};

const blocksSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    add_block: (state, action) => {
      const { type, id, size } = action.payload;
      for (let i = 0; i < size; i++) {
        state.block = findBlockAndAddNewBlock(state.block, type, id);
      }
    },
    delete_block: (state, action) => {
      state.block = findBlockAndDelete(state.block, action.payload);
    },
  },
});

export const { add_block, delete_block } = blocksSlice.actions;
export default blocksSlice.reducer;

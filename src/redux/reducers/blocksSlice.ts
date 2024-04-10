import { createSlice } from "@reduxjs/toolkit";
import {
  Block,
  BlockId,
  BlockType,
  Column,
  Image,
  Layout,
  Text,
} from "../../utils/blocks";
// @ts-ignore
import { v4 } from "uuid";

interface State {
  block: Block;
}

const initialState: State = {
  block: {
    type: "Column",
    id: "main",
    options: { height: "100%", width: "100%" },
    children: [],
  } as Block, // Initialize with an empty block or appropriate default values
};

const findBlockAndAddNewBlock = (
  block: Block,
  type: BlockType,
  id: BlockId
) => {
  //get the default block base on type
  const getNewBlock = (type: BlockType): Block => {
    let block: Block = Column;
    if (type === "Image") {
      block = Image;
    } else if (type === "Layout") {
      block = Layout;
    } else if (type === "Text") {
      block = Text;
    } else {
      block = Column;
    }
    return block;
  };
  const newBlock: Block = getNewBlock(type);
  console.log(newBlock);

  ///recursively find the block given the id
  if (block.id === id) {
    block.children?.push(newBlock);
  } else {
    if (block.children && block.children.length > 0) {
      block.children.forEach((block) => {
        findBlockAndAddNewBlock(block, type, id);
      });
    }
  }
  return block;
};

const findBlockAndDelete = (block: Block, id: BlockId) => {
  if (block.children && block.children.length > 0) {
    if (block.children.find((block) => block.id === id)) {
      //find index of child and remove
      block.children = block.children.filter((block) => block.id !== id);
      return block;
    } else {
      block.children.forEach((block) => {
        findBlockAndDelete(block, id);
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
      const { type, id } = action.payload;
      state.block = findBlockAndAddNewBlock(state.block, type, id);
    },
    delete_block: (state, action) => {
      state.block = findBlockAndDelete(state.block, "main22dd");
    },
  },
});

export const { add_block, delete_block } = blocksSlice.actions;
export default blocksSlice.reducer;

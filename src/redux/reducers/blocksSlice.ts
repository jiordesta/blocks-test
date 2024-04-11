import { createSlice } from "@reduxjs/toolkit";
import { Block, BlockId, BlockType, createNewBlock } from "../../utils/blocks";
// @ts-ignore
import { v4 } from "uuid";

interface State {
  block: Block;
}

const initialState: State = {
  block: {
    type: "Column",
    id: "main",
    options: { minHeight: "100vh", width: "100%" },
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

const addBlockStyling = (block: Block, id: BlockId, styles: Object): Block => {
  if (block.id === id) {
    block.options = { ...block.options, ...styles };
    return block;
  } else {
    block.children?.map((block) => {
      addBlockStyling(block, id, styles);
    });
  }
  return block;
};

const addBlockData = (block: Block, id: BlockId, data: String): Block => {
  if (block.id === id) {
    if (block.data) {
      block.data = { value: data };
    }
    return block;
  } else {
    if (block.children && block.children.length > 0) {
      block.children.map((block) => {
        addBlockData(block, id, data);
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
      const { type, id, size } = action.payload;
      for (let i = 0; i < size; i++) {
        state.block = findBlockAndAddNewBlock(state.block, type, id);
      }
    },
    delete_block: (state, action) => {
      state.block = findBlockAndDelete(state.block, action.payload);
    },
    add_style: (state, action) => {
      state.block = addBlockStyling(
        state.block,
        action.payload.id,
        action.payload.styles
      );
    },
    add_data: (state, action) => {
      state.block = addBlockData(
        state.block,
        action.payload.id,
        action.payload.data
      );
    },
  },
});

export const { add_block, delete_block, add_style, add_data } =
  blocksSlice.actions;
export default blocksSlice.reducer;

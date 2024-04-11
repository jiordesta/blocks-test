import { createSlice } from "@reduxjs/toolkit";
import { Block, BlockId, BlockType, createNewBlock } from "../../utils/blocks";
// @ts-ignore
import { v4 } from "uuid";

// Define the shape of the state
interface State {
  block: Block;
}

// Set the initial state
const initialState: State = {
  block: {
    type: "Column",
    id: "main",
    options: { minHeight: "100vh", width: "100%" },
    children: [],
  } as Block, // Initialize with an empty block or appropriate default values
};

// Recursive function to find a block by ID and add a new block to its children
const findBlockAndAddNewBlock = (
  block: Block,
  type: BlockType,
  id: BlockId
) => {
  const newBlock: Block = createNewBlock(type);

  if (block.id === id) {
    // If the block matches the given ID, push the new block to its children
    block.children?.push(newBlock);
  } else {
    // Recursively search for the block in its children
    if (block.children && block.children.length > 0) {
      block.children.forEach((block) => {
        findBlockAndAddNewBlock(block, type, id);
      });
    }
  }
  return block;
};

// Recursive function to find a block by ID and delete it
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

// Function to add styles to a block by ID
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

// Function to add data to a block by ID
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

// Create a Redux slice
const blocksSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    // Action to add a block
    add_block: (state, action) => {
      const { type, id, size } = action.payload;
      for (let i = 0; i < size; i++) {
        state.block = findBlockAndAddNewBlock(state.block, type, id);
      }
    },
    // Action to delete a block
    delete_block: (state, action) => {
      state.block = findBlockAndDelete(state.block, action.payload);
    },
    // Action to add styles to a block
    add_style: (state, action) => {
      state.block = addBlockStyling(
        state.block,
        action.payload.id,
        action.payload.styles
      );
    },
    // Action to add data to a block
    add_data: (state, action) => {
      state.block = addBlockData(
        state.block,
        action.payload.id,
        action.payload.data
      );
    },
  },
});

// Export actions and reducer
export const { add_block, delete_block, add_style, add_data } =
  blocksSlice.actions;
export default blocksSlice.reducer;

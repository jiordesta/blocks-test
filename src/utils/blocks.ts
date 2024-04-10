export type BlockId = string;
// @ts-ignore
import { v4 } from "uuid";
export type BlockType = "Text" | "Image" | "Layout" | "Column";

export type Block = {
  id: BlockId;
  type: BlockType;
  options?: Record<
    string,
    string | number | boolean | string[] | Object | null
  >;
  data?: Record<string, string | number | null>;
  children?: Block[];
};

const Column: Block = {
  id: v4(),
  type: "Column",
  options: { width: "100%" },
  children: [],
};

const Layout: Block = {
  id: v4(),
  type: "Layout",
  options: { width: "100%" },
  children: [],
};

const Image: Block = {
  id: v4(),
  type: "Image",
  options: {},
  data: {},
};

const Text: Block = {
  id: v4(),
  type: "Text",
  options: {},
  data: {},
};

export { Column, Layout, Text, Image };

export type BlockId = string;

export type BlockType = "Text" | "Image" | "Layout" | "Column";

export type Block = {
  id: BlockId;
  type: BlockType;
  options?: Record<string, string | number | boolean | string[] | null>;
  data?: Record<string, string | number | null>;
  children?: Block[];
};

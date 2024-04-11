export type BlockId = string;
// @ts-ignore
import { v4 } from "uuid";
export type BlockType = "Text" | "Image" | "Layout" | "Column";

export type Block = {
  id: BlockId;
  type: BlockType;
  options?: Object;
  data?: Object;
  children?: Block[];
};

export const createNewBlock = (type: BlockType): Block => {
  const id: BlockId = v4();

  if (type === "Column") {
    return {
      id,
      type,
      options: { width: "100%", height: "100%" },
      children: [],
    };
  } else if (type === "Layout") {
    return {
      id,
      type,
      options: { width: "100%", height: "100%", display: "flex" },
      children: [],
    };
  } else if (type === "Text") {
    return {
      id,
      type,
      options: {},
      data: { value: "Sample Text" },
    };
  } else {
    return {
      id,
      type,
      options: {
        objectFit: "cover",
        width: "100%",
        height: "100%",
        display: "flex",
        justify: "center",
        align: "center",
      },
      data: { value: "" },
    };
  }
};

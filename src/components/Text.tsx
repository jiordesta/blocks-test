import { Block } from "../utils/blocks";

interface TextProps {
  block: Block;
}

export default function Text({ block }: TextProps) {
  const { id, type, options, data } = block;
  return <h1 id={id}>Text</h1>;
}

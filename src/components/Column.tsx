import { Block } from "../utils/blocks";

interface ColumnProps {
  block: Block;
}

export default function Column({ block }: ColumnProps) {
  const { id, type, options, children } = block;
  return <div id={id}>Column</div>;
}

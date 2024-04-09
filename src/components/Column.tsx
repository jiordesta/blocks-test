import { Block } from "../utils/blocks";

interface ColumnProps {
  block: Block;
}

export default function Column({ block }: ColumnProps) {
  const { id, type, options, children } = block;
  return (
    <div
      id={id}
      style={options}
      className="border border-black border-opacity-5 border-dashed hover:border-opacity-50"
    >
      Column
    </div>
  );
}

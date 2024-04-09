import { Block } from "../utils/blocks";

interface ImageProps {
  block: Block;
}

export default function Image({ block }: ImageProps) {
  const { id, type, options, data } = block;
  return <div id={id}>Image</div>;
}

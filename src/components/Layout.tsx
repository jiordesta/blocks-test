import { Block } from "../utils/blocks";

interface LayoutProps {
  block: Block;
}

export default function Layout({ block }: LayoutProps) {
  const { id, type, options, children } = block;
  return <div id={id}>Layout</div>;
}

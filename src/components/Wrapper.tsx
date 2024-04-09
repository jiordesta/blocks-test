import { Block } from "../utils/blocks";
import Column from "./Column";
import Image from "./Image";
import Layout from "./Layout";
import Text from "./Text";

interface WrapperProps {
  block: Block;
}
export default function Wrapper({ block }: WrapperProps) {
  const { type } = block;

  return (
    <>
      {type === "Column" ? (
        <Column block={block} />
      ) : type === "Image" ? (
        <Image block={block} />
      ) : type === "Layout" ? (
        <Layout block={block} />
      ) : type === "Text" ? (
        <Text block={block} />
      ) : null}
    </>
  );
}

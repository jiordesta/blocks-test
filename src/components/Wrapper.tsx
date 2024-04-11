import { Block } from "../utils/blocks";
import Column from "./Column";
import Image from "./Image";
import Layout from "./Layout";
import Text from "./Text";

interface WrapperProps {
  block: Block;
  modeEdit: Boolean;
}
export default function Wrapper({ block, modeEdit }: WrapperProps) {
  const { type } = block;

  return (
    <>
      {type === "Column" ? (
        <Column block={block} modeEdit={modeEdit} />
      ) : type === "Image" ? (
        <Image block={block} modeEdit={modeEdit} />
      ) : type === "Layout" ? (
        <Layout block={block} modeEdit={modeEdit} />
      ) : type === "Text" ? (
        <Text block={block} modeEdit={modeEdit} />
      ) : null}
    </>
  );
}

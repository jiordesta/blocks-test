import { useSelector } from "react-redux";
import Wrapper from "../components/Wrapper";
import { RootState } from "../redux/store";
import { Block } from "../utils/blocks";

interface NodeProps {
  block: Block;
}

export default function CreateWebsite() {
  const { block } = useSelector((state: RootState) => state.block);

  const Tools = () => {
    const LastNode = ({ block }: NodeProps) => {
      const { type } = block;
      return <div>{type}</div>;
    };

    const BranchNode = ({ block }: NodeProps) => {
      const { children } = block;
      return (
        <div className="border border-black rounded-lg">
          <h1>branch</h1>
          {children?.map((block) => {
            return <Node block={block} />;
          })}
        </div>
      );
    };

    const Node = ({ block }: NodeProps) => {
      const { type } = block;
      return (
        <>
          {["Column", "Layout"].includes(type) ? (
            <BranchNode block={block} />
          ) : (
            <LastNode block={block} />
          )}
        </>
      );
    };

    return (
      <div className="w-[20%] sticky top-0 left-0 bg-black bg-opacity-25 h-full flex flex-col">
        <Node block={block} />
      </div>
    );
  };

  const Render = () => {
    return <Wrapper block={block} />;
  };

  return (
    <div className="relative h-screen flex">
      <Render />
    </div>
  );
}

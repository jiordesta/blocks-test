import { useState } from "react";
import { Block } from "../utils/blocks";
import Wrapper from "./Wrapper";

interface ColumnProps {
  block: Block;
}

export default function Column({ block }: ColumnProps) {
  const { id, type, options, children } = block;
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [showEditBlock, setShowEditBlock] = useState(false);

  const AddBlockModal = () => {
    return (
      <div className="fixed inset-0 w-full h-full flex justify-center items-center">
        <h1>Hello</h1>
      </div>
    );
  };

  const Controller = () => {
    return (
      <div className="absolute top-0 right-0 p-1">
        <div className="flex gap-1">
          <button className="bg-black bg-opacity-5 p-1 rounded-full">
            <img src="/icons/edit.svg" width={25} alt="" />
          </button>
          <button
            className="bg-black bg-opacity-5 p-1 rounded-full"
            onClick={() => setShowAddBlock(true)}
          >
            <img src="/icons/add.svg" width={25} alt="" />
          </button>
          <button className="bg-black bg-opacity-5 p-1 rounded-full">
            <img src="/icons/add.svg" className="rotate-45" width={25} alt="" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      id={id}
      style={options}
      className={`${
        children && children.length === 0
          ? "bg-black bg-opacity-5 border border-opacity-25 border-black"
          : ""
      } relative`}
    >
      {children && children.length === 0 && (
        <>
          <Controller />
          {showAddBlock && <AddBlockModal />}
        </>
      )}
      {children?.map((block) => {
        return <Wrapper block={block} />;
      })}
    </div>
  );
}

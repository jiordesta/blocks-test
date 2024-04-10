import { useState } from "react";
import { Block } from "../utils/blocks";
import Wrapper from "./Wrapper";
import { useDispatch } from "react-redux";
import { add_block, delete_block } from "../redux/reducers/blocksSlice";

interface ColumnProps {
  block: Block;
}

export default function Column({ block }: ColumnProps) {
  //classes
  const classBtn =
    "bg-slate-400 px-2 py-1 rounded-lg w-full hover:bg-opacity-75 transition-all ease-in-out duration-300";

  const { id, type, options, children } = block;
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [showEditBlock, setShowEditBlock] = useState(false);

  const dispatch = useDispatch();

  const AddBlockModal = () => {
    return (
      <div className="fixed inset-0 w-full h-full flex justify-center items-center">
        <div className="w-1/4 bg-slate-300 rounded-lg p-2 space-y-2">
          <button
            className={classBtn}
            onClick={() => dispatch(add_block({ type: "Layout", id }))}
          >
            New Layout
          </button>
          <button
            className={classBtn}
            onClick={() => dispatch(add_block({ type: "Column", id }))}
          >
            New Column
          </button>
          <button className={classBtn}>New Text</button>
          <button className={classBtn}>New Image</button>
          <button className={classBtn} onClick={() => setShowAddBlock(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const Controller = () => {
    return (
      <div className="sticky top-0 right-0 p-1">
        <div className="flex gap-1">
          <button className="bg-black bg-opacity-5 p-1 rounded-full">
            <img src="/icons/edit.svg" width={15} alt="" />
          </button>
          <button
            className="bg-black bg-opacity-5 p-1 rounded-full"
            onClick={() => setShowAddBlock(true)}
          >
            <img src="/icons/add.svg" width={15} alt="" />
          </button>
          <button
            className="bg-black bg-opacity-5 p-1 rounded-full"
            onClick={() => {
              dispatch(delete_block(block.id));
            }}
          >
            <img src="/icons/add.svg" className="rotate-45" width={15} alt="" />
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
          ? "bg-black bg-opacity-5 border border-black border-dashed"
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
        return <Wrapper key={block.id} block={block} />;
      })}
    </div>
  );
}

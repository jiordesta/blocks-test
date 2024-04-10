import { useState } from "react";
import { Block } from "../utils/blocks";
import Wrapper from "./Wrapper";
import { useDispatch } from "react-redux";
import { add_block, delete_block } from "../redux/reducers/blocksSlice";

interface LayoutProps {
  block: Block;
}

export default function Layout({ block }: LayoutProps) {
  //classes
  const classBtn =
    "bg-slate-400 px-2 py-1 rounded-lg w-full hover:bg-opacity-75 transition-all ease-in-out duration-300";

  const dispatch = useDispatch();
  const { id, type, options, children } = block;
  const [showAddBlock, setShowAddBlock] = useState(false);

  const AddBlockModal = () => {
    const [columns, setColumns] = useState(1);
    return (
      <div className="fixed inset-0 w-full h-full flex justify-center items-center z-50">
        <div className="w-1/4 bg-slate-300 rounded-lg p-2 space-y-2">
          <div className="flex gap-2">
            <input
              type="number"
              value={columns}
              placeholder="Number of columns"
              onChange={(e) => setColumns(parseInt(e.target.value))}
            />
            <button
              className={classBtn}
              onClick={() =>
                dispatch(add_block({ type: "Column", id, size: columns }))
              }
            >
              add
            </button>
          </div>
          <button className={classBtn} onClick={() => setShowAddBlock(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const Controller = () => {
    return (
      <div className="sticky top-0 p-1">
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
            onClick={() => dispatch(delete_block(id))}
          >
            <img src="/icons/add.svg" className="rotate-45" width={15} alt="" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="relative">
        {children && children?.length > 0 ? null : (
          <>
            <Controller />
            {showAddBlock && <AddBlockModal />}
          </>
        )}
        <div
          id={id}
          style={options}
          className={`${
            children && children?.length > 0
              ? ""
              : "bg-black bg-opacity-5 border border-black border-dashed"
          } `}
        >
          {children?.map((block) => {
            return <Wrapper key={block.id} block={block} />;
          })}
        </div>
      </div>
    </>
  );
}

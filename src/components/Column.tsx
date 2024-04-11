import { useState } from "react";
import { Block } from "../utils/blocks";
import Wrapper from "./Wrapper";
import { useDispatch } from "react-redux";
import {
  add_block,
  add_style,
  delete_block,
} from "../redux/reducers/blocksSlice";

interface ColumnProps {
  block: Block;
  modeEdit: Boolean;
}

export default function Column({ block, modeEdit }: ColumnProps) {
  //classes
  const classBtn =
    "bg-slate-400 px-2 py-1 rounded-lg w-full hover:bg-opacity-75 transition-all ease-in-out duration-300";

  const { id, options, children } = block;
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [showEditBlock, setShowEditBlock] = useState(false);

  const dispatch = useDispatch();

  const AddBlockModal = () => {
    return (
      <div className="fixed inset-0 w-full h-full flex justify-center items-center z-50 text-black">
        <div className="w-1/4 bg-slate-300 rounded-lg p-2 space-y-2">
          <button
            className={classBtn}
            onClick={() => dispatch(add_block({ type: "Layout", id, size: 1 }))}
          >
            New Layout
          </button>
          <button
            className={classBtn}
            onClick={() => dispatch(add_block({ type: "Column", id, size: 1 }))}
          >
            New Column
          </button>
          <button
            className={classBtn}
            onClick={() => dispatch(add_block({ type: "Text", id, size: 1 }))}
          >
            New Text
          </button>
          <button
            className={classBtn}
            onClick={() => dispatch(add_block({ type: "Image", id, size: 1 }))}
          >
            New Image
          </button>
          <button className={classBtn} onClick={() => setShowAddBlock(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const EditBlockStyleModal = () => {
    const [styles, setStyles] = useState("");
    return (
      <div className="fixed inset-0 w-full h-full flex justify-center items-center z-50 text-black">
        <div className="w-1/4 bg-slate-300 rounded-lg p-2 space-y-2">
          <textarea
            name=""
            id=""
            rows={5}
            className="w-full rounded-lg"
            placeholder="Add styling here."
            onChange={(e) => setStyles(e.target.value)}
          />
          <button
            className={classBtn}
            onClick={() => {
              dispatch(add_style({ id, styles: JSON.parse(styles) }));
            }}
          >
            Add style
          </button>
          <button className={classBtn} onClick={() => setShowEditBlock(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const Controller = () => {
    return (
      <div className="top-0 p-1 z-40">
        <div className="flex gap-1">
          <button
            className="bg-black bg-opacity-5 p-1 rounded-full"
            onClick={() => setShowEditBlock(true)}
          >
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
              dispatch(delete_block(id));
            }}
          >
            <img src="/icons/add.svg" className="rotate-45" width={15} alt="" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full">
      {modeEdit && <Controller />}
      {showAddBlock && <AddBlockModal />}
      {showEditBlock && <EditBlockStyleModal />}

      <div
        id={id}
        style={options}
        className={`${
          modeEdit
            ? "bg-black bg-opacity-5 border border-black border-dashed relative overflow-hidden min-h-[25px] p-1"
            : ""
        }`}
      >
        {children?.map((block) => {
          return <Wrapper key={block.id} block={block} modeEdit={modeEdit} />;
        })}
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";
import Wrapper from "../components/Wrapper";
import { RootState } from "../redux/store";
import { useState } from "react";

export default function CreateWebsite() {
  const { block } = useSelector((state: RootState) => state.block);
  const [isEdit, setIsEdit] = useState(true);

  const Render = () => {
    return <Wrapper block={block} modeEdit={isEdit} />;
  };

  const ViewPage = () => {
    return <Wrapper block={block} modeEdit={isEdit} />;
  };

  return (
    <>
      <button
        className="p-1 bg-black bg-opacity-10 rounded-full"
        onClick={() => {
          setIsEdit(!isEdit);
        }}
      >
        <img src="/icons/mode.svg" width={15} alt="" />
      </button>
      <div className="relative min-h-screen">
        {isEdit ? <Render /> : <ViewPage />}
      </div>
    </>
  );
}

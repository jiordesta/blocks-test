import { useSelector } from "react-redux";
import Wrapper from "../components/Wrapper";
import { RootState } from "../redux/store";

export default function CreateWebsite() {
  const { block } = useSelector((state: RootState) => state.block);

  const Tools = () => {
    const LastNode = () => {
      return <li>last</li>;
    };

    const Node = () => {
      return <ul></ul>;
    };

    return (
      <div className="w-[20%] sticky top-0 left-0 bg-black bg-opacity-25 h-full flex flex-col justify-center">
        <button className="border border-black border-dashed py-4 px-8">
          Column
        </button>
      </div>
    );
  };

  const Render = () => {
    return <Wrapper block={block} />;
  };

  return (
    <div className="relative h-screen flex">
      <Tools />
      <Render />
    </div>
  );
}

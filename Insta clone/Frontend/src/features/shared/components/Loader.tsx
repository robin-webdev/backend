import { Spinner } from "@/components/ui/spinner.tsx";

const Loader = () => {
  return (
    <div className="h-screen w-screen bg-[#000000c4]">
      <Spinner className="size-8" />
    </div>
  );
};

export default Loader;

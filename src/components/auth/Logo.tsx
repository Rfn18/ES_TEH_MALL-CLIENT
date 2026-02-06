import { Leaf } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl auth-gradient shadow-lg">
        <Leaf className=" size-10  text-white" strokeWidth={2.5} />
      </div>
      <h2 className="font-semibold text-2xl">TehMallPos</h2>
      <p className="text-sm opacity-70">Point Of Sale System</p>
    </div>
  );
};

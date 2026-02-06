import type { ReactNode } from "react";
import { Logo } from "./Logo";

interface AuthCardProps {
  children: ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <>
      <div className="container-authcard flex flex-col p-10 items-center w-dvw h-fit">
        <div className="flex flex-colflex flex-col justify-center w-110 p-6 gap-4 bg-white shadow-md rounded-xl">
          <div className="card-header">
            <Logo />
          </div>
          <div className="card-body">{children}</div>
        </div>
      </div>
    </>
  );
};

import type React from "react";

interface OverlayProps {
  children: React.ReactNode;
}

export function Overlay({ children }: OverlayProps) {
  return (
    <div className="fixed flex items-center justify-center inset-0 z-50 bg-black/50">
      {children}
    </div>
  );
}

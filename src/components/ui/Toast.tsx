import { useEffect, useState } from "react";

export const Toast = ({ message }: any) => {
  const [visible, setVisible] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);
    }, 4000);

    const remove = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(remove);
    };
  }, []);

  if (!visible) return;

  return (
    <div
      className={`z-10 absolute bottom-10 right-10 flex items-center gap-4 p-4 rounded-xl bg-white shadow-2xl ${animateOut ? "animate-showOut" : "animate-showIn"}`}
    >
      {message}
    </div>
  );
};

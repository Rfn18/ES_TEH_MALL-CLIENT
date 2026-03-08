import { useState } from "react";
import { Overlay } from "./Overlay";
import { LoaderCircle } from "lucide-react";

export default function Alert({
  title,
  message,
  cancel,
  confirm,
}: {
  title: string;
  message: string;
  cancel: () => void;
  confirm: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    confirm();
  };
  return (
    <>
      <Overlay>
        <div className="animate-scaleIn w-120 flex flex-col gap-2 p-4 rounded-xl bg-white">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-sm opacity-70">{message}</p>
          <div className="self-end text-sm flex gap-2 font-semibold mt-2">
            <button
              onClick={cancel}
              className="border border-[#ddd] hover:bg-[#ddd]/50 cursor-pointer transition text-[#636363] py-2 px-4 rounded-xl"
            >
              Batal
            </button>
            {loading ? (
              <button
                disabled
                className="flex items-center gap-2 bg-[#FF4400]/50 hover:bg-[#FF4400]/40 cursor-pointer transition py-2 px-4 text-white rounded-xl"
              >
                <LoaderCircle className="size-4 animate-spin" />
                Loading...
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                className="bg-[#FF4400] hover:bg-[#FF4400]/80 cursor-pointer transition py-2 px-4 text-white rounded-xl"
              >
                Ya, Tutup Transaksi
              </button>
            )}
          </div>
        </div>
      </Overlay>
    </>
  );
}

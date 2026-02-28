import { Overlay } from "./Overlay";

export default function Alert({
  cancel,
  confirm,
}: {
  cancel: () => void;
  confirm: () => void;
}) {
  return (
    <>
      <Overlay>
        <div className="animate-scaleIn w-120 flex flex-col gap-2 p-4 rounded-xl bg-white">
          <h1 className="text-lg font-semibold">Tutup Transaksi Hari Ini?</h1>
          <p className="text-sm opacity-70">
            Setelah ditutup, Anda tidak dapat menambah transaksi baru untuk hari
            ini. Pastikan semua transaksi sudah tercatat dengan benar.
          </p>
          <div className="self-end text-sm flex gap-2 font-semibold mt-2">
            <button
              onClick={cancel}
              className="border border-[#ddd] hover:bg-[#ddd]/50 cursor-pointer transition text-[#636363] py-2 px-4 rounded-xl"
            >
              Batal
            </button>
            <button
              onClick={confirm}
              className="bg-[#FF4400] hover:bg-[#FF4400]/80 cursor-pointer transition py-2 px-4 text-white rounded-xl"
            >
              Ya, Tutup Transaksi
            </button>
          </div>
        </div>
      </Overlay>
    </>
  );
}

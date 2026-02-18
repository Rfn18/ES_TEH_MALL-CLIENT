import { TableList } from "./TableList";

export const CardForm = () => {
  return (
    <>
      <div>
        <h1 className="text-lg font-semibold text-[#2f524a]">Kelola Menu</h1>
        <p className="text-sm text-[#2f524a]/70">
          Tambah, edit, atau nonaktifkan item menu
        </p>
      </div>
      <form className="grid grid-cols-2 grid-rows-2 mt-4 gap-2">
        <div className="flex flex-col text-[#2f524a] gap-2">
          <label
            htmlFor="kd_menu"
            className="text-[#2f524a] text-sm font-semibold"
          >
            Kode Menu
          </label>
          <input
            type="text"
            name="kd_menu"
            value={"JNS-260218-002"}
            disabled
            className="border border-[#119184]/20 bg-[#f9fafb] w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]/70"
          />
        </div>
        <div className="flex flex-col text-[#2f524a] gap-2">
          <label
            htmlFor="nama_menu"
            className="text-[#2f524a] text-sm font-semibold"
          >
            Nama Menu
          </label>
          <input
            type="text"
            name="nama_menu"
            className="border border-[#119184]/20 bg-[#f9fafb] w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
          />
        </div>
        <div className="flex flex-col text-[#2f524a] gap-2">
          <label
            htmlFor="jenis_menu"
            className="text-[#2f524a] text-sm font-semibold"
          >
            Jenis
          </label>
          <select
            name="jenis_menu"
            className="border border-[#119184]/20 bg-[#f9fafb] w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
          >
            <option value="">Pilih Jenis</option>
            <option value="cup_besar">cup_besar</option>
            <option value="cup_kecil">cup_kecil</option>
            <option value="rasa_rasa">rasa_rasa</option>
          </select>
        </div>
        <div className="flex flex-col text-[#2f524a] gap-2">
          <label
            htmlFor="harga_satuan"
            className="text-[#2f524a] text-sm font-semibold"
          >
            Harga
          </label>
          <input
            type="number"
            name="harga_satuan"
            className="border border-[#119184]/20 bg-[#f9fafb] w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
          />
        </div>
        <button className="py-2 px-4 bg-[#119184]/70 text-white rounded-lg hover:bg-[#0d7a6d] transition-colors cursor-pointer">
          + simpan
        </button>
      </form>
      <TableList />
    </>
  );
};

export const CardForm = () => {
  return (
    <>
      <div>
        <h1 className="text-lg font-semibold text-[#2f524a]">Kelola Menu</h1>
        <p className="text-sm text-[#2f524a]/70">
          Tambah, edit, atau nonaktifkan item menu
        </p>
      </div>
      <form className="grid grid-cols-2 grid-rows-2 mt-4">
        <div className="flex flex-col text-[#2f524a] gap-2">
          <label
            htmlFor="kd_menu"
            className="text-[#2f524a] text-sm font-semibold"
          >
            Kode Menu
          </label>
          <input type="text" name="kd_menu" />
        </div>
        <div>
          <label htmlFor="nama_menu">Nama Menu</label>
          <input type="text" name="nama_menu" />
        </div>
        <div>
          <label htmlFor="jenis_menu">Jenis</label>
          <select name="jenis_menu">
            <option value="">Pilih Jenis</option>
            <option value="cup_besar">cup_besar</option>
            <option value="cup_kecil">cup_kecil</option>
            <option value="rasa_rasa">rasa_rasa</option>
          </select>
        </div>
        <div>
          <label htmlFor="harga_satuan">Harga</label>
          <input type="number" name="harga_satuan" />
        </div>
        <button>+ simpan</button>
      </form>
    </>
  );
};

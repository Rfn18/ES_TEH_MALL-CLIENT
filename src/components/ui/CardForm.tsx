export const CardForm = () => {
  return (
    <>
      <div>
        <h1>Kelola Menu</h1>
        <p>Tambah, edit, atau nonaktifkan item menu</p>
      </div>
      <form>
        <label htmlFor="kd_menu">Kode Menu</label>
        <input type="text" name="kd_menu" />
        <label htmlFor="nama_menu">Nama Menu</label>
        <input type="text" name="nama_menu" />
        <label htmlFor="jenis_menu">Jenis</label>
        <select name="jenis_menu">
          <option value="">Pilih Jenis</option>
          <option value="cup_besar">cup_besar</option>
          <option value="cup_kecil">cup_kecil</option>
          <option value="rasa_rasa">rasa_rasa</option>
        </select>
        <label htmlFor="harga_satuan">Harga</label>
        <input type="number" name="harga_satuan" />
        <button>+ simpan</button>
      </form>
    </>
  );
};

import { LoaderCircle, X } from "lucide-react";
import { Overlay } from "./Overlay";
import { useState } from "react";
import api from "../../services/api";

const inputCls =
  "border border-[#119184]/20 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]";
const labelCls = "text-[#2f524a] text-sm font-semibold";
const fieldCls = "flex flex-col gap-2";

interface MenuTableProps {
  id: number;
  kd_menu: string;
  jenis_id: string;
  nama_menu: string;
  jenis: {
    nama_jenis: string;
  };
  biaya_produksi: number;
  harga_satuan: number;
}

interface JenisForm {
  id: number;
  kd_jenis: string;
  nama_jenis: string;
}

interface UserForm {
  id: number;
  name: string;
  email: string;
  stand_id: string;
  password: string;
  role: string;
  stand: {
    nama_stand: string | null;
    lokasi: string | null;
  };
}

interface EditMenuProps {
  menu: MenuTableProps;
  jenis: JenisForm[];
  onClose: () => void;
  onSuccess: () => void;
}

interface StandForm {
  id: number;
  kd_stand: string;
  nama_stand: string;
  lokasi: string;
}

const url = import.meta.env.VITE_BASE_URL;

export const EditMenu = ({
  menu,
  jenis,
  onClose,
  onSuccess,
}: EditMenuProps) => {
  const [formData, setFormData] = useState({
    nama_menu: menu.nama_menu,
    jenis_id: menu.jenis_id,
    biaya_produksi: menu.biaya_produksi,
    harga_satuan: menu.harga_satuan,
    _method: "PUT",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.post(`/menu/${menu.id}`, formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating menu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <div className="flex flex-col justify-between bg-white w-140 h-140 p-6 rounded-xl">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg">Edit Menu</h1>
            <p className="text-sm opacity-70">
              Perbarui data menu di bawah ini
            </p>
          </div>
          <X
            size={20}
            className="cursor-pointer opacity-70"
            onClick={onClose}
          />
        </div>
        <div>
          <form className="flex flex-col gap-2 mt-4">
            <div className={fieldCls}>
              <label className={labelCls}>Kode Menu</label>
              <input
                type="text"
                className={`${inputCls} text-[#2f524a]/70 cursor-not-allowed`}
                value={menu.kd_menu}
                disabled
              />
            </div>
            <div className={fieldCls}>
              <label className={labelCls}>Nama Menu</label>
              <input
                type="text"
                name="nama_menu"
                className={`${inputCls} text-[#2f524a]/70`}
                value={formData.nama_menu}
                onChange={handleChange}
                placeholder="Masukkan nama menu"
              />
            </div>
            <div className={fieldCls}>
              <label className={labelCls}>Jenis</label>
              <select
                name="jenis_id"
                className={`${inputCls} text-[#2f524a]/70`}
                value={formData.jenis_id}
                onChange={handleChange}
              >
                {jenis.map((j) => (
                  <option key={j.kd_jenis} value={j.kd_jenis}>
                    {j.nama_jenis}
                  </option>
                ))}
              </select>
            </div>
            <div className={fieldCls}>
              <label className={labelCls}>Biaya Produksi</label>
              <input
                type="number"
                name="biaya_produksi"
                className={`${inputCls} text-[#2f524a]/70`}
                value={formData.biaya_produksi}
                onChange={handleChange}
                placeholder="Masukkan biaya produksi"
              />
            </div>
            <div className={fieldCls}>
              <label className={labelCls}>Harga Satuan</label>
              <input
                type="number"
                name="harga_satuan"
                className={`${inputCls} text-[#2f524a]/70`}
                value={formData.harga_satuan}
                onChange={handleChange}
                placeholder="Masukkan harga satuan"
              />
            </div>
          </form>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="border border-[#119184]/20 py-2 px-4 rounded-xl cursor-pointer hover:bg-[#119184]/10 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#119184] font-semibold text-white py-2 px-4 rounded-xl hover:bg-[#0d7a6d]/70 transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center">
                <LoaderCircle size={18} className="animate-spin" />
                <span className="ml-2 text-sm">Menyimpan...</span>
              </div>
            ) : (
              "Simpan"
            )}
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export const EditJenis = ({
  jenis,
  onClose,
  onSuccess,
}: {
  jenis: JenisForm;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [namaJenis, setNamaJenis] = useState(jenis.nama_jenis);

  const handleSubmit = async () => {
    await api.put(`/jenis/${jenis.id}`, {
      nama_jenis: namaJenis,
    });
    onSuccess();
    onClose();
  };

  return (
    <Overlay>
      <div className="flex flex-col justify-between bg-white w-140 p-6 rounded-xl gap-6">
        {/* Header */}
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg">Edit Jenis</h1>
            <p className="text-sm opacity-70">
              Perbarui data jenis di bawah ini
            </p>
          </div>
          <X
            size={20}
            className="cursor-pointer opacity-70"
            onClick={onClose}
          />
        </div>
        {/* Form */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#2f524a] text-sm font-semibold">
              Kode Jenis
            </label>
            <input
              type="text"
              value={jenis.kd_jenis}
              disabled
              className="border border-[#119184]/20 w-full rounded-lg px-4 py-2 text-sm text-[#2f524a]/70 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#2f524a] text-sm font-semibold">
              Nama Jenis
            </label>
            <input
              type="text"
              value={namaJenis}
              onChange={(e) => setNamaJenis(e.target.value)}
              className="border border-[#119184]/20 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
            />
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border border-[#119184]/20 py-2 px-4 rounded-xl hover:bg-[#119184]/10 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#119184] font-semibold text-white py-2 px-4 rounded-xl hover:bg-[#0d7a6d]/70 transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export const EditUser = ({
  user,
  stand,
  onClose,
  onSuccess,
}: {
  user: UserForm;
  stand: StandForm[];
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    stand_id: user.stand_id,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    await api.put(`/user/${user.id}`, formData);
    onSuccess();
    onClose();
  };

  return (
    <Overlay>
      <div className="flex flex-col justify-between bg-white w-140 p-6 rounded-xl gap-6">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg">Edit User</h1>
            <p className="text-sm opacity-70">
              Perbarui data user di bawah ini
            </p>
          </div>
          <X
            size={20}
            className="cursor-pointer opacity-70"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col gap-4">
          {[
            { label: "Nama", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col gap-2">
              <label className="text-[#2f524a] text-sm font-semibold">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className="border border-[#119184]/20 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
              />
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label className="text-[#2f524a] text-sm font-semibold">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-[#119184]/20 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
            >
              <option value="admin">Admin</option>
              <option value="kasir">Kasir</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#2f524a] text-sm font-semibold">
              Stand
            </label>
            <select
              name="stand_id"
              value={formData.stand_id}
              onChange={handleChange}
              className="border border-[#119184]/20 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
            >
              {stand.map((s) => (
                <option key={s.id} value={s.kd_stand}>
                  {s.nama_stand}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border border-[#119184]/20 py-2 px-4 rounded-xl hover:bg-[#119184]/10 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#119184] font-semibold text-white py-2 px-4 rounded-xl hover:bg-[#0d7a6d]/70 transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export const EditStand = ({
  stand,
  onClose,
  onSuccess,
}: {
  stand: StandForm;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [formData, setFormData] = useState({
    nama_stand: stand.nama_stand,
    lokasi: stand.lokasi,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    await api.put(`/stand/${stand.id}`, formData);
    onSuccess();
    onClose();
  };

  return (
    <Overlay>
      <div className="flex flex-col justify-between bg-white w-140 p-6 rounded-xl gap-6">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg">Edit Stand</h1>
            <p className="text-sm opacity-70">
              Perbarui data stand di bawah ini
            </p>
          </div>
          <X
            size={20}
            className="cursor-pointer opacity-70"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#2f524a] text-sm font-semibold">
              Kode Stand
            </label>
            <input
              type="text"
              value={stand.kd_stand}
              disabled
              className="border border-[#119184]/20 w-full rounded-lg px-4 py-2 text-sm text-[#2f524a]/70 cursor-not-allowed"
            />
          </div>
          {[
            { label: "Nama Stand", name: "nama_stand" },
            { label: "Lokasi", name: "lokasi" },
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col gap-2">
              <label className="text-[#2f524a] text-sm font-semibold">
                {label}
              </label>
              <input
                type="text"
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className="border border-[#119184]/20 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border border-[#119184]/20 py-2 px-4 rounded-xl hover:bg-[#119184]/10 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#119184] font-semibold text-white py-2 px-4 rounded-xl hover:bg-[#0d7a6d]/70 transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </Overlay>
  );
};

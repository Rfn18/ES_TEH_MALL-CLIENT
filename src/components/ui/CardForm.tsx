import { useEffect, useState } from "react";
import { TableList } from "./TableList";
import { Eye, EyeClosed, Lock } from "lucide-react";

type TabType = "menu" | "jenis" | "user";

interface MenuForm {
  kd_menu: string;
  nama_menu: string;
  jenis_menu: string;
  harga_satuan: number;
}

interface JenisForm {
  kd_jenis: string;
  nama_jenis: string;
}

interface UserForm {
  username: string;
  password: string;
  role: string;
}

const inputCls =
  "border border-[#119184]/20 bg-[#f9fafb] w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]";
const labelCls = "text-[#2f524a] text-sm font-semibold";
const fieldCls = "flex flex-col gap-2";

const FormMenu = () => {
  const [form, setForm] = useState<MenuForm>({
    kd_menu: "JNS-260218-002",
    nama_menu: "",
    jenis_menu: "",
    harga_satuan: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "harga_satuan" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit Menu:", form);
  };

  return (
    <>
      <div>
        <h1 className="text-lg font-semibold text-[#2f524a]">Kelola Menu</h1>
        <p className="text-sm text-[#2f524a]/70">
          Tambah, edit, atau nonaktifkan item menu
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 grid-rows-2 mt-4 gap-2"
      >
        <div className={fieldCls}>
          <label className={labelCls}>Kode Menu</label>
          <input
            type="text"
            name="kd_menu"
            value={form.kd_menu}
            disabled
            className={`${inputCls} text-[#2f524a]/70`}
          />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Nama Menu</label>
          <input
            type="text"
            name="nama_menu"
            value={form.nama_menu}
            onChange={handleChange}
            placeholder="cth: vanila"
            className={inputCls}
          />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Jenis</label>
          <select
            name="jenis_menu"
            value={form.jenis_menu}
            onChange={handleChange}
            className={inputCls}
          >
            <option value="">Pilih Jenis</option>
            <option value="cup_besar">Cup Besar</option>
            <option value="cup_kecil">Cup Kecil</option>
            <option value="rasa_rasa">Rasa-Rasa</option>
          </select>
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Harga</label>
          <input
            type="number"
            name="harga_satuan"
            value={form.harga_satuan || ""}
            onChange={handleChange}
            placeholder="cth: 5000"
            className={inputCls}
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-[#119184]/70 text-white rounded-lg hover:bg-[#0d7a6d] transition-colors cursor-pointer col-span-1"
        >
          + Simpan
        </button>
      </form>
    </>
  );
};

const FormJenis = () => {
  const [form, setForm] = useState<JenisForm>({
    kd_jenis: "JNS-260218-003",
    nama_jenis: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit Jenis:", form);
  };

  return (
    <>
      <div>
        <h1 className="text-lg font-semibold text-[#2f524a]">Kelola Jenis</h1>
        <p className="text-sm text-[#2f524a]/70">
          Tambah atau edit kategori jenis menu
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 mt-4 gap-2">
        <div className={fieldCls}>
          <label className={labelCls}>Kode Jenis</label>
          <input
            type="text"
            name="kd_jenis"
            value={form.kd_jenis}
            disabled
            className={`${inputCls} text-[#2f524a]/70`}
          />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Nama Jenis</label>
          <input
            type="text"
            name="nama_jenis"
            value={form.nama_jenis}
            onChange={handleChange}
            placeholder="cth: cup_besar"
            className={inputCls}
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-[#119184]/70 text-white rounded-lg hover:bg-[#0d7a6d] transition-colors cursor-pointer col-span-1"
        >
          + Simpan
        </button>
      </form>
    </>
  );
};

const FormUser = () => {
  const [form, setForm] = useState<UserForm>({
    username: "",
    password: "",
    role: "",
  });

  const [showPw, setShowPw] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit User:", form);
  };

  return (
    <>
      <div>
        <h1 className="text-lg font-semibold text-[#2f524a]">Kelola User</h1>
        <p className="text-sm text-[#2f524a]/70">
          Tambah atau atur akun pengguna sistem
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 mt-4 gap-2">
        <div className={fieldCls}>
          <label className={labelCls}>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="cth: admin01"
            className={inputCls}
          />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Password</label>
          <div
            className={`flex items-center bg-[#f9fafb] w-full h-10 mb-2 border border-[#ddd] rounded-lg`}
          >
            <Lock size="20" className="m-3 opacity-70" />
            <input
              type={showPw ? "text" : "password"}
              name="password"
              placeholder="Enter Your password"
              className="w-full h-full text-sm outline-none"
              onChange={handleChange}
            />
            {showPw ? (
              <EyeClosed
                size="20"
                className="m-3 opacity-70 cursor-pointer"
                onClick={() => setShowPw(!showPw)}
              />
            ) : (
              <Eye
                size="20"
                className="m-3 opacity-70 cursor-pointer"
                onClick={() => setShowPw(!showPw)}
              />
            )}
          </div>
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className={inputCls}
          >
            <option value="">Pilih Role</option>
            <option value="admin">Admin</option>
            <option value="kasir">Kasir</option>
          </select>
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-[#119184]/70 text-white rounded-lg hover:bg-[#0d7a6d] transition-colors cursor-pointer col-span-1 self-end"
        >
          + Simpan
        </button>
      </form>
    </>
  );
};

export const CardForm = ({ activeTab }: { activeTab: TabType }) => {
  const [activeTabState, setActiveTab] = useState<TabType>("menu");

  useEffect(() => {
    setActiveTab(activeTab);
  });

  const renderForm = () => {
    switch (activeTabState) {
      case "menu":
        return <FormMenu />;
      case "jenis":
        return <FormJenis />;
      case "user":
        return <FormUser />;
      default:
        return null;
    }
  };
  return (
    <>
      {renderForm()}
      <TableList />
    </>
  );
};

import { useEffect, useState } from "react";
import { TableList } from "./TableList";
import { CircleCheck, Eye, EyeClosed, LoaderCircle, Lock } from "lucide-react";
import axios from "axios";
import { Toast } from "./Toast";

const url: string = import.meta.env.VITE_BASE_URL;

type TabType = "menu" | "jenis" | "stand" | "user";

interface MenuForm {
  kd_menu: string;
  nama_menu: string;
  jenis_id: string;
  harga_satuan: number;
  biaya_produksi: number;
}

interface JenisForm {
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

interface StandForm {
  id: number;
  kd_stand: string;
  nama_stand: string;
  lokasi: string;
}

// fetch props

interface MenuTableProps {
  kd_menu: string;
  jenis_id: string;
  nama_menu: string;
  jenis: {
    nama_jenis: string;
  };
  biaya_produksi: number;
  harga_satuan: number;
}

const inputCls =
  "border border-[#119184]/20 bg-[#f9fafb] w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]";
const labelCls = "text-[#2f524a] text-sm font-semibold";
const fieldCls = "flex flex-col gap-2";

const FormMenu = ({
  menu,
  jenis,
  onAdd,
}: {
  menu: MenuTableProps[];
  jenis: JenisForm[];
  onAdd: (newMenu: MenuTableProps) => void;
}) => {
  const [form, setForm] = useState<MenuForm>({
    kd_menu: "",
    nama_menu: "",
    jenis_id: "",
    harga_satuan: 0,
    biaya_produksi: 0,
  });

  const [disable, setDisable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (
      form.biaya_produksi === 0 ||
      form.harga_satuan === 0 ||
      form.nama_menu === "" ||
      form.jenis_id === ""
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [form]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "harga_satuan" ? Number(value) : value,
    }));
  };

  const addMenu = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${url}/api/menu`, form);
      console.log("Add menu response:", res.data.data.datas);
      const newResponse = res.data.data.datas;
      onAdd(newResponse);
    } catch (error) {
      console.error("Error adding menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMenu();
    console.log("Submit Menu:", form);
  };

  const lastKdMenu =
    menu.length > 0 ? menu[menu.length - 1].kd_menu : "MNU-260218-000";
  useEffect(() => {
    const generateKdMenu = () => {
      const splitCode = lastKdMenu.split("-");
      const lastNumber = parseInt(splitCode[2]);
      const newNumber = lastNumber + 1;

      if (newNumber < 10) {
        setForm((prev) => ({
          ...prev,
          kd_menu: `MNU-${splitCode[1]}-000${newNumber}`,
        }));
      } else if (newNumber < 100) {
        setForm((prev) => ({
          ...prev,
          kd_menu: `MNU-${splitCode[1]}-00${newNumber}`,
        }));
      } else if (newNumber < 1000) {
        setForm((prev) => ({
          ...prev,
          kd_menu: `MNU-${splitCode[1]}-0${newNumber}`,
        }));
      }
    };

    generateKdMenu();
  }, [lastKdMenu]);

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
        className="grid grid-cols-2 grid-rows-3 mt-4 gap-2"
      >
        <div className={fieldCls}>
          <div className="flex justify-between">
            <label className={labelCls}>Kode Menu</label>
            <p className="text-sm opacity-50">
              *Kode menu digenerate otomatis.
            </p>
          </div>
          <input
            type="text"
            name="kd_menu"
            value={`Prev: ${form.kd_menu}`}
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
            name="jenis_id"
            value={form.jenis_id}
            onChange={handleChange}
            className={inputCls}
          >
            <option value="">Pilih Jenis</option>
            {jenis.map((data, index) => (
              <option key={index} value={data.kd_jenis}>
                {data.nama_jenis}
              </option>
            ))}
          </select>
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Biaya Produksi</label>
          <input
            type="number"
            name="biaya_produksi"
            value={form.biaya_produksi || ""}
            onChange={handleChange}
            placeholder="cth: 4300"
            className={inputCls}
          />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Harga Satuan</label>
          <input
            type="number"
            name="harga_satuan"
            value={form.harga_satuan || ""}
            onChange={handleChange}
            placeholder="cth: 5000"
            className={inputCls}
          />
        </div>
        {loading ? (
          <button
            disabled={true}
            type="submit"
            className="flex items-center justify-center gap-4 self-end py-2 px-4 bg-[#119184]/70 text-white rounded-lg transition-colors cursor-not-allowed col-span-1 opacity-50"
          >
            <LoaderCircle className="size-4 animate-spin" />
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            disabled={disable}
            className={`self-end py-2 px-4 bg-[#119184]/70 text-white rounded-lg ${disable ? "transition-colors cursor-not-allowed col-span-1 opacity-50 " : "hover:bg-[#0d7a6d] transition-colors cursor-pointer col-span-1"}`}
          >
            + Simpan
          </button>
        )}
      </form>
    </>
  );
};

const FormJenis = ({
  jenis,
  onAdd,
}: {
  jenis: JenisForm[];
  onAdd: (newJenis: JenisForm) => void;
}) => {
  const [form, setForm] = useState<JenisForm>({
    kd_jenis: "JNS-260218-003",
    nama_jenis: "",
  });
  const [disable, setDisable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (form.nama_jenis === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [form]);

  const addJenis = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${url}/api/jenis`, form);
      form.nama_jenis = "";
      const newResponse = res.data.data.datas;
      onAdd(newResponse);
    } catch (error) {
      console.error("Error adding jenis:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJenis();
    console.log("Submit Jenis:", form);
  };

  const lastKdJenis = jenis[jenis.length - 1]?.kd_jenis || "JNS-260218-000";

  useEffect(() => {
    const generateKdJenis = () => {
      const splitCode = lastKdJenis.split("-");
      const lastNumber = parseInt(splitCode[2]);
      const newNumber = lastNumber + 1;

      if (newNumber < 10) {
        setForm((prev) => ({
          ...prev,
          kd_jenis: `JNS-${splitCode[1]}-000${newNumber}`,
        }));
      } else if (newNumber < 100) {
        setForm((prev) => ({
          ...prev,
          kd_jenis: `JNS-${splitCode[1]}-00${newNumber}`,
        }));
      } else if (newNumber < 1000) {
        setForm((prev) => ({
          ...prev,
          kd_jenis: `JNS-${splitCode[1]}-0${newNumber}`,
        }));
      }
    };

    generateKdJenis();
  }, [lastKdJenis]);

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
          <div className="flex justify-between">
            <label className={labelCls}>Kode Jenis</label>
            <p className="text-sm opacity-50">
              *Kode Jenis digenerate otomatis.
            </p>
          </div>
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

        {loading ? (
          <button
            disabled={true}
            type="submit"
            className="flex items-center justify-center gap-4 self-end py-2 px-4 bg-[#119184]/70 text-white rounded-lg transition-colors cursor-not-allowed col-span-1 opacity-50"
          >
            <LoaderCircle className="size-4 animate-spin" />
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            disabled={disable}
            className={`self-end py-2 px-4 bg-[#119184]/70 text-white rounded-lg ${disable ? "transition-colors cursor-not-allowed col-span-1 opacity-50 " : "hover:bg-[#0d7a6d] transition-colors cursor-pointer col-span-1"}`}
          >
            + Simpan
          </button>
        )}
      </form>
    </>
  );
};

const FormUser = ({
  user,
  stand,
  onAdd,
}: {
  user: UserForm[];
  stand: StandForm[];
  onAdd: (newUser: UserForm) => void;
}) => {
  const [form, setForm] = useState<UserForm>({
    id: 1,
    name: "",
    email: "",
    password: "",
    role: "",
    stand_id: "",
  });
  const [disable, setDisable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [showPw, setShowPw] = useState<boolean>(false);

  useEffect(() => {
    if (form.name === "" || form.password === "" || form.stand_id === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [form]);

  const addUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${url}/api/user`, form);
      form.name = "";
      form.password = "";
      form.role = "";
      const data = response.data.data.datas;
      onAdd(data);
    } catch (error) {
      console.error("Failed add user", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser();
    console.log("Submit User:", form);
  };

  const lastIDUser = user[user.length - 1]?.id;
  useEffect(() => {
    setForm((prev) => ({ ...prev, id: lastIDUser + 1 }));
  }, [lastIDUser]);

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
          <div className="flex justify-between">
            <label className={labelCls}>ID</label>
            <p className="text-sm opacity-50">*ID digenerate otomatis.</p>
          </div>
          <input
            type="text"
            name="username"
            value={form.id}
            onChange={handleChange}
            disabled={true}
            className={`${inputCls} text-[#2f524a]/70`}
          />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Username</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="cth: admin01"
            className={inputCls}
          />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="cth: admin@example.com"
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
          <label className={labelCls}>Stand</label>
          <select
            name="stand_id"
            value={form.stand_id}
            onChange={handleChange}
            className={inputCls}
          >
            <option value="">Pilih Stand</option>
            {stand.map((data) => (
              <option key={data.kd_stand} value={data.kd_stand}>
                {data.nama_stand}
              </option>
            ))}
          </select>
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

        {loading ? (
          <button
            disabled={true}
            type="submit"
            className="flex items-center justify-center gap-4 self-end py-2 px-4 bg-[#119184]/70 text-white rounded-lg transition-colors cursor-not-allowed col-span-1 opacity-50"
          >
            <LoaderCircle className="size-4 animate-spin" />
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            disabled={disable}
            className={`self-end py-2 px-4 bg-[#119184]/70 text-white rounded-lg ${disable ? "transition-colors cursor-not-allowed col-span-1 opacity-50 " : "hover:bg-[#0d7a6d] transition-colors cursor-pointer col-span-1"}`}
          >
            + Simpan
          </button>
        )}
      </form>
    </>
  );
};

const FormStand = ({
  stand,
  onAdd,
}: {
  stand: StandForm[];
  onAdd: (newUser: StandForm) => void;
}) => {
  const [form, setForm] = useState<StandForm>({
    id: 0,
    kd_stand: "STD-260218-001",
    nama_stand: "",
    lokasi: "",
  });
  const [disable, setDisable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (form.nama_stand === "" || form.lokasi === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [form]);

  const addUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${url}/api/stand`, form);
      form.nama_stand = "";
      form.lokasi = "";
      const data = response.data.data.datas;
      console.log(data);
      onAdd(data);
    } catch (error) {
      console.error("Failed add user", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser();
  };

  const lastKdStand = stand[stand.length - 1]?.kd_stand || "STD-260218-000";
  useEffect(() => {
    const generateKdJenis = () => {
      const splitCode = lastKdStand.split("-");
      const lastNumber = parseInt(splitCode[2]);
      const newNumber = lastNumber + 1;

      if (newNumber < 10) {
        setForm((prev) => ({
          ...prev,
          kd_stand: `STD-${splitCode[1]}-000${newNumber}`,
        }));
      } else if (newNumber < 100) {
        setForm((prev) => ({
          ...prev,
          kd_stand: `STD-${splitCode[1]}-00${newNumber}`,
        }));
      } else if (newNumber < 1000) {
        setForm((prev) => ({
          ...prev,
          kd_stand: `STD-${splitCode[1]}-0${newNumber}`,
        }));
      }
    };

    generateKdJenis();
  }, [lastKdStand]);

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
          <div className="flex justify-between">
            <label className={labelCls}>ID</label>
            <p className="text-sm opacity-50">*ID digenerate otomatis.</p>
          </div>
          <input
            type="text"
            name="kd_stand"
            value={form.kd_stand}
            onChange={handleChange}
            disabled={true}
            className={`${inputCls} text-[#2f524a]/70`}
          />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Nama stand</label>
          <input
            type="text"
            name="nama_stand"
            value={form.nama_stand}
            onChange={handleChange}
            placeholder="cth: biru"
            className={inputCls}
          />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Lokasi</label>
          <input
            type="text"
            name="lokasi"
            value={form.lokasi}
            onChange={handleChange}
            placeholder="cth: JL. Betet Bawang, GG. Martha."
            className={inputCls}
          />
        </div>
        {loading ? (
          <button
            disabled={true}
            type="submit"
            className="flex items-center justify-center gap-4 self-end py-2 px-4 bg-[#119184]/70 text-white rounded-lg transition-colors cursor-not-allowed col-span-1 opacity-50"
          >
            <LoaderCircle className="size-4 animate-spin" />
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            disabled={disable}
            className={`self-end py-2 px-4 bg-[#119184]/70 text-white rounded-lg ${disable ? "transition-colors cursor-not-allowed col-span-1 opacity-50 " : "hover:bg-[#0d7a6d] transition-colors cursor-pointer col-span-1"}`}
          >
            + Simpan
          </button>
        )}
      </form>
    </>
  );
};

export const CardForm = ({ activeTab }: { activeTab: TabType }) => {
  const [activeTabState, setActiveTab] = useState<TabType>("menu");
  const [menus, setMenus] = useState<MenuTableProps[]>([]);
  const [jenisList, setJenisList] = useState<JenisForm[]>([]);
  const [userList, setUserList] = useState<UserForm[]>([]);
  const [standList, setStandList] = useState<StandForm[]>([]);

  const fetchMenuData = async () => {
    try {
      const response = await axios.get(`${url}/api/menu`);
      const data = await response.data.data;
      setMenus(data.datas.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const fetchJenisData = async () => {
    try {
      const response = await axios.get(`${url}/api/jenis`);
      const data = await response.data.data;
      setJenisList(data.datas.data);
    } catch (error) {
      console.error("Error fetching jenis data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/api/user`);
      const data = await response.data.data;
      setUserList(data.datas.data);
    } catch (error) {
      console.error("Error fetching User data:", error);
    }
  };

  const fetchStandData = async () => {
    try {
      const response = await axios.get(`${url}/api/stand`);
      const data = await response.data.data;
      setStandList(data.datas.data);
    } catch (error) {
      console.error("Error fetching Stand data:", error);
    }
  };

  // menu

  const [successDeleteMenu, setSuccessDeleteMenu] = useState<boolean>(false);
  const [successCreateMenu, setSuccessCreateMenu] = useState<boolean>(false);

  useEffect(() => {
    fetchJenisData();
    fetchMenuData();
    fetchUserData();
    fetchStandData();
  }, []);

  const handleAddMenu = (newMenu: MenuTableProps) => {
    setMenus((prev) => [...prev, newMenu]);
    setSuccessCreateMenu(true);
    setTimeout(() => {
      setSuccessCreateMenu(false);
    }, 5000);
  };

  const handleDeleteMenu = async (kd_menu: string) => {
    await axios.delete(`${url}/api/menu/${kd_menu}`);
    await fetchMenuData();
    setSuccessDeleteMenu(true);
    setTimeout(() => {
      setSuccessDeleteMenu(false);
    }, 5000);
  };

  useEffect(() => {
    setActiveTab(activeTab);
  });

  // Jenis
  const [successDeleteJenis, setSuccessDeleteJenis] = useState<boolean>(false);
  const [successCreateJenis, setSuccessCreateJenis] = useState<boolean>(false);

  const handleAddjenis = (newJenis: JenisForm) => {
    setJenisList((prev) => [...prev, newJenis]);
    setSuccessCreateJenis(true);
    setTimeout(() => {
      setSuccessCreateJenis(false);
    }, 5000);
  };

  const handleDeleteJenis = async (kd_jenis: string) => {
    await axios.delete(`${url}/api/jenis/${kd_jenis}`);
    await fetchJenisData();
    setSuccessDeleteJenis(true);
    setTimeout(() => {
      setSuccessDeleteJenis(false);
    }, 5000);
  };

  // User
  const [successDeleteUser, setSuccessDeleteUser] = useState<boolean>(false);
  const [successCreateUser, setSuccessCreateUser] = useState<boolean>(false);

  const handleAddUser = (newUser: UserForm) => {
    setUserList((prev) => [...prev, newUser]);
    setSuccessCreateUser(true);
    setTimeout(() => {
      setSuccessCreateUser(false);
    }, 5000);
  };

  const handleDeleteUser = async (id: number) => {
    await axios.delete(`${url}/api/user/${id}`);
    await fetchUserData();
    setSuccessDeleteUser(true);
    setTimeout(() => {
      setSuccessDeleteUser(false);
    }, 5000);
  };

  // Stand
  const [successDeleteStand, setSuccessDeleteStand] = useState<boolean>(false);
  const [successCreateStand, setSuccessCreateStand] = useState<boolean>(false);

  const handleAddStand = (newStand: StandForm) => {
    setStandList((prev) => [...prev, newStand]);
    setSuccessCreateStand(true);
    console.log("Stand:", newStand);
    setTimeout(() => {
      setSuccessCreateStand(false);
    }, 5000);
  };

  const handleDeleteStand = async (id: number) => {
    await axios.delete(`${url}/api/stand/${id}`);
    await fetchStandData();
    setSuccessDeleteStand(true);
    setTimeout(() => {
      setSuccessDeleteStand(false);
    }, 5000);
  };

  const renderForm = () => {
    switch (activeTabState) {
      case "menu":
        return (
          <FormMenu
            menu={menus || []}
            jenis={jenisList || []}
            onAdd={handleAddMenu}
          />
        );
      case "jenis":
        return <FormJenis jenis={jenisList || []} onAdd={handleAddjenis} />;
      case "user":
        return (
          <FormUser user={userList} stand={standList} onAdd={handleAddUser} />
        );
      case "stand":
        return <FormStand stand={standList} onAdd={handleAddStand} />;
      default:
        return null;
    }
  };
  return (
    <>
      {/* Alert Menu */}
      {successDeleteMenu && (
        <Toast
          message={
            <div className="flex items-center justify-center gap-4">
              <CircleCheck size={20} className="text-[#119184]" />
              <div className="text-[#119184]">
                <h2 className="text-sm font-bold">
                  Menu deleted successfully!
                </h2>
                <p className="text-sm">
                  The menu has been deleted from the system.
                </p>
              </div>
            </div>
          }
        />
      )}
      {successCreateMenu && (
        <Toast
          message={
            <div className="flex items-center justify-center gap-4">
              <CircleCheck size={20} className="text-[#119184]" />
              <div className="text-[#119184]">
                <h2 className="text-sm font-bold">
                  Menu created successfully!
                </h2>
                <p className="text-sm">
                  The menu has been created in the system.
                </p>
              </div>
            </div>
          }
        />
      )}
      {/* Alert Jenis */}
      {successDeleteJenis && (
        <Toast
          message={
            <div className="flex items-center justify-center gap-4">
              <CircleCheck size={20} className="text-[#119184]" />
              <div className="text-[#119184]">
                <h2 className="text-sm font-bold">
                  Jenis deleted successfully!
                </h2>
                <p className="text-sm">
                  Jenis has been deleted from the system.
                </p>
              </div>
            </div>
          }
        />
      )}
      {successCreateJenis && (
        <Toast
          message={
            <div className="flex items-center justify-center gap-4">
              <CircleCheck size={20} className="text-[#119184]" />
              <div className="text-[#119184]">
                <h2 className="text-sm font-bold">
                  Jenis created successfully!
                </h2>
                <p className="text-sm">Jenis has been created in the system.</p>
              </div>
            </div>
          }
        />
      )}
      {/* Alert User */}
      {successDeleteUser && (
        <Toast
          message={
            <div className="flex items-center justify-center gap-4">
              <CircleCheck size={20} className="text-[#119184]" />
              <div className="text-[#119184]">
                <h2 className="text-sm font-bold">
                  User deleted successfully!
                </h2>
                <p className="text-sm">
                  User has been deleted from the system.
                </p>
              </div>
            </div>
          }
        />
      )}
      {successCreateUser && (
        <Toast
          message={
            <div className="flex items-center justify-center gap-4">
              <CircleCheck size={20} className="text-[#119184]" />
              <div className="text-[#119184]">
                <h2 className="text-sm font-bold">
                  User created successfully!
                </h2>
                <p className="text-sm">User has been created in the system.</p>
              </div>
            </div>
          }
        />
      )}
      {/* Alert Stand */}
      {successDeleteStand && (
        <Toast
          message={
            <div className="flex items-center justify-center gap-4">
              <CircleCheck size={20} className="text-[#119184]" />
              <div className="text-[#119184]">
                <h2 className="text-sm font-bold">
                  Stand deleted successfully!
                </h2>
                <p className="text-sm">
                  Stand has been deleted from the system.
                </p>
              </div>
            </div>
          }
        />
      )}
      {successCreateStand && (
        <Toast
          message={
            <div className="flex items-center justify-center gap-4">
              <CircleCheck size={20} className="text-[#119184]" />
              <div className="text-[#119184]">
                <h2 className="text-sm font-bold">
                  Stand created successfully!
                </h2>
                <p className="text-sm">Stand has been created in the system.</p>
              </div>
            </div>
          }
        />
      )}
      {renderForm()}
      <TableList
        activeTab={activeTabState}
        data={menus}
        jenis={jenisList}
        user={userList}
        stand={standList}
        onDeleteMenus={handleDeleteMenu}
        onDeleteJenis={handleDeleteJenis}
        onDeleteUser={handleDeleteUser}
        onDeleteStand={handleDeleteStand}
      />
    </>
  );
};

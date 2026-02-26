import { Package, Pencil, Search, Store, Trash, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { TabType } from "../../page/admin/dashboard";
import { ToRupiah } from "../../utils/ToRupiah";

interface Filters {
  searchTerm: string;
  jenis: string;
}

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

interface JenisTableProps {
  kd_jenis: string;
  nama_jenis: string;
}

interface UserTableProps {
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
interface StandTableProps {
  id: number;
  kd_stand: string;
  nama_stand: string;
  lokasi: string;
}

const ListMenu = ({
  data,
  jenis,
  onDelete,
}: {
  data: MenuTableProps[];
  jenis: JenisTableProps[];
  onDelete: (kd_menu: string) => void;
}) => {
  const [jenisList, setJenisList] = useState<JenisTableProps[]>([]);
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    jenis: "",
  });

  useEffect(() => {
    setJenisList(jenis);
  }, [data, jenis]);

  const filteredData = useMemo(() => {
    return data.filter((data) => {
      const nameMatch = data.nama_menu
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      const jenisMatch = filters.jenis ? data.jenis_id === filters.jenis : true;
      return nameMatch && jenisMatch;
    });
  }, [data, filters]);
  const empty = filteredData.length === 0;

  return (
    <>
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex border border-[#119184]/20 bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a] w-full rounded-lg px-4 py-2">
          <Search size={20} className=" text-[#2f524a]/70" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Cari menu..."
            className="w-full bg-transparent focus:outline-none ml-2 text-sm text-[#2f524a]"
            onChange={(e) =>
              setFilters({ ...filters, searchTerm: e.target.value })
            }
            value={filters.searchTerm}
          />
        </div>
        <div className="ml-4">
          <select
            name="jenis_menu"
            id="jenis_menu"
            className="border border-[#119184]/20 bg-[#f9fafb] w-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
            onChange={(e) => setFilters({ ...filters, jenis: e.target.value })}
          >
            <option value="">Pilih Jenis</option>
            {jenisList.map((data, index) => (
              <option key={index} value={data.kd_jenis}>
                {data.nama_jenis}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        {empty ? (
          <>
            <div className="self-center flex flex-col h-60 items-center justify-center text-[#2f524a]/70  ">
              <Package size={50} />
              <h1 className="font-semibold mt-4">Belum ada list menu</h1>
              <p className="text-sm">Tambahkan menu untuk melihat list menu.</p>
            </div>
          </>
        ) : (
          <>
            <table className="w-full text-left gap-2">
              <thead>
                <tr className="border-b border-[#119184]/20 text-sm text-[#2f524a] font-semibold">
                  <th className="p-4">Kode </th>
                  <th className="p-4">Nama Menu</th>
                  <th className="p-4">Jenis</th>
                  <th className="p-4">Biaya Produksi</th>
                  <th className="p-4">Harga Satuan</th>
                  <th className="p-4">Aksi</th>
                </tr>
              </thead>
              <tbody className=" text-md font-semibold text-[#2f524a]">
                {filteredData.map((data, index) => (
                  <tr className="border-b border-[#119184]/20" key={index}>
                    <td className="p-4">{data.kd_menu}</td>
                    <td className="p-4">{data.nama_menu}</td>
                    <td className="p-4">{data.jenis.nama_jenis}</td>
                    <td className="p-4">{ToRupiah(data.biaya_produksi)}</td>
                    <td className="p-4">{ToRupiah(data.harga_satuan)}</td>
                    <td className="p-4">
                      <button className="text-sm text-[#2f524a] px-2 py-2 cursor-pointer hover:bg-[#2f524a]/10 rounded transition">
                        <Pencil size={16} className="text-[#2f524a]" />
                      </button>
                      <button
                        className="text-sm text-[#f44336] px-2 py-2 ml-2 cursor-pointer hover:bg-[#f44336]/10 rounded transition"
                        onClick={() => onDelete(data.kd_menu)}
                      >
                        <Trash size={16} className="text-[#f44336]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

const ListJenis = ({
  jenis,
  onDelete,
}: {
  jenis: JenisTableProps[];
  onDelete: (kd_jenis: string) => void;
}) => {
  const [jenisList, setJenisList] = useState<JenisTableProps[]>([]);

  useEffect(() => {
    setJenisList(jenis);
  }, [jenis]);

  return (
    <>
      <div className=" mt-4">
        <div className="mt-4">
          <table className="w-full text-left gap-2">
            <thead>
              <tr className="border-b border-[#119184]/20 text-sm text-[#2f524a] font-semibold">
                <th className="p-4 w-1/3">Kode </th>
                <th className="p-4 w-1/3">Nama Jenis</th>
                <th className="p-4 w-1/3">Aksi</th>
              </tr>
            </thead>
            <tbody className=" text-md font-semibold text-[#2f524a]">
              {jenisList.map((data, index) => (
                <tr className="border-b border-[#119184]/20" key={index}>
                  <td className="p-4">{data.kd_jenis}</td>
                  <td className="p-4">{data.nama_jenis}</td>
                  <td className="p-4">
                    <button className="text-sm text-[#2f524a] px-2 py-2 cursor-pointer hover:bg-[#2f524a]/10 rounded transition">
                      <Pencil size={16} className="text-[#2f524a]" />
                    </button>
                    <button className="text-sm text-[#f44336] px-2 py-2 ml-2 cursor-pointer hover:bg-[#f44336]/10 rounded transition">
                      <Trash
                        size={16}
                        className="text-[#f44336]"
                        onClick={() => onDelete(data.kd_jenis)}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const ListUser = ({
  user,
  onDelete,
}: {
  user: UserTableProps[];
  onDelete: (id: number) => void;
}) => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    jenis: "",
  });

  const filteredUser = useMemo(() => {
    return user.filter((data) => {
      const nameMatch = data.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      const jenisMatch = filters.jenis ? data.role === filters.jenis : true;
      return nameMatch && jenisMatch;
    });
  }, [user, filters]);
  const empty = filteredUser.length === 0;

  return (
    <>
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex border border-[#119184]/20 bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a] w-full rounded-lg px-4 py-2">
          <Search size={20} className=" text-[#2f524a]/70" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Cari user..."
            className="w-full bg-transparent focus:outline-none ml-2 text-sm text-[#2f524a]"
            onChange={(e) =>
              setFilters({ ...filters, searchTerm: e.target.value })
            }
            value={filters.searchTerm}
          />
        </div>
        <div className="ml-4">
          <select
            name="jenis_user"
            id="jenis_user"
            className="border border-[#119184]/20 bg-[#f9fafb] w-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
            onChange={(e) => setFilters({ ...filters, jenis: e.target.value })}
          >
            <option value="">Pilih Jenis</option>
            <option value="admin">admin</option>
            <option value="kasir">kasir</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        {empty ? (
          <>
            <div className="self-center flex flex-col h-60 items-center justify-center text-[#2f524a]/70  ">
              <User size={50} />
              <h1 className="font-semibold mt-4">Belum ada list user</h1>
              <p className="text-sm">Tambahkan user untuk melihat list user.</p>
            </div>
          </>
        ) : (
          <>
            <table className="w-full text-left gap-2">
              <thead>
                <tr className="border-b border-[#119184]/20 text-sm text-[#2f524a] font-semibold">
                  <th className="p-4 w-1/6">ID </th>
                  <th className="p-4 w-1/6">Nama</th>
                  <th className="p-4 w-1/6">Email</th>
                  <th className="p-4 w-1/6">Stand</th>
                  <th className="p-4 w-1/6">Jenis</th>
                  <th className="p-4 w-1/6">Aksi</th>
                </tr>
              </thead>
              <tbody className=" text-md font-semibold text-[#2f524a]">
                {filteredUser.map((data, index) => (
                  <tr className="border-b border-[#119184]/20" key={index}>
                    <td className="p-4">{data.id}</td>
                    <td className="p-4">{data.name}</td>
                    <td className="p-4">{data.email}</td>
                    <td className="p-4">{data.stand?.nama_stand}</td>
                    <td className="p-4">{data.role}</td>
                    <td className="p-4">
                      <button className="text-sm text-[#2f524a] px-2 py-2 cursor-pointer hover:bg-[#2f524a]/10 rounded transition">
                        <Pencil size={16} className="text-[#2f524a]" />
                      </button>
                      <button className="text-sm text-[#f44336] px-2 py-2 ml-2 cursor-pointer hover:bg-[#f44336]/10 rounded transition">
                        <Trash
                          size={16}
                          className="text-[#f44336]"
                          onClick={() => onDelete(data.id)}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

const ListStand = ({
  stand,
  onDelete,
}: {
  stand: StandTableProps[];
  onDelete: (id: number) => void;
}) => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    jenis: "",
  });

  const filteredUser = useMemo(() => {
    return stand.filter((data) => {
      const nameMatch = data.nama_stand
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      return nameMatch;
    });
  }, [stand, filters]);
  const empty = filteredUser.length === 0;

  return (
    <>
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex border border-[#119184]/20 bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a] w-full rounded-lg px-4 py-2">
          <Search size={20} className=" text-[#2f524a]/70" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Cari stand..."
            className="w-full bg-transparent focus:outline-none ml-2 text-sm text-[#2f524a]"
            onChange={(e) =>
              setFilters({ ...filters, searchTerm: e.target.value })
            }
            value={filters.searchTerm}
          />
        </div>
      </div>
      <div className="mt-4">
        {empty ? (
          <>
            <div className="self-center flex flex-col h-60 items-center justify-center text-[#2f524a]/70  ">
              <Store size={50} />
              <h1 className="font-semibold mt-4">Belum ada list stand</h1>
              <p className="text-sm">
                Tambahkan stand untuk melihat list stand.
              </p>
            </div>
          </>
        ) : (
          <>
            <table className="w-full text-left gap-2">
              <thead>
                <tr className="border-b border-[#119184]/20 text-sm text-[#2f524a] font-semibold">
                  <th className="p-4 w-1/6">kd_stand</th>
                  <th className="p-4 w-1/6">Nama</th>
                  <th className="p-4 w-1/6">lokasi</th>
                  <th className="p-4 w-1/6">Aksi</th>
                </tr>
              </thead>
              <tbody className=" text-md font-semibold text-[#2f524a]">
                {filteredUser.map((data, index) => (
                  <tr className="border-b border-[#119184]/20" key={index}>
                    <td className="p-4">{data.id}</td>
                    <td className="p-4">{data.kd_stand}</td>
                    <td className="p-4">{data.nama_stand}</td>
                    <td className="p-4">{data.lokasi}</td>
                    <td className="p-4">
                      <button className="text-sm text-[#2f524a] px-2 py-2 cursor-pointer hover:bg-[#2f524a]/10 rounded transition">
                        <Pencil size={16} className="text-[#2f524a]" />
                      </button>
                      <button className="text-sm text-[#f44336] px-2 py-2 ml-2 cursor-pointer hover:bg-[#f44336]/10 rounded transition">
                        <Trash
                          size={16}
                          className="text-[#f44336]"
                          onClick={() => onDelete(data.id)}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export const TableList = ({
  activeTab,
  data,
  jenis,
  user,
  stand,
  onDeleteMenus,
  onDeleteJenis,
  onDeleteUser,
  onDeleteStand,
}: {
  activeTab: TabType;
  data?: MenuTableProps[];
  jenis?: JenisTableProps[];
  user?: UserTableProps[];
  stand?: StandTableProps[];
  onDeleteMenus: (kd_menu: string) => void;
  onDeleteJenis: (kd_jenis: string) => void;
  onDeleteUser: (id: number) => void;
  onDeleteStand: (id: number) => void;
}) => {
  const [activeTabState, setActiveTabState] = useState<TabType>("menu");

  useEffect(() => {
    setActiveTabState(activeTab);
  }, [activeTab]);

  const renderList = () => {
    switch (activeTabState) {
      case "menu":
        return (
          <ListMenu
            data={data || []}
            jenis={jenis || []}
            onDelete={onDeleteMenus}
          />
        );
      case "jenis":
        return <ListJenis jenis={jenis || []} onDelete={onDeleteJenis} />;
      case "user":
        return <ListUser user={user || []} onDelete={onDeleteUser} />;
      default:
      case "stand":
        return <ListStand stand={stand || []} onDelete={onDeleteStand} />;
        return null;
    }
  };

  return <>{renderList()}</>;
};

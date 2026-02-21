import { Pencil, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import type { TabType } from "../../page/admin/dashboard";

const ListMenu = () => {
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
          />
        </div>
        <div className="ml-4">
          <select
            name="jenis_menu"
            id="jenis_menu"
            className="border border-[#119184]/20 bg-[#f9fafb] w-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
          >
            <option value="">Pilih Jenis</option>
            <option value="cup_besar">cup_besar</option>
            <option value="cup_kecil">cup_kecil</option>
            <option value="rasa_rasa">rasa_rasa</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <table className="w-full text-left gap-2">
          <thead>
            <tr className="border-b border-[#119184]/20 text-sm text-[#2f524a] font-semibold">
              <th className="p-4">Kode </th>
              <th className="p-4">Nama Menu</th>
              <th className="p-4">Jenis</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody className=" text-md font-semibold text-[#2f524a]">
            <tr className="border-b border-[#119184]/20">
              <td className="p-4">JNS-260218-002</td>
              <td className="p-4">Es Teh Manis</td>
              <td className="p-4">cup_besar</td>
              <td className="p-4">Rp. 5000</td>
              <td className="p-4">
                <button className="text-sm text-[#2f524a]px-4 py-2 cursor-pointer">
                  <Pencil size={16} className="text-[#2f524a]" />
                </button>
                <button className="text-sm text-[#f44336] px-4 py-2 ml-2 cursor-pointer">
                  <Trash size={16} className="text-[#f44336]" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

const ListJenis = () => {
  return (
    <>
      <div className=" mt-4">
        <div className="flex border border-[#119184]/20 bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a] w-100 rounded-lg px-4 py-2">
          <Search size={20} className=" text-[#2f524a]/70" />
          <input
            type="text"
            name="search" 
            id="search"
            placeholder="Cari jenis..."
            className="w-50 bg-transparent focus:outline-none ml-2 text-sm text-[#2f524a]"
          />
        </div>
        <div className="mt-4">
          <table className="w-full text-left gap-2">
            <thead>
              <tr className="border-b border-[#119184]/20 text-sm text-[#2f524a] font-semibold">
                <th className="p-4">Kode </th>
                <th className="p-4">Nama Jenis</th>
                <th className="p-4">Aksi</th>
              </tr>
            </thead>
            <tbody className=" text-md font-semibold text-[#2f524a]">
              <tr className="border-b border-[#119184]/20">
                <td className="p-4">JNS-20260219-0001</td>
                <td className="p-4">Cup Besar</td>
                <td className="p-4">
                  <button className="text-sm text-[#2f524a]px-4 py-2 cursor-pointer">
                    <Pencil size={16} className="text-[#2f524a]" />
                  </button>
                  <button className="text-sm text-[#f44336] px-4 py-2 ml-2 cursor-pointer">
                    <Trash size={16} className="text-[#f44336]" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const ListUser = () => {
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
          />
        </div>
        <div className="ml-4">
          <select
            name="jenis_user"
            id="jenis_user"
            className="border border-[#119184]/20 bg-[#f9fafb] w-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
          >
            <option value="">Pilih Jenis</option>
            <option value="cup_besar">admin</option>
            <option value="cup_kecil">kasir</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <table className="w-full text-left gap-2">
          <thead>
            <tr className="border-b border-[#119184]/20 text-sm text-[#2f524a] font-semibold">
              <th className="p-4">ID </th>
              <th className="p-4">Nama</th>
              <th className="p-4">Jenis</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody className=" text-md font-semibold text-[#2f524a]">
            <tr className="border-b border-[#119184]/20">
              <td className="p-4">1</td>
              <td className="p-4">Faster</td>
              <td className="p-4">admin</td>
              <td className="p-4">
                <button className="text-sm text-[#2f524a]px-4 py-2 cursor-pointer">
                  <Pencil size={16} className="text-[#2f524a]" />
                </button>
                <button className="text-sm text-[#f44336] px-4 py-2 ml-2 cursor-pointer">
                  <Trash size={16} className="text-[#f44336]" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export const TableList = ({ activeTab }: { activeTab: TabType }) => {
  const [activeTabState, setActiveTabState] = useState<TabType>("menu");

  useEffect(() => {
    setActiveTabState(activeTab);
  }, [activeTab]);

  const renderList = () => {
    switch (activeTabState) {
      case "menu":
        return <ListMenu />;
      case "jenis":
        return <ListJenis />;
      case "user":
        return <ListUser />;
      default:
        return null;
    }
  };

  return <>{renderList()}</>;
};

import {
  Banknote,
  Calculator,
  CirclePlus,
  CircleX,
  Lock,
  Package,
  Play,
  Save,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { Header } from "../components/ui/Header";
import { useEffect, useState } from "react";
import Alert from "../components/ui/Alert";
import axios from "axios";

interface cardProps {
  title: string;
  point: string;
  desc: string;
  icon: any;
}

interface MenuForm {
  id: number;
  kd_menu: string;
  nama_menu: string;
  jenis_id: string;
  harga_satuan: number;
  biaya_produksi: number;
}

export const UserDashboard = () => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [menuList, setMenuList] = useState<MenuForm[]>([]);

  const url = import.meta.env.VITE_BASE_URL;

  const createTransaction = () => {
    setOpen(true);
  };

  const closeTransaction = () => {
    setAlert(true);
  };

  useEffect(() => {
    const fecthingMenu = async () => {
      try {
        const response = await axios.get(`${url}/api/menu`);
        const datas = response.data.data.datas;
        console.log(datas);
      } catch (error) {
        console.error("Failed fetching data", error);
      }
    };

    fecthingMenu();
  }, []);

  const CalculateCard = ({ title, point, desc, icon }: cardProps) => {
    return (
      <div className="flex justify-between p-6 w-full bg-white border border-[#119184]/20 rounded-2xl hover:shadow-sm transition">
        <div className="flex flex-col gap-2 text-[#2f524a]">
          <p className="opacity-70 font-semibold">{title}</p>
          <h1 className="text-3xl font-bold">{point}</h1>
          <p className="text-sm opacity-70">{desc}</p>
        </div>
        {icon}
      </div>
    );
  };

  return (
    <div className="w-full px-16 py-8">
      {alert && (
        <Alert
          cancel={() => setAlert(!alert)}
          confirm={() => {
            (setOpen(!open), setAlert(!alert));
          }}
        />
      )}
      <Header openParameter={open} />
      <div className="flex gap-4 mt-10">
        <CalculateCard
          title="Omzet Hari Ini"
          point={`Rp. ${2}`}
          desc="Total pendapatan kotor"
          icon={
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#119184]/10 self-start">
              <Banknote size={26} className="text-[#2f524a]" />
            </div>
          }
        />
        <CalculateCard
          title="Item Terjual"
          point={`2`}
          desc="Total produk terjual"
          icon={
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#35ad61]/10 self-start">
              <ShoppingBag size={26} className="text-[#35ad61]" />
            </div>
          }
        />
        <CalculateCard
          title="Laba Bersih"
          point={`Rp. ${2}`}
          desc="Estimasi keuntungan"
          icon={
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#2daa5a]/10 self-start">
              <TrendingUp size={26} className="text-[#2daa5a]" />
            </div>
          }
        />
        <CalculateCard
          title="HPP (Biaya)"
          point={`Rp. ${2}`}
          desc="Total harga pokok"
          icon={
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#f7b441]/10 self-start">
              <Calculator size={26} className="text-[#f7b441]" />
            </div>
          }
        />
      </div>
      <div className="flex gap-4 mt-8">
        <div className="p-6 w-full bg-white border border-[#119184]/20 rounded-2xl">
          <h1 className="font-semibold text-[#2f524a] text-xl">
            Start Transactions
          </h1>
          {open ? (
            <div className="flex gap-4">
              <button className="flex items-center gap-4 bg-[#119184] hover:bg-[#119184]/80 cursor-pointer transition text-white font-semibold mt-4 py-4 px-8 rounded-xl ">
                <CirclePlus size={20} /> Catat Menu
              </button>
              <button
                onClick={closeTransaction}
                className="flex items-center gap-4 border border-[#FF4400] text-[#FF4400] hover:bg-[#FF4400]/10 cursor-pointer transitio font-semibold mt-4 py-4 px-8 rounded-xl  "
              >
                <CircleX size={20} /> Tutup Transaksi
              </button>
            </div>
          ) : (
            <button
              onClick={createTransaction}
              className="flex items-center gap-4 bg-[#119184] hover:bg-[#119184]/80 cursor-pointer transition text-white font-semibold mt-4 py-4 px-8 rounded-xl"
            >
              <Play size={20} /> Mulai Transaksi Hari Ini
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col p-6 w-full bg-white border border-[#119184]/20 rounded-2xl mt-8">
        <div>
          <h1 className="flex items-center gap-2 font-semibold text-[#2f524a] text-xl">
            <Package size={20} /> Tambah Menu
          </h1>
        </div>
        <div className="relative w-full overflow-x-auto border border-[#119184]/20 rounded-xl mt-8">
          <table className="table-fixed min-w-7xl text-[#2f524a]">
            <thead className="font-semibold text-sm text-left bg-neutral-100 border-b border-[#119184]/20">
              <tr>
                <th className="px-4 py-3 w-28">#</th>
                <th className="px-4 py-3 w-28">Nama</th>
                <th className="px-4 py-3 w-28">Jenis</th>
                <th className="px-4 py-3 w-28 text-right">Harga Jual</th>
                <th className="px-4 py-3 w-28 text-right">HPP</th>
                <th className="px-4 py-3 w-28 text-center">Stok Awal</th>
                <th className="px-4 py-3 w-28 text-center">Sisa Stok</th>
                <th className="px-4 py-3 w-28 text-center">Laku</th>
                <th className="px-4 py-3 w-28 text-center">Omzet</th>
                <th className="px-4 py-3 w-28 text-center">HPP Total</th>
              </tr>
            </thead>

            <tbody className="font-semibold text-sm">
              <tr className="border-b border-[#119184]/20 whitespace-nowrap">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Es Teh</td>
                <td className="px-4 py-3">Cup Jumbo</td>
                <td className="px-4 py-3 text-right">Rp.3000</td>
                <td className="px-4 py-3 text-right">
                  <input
                    type="number"
                    className="w-full py-2 px-4 text-right focus:outline-2 focus:outline-offset-2 focus:outline-[#3b3b3b] focus:border-[#3b3b3b] text-sm border border-[#ddd] rounded-xl"
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-20 py-2 px-4 text-center focus:outline-2 focus:outline-offset-2 focus:outline-[#3b3b3b] focus:border-[#3b3b3b] text-sm border border-[#ddd] rounded-xl"
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-20 py-2 px-4 text-center focus:outline-2 focus:outline-offset-2 focus:outline-[#3b3b3b] focus:border-[#3b3b3b] text-sm border border-[#ddd] rounded-xl"
                  />
                </td>
                <td className="px-4 py-3 text-center">-</td>
                <td className="px-4 py-3 text-center">-</td>
                <td className="px-4 py-3 text-center">-</td>
              </tr>
            </tbody>
            <tfoot className="table-fixed min-w-7xl text-[#2f524a] bg-neutral-100">
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th className="px-4 py-3 w-28">Total</th>
                <th className="px-4 py-3 w-28">-</th>
                <th className="px-4 py-3 w-28">-</th>
                <th className="px-4 py-3 w-28">-</th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* <div className="self-center flex flex-col h-60 items-center justify-center text-[#2f524a]/70  ">
          <Package size={50} />
          <h1 className="font-semibold mt-4">Belum ada list menu</h1>
          <p className="text-sm">Tambahkan menu untuk melihat list menu.</p>
        </div> */}
      </div>
      <div className="flex items-center justify-end gap-2 my-4">
        <button className="flex items-center justify-center py-2 px-4 rounded-xl gap-2 text-md font-semibold bg-[#119184] hover:bg-[#119184]/80 cursor-pointer transition text-white">
          <Save size={18} />
          Simpan Transaksi
        </button>
        <button className="flex items-center justify-center py-2 px-4 rounded-xl gap-2 text-md font-semibold bg-[#FF4400] hover:bg-[#FF4400]/80 cursor-pointer transition text-white">
          <Lock size={18} />
          Tutup Transaksi
        </button>
      </div>
    </div>
  );
};

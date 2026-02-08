import {
  Banknote,
  Calculator,
  Package,
  Play,
  Plus,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { Header } from "../components/ui/Header";

interface cardProps {
  title: string;
  point: string;
  desc: string;
  icon: any;
}

export const Dashboard = () => {
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
      <Header openParameter={true} />
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
          <h1 className="font-semibold text-[#2f524a] text-xl">Tambah Menu</h1>
          <button className="flex items-center gap-4 bg-[#119184] hover:bg-[#119184]/80 cursor-pointer transition text-white font-semibold mt-4 py-4 px-8 rounded-xl">
            <Plus size={20} /> Tambah List Menu
          </button>
        </div>
        <div className="p-6 w-full bg-white border border-[#119184]/20 rounded-2xl">
          <h1 className="font-semibold text-[#2f524a] text-xl">Tambah Jenis</h1>
          <button className="flex items-center gap-4 bg-[#119184] hover:bg-[#119184]/80 cursor-pointer transition text-white font-semibold mt-4 py-4 px-8 rounded-xl">
            <Plus size={20} /> Tambah jenis menu
          </button>
        </div>
      </div>
      <div className="p-6 w-full bg-white border border-[#119184]/20 rounded-2xl mt-8">
        <div>
          <h1 className="flex items-center gap-2 font-semibold text-[#2f524a] text-xl">
            <Package size={20} /> Tambah Menu
          </h1>
        </div>
        <div className="relative overflow-x-auto border border-[#119184]/20  rounded-xl mt-8">
          <table className="w-full text-[#2f524a] ">
            <thead className="font-semibold text-sm text-left p-2 bg-neutral-100  border-b border-[#119184]/20 ">
              <tr>
                <th className="px-6 py-3">KD-Menu</th>
                <th>Nama</th>
                <th>Jenis</th>
                <th>Harga</th>
              </tr>
            </thead>
            <tbody className="font-semibold text-sm text-left p-2  ">
              <tr className="border-b border-[#119184]/20 text-heading whitespace-nowrap">
                <td className="px-6 py-3">MNU-270326-1</td>
                <td>Es Teh</td>
                <td>Cup Jumbo</td>
                <td>Rp. 3000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

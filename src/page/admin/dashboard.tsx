import {
  Banknote,
  Calculator,
  Layers,
  ShoppingBag,
  Store,
  TrendingUp,
  UserRoundPlus,
  UtensilsCrossed,
} from "lucide-react";
import { Header } from "../../components/ui/Header";
import { CardForm } from "../../components/ui/CardForm";
import { useState } from "react";

interface cardProps {
  title: string;
  point: string;
  desc: string;
  icon: any;
}

export type TabType = "menu" | "jenis" | "user" | "stand";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("menu");

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
      <div className="mt-4 ">
        <div>
          <h1 className="font-bold text-2xl text-[#2f524a]">Management Menu</h1>
          <p className="text-sm text-[#2f524a]/70">
            Kelola kategori dan item menu untuk outlet Anda
          </p>
        </div>
        <div className="mt-4 flex bg-[#119184]/10 w-fit p-1 rounded-xl">
          <button
            className={`flex items-center gap-2 text-sm font-semibold px-12 py-2 rounded-lg cursor-pointer ${activeTab === "menu" ? "bg-[#ffff] text-black" : "text-black"}`}
            onClick={() => setActiveTab("menu")}
          >
            <UtensilsCrossed size={16} /> Menu
          </button>
          <button
            className={`flex items-center gap-2 text-sm text-black px-12 py-2 rounded-lg cursor-pointer ${activeTab === "jenis" ? "bg-[#ffff] text-black" : ""}`}
            onClick={() => setActiveTab("jenis")}
          >
            <Layers size={16} /> Jenis
          </button>
          <button
            className={`flex items-center gap-2 text-sm text-black px-12 py-2 rounded-lg cursor-pointer ${activeTab === "user" ? "bg-[#ffff] text-black" : ""}`}
            onClick={() => setActiveTab("user")}
          >
            <UserRoundPlus size={16} /> User
          </button>
          <button
            className={`flex items-center gap-2 text-sm text-black px-12 py-2 rounded-lg cursor-pointer ${activeTab === "stand" ? "bg-[#ffff] text-black" : ""}`}
            onClick={() => setActiveTab("stand")}
          >
            <Store size={16} /> Stand
          </button>
        </div>
      </div>
      <div className="p-6 mt-4 w-full bg-white border border-[#119184]/20 rounded-2xl">
        <CardForm activeTab={activeTab} />
      </div>
    </div>
  );
};

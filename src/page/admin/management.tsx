import { Layers, Store, UserRoundPlus, UtensilsCrossed } from "lucide-react";
import { CardForm } from "../../components/ui/CardForm";
import { useEffect, useState } from "react";
import { Header } from "../../components/ui/Header";
import api from "../../services/api";

interface transactionProps {
  id: number;
  no_transaksi: string;
  stand_id: string;
  user_id: number;
  total_biaya_produksi: number;
  total_omzet: number;
  selisih: number;
  tanggal: string;
}

export type TabType = "menu" | "jenis" | "user" | "stand";

export const Management = () => {
  const [activeTab, setActiveTab] = useState<TabType>("menu");
  const [transactionList, setTransactionList] = useState<transactionProps[]>(
    [],
  );

  const fetchingTransaction = async () => {
    try {
      const response = await api.get(`/jual`);

      const data = response.data.data.datas?.data;
      console.log(response);
      setTransactionList(data);
    } catch (error) {
      console.error("failed fetching data.", error);
    }
  };

  useEffect(() => {
    fetchingTransaction();
  }, []);

  return (
    <>
      <div className="w-full px-16 py-8">
        <Header
          openParameter={false}
          navbarList={[
            { name: "dashboard", path: "/admin/dashboard" },
            { name: "management", path: "/admin/management" },
          ]}
        />
        <div className="mt-4 ">
          <div>
            <h1 className="font-bold text-2xl text-[#2f524a]">
              Management Menu
            </h1>
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
    </>
  );
};

import { Banknote, Calculator, ShoppingBag, TrendingUp } from "lucide-react";
import { Header } from "../../components/ui/Header";
import { useEffect, useState } from "react";
import { toRupiah } from "../../utils/ToRupiah";
import { TransactionList } from "../../components/ui/TransactionList";
import api from "../../services/api";

interface cardProps {
  title: string;
  point: string;
  desc: string;
  icon: any;
}

interface StandForm {
  id: number;
  kd_stand: string;
  nama_stand: string;
  lokasi: string;
}

interface transactionProps {
  id: number;
  no_transaksi: string;
  stand_id: string;
  user_id: number;
  total_biaya_produksi: number;
  total_omzet: number;
  selisih: number;
  tanggal: string;
  menu: {
    id: number;
    kd_menu: string;
    jenis_id: string;
    nama_menu: string;
    laku: number;
    biaya_produksi: number;
    harga_satuan: number;
  };
}

export const Dashboard = () => {
  const [transactionList, setTransactionList] = useState<transactionProps[]>(
    [],
  );
  const [standList, setStandList] = useState<StandForm[] | null>(null);

  const fetchingTransaction = async () => {
    try {
      const response = await api.get(`/jual`);

      const data = response.data.data.datas?.data;
      setTransactionList(data);
    } catch (error) {
      console.error("failed fetching data.", error);
    }
  };

  const fetchStandData = async () => {
    try {
      const response = await api.get(`/stand`);
      const data = await response.data.data;
      setStandList(data.datas.data);
    } catch (error) {
      console.error("Error fetching Stand data:", error);
    }
  };

  useEffect(() => {
    fetchingTransaction();
    fetchStandData();
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  const todayTransactions = transactionList?.filter((item) =>
    item.tanggal.startsWith(today),
  );

  const totalOmzet = todayTransactions?.reduce(
    (acc, item) => acc + Number(item.total_omzet),
    0,
  );

  const totalProfit = todayTransactions?.reduce(
    (acc, item) => acc + Number(item.selisih),
    0,
  );

  const totalHPP = todayTransactions?.reduce(
    (acc, item) => acc + Number(item.total_biaya_produksi),
    0,
  );

  const totalSales = todayTransactions?.reduce((acc, item) => {
    const menus = Array.isArray(item.menu) ? item.menu : [item.menu];

    return acc + menus.reduce((a, b) => a + b.laku, 0);
  }, 0);

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
      <Header
        openParameter={false}
        navbarList={[
          { name: "dashboard", path: "/admin/dashboard" },
          { name: "management", path: "/admin/management" },
        ]}
      />
      <div className="flex gap-4 mt-10">
        <CalculateCard
          title="Omzet Hari Ini"
          point={todayTransactions ? toRupiah(totalOmzet) : "Rp 0"}
          desc="Total pendapatan kotor"
          icon={
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#119184]/10 self-start">
              <Banknote size={26} className="text-[#2f524a]" />
            </div>
          }
        />
        <CalculateCard
          title="Item Terjual"
          point={todayTransactions ? totalSales.toString() : "0"}
          desc="Total produk terjual"
          icon={
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#35ad61]/10 self-start">
              <ShoppingBag size={26} className="text-[#35ad61]" />
            </div>
          }
        />
        <CalculateCard
          title="Laba Bersih"
          point={todayTransactions ? toRupiah(totalProfit) : "Rp 0"}
          desc="Estimasi keuntungan"
          icon={
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#2daa5a]/10 self-start">
              <TrendingUp size={26} className="text-[#2daa5a]" />
            </div>
          }
        />
        <CalculateCard
          title="HPP (Biaya)"
          point={todayTransactions ? toRupiah(totalHPP) : "Rp 0"}
          desc="Total harga pokok"
          icon={
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#f7b441]/10 self-start">
              <Calculator size={26} className="text-[#f7b441]" />
            </div>
          }
        />
      </div>
      <TransactionList standList={standList || []} />
    </div>
  );
};

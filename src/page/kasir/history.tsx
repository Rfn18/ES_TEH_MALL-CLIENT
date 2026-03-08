import { useEffect, useMemo, useState } from "react";
import { X, Receipt } from "lucide-react";
import { toRupiah } from "../../utils/ToRupiah";
import { Overlay } from "../../components/ui/Overlay";
import { Header } from "../../components/ui/Header";
import api from "../../services/api";

interface Transaksi {
  id: number;
  no_transaksi: string;
  stand_id: string;
  user_id: number;
  total_biaya_produksi: string;
  total_omzet: string;
  selisih: string;
  tanggal: string;
  created_at: string;
  updated_at: string;
}

interface TransaksiDetail extends Transaksi {
  menu: {
    id: number;
    jual_id: string;
    menu_id: string;
    jumlah: number;
    sisa: number;
    laku: number;
    harga_satuan: string;
    created_at: string;
    updated_at: string;
  }[];
}

const DetailTransaksi = ({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) => {
  const [detail, setDetail] = useState<TransaksiDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/jual/${id}`);
        setDetail(res.data.data.datas);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return (
    <Overlay>
      <div className="bg-white rounded-xl w-150 max-h-[85vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#119184]/20">
          <div>
            <h2 className="font-semibold text-lg text-[#2f524a]">
              Detail Transaksi
            </h2>
            <p className="text-sm text-[#2f524a]/60 mt-0.5">
              {detail?.no_transaksi ?? "Memuat..."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#119184]/10 rounded-lg transition-colors"
          >
            <X size={18} className="text-[#2f524a]/70" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48 text-[#2f524a]/50 text-sm">
            Memuat data...
          </div>
        ) : detail ? (
          <div className="overflow-y-auto flex-1">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3 p-6 pb-0">
              <div className="bg-[#f0faf9] border border-[#119184]/20 rounded-xl p-3">
                <p className="text-xs text-[#2f524a]/60 font-medium">Omzet</p>
                <p className="text-sm font-bold text-[#119184] mt-1">
                  {toRupiah(Number(detail.total_omzet))}
                </p>
              </div>
              <div className="bg-[#fff8f0] border border-orange-200 rounded-xl p-3">
                <p className="text-xs text-[#2f524a]/60 font-medium">
                  Biaya Produksi
                </p>
                <p className="text-sm font-bold text-orange-500 mt-1">
                  {toRupiah(Number(detail.total_biaya_produksi))}
                </p>
              </div>
              <div className="bg-[#f0faf4] border border-green-200 rounded-xl p-3">
                <p className="text-xs text-[#2f524a]/60 font-medium">Selisih</p>
                <p className="text-sm font-bold text-green-600 mt-1">
                  {toRupiah(Number(detail.selisih))}
                </p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="px-6 pt-4 pb-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
              <div className="flex justify-between py-1 border-b border-[#119184]/10">
                <span className="text-[#2f524a]/60">Stand</span>
                <span className="font-semibold text-[#2f524a]">
                  {detail.stand_id}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#119184]/10">
                <span className="text-[#2f524a]/60">Tanggal</span>
                <span className="font-semibold text-[#2f524a]">
                  {new Date(detail.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Menu List */}
            <div className="px-6 pb-6 mt-4">
              <p className="text-xs font-semibold text-[#2f524a]/60 uppercase tracking-wider mb-3">
                Daftar Menu
              </p>
              {detail.menu.length === 0 ? (
                <div className="text-center py-8 text-[#2f524a]/40 text-sm">
                  Tidak ada data menu
                </div>
              ) : (
                <div className="border border-[#119184]/20 rounded-xl overflow-hidden">
                  <table className="w-full text-sm text-[#2f524a]">
                    <thead className="bg-[#f9fafb] border-b border-[#119184]/20 text-xs font-semibold">
                      <tr>
                        <th className="px-4 py-2.5 text-left">Menu ID</th>
                        <th className="px-4 py-2.5 text-center">Jumlah</th>
                        <th className="px-4 py-2.5 text-center">Laku</th>
                        <th className="px-4 py-2.5 text-center">Sisa</th>
                        <th className="px-4 py-2.5 text-right">Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.menu.map((m, i) => (
                        <tr
                          key={m.id}
                          className={`border-b border-[#119184]/10 ${
                            i % 2 === 0 ? "" : "bg-[#f9fafb]/50"
                          }`}
                        >
                          <td className="px-4 py-2.5 font-medium">
                            {m.menu_id}
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            {m.jumlah}
                          </td>
                          <td className="px-4 py-2.5 text-center text-green-600 font-semibold">
                            {m.laku}
                          </td>
                          <td className="px-4 py-2.5 text-center text-orange-500 font-semibold">
                            {m.sisa}
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            {toRupiah(Number(m.harga_satuan))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-[#2f524a]/50 text-sm">
            Data tidak ditemukan.
          </div>
        )}
      </div>
    </Overlay>
  );
};

const HistoryList = () => {
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [transactions, setTransaction] = useState<Transaksi[]>([]);

  // Default range: 7 hari terakhir
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const [filters, setFilters] = useState({
    stand: "",
    from: fmt(sevenDaysAgo),
    to: fmt(today),
  });

  const fetchTransactions = async () => {
    const token = localStorage.getItem("bareer_token");
    try {
      setLoading(true);
      const res = await api.get(`/jual-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.data.datas;
      setTransaction(data.data);
    } catch (error) {
      console.error("Failed fetching data.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  console.log(transactions);

  const filteredData = useMemo(() => {
    return transactions.filter((t) => {
      const tDate = new Date(t.tanggal).getTime();
      const from = new Date(filters.from).getTime();
      const to = new Date(filters.to + "T23:59:59").getTime();
      const standMatch = filters.stand ? t.stand_id === filters.stand : true;
      const dateMatch = tDate >= from && tDate <= to;
      return standMatch && dateMatch;
    });
  }, [transactions, filters]);

  const empty = filteredData.length === 0;

  return (
    <>
      {selectedId !== null && (
        <DetailTransaksi id={selectedId} onClose={() => setSelectedId(null)} />
      )}
      <div className="w-full px-16 py-8">
        <Header
          openParameter={false}
          navbarList={[
            { name: "dashboard", path: "/dashboard" },
            { name: "history", path: "/history" },
          ]}
        />
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-[#2f524a] text-2xl mr-4">History</h1>
            <input
              type="date"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
              className="border border-[#119184]/20 bg-[#f9fafb] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
            />
            <span className="text-[#2f524a]/50 text-sm">—</span>
            <input
              type="date"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
              className="border border-[#119184]/20 bg-[#f9fafb] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#119184]/50 text-sm text-[#2f524a]"
            />
          </div>

          <div className="flex gap-2">
            {[
              { label: "3 Hari", days: 3 },
              { label: "7 Hari", days: 7 },
            ].map(({ label, days }) => (
              <button
                key={days}
                onClick={() => {
                  const from = new Date();
                  from.setDate(today.getDate() - days);
                  setFilters({ ...filters, from: fmt(from), to: fmt(today) });
                }}
                className="text-xs px-3 py-1.5 border border-[#119184]/20 rounded-lg hover:bg-[#119184]/10 text-[#2f524a] transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#2f524a]/50 ml-auto">
            {filteredData.length} transaksi ditemukan
          </span>
        </div>

        {/* Table */}
        <div className="relative w-full overflow-x-auto border border-[#119184]/20 rounded-xl mt-4">
          <table className="table-fixed w-full text-[#2f524a]">
            <thead className="font-semibold text-sm text-left bg-neutral-100 border-b border-[#119184]/20">
              <tr>
                <th className="px-4 py-3 w-50">No. Transaksi</th>
                <th className="px-4 py-3">Stand</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Omzet</th>
                <th className="px-4 py-3">Biaya Produksi</th>
                <th className="px-4 py-3">Selisih</th>
              </tr>
            </thead>
            <tbody className="font-semibold text-sm">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-16 text-[#2f524a]/40"
                  >
                    Memuat data...
                  </td>
                </tr>
              ) : empty ? (
                <tr>
                  <td colSpan={6}>
                    <div className="flex flex-col items-center justify-center py-16 text-[#2f524a]/50 gap-2">
                      <Receipt size={40} strokeWidth={1.5} />
                      <p className="font-semibold">Tidak ada transaksi</p>
                      <p className="text-xs font-normal">
                        Coba ubah filter tanggal atau stand
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => setSelectedId(t.id)}
                    className="border-b border-[#119184]/20 whitespace-nowrap hover:bg-[#119184]/5 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 text-[#119184]">
                      {t.no_transaksi}
                    </td>
                    <td className="px-4 py-3">{t.stand_id}</td>
                    <td className="px-4 py-3">
                      {new Date(t.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {toRupiah(Number(t.total_omzet))}
                    </td>
                    <td className="px-4 py-3">
                      {toRupiah(Number(t.total_biaya_produksi))}
                    </td>
                    <td className="px-4 py-3 text-green-600">
                      {toRupiah(Number(t.selisih))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HistoryList;

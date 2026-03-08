import {
  Banknote,
  Calculator,
  CircleCheck,
  LoaderCircle,
  Lock,
  Package,
  Play,
  Save,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { Header } from "../../components/ui/Header";
import { useEffect, useState } from "react";
import Alert from "../../components/ui/Alert";
import { toRupiah, toRupiahNoRp } from "../../utils/ToRupiah";
import { CalculateCard } from "../../components/ui/CalculateCard";
import { Toast } from "../../components/ui/Toast";
import api from "../../services/api";

interface MenuForm {
  id: number;
  kd_menu: string;
  nama_menu: string;
  jenis_id: string;
  harga_satuan: number;
  biaya_produksi: number;
  jenis: { nama_jenis: string };
}

interface DetailProps {
  jual_id: string;
  menu_id: string;
  jumlah: number;
  sisa: number;
}

interface TransactionProps {
  id: number;
  no_transaksi: string;
  stand_id: string;
  user_id: number;
  total_biaya_produksi: number;
  total_omzet: number;
  selisih: number;
  tanggal: string;
}

export const UserDashboard = () => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successSaveAlert, setSuccessSaveALert] = useState(false);
  const [successCreateAlert, setSuccessCreateAlert] = useState(false);
  const [successCloseAlert, setSuccessCloseAlert] = useState(false);
  const [menuList, setMenuList] = useState<MenuForm[]>([]);
  const [transactionList, setTransactionList] = useState<TransactionProps[]>(
    [],
  );
  const [form, setForm] = useState<DetailProps[]>([
    {
      jual_id: "",
      menu_id: "",
      jumlah: 0,
      sisa: 0,
    },
  ]);

  const transaction: any = localStorage.getItem("transaction");
  const transactionID =
    localStorage.getItem("jual_id") || transactionList[0]?.no_transaksi;

  const filteredForm = form.filter(
    (item) => !(item.jumlah === 0 && item.sisa === 0),
  );

  const createTransaction = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const formattedDate = `${year}-${month}-${day}`;

    const token = localStorage.getItem("bareer_token");

    try {
      setLoading(true);
      const res = await api.post(
        `/jual`,
        { tanggal: formattedDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = res.data.data.datas;
      setTransactionList(data);
      localStorage.setItem("jual_id", data.no_transaksi);
      setOpen(true);
    } catch (error) {
      console.error("Failed create transaction.", error);
    } finally {
      setSuccessCreateAlert(true);
      setTimeout(() => {
        setSuccessCreateAlert(false);
      }, 5000);
      setLoading(false);
    }
  };

  const createDetailTransaction = async () => {
    if (!filteredForm) {
      return;
    }
    try {
      setLoading(true);
      await api.post("/jual-detail", filteredForm, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setOpen(false);
      setAlert(!alert);
    } catch (error) {
      console.error("failed created transaction.", error);
    } finally {
      setSuccessCloseAlert(true);
      setTimeout(() => {
        setSuccessCloseAlert(false);
      }, 5000);
      localStorage.removeItem("jual_id");
      setLoading(false);
    }
  };

  const closeTransaction = () => {
    setAlert(true);
  };

  useEffect(() => {
    const fecthingMenu = async () => {
      try {
        const response = await api.get(`/menu`);
        const datas = response.data.data.datas;
        setMenuList(datas.data);
      } catch (error) {
        console.error("Failed fetching data", error);
      }
    };

    if (transactionID) {
      setOpen(true);
    }

    fecthingMenu();
  }, []);

  const handleChange = (
    index: number,
    field: keyof DetailProps,
    value: string | number,
  ) => {
    setForm((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  useEffect(() => {
    if (transaction) {
      const itemStr = JSON.parse(transaction);
      const value = JSON.parse(itemStr?.value);
      if (itemStr.expiry < Date.now()) {
        localStorage.removeItem("transaction");
      }
      setOpen(true);
      setForm(value);
    } else if (menuList.length > 0) {
      setForm(
        menuList.map((menu) => ({
          jual_id: `${transactionID}`,
          menu_id: menu.kd_menu,
          jumlah: 0,
          sisa: 0,
        })),
      );
    }
  }, [menuList, transactionList]);

  const formMapping = (params: string) => {
    const label = params === "jumlah" ? "jumlah" : "sisa";
    return form.reduce((acc, item) => acc + item[label], 0);
  };

  const sumLaku =
    formMapping("jumlah") && formMapping("sisa")
      ? formMapping("jumlah") - formMapping("sisa")
      : "-";

  const laku = (index: number) => {
    return form[index]?.jumlah - form[index]?.sisa;
  };

  const totalOmzet = form.reduce((acc, item, index) => {
    if (item.jumlah === 0 || item.sisa === 0) {
      return acc;
    }

    const jumlahLaku = laku(index);
    return acc + jumlahLaku * menuList[index]?.harga_satuan;
  }, 0);

  const totalHPP = form.reduce((acc, item, index) => {
    if (item.jumlah === 0 || item.sisa === 0) {
      return acc;
    }

    const jumlahLaku = laku(index);
    return acc + jumlahLaku * menuList[index]?.biaya_produksi;
  }, 0);

  const saveTransaction = () => {
    const now = new Date();
    const item = {
      value: JSON.stringify(form),
      expiry: now.getTime() + 24 * 60 * 60 * 1000,
    };

    localStorage.setItem("transaction", JSON.stringify(item));
    setSuccessSaveALert(true);
    setTimeout(() => {
      setSuccessSaveALert(false);
    }, 5000);
  };

  return (
    <div className="w-full px-16 py-8">
      {successSaveAlert && (
        <Toast
          message={
            <div className="flex items-center justify-center gap-4">
              <CircleCheck size={20} className="text-[#119184]" />
              <div className="text-[#119184]">
                <h2 className="text-sm font-bold">
                  Transaksi berhasil disimpan!
                </h2>
                <p className="text-sm">Data stok dan penjualan tersimpan.</p>
              </div>
            </div>
          }
        />
      )}
      {successCreateAlert && (
        <Toast
          message={
            <div className="flex items-center justify-center gap-4">
              <CircleCheck size={20} className="text-[#119184]" />
              <div className="text-[#119184]">
                <h2 className="text-sm font-bold">
                  Transaksi hari ini dimulai!
                </h2>
                <p className="text-sm">Catat semua barang dengan benar.</p>
              </div>
            </div>
          }
        />
      )}
      {alert && (
        <Alert
          cancel={() => setAlert(!alert)}
          confirm={() => {
            createDetailTransaction();
          }}
          title="Tutup Transaksi Hari Ini?"
          message="Setelah ditutup, Anda tidak dapat menambah transaksi baru untuk hari
            ini. Pastikan semua transaksi sudah tercatat dengan benar."
        />
      )}
      <Header
        openParameter={open}
        navbarList={[
          { name: "dashboard", path: "/dashboard" },
          { name: "history", path: "/history" },
        ]}
      />
      <div className="flex gap-4 mt-10">
        <CalculateCard
          title="Omzet Hari Ini"
          point={toRupiah(totalOmzet)}
          desc="Total pendapatan kotor"
          icon={
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#119184]/10 self-start">
              <Banknote size={26} className="text-[#2f524a]" />
            </div>
          }
        />
        <CalculateCard
          title="Item Terjual"
          point={`${sumLaku}`}
          desc="Total produk terjual"
          icon={
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#35ad61]/10 self-start">
              <ShoppingBag size={26} className="text-[#35ad61]" />
            </div>
          }
        />
        <CalculateCard
          title="Laba Bersih"
          point={toRupiah(totalOmzet - totalHPP)}
          desc="Estimasi keuntungan"
          icon={
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#2daa5a]/10 self-start">
              <TrendingUp size={26} className="text-[#2daa5a]" />
            </div>
          }
        />
        <CalculateCard
          title="HPP (Biaya)"
          point={toRupiah(totalHPP)}
          desc="Total harga pokok"
          icon={
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#f7b441]/10 self-start">
              <Calculator size={26} className="text-[#f7b441]" />
            </div>
          }
        />
      </div>
      {open ? (
        ""
      ) : (
        <div className="flex gap-4 mt-8">
          <div className="p-6 w-full bg-white border border-[#119184]/20 rounded-2xl">
            <h1 className="font-semibold text-[#2f524a] text-xl">
              Start Transactions
            </h1>
            {loading ? (
              <button
                disabled={true}
                type="submit"
                className="flex items-center gap-4 bg-[#119184] cursor-no-drop transition text-white font-semibold mt-4 py-4 px-8 rounded-xl opacity-70"
              >
                <LoaderCircle className="size-4 animate-spin" />
                Loading...
              </button>
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
      )}
      {open ? (
        <>
          <div className="flex flex-col p-6 w-full bg-white border border-[#119184]/20 rounded-2xl mt-8">
            <div>
              <h1 className="flex items-center gap-2 font-semibold text-[#2f524a] text-xl">
                <Package size={20} /> Tambah Menu
              </h1>
            </div>
            {!menuList ? (
              <div className="self-center flex flex-col h-60 items-center justify-center text-[#2f524a]/70  ">
                <Package size={50} />
                <h1 className="font-semibold mt-4">Belum ada list menu</h1>
                <p className="text-sm">
                  Tambahkan menu untuk melihat list menu.
                </p>
              </div>
            ) : (
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
                    {menuList.map((data, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#119184]/20 whitespace-nowrap"
                      >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">{data.nama_menu}</td>
                        <td className="px-4 py-3">{data.jenis.nama_jenis}</td>
                        <td className="px-4 py-3 text-right">
                          {toRupiah(data.harga_satuan)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <input
                            type="number"
                            value={toRupiahNoRp(data.biaya_produksi)}
                            className="w-full py-2 px-4 text-right focus:outline-2 focus:outline-offset-2 focus:outline-[#3b3b3b] focus:border-[#3b3b3b] text-sm border border-[#ddd] rounded-xl"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            name="jumlah"
                            value={form[index]?.jumlah || ""}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "jumlah",
                                Number(e.target.value),
                              )
                            }
                            placeholder="0"
                            className="w-20 py-2 px-4 text-center focus:outline-2 focus:outline-offset-2 focus:outline-[#3b3b3b] focus:border-[#3b3b3b] text-sm border border-[#ddd] rounded-xl"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            name="sisa"
                            value={form[index]?.sisa || ""}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "sisa",
                                Number(e.target.value),
                              )
                            }
                            placeholder="0"
                            className="w-20 py-2 px-4 text-center focus:outline-2 focus:outline-offset-2 focus:outline-[#3b3b3b] focus:border-[#3b3b3b] text-sm border border-[#ddd] rounded-xl"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          {form[index]?.jumlah === 0 || form[index]?.sisa === 0
                            ? "-"
                            : laku(index)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {form[index]?.jumlah === 0 || form[index]?.sisa === 0
                            ? "-"
                            : toRupiah(laku(index) * data.harga_satuan)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {form[index]?.jumlah === 0 || form[index]?.sisa === 0
                            ? "-"
                            : toRupiah(laku(index) * data.biaya_produksi)}
                        </td>
                      </tr>
                    ))}
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
                      <th className="px-4 py-3 w-28">{sumLaku}</th>
                      <th className="px-4 py-3 w-28">
                        {totalOmzet ? toRupiah(totalOmzet) : "-"}
                      </th>
                      <th className="px-4 py-3 w-28">
                        {totalHPP ? toRupiah(totalHPP) : "-"}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-2 my-4">
            <button
              onClick={() => saveTransaction()}
              className="flex items-center justify-center py-2 px-4 rounded-xl gap-2 text-md font-semibold bg-[#119184] hover:bg-[#119184]/80 cursor-pointer transition text-white"
            >
              <Save size={18} />
              Simpan Transaksi
            </button>
            <button
              onClick={() => closeTransaction()}
              className="flex items-center justify-center py-2 px-4 rounded-xl gap-2 text-md font-semibold bg-[#FF4400] hover:bg-[#FF4400]/80 cursor-pointer transition text-white"
            >
              <Lock size={18} />
              Tutup Transaksi
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

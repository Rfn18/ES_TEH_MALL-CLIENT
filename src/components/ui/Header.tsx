import { Calendar, Leaf, User } from "lucide-react";
import { useEffect, useState } from "react";

export const Header = ({ openParameter }: { openParameter: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);

  useEffect(() => {
    setOpen(openParameter);
  }, [openParameter]);

  return (
    <header className="flex items-center justify-between border-b border-[#a2e0da] pb-4 mb-4 w-full">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl auth-gradient shadow-lg">
          <Leaf className=" size-6  text-white" strokeWidth={2.5} />
        </div>
        <div className="self-center ">
          <h1 className="text-xl font-bold text-[#2f524a]">TehMallPos</h1>
          <span className="flex gap-2 opacity-70 text-sm">
            <Calendar size={20} />
            Minggu, 8 Februari 2025
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {open ? (
          <h2 className="bg-green-600 text-sm text-white font-semibold py-1 px-6 rounded-2xl transition">
            BUKA
          </h2>
        ) : (
          <h2 className="bg-[#119184]/10 text-sm text-[#2f524a] font-semibold py-1 px-4 rounded-2xl transition">
            TUTUP
          </h2>
        )}
        <div className="flex items-center justify-center rounded-3xl w-10 h-10 bg-[#119184]/10 cursor-pointer hover:bg-[#119184]/20 transition">
          <div
            className="w-full h-full flex items-center justify-center"
            onClick={() => setDropdown(!dropdown)}
          >
            <User className=" text-[#2f524a]" size={20} />
          </div>
          {dropdown && (
            <div className="absolute bg-white border border-[#2f524a]/20 shadow-sm w-50 p-2 top-20 right-18 text-sm text-[#2f524a] rounded-xl z-20">
              <p className="flex items-center p-2 h-8 hover:bg-[#eaeaea] rounded transition">
                Profile
              </p>
              <p className="flex items-center p-2 h-8 hover:bg-[#eaeaea] rounded transition">
                Pengaturan
              </p>
              <p className="text-[#35ad61] flex items-center p-2 h-8 hover:bg-[#eaeaea] rounded transition">
                Keluar
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

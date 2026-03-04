interface cardProps {
  title: string;
  point: string;
  desc: string;
  icon: any;
}

export const CalculateCard = ({ title, point, desc, icon }: cardProps) => {
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

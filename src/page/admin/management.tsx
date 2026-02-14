import {
  ChevronLeft,
  Layers,
  UserRoundPlus,
  UtensilsCrossed,
} from "lucide-react";
import { CardForm } from "../../components/ui/CardForm";

export const Management = () => {
  return (
    <>
      <div>
        <ChevronLeft />
        <p>Kembali ke dashboard</p>
      </div>
      <div>
        <h1>Management Menu, Jenis dan User</h1>
        <p>Kelola kategori dan item menu untuk outlet Anda</p>
      </div>
      <div>
        <button>
          <UtensilsCrossed /> Menu
        </button>
        <button>
          <Layers /> Jenis
        </button>
        <button>
          <UserRoundPlus /> User
        </button>
      </div>
      <CardForm />
    </>
  );
};

import { Header } from "../components/ui/Header";

const Setting = () => {
  const user = localStorage.getItem("user");
  return (
    <div className="w-full px-16 py-8">
      {user !== "admin" ? (
        <Header
          openParameter={false}
          navbarList={[
            { name: "dashboard", path: "/dashboard" },
            { name: "history", path: "/history" },
          ]}
        />
      ) : (
        <Header
          openParameter={false}
          navbarList={[
            { name: "dashboard", path: "/admin/dashboard" },
            { name: "management", path: "/admin/management" },
          ]}
        />
      )}
      <div>
        <h1>Setting</h1>
      </div>
    </div>
  );
};

export default Setting;

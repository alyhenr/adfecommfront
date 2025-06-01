import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Perfil", path: "/user/profile" },
  { label: "Compras", path: "/user/purchases" },
  { label: "Configurações", path: "/user/settings" },
];

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-8 hidden md:block">
        <h2 className="text-lg font-semibold mb-8 text-gray-900">Minha Conta</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-gray-700 font-medium transition-colors ${
                  isActive ? "bg-gray-100 text-red-600" : "hover:bg-gray-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto p-6 md:p-12">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout; 
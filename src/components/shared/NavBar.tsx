import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/reducers/store";
import { FaShoppingCart, FaSignInAlt, FaUserCircle } from "react-icons/fa";
import { logoutUser } from "../../store/actions";
import Logo from "../../assets/YOUDE.png";

const pages = [
  { title: "Produtos", to: "/products" }, 
  { title: "Sobre", to: "/about" },
  { title: "Contato", to: "/contact" }
];

const settings = [
  { title: "Perfil", to: "/profile" },
  { title: "Minha conta", to: "/account" }, 
  { title: "Minhas compras", to: "orders" }, 
  { title: "Logout", to: "/logout" }
];

const NavBar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const pathName = useLocation().pathname;

  const cartCount = useSelector(
    (state: RootState) => state.cartState.products.length
  );

  const user = useSelector(
    (state: RootState) => state.authState.user
  );

  const handleLogout = () => {    
    dispatch(logoutUser());
    setIsUserMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={Logo} alt="Logo" className="h-20 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {pages.map((page) => (
              <Link
                key={page.title}
                to={page.to}
                className={`text-sm font-medium ${
                  pathName === page.to
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                } transition-colors`}
              >
                {page.title}
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <Link to="/cart" className="relative text-gray-400 hover:text-gray-500">
              <FaShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user?.userId > 0 ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-gray-400 hover:text-gray-500"
                >
                  <FaUserCircle className="h-6 w-6" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-sm shadow-lg py-1">
                    {settings.map((setting) => (
                      setting.to !== "/logout" ? (
                        <Link
                          key={setting.title}
                          to={setting.to}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          {setting.title}
                        </Link>
                      ) : (
                        !logoutClicked ? (
                          <button
                            key={setting.title}
                            onClick={() => setLogoutClicked(true)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            {setting.title}
                          </button>
                        ) : (
                          <div key={setting.title} className="px-4 py-2 border-t border-gray-100">
                            <p className="text-sm text-gray-500 mb-2">Confirmar logout?</p>
                            <div className="flex space-x-2">
                              <button
                                onClick={handleLogout}
                                className="flex-1 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600"
                              >
                                Sim
                              </button>
                              <button
                                onClick={() => setLogoutClicked(false)}
                                className="flex-1 px-3 py-1 text-sm border border-gray-200 hover:bg-gray-50"
                              >
                                Não
                              </button>
                            </div>
                          </div>
                        )
                      )
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-black transition-colors"
              >
                <FaSignInAlt className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

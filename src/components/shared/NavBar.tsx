import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/reducers/store";
import { FaShoppingCart, FaSignInAlt, FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { logoutUser } from "../../store/actions";
import Logo from "../../assets/YOUDE.png";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const pages = [
  { title: "Produtos", to: "/products" }, 
  { title: "Sobre", to: "/about" },
  { title: "Contato", to: "/contact" }
];

const userPages = [
  { title: "Perfil", to: "/user/profile" },
  { title: "Minhas compras", to: "/user/purchases" },
  { title: "Configurações", to: "/user/settings" },
];

const NavBar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const pathName = useLocation().pathname;

  const cartCount = useSelector(
    (state: RootState) => state.cartState.products.length
  );
  
  const authState = useSelector(
    (state: RootState) => state.authState
  );  
  const isLoggedIn = authState.user.userId > 0;
  
  const handleLogout = () => {    
    dispatch(logoutUser());
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Centered on mobile */}
            <div className="flex-1 flex items-center justify-between sm:justify-start">
              <div className="sm:hidden w-8" /> {/* Spacer for mobile */}
              <Link to="/" className="flex-shrink-0 mx-auto sm:mx-0">
                <img src={Logo} alt="Logo" className="h-20 w-auto" />
              </Link>
              {/* Navigation - Desktop */}
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
              {/* Mobile menu button - Only visible on mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="sm:hidden p-2 text-gray-400 hover:text-gray-500"
              >
                <HiMenu className="h-6 w-6" />
              </button>
            </div>

            

            {/* Right section - Hidden on mobile */}
            <div className="hidden sm:flex items-center space-x-6">
              {/* Cart */}
              <Link to="/cart" className="relative text-gray-400 hover:text-gray-500">
                <FaShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu - Desktop */}
              <div className="hidden sm:block">
                {isLoggedIn ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center text-gray-400 hover:text-gray-500"
                    >
                      <FaUserCircle className="h-6 w-6" />
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-50">
                        {userPages.map((page) => (
                          <Link
                            key={page.title}
                            to={page.to}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            {page.title}
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-1">
                          {!logoutClicked ? (
                            <button
                              onClick={() => setLogoutClicked(true)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Logout
                            </button>
                          ) : (
                            <div className="px-4 py-2">
                              <p className="text-sm text-gray-500 mb-2">Confirmar logout?</p>
                              <div className="flex space-x-2">
                                <button
                                  onClick={handleLogout}
                                  className="flex-1 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                                >
                                  Sim
                                </button>
                                <button
                                  onClick={() => setLogoutClicked(false)}
                                  className="flex-1 px-3 py-1 text-sm border border-gray-200 hover:bg-gray-50 rounded"
                                >
                                  Não
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-black transition-colors rounded-md"
                  >
                    <FaSignInAlt className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <Transition show={isMobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 md:hidden"
          onClose={setIsMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Menu
                </Dialog.Title>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <HiX className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile menu content */}
              <div className="px-2 py-3 divide-y divide-gray-100">
                {/* Navigation links */}
                <div className="py-3">
                  <div className="px-3 pb-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Navegação
                    </h3>
                  </div>
                  {pages.map((page) => (
                    <Link
                      key={page.title}
                      to={page.to}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        pathName === page.to
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {page.title}
                    </Link>
                  ))}
                </div>

                {/* User section */}
                {isLoggedIn ? (
                  <div className="py-3">
                    <div className="px-3 pb-2">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Sua Conta
                      </h3>
                    </div>
                    {userPages.map((page) => (
                      <Link
                        key={page.title}
                        to={page.to}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {page.title}
                      </Link>
                    ))}
                    {!logoutClicked ? (
                      <button
                        onClick={() => setLogoutClicked(true)}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      >
                        Logout
                      </button>
                    ) : (
                      <div className="px-3 py-2">
                        <p className="text-sm text-gray-500 mb-2">Confirmar logout?</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={handleLogout}
                            className="flex-1 px-3 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md"
                          >
                            Sim
                          </button>
                          <button
                            onClick={() => setLogoutClicked(false)}
                            className="flex-1 px-3 py-2 text-sm border border-gray-200 hover:bg-gray-50 rounded-md"
                          >
                            Não
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-3 px-3">
                    <Link
                      to="/login"
                      className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-gray-900 hover:bg-black rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaSignInAlt className="h-5 w-5 mr-2" />
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default NavBar;

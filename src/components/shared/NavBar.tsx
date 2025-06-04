import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/reducers/store";
import { FaShoppingCart, FaSignInAlt, FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { logoutUser } from "../../store/actions";
import Logo from "../../assets/YOUDE.png";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const pages = [
  { title: "nav.products", to: "/products" }, 
  { title: "nav.about", to: "/about" },
  { title: "nav.contact", to: "/contact" }
];

const userPages = [
  { title: "nav.profile", to: "/user/profile" },
  { title: "nav.purchases", to: "/user/purchases" },
  { title: "nav.settings", to: "/user/settings" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const { user } = useSelector((state: RootState) => state.authState);
  const { products } = useSelector((state: RootState) => state.cartState);
  const [isLogoutClicked, setLogoutClicked] = useState(false);
  // Handle click outside of user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
        setLogoutClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img className="h-20 w-auto" src={Logo} alt="Youde Logo" />
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {pages.map((page) => (
                <Link
                  key={page.to}
                  to={page.to}
                  className={`${
                    location.pathname === page.to
                      ? "border-red-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {t(page.title)}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            <Link
              to="/cart"
              className="relative p-2 text-gray-500 hover:text-gray-700"
            >
              <FaShoppingCart className="h-6 w-6" />
              {products.length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {products.length}
                </span>
              )}
            </Link>

            {user.userId > 0 ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <FaUserCircle className="h-6 w-6" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-300 ring-opacity-5 z-50">
                    <div className="py-1">
                      {userPages.map((page) => (
                        <Link
                          key={page.to}
                          to={page.to}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          {t(page.title)}
                        </Link>
                      ))}
                      <button
                        onClick={() => setLogoutClicked(true)}
                        className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${isLogoutClicked ? 'bg-red-50 text-red-700 rounded-md' : ''}`}
                      >
                        {t('nav.logout')}
                      </button>
                      {isLogoutClicked && (
                        <div className="flex items-center justify-center gap-2 border-t border-gray-200 py-3">
                          <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 cursor-pointer text-sm font-medium hover:text-white hover:border-red-700 border-2 border-transparent"
                          >
                            {t('nav.confirmLogout')}
                          </button>
                          <button
                            onClick={() => setLogoutClicked(false)}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 cursor-pointer text-sm font-medium hover:text-gray-700 hover:border-gray-300 border-2 border-transparent"
                          >
                            {t('nav.cancelLogout')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <FaSignInAlt className="mr-2 h-4 w-4" />
                {t('nav.login')}
              </Link>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? (
                <HiX className="block h-6 w-6" />
              ) : (
                <HiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-40 sm:hidden"
          onClose={setIsOpen}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <DialogPanel className="fixed inset-y-0 right-0 z-40 w-full max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between p-4">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <img className="h-8 w-auto" src={Logo} alt="Youde Logo" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Language Switcher in Mobile Menu */}
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>

              {pages.map((page) => (
                <Link
                  key={page.to}
                  to={page.to}
                  className={`${
                    location.pathname === page.to
                      ? "bg-red-50 border-red-500 text-red-700"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                  onClick={() => setIsOpen(false)}
                >
                  {t(page.title)}
                </Link>
              ))}

              <Link
                to="/cart"
                className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FaShoppingCart className="mr-4 h-6 w-6" />
                {t('nav.cart')}
                {products.length > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {products.length}
                  </span>
                )}
              </Link>

              {user.userId > 0 ? (
                <>
                  {userPages.map((page) => (
                    <Link
                      key={page.to}
                      to={page.to}
                      className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      {t(page.title)}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      setLogoutClicked(true);
                    }}
                    className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 ${isLogoutClicked ? 'bg-red-50 text-red-700 rounded-md' : ''}`}
                  >
                    {t('nav.logout')}
                  </button>
                  {isLogoutClicked && (
                    <div className="flex items-center justify-center gap-2 border-t border-gray-200 py-3">
                      <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
                      >
                        {t('nav.confirmLogout')}
                      </button>
                      <button
                        onClick={() => setLogoutClicked(false)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer"
                      >
                        {t('nav.cancelLogout')}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <FaSignInAlt className="mr-4 h-6 w-6" />
                    {t('nav.login')}
                  </div>
                </Link>
              )}
            </div>
          </DialogPanel>
        </Dialog>
      </Transition>
    </nav>
  );
};

export default NavBar;

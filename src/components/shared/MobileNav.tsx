import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/reducers/store';

const MobileNav = () => {
    const location = useLocation();
    const cartCount = useSelector((state: RootState) => state.cartState.products.length);
    const isLoggedIn = useSelector((state: RootState) => state.authState.user.userId > 0);

    return (
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40">
            <div className="flex items-center justify-around h-16">
                <Link
                    to="/"
                    className={`flex flex-col items-center justify-center flex-1 h-full ${
                        location.pathname === '/' ? 'text-red-600' : 'text-gray-600'
                    }`}
                >
                    <FaHome className="w-5 h-5" />
                    <span className="text-xs mt-1">Home</span>
                </Link>

                <Link
                    to="/cart"
                    className={`flex flex-col items-center justify-center flex-1 h-full relative ${
                        location.pathname === '/cart' ? 'text-red-600' : 'text-gray-600'
                    }`}
                >
                    <div className="relative">
                        <FaShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <span className="text-xs mt-1">Carrinho</span>
                </Link>

                <Link
                    to={isLoggedIn ? "/user/profile" : "/login"}
                    className={`flex flex-col items-center justify-center flex-1 h-full ${
                        location.pathname.includes('/user') || location.pathname === '/login'
                            ? 'text-red-600'
                            : 'text-gray-600'
                    }`}
                >
                    <FaUser className="w-5 h-5" />
                    <span className="text-xs mt-1">Perfil</span>
                </Link>
            </div>
        </nav>
    );
};

export default MobileNav; 
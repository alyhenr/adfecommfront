import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import MobileNav from './MobileNav';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <NavBar />
            <main className="flex-grow pb-16 sm:pb-0">
                <Outlet />
            </main>
            <MobileNav />
            <Footer />
        </div>
    );
};

export default Layout; 
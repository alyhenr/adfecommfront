import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <NavBar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout; 
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Set smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Scroll to top with a slight delay to ensure smooth animation triggers
        const timeoutId = setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 100);

        // Cleanup: Reset scroll behavior
        return () => {
            clearTimeout(timeoutId);
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, [pathname]);

    return null;
};

export default ScrollToTop; 
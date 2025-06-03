import { Link } from 'react-router-dom';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import ADFLogo from "../../assets/logo.png"

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: 'Produtos',
            links: [
                { name: 'Todos os Produtos', href: '/products' },
                { name: 'Categorias', href: '/products?view=categories' },
                { name: 'Novidades', href: '/products?sort=newest' },
                { name: 'Ofertas', href: '/products?filter=on_sale' },
            ]
        },
        {
            title: 'Suporte',
            links: [
                { name: 'Central de Ajuda', href: '/help' },
                { name: 'Política de Privacidade', href: '/privacy' },
                { name: 'Termos de Uso', href: '/terms' },
                { name: 'FAQ', href: '/faq' },
            ]
        },
        {
            title: 'Empresa',
            links: [
                { name: 'Sobre Nós', href: '/about' },
                { name: 'Contato', href: '/contact' },
                { name: 'Blog', href: '/blog' },
                { name: 'Carreiras', href: '/careers' },
            ]
        },
    ];

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Footer Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title} className="col-span-1">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link 
                                            to={link.href}
                                            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Logo and Company Info */}
                <div className="col-span-1 lg:col-span-2 flex flex-col sm:flex-row items-center justify-between">
                        <div className="flex items-center space-x-3 mb-6">
                            {/* ADF Logo */}
                            <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                                <img src={ADFLogo} alt="ADF Logo" className="h-12 mx-auto mb-6" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center md:flex-row mb-6">
                            <p className="text-gray-500 text-sm mb-6 max-w-md">
                                Desenvolvido pelo grupo ADF, trazendo a autêntica culinária asiática para sua casa. 
                                Nossa missão é conectar você aos melhores produtos e sabores do Oriente.
                            </p>
                            <div className="flex space-x-4 md:ml-4">
                                <a 
                                    href="https://github.com/yourusername" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-gray-500 transition-colors"
                                >
                                    <FiGithub className="h-6 w-6" />
                                </a>
                                <a 
                                    href="https://linkedin.com/company/yourcompany" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-gray-500 transition-colors"
                                >
                                    <FaLinkedin className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 py-8 mb-14 sm:mb-0">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="text-sm text-gray-500">
                            © {currentYear} ADF Group. Todos os direitos reservados.
                        </div>
                        <div className="flex space-x-6">
                            <Link 
                                to="/privacy" 
                                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                Privacidade
                            </Link>
                            <Link 
                                to="/terms" 
                                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                Termos
                            </Link>
                            <Link 
                                to="/cookies" 
                                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 
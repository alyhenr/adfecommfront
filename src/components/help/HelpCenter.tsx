import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTruck, FiRefreshCw, FiCreditCard, FiShield, FiMessageCircle } from 'react-icons/fi';

const HelpCenter = () => {
    const helpCategories = [
        {
            title: 'Pedidos',
            icon: <FiShoppingBag className="w-6 h-6" />,
            description: 'Rastreamento, alterações e cancelamentos',
            links: [
                { text: 'Rastrear pedido', href: '/user/purchases' },
                { text: 'Cancelar pedido', href: '/faq#cancelar-pedido' },
                { text: 'Status do pedido', href: '/faq#status-pedido' },
            ]
        },
        {
            title: 'Entregas',
            icon: <FiTruck className="w-6 h-6" />,
            description: 'Prazos, frete e áreas atendidas',
            links: [
                { text: 'Prazo de entrega', href: '/faq#prazo-entrega' },
                { text: 'Frete grátis', href: '/faq#frete-gratis' },
                { text: 'Áreas de entrega', href: '/faq#areas-entrega' },
            ]
        },
        {
            title: 'Trocas e Devoluções',
            icon: <FiRefreshCw className="w-6 h-6" />,
            description: 'Política e processo de devolução',
            links: [
                { text: 'Como devolver', href: '/faq#como-devolver' },
                { text: 'Prazo para troca', href: '/faq#prazo-troca' },
                { text: 'Reembolso', href: '/faq#reembolso' },
            ]
        },
        {
            title: 'Pagamentos',
            icon: <FiCreditCard className="w-6 h-6" />,
            description: 'Formas de pagamento e parcelamento',
            links: [
                { text: 'Formas aceitas', href: '/faq#formas-pagamento' },
                { text: 'Parcelamento', href: '/faq#parcelamento' },
                { text: 'Pagamento recusado', href: '/faq#pagamento-recusado' },
            ]
        },
        {
            title: 'Segurança',
            icon: <FiShield className="w-6 h-6" />,
            description: 'Privacidade e proteção de dados',
            links: [
                { text: 'Política de privacidade', href: '/privacy' },
                { text: 'Termos de uso', href: '/terms' },
                { text: 'Cookies', href: '/cookies' },
            ]
        },
        {
            title: 'Contato',
            icon: <FiMessageCircle className="w-6 h-6" />,
            description: 'Fale conosco e suporte',
            links: [
                { text: 'Chat online', href: '/contact' },
                { text: 'E-mail', href: '/contact#email' },
                { text: 'Telefone', href: '/contact#phone' },
            ]
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Como podemos ajudar?</h1>
                <p className="text-lg text-gray-600">
                    Encontre respostas rápidas para suas dúvidas em nossa central de ajuda
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {helpCategories.map((category, index) => (
                    <div 
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center mb-4 text-red-600">
                            {category.icon}
                            <h2 className="text-lg font-semibold text-gray-900 ml-3">
                                {category.title}
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            {category.description}
                        </p>
                        <ul className="space-y-2">
                            {category.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                    <Link 
                                        to={link.href}
                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">
                    Não encontrou o que procurava?
                </p>
                <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                    Fale com nosso Suporte
                </Link>
            </div>
        </div>
    );
};

export default HelpCenter; 
import { FaHeadset, FaBook, FaComments, FaShippingFast } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HelpCenter = () => {
    const { t } = useTranslation();

    const helpSections = [
        {
            icon: FaHeadset,
            title: t('help.sections.support.title'),
            description: t('help.sections.support.description'),
            link: '/contact',
            linkText: t('help.sections.support.linkText'),
        },
        {
            icon: FaBook,
            title: t('help.sections.faq.title'),
            description: t('help.sections.faq.description'),
            link: '/help/faq',
            linkText: t('help.sections.faq.linkText'),
        },
        {
            icon: FaShippingFast,
            title: t('help.sections.shipping.title'),
            description: t('help.sections.shipping.description'),
            link: '/help/shipping',
            linkText: t('help.sections.shipping.linkText'),
        },
        {
            icon: FaComments,
            title: t('help.sections.chat.title'),
            description: t('help.sections.chat.description'),
            link: '/help/chat',
            linkText: t('help.sections.chat.linkText'),
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {t('help.title')}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {t('help.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {helpSections.map((section, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                                <section.icon className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {section.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {section.description}
                            </p>
                            <Link
                                to={section.link}
                                className="text-red-600 hover:text-red-700 font-medium inline-flex items-center"
                            >
                                {section.linkText}
                                <svg
                                    className="w-5 h-5 ml-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t('help.needMoreHelp.title')}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {t('help.needMoreHelp.description')}
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                        {t('help.needMoreHelp.contactButton')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter; 
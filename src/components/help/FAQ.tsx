import { Disclosure, Transition } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
    const { t } = useTranslation();

    const faqs = [
        {
            question: t('help.faq.questions.shipping.question'),
            answer: t('help.faq.questions.shipping.answer'),
        },
        {
            question: t('help.faq.questions.payment.question'),
            answer: t('help.faq.questions.payment.answer'),
        },
        {
            question: t('help.faq.questions.returns.question'),
            answer: t('help.faq.questions.returns.answer'),
        },
        {
            question: t('help.faq.questions.products.question'),
            answer: t('help.faq.questions.products.answer'),
        },
        {
            question: t('help.faq.questions.orders.question'),
            answer: t('help.faq.questions.orders.answer'),
        },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Perguntas Frequentes</h1>
            
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <Disclosure key={index} as="div" className="bg-white border border-gray-200 rounded-lg">
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-50">
                                    <span className="text-base font-medium text-gray-900">
                                        {faq.question}
                                    </span>
                                    <FiChevronDown
                                        className={`${
                                            open ? 'transform rotate-180' : ''
                                        } w-5 h-5 text-gray-500 transition-transform duration-200`}
                                    />
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel className="px-6 py-4 text-base text-gray-600 border-t border-gray-100">
                                        {faq.answer}
                                    </Disclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                ))}
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Ainda tem dúvidas?</h2>
                <p className="text-gray-600 mb-4">
                    Nossa equipe de suporte está disponível para ajudar você com qualquer questão adicional.
                </p>
                <a 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                    Entre em Contato
                </a>
            </div>
        </div>
    );
};

export default FAQ; 
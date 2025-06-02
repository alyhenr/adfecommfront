import { Disclosure, Transition } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';

const FAQ = () => {
    const faqs = [
        {
            question: 'Como faço para rastrear meu pedido?',
            answer: 'Você pode rastrear seu pedido fazendo login em sua conta e acessando a seção "Meus Pedidos". Lá você encontrará o número de rastreamento e o status atual de cada pedido.'
        },
        {
            question: 'Qual é o prazo de entrega?',
            answer: 'O prazo de entrega varia de acordo com sua localização e o método de envio escolhido. Geralmente, as entregas são realizadas em 3-7 dias úteis para capitais e 5-12 dias úteis para outras localidades.'
        },
        {
            question: 'Como posso fazer uma devolução?',
            answer: 'Para fazer uma devolução, acesse sua conta, vá até o pedido desejado e clique em "Solicitar Devolução". Você terá 7 dias após o recebimento para iniciar este processo. O produto deve estar em sua embalagem original e sem sinais de uso.'
        },
        {
            question: 'Quais formas de pagamento são aceitas?',
            answer: 'Aceitamos cartões de crédito (Visa, Mastercard, American Express), PIX, boleto bancário e PayPal. Para compras parceladas, oferecemos até 12x sem juros em cartões selecionados.'
        },
        {
            question: 'Os produtos têm garantia?',
            answer: 'Sim, todos os nossos produtos possuem garantia contra defeitos de fabricação. O prazo da garantia varia de acordo com o fabricante, geralmente entre 30 dias e 1 ano.'
        },
        {
            question: 'Como funciona o frete grátis?',
            answer: 'Oferecemos frete grátis para compras acima de R$ 200,00 para todo o Brasil. A promoção é válida apenas para entregas padrão e pode não se aplicar a produtos muito pesados ou localidades muito distantes.'
        },
        {
            question: 'Posso alterar meu pedido após a confirmação?',
            answer: 'Alterações no pedido só podem ser feitas antes do início do processamento. Entre em contato com nosso suporte imediatamente após fazer o pedido se precisar de alguma alteração.'
        },
        {
            question: 'Como faço para cancelar um pedido?',
            answer: 'Para cancelar um pedido, acesse sua conta e procure a opção "Cancelar Pedido" junto ao pedido desejado. Note que só é possível cancelar pedidos que ainda não foram enviados.'
        }
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
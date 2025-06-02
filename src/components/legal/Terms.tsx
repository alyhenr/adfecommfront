const Terms = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso</h1>
            
            <div className="prose prose-red max-w-none">
                <p className="text-gray-600 mb-6">
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
                    <p className="text-gray-600 mb-4">
                        Ao acessar e usar o ADF E-commerce, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Uso do Serviço</h2>
                    <p className="text-gray-600 mb-4">
                        Você concorda em:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li>Fornecer informações precisas e atualizadas</li>
                        <li>Manter a segurança de sua conta</li>
                        <li>Não usar o serviço para fins ilegais</li>
                        <li>Não violar direitos de propriedade intelectual</li>
                        <li>Não tentar acessar áreas restritas do site</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Compras e Pagamentos</h2>
                    <p className="text-gray-600 mb-4">
                        Ao fazer uma compra, você concorda que:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li>É responsável por fornecer informações de pagamento válidas</li>
                        <li>Autoriza o débito do valor correspondente</li>
                        <li>Os preços podem ser alterados sem aviso prévio</li>
                        <li>Taxas adicionais podem ser aplicadas</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Política de Devolução</h2>
                    <p className="text-gray-600 mb-4">
                        Nossa política de devolução permite:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li>Devolução em até 7 dias após o recebimento</li>
                        <li>Produto deve estar em condições originais</li>
                        <li>Reembolso ou troca conforme preferência do cliente</li>
                        <li>Custos de envio podem ser aplicados</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Limitação de Responsabilidade</h2>
                    <p className="text-gray-600 mb-4">
                        O ADF E-commerce não se responsabiliza por:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li>Danos indiretos ou consequentes</li>
                        <li>Interrupções no serviço</li>
                        <li>Ações de terceiros</li>
                        <li>Perda de dados</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Alterações nos Termos</h2>
                    <p className="text-gray-600">
                        Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entram em vigor imediatamente após sua publicação no site.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms; 
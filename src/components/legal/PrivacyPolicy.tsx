const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>
            
            <div className="prose prose-red max-w-none">
                <p className="text-gray-600 mb-6">
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Informações que Coletamos</h2>
                    <p className="text-gray-600 mb-4">
                        Coletamos informações que você nos fornece diretamente ao utilizar nossos serviços, incluindo:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li>Informações de registro (nome, e-mail, senha)</li>
                        <li>Informações de perfil</li>
                        <li>Informações de pagamento</li>
                        <li>Endereço de entrega</li>
                        <li>Histórico de compras</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Como Usamos suas Informações</h2>
                    <p className="text-gray-600 mb-4">
                        Utilizamos as informações coletadas para:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li>Processar seus pedidos</li>
                        <li>Enviar atualizações sobre seus pedidos</li>
                        <li>Melhorar nossos serviços</li>
                        <li>Personalizar sua experiência</li>
                        <li>Enviar comunicações de marketing (com seu consentimento)</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Proteção de Dados</h2>
                    <p className="text-gray-600 mb-4">
                        Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Seus Direitos</h2>
                    <p className="text-gray-600 mb-4">
                        Você tem direito a:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li>Acessar seus dados pessoais</li>
                        <li>Corrigir dados imprecisos</li>
                        <li>Solicitar a exclusão de seus dados</li>
                        <li>Retirar seu consentimento</li>
                        <li>Receber seus dados em formato estruturado</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Contato</h2>
                    <p className="text-gray-600">
                        Para questões relacionadas à privacidade, entre em contato conosco através do e-mail: privacy@adf.com
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy; 
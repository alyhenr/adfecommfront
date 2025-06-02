const CookiePolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Cookies</h1>
            
            <div className="prose prose-red max-w-none">
                <p className="text-gray-600 mb-6">
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">1. O que são Cookies?</h2>
                    <p className="text-gray-600 mb-4">
                        Cookies são pequenos arquivos de texto que são armazenados no seu computador ou dispositivo móvel quando você visita nosso site. Eles permitem que o site lembre suas ações e preferências por um determinado período.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Como Usamos os Cookies</h2>
                    <p className="text-gray-600 mb-4">
                        Utilizamos diferentes tipos de cookies para:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li>Manter você conectado durante sua visita</li>
                        <li>Lembrar itens em seu carrinho de compras</li>
                        <li>Entender como você usa nosso site</li>
                        <li>Melhorar sua experiência de navegação</li>
                        <li>Personalizar o conteúdo e anúncios</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Tipos de Cookies que Usamos</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">Cookies Essenciais</h3>
                            <p className="text-gray-600">Necessários para o funcionamento básico do site e suas funcionalidades principais.</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">Cookies de Desempenho</h3>
                            <p className="text-gray-600">Coletam informações sobre como você usa nosso site para melhorar sua performance.</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">Cookies de Funcionalidade</h3>
                            <p className="text-gray-600">Permitem que o site lembre suas escolhas e preferências.</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">Cookies de Marketing</h3>
                            <p className="text-gray-600">Usados para rastrear visitantes em diferentes sites e mostrar anúncios relevantes.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Controle de Cookies</h2>
                    <p className="text-gray-600 mb-4">
                        Você pode controlar e/ou excluir cookies conforme desejar. Você pode:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li>Aceitar ou recusar cookies em nosso banner de consentimento</li>
                        <li>Excluir todos os cookies armazenados em seu navegador</li>
                        <li>Configurar seu navegador para não aceitar cookies</li>
                    </ul>
                    <p className="text-gray-600 mt-4">
                        Note que bloquear todos os cookies pode afetar o funcionamento do site.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Mais Informações</h2>
                    <p className="text-gray-600">
                        Para mais informações sobre como usamos cookies ou para alterar suas preferências, entre em contato conosco através do e-mail: privacy@adf.com
                    </p>
                </section>
            </div>
        </div>
    );
};

export default CookiePolicy; 
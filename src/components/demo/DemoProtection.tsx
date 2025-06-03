import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiGlobe, FiMail } from 'react-icons/fi';
import Logo from '../../assets/YOUDE.png';

interface DemoProtectionProps {
    onAuthenticate: (isAuthenticated: boolean) => void;
}

const DemoProtection = ({ onAuthenticate }: DemoProtectionProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Check if already authenticated
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('demo_authenticated');
        if (isAuthenticated === 'true') {
            onAuthenticate(true);
        }
    }, [onAuthenticate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const demoUser = import.meta.env.VITE_DEMO_USER;
        const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;

        if (username === demoUser && password === demoPassword) {
            localStorage.setItem('demo_authenticated', 'true');
            onAuthenticate(true);
        } else {
            setError('Credenciais inválidas para acesso à demo.');
        }

        setIsLoading(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl"
            >
                {/* Logo and Title */}
                <motion.div variants={itemVariants} className="text-center">
                    <img src={Logo} alt="ADF Logo" className="h-24 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        ADF E-commerce Demo
                    </h2>
                    <p className="text-gray-600">
                        Bem-vindo à demonstração do nosso e-commerce. Por favor, insira suas credenciais de acesso.
                    </p>
                </motion.div>

                {/* Login Form */}
                <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Usuário
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                required
                            />
                            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                required
                            />
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 text-sm"
                        >
                            {error}
                        </motion.p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                            isLoading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? 'Verificando...' : 'Acessar Demo'}
                    </button>
                </motion.form>

                {/* Contact Information */}
                <motion.div variants={itemVariants} className="pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-4">
                        Esta é uma versão de demonstração do nosso e-commerce. Para solicitar uma demonstração completa ou saber mais sobre nossas soluções:
                    </p>
                    <div className="space-y-3">
                        <a
                            href="https://adf.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors"
                        >
                            <FiGlobe className="mr-2" />
                            adf.com.br
                        </a>
                        <a
                            href="mailto:contato@adf.com.br"
                            className="flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors"
                        >
                            <FiMail className="mr-2" />
                            contato@adf.com.br
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Background Animation Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-200 rounded-full opacity-20 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-200 rounded-full opacity-20 blur-3xl"
                />
            </div>
        </div>
    );
};

export default DemoProtection; 
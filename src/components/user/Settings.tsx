import { useState } from "react";

const Settings = () => {
  // Placeholder state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notif, setNotif] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    // TODO: Implement backend password change
    setTimeout(() => {
      if (password && password === confirmPassword) {
        setSuccess("Senha alterada com sucesso!");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError("As senhas não coincidem.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleNotifChange = () => {
    setNotif((n) => !n);
    // TODO: Implement backend notification preference update
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Configurações</h1>
        <form className="space-y-6" onSubmit={handlePasswordChange}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nova senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nova senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="bg-red-500 text-white px-5 py-2 rounded-md font-medium hover:bg-red-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Alterar senha"}
          </button>
        </form>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notificações</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Receber notificações por email</span>
          <button
            onClick={handleNotifChange}
            className={`w-12 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 focus:outline-none ${notif ? 'bg-red-500' : 'bg-gray-200'}`}
          >
            <span
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${notif ? 'translate-x-6' : ''}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 
import { useState } from "react";

interface UserProfile {
  name: string;
  email: string;
}

const Profile = () => {
  // Placeholder state, replace with backend fetch
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alysson Almeida",
    email: "alysson@email.com",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    // TODO: Implement backend update
    setTimeout(() => {
      setLoading(false);
      setSuccess("Perfil atualizado com sucesso!");
      setEditing(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Perfil</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!editing}
            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!editing}
            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <div className="flex gap-3 pt-2">
          {editing ? (
            <>
              <button
                type="submit"
                className="bg-red-500 text-white px-5 py-2 rounded-md font-medium hover:bg-red-600 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
              <button
                type="button"
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-md font-medium hover:bg-gray-200 transition"
                onClick={() => setEditing(false)}
                disabled={loading}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              type="button"
              className="bg-gray-900 text-white px-5 py-2 rounded-md font-medium hover:bg-black transition"
              onClick={() => setEditing(true)}
            >
              Editar Perfil
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile; 
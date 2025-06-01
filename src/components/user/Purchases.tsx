import { useState } from "react";

interface Purchase {
  id: string;
  date: string;
  total: number;
  status: string;
  items: { name: string; quantity: number; price: number }[];
}

const mockPurchases: Purchase[] = [
  {
    id: "ORD-001",
    date: "2024-05-01",
    total: 199.99,
    status: "Entregue",
    items: [
      { name: "Produto A", quantity: 1, price: 99.99 },
      { name: "Produto B", quantity: 2, price: 50.00 },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-04-15",
    total: 89.90,
    status: "Em trânsito",
    items: [
      { name: "Produto C", quantity: 1, price: 89.90 },
    ],
  },
];

const Purchases = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Minhas Compras</h1>
      <div className="space-y-6">
        {mockPurchases.map((purchase) => (
          <div
            key={purchase.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Pedido {purchase.id}</div>
                <div className="text-gray-500 text-sm">{purchase.date}</div>
                <div className="text-sm mt-1">
                  <span className="font-medium text-gray-700">Status:</span> {purchase.status}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">R$ {purchase.total.toFixed(2)}</div>
                <button
                  className="text-red-500 hover:underline text-sm mt-2"
                  onClick={() => setExpanded(expanded === purchase.id ? null : purchase.id)}
                >
                  {expanded === purchase.id ? "Ocultar detalhes" : "Ver detalhes"}
                </button>
              </div>
            </div>
            {expanded === purchase.id && (
              <div className="mt-6 border-t border-gray-100 pt-4">
                <div className="font-medium text-gray-700 mb-2">Itens do pedido:</div>
                <ul className="space-y-2">
                  {purchase.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm text-gray-700">
                      <span>{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchases; 
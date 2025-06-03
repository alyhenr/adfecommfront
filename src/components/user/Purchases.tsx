import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/reducers/store';
import { fetchUserPurchases } from '../../store/actions/user';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Purchases = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { purchases } = useSelector((state: RootState) => state.userState);

    useEffect(() => {
        dispatch(fetchUserPurchases());
    }, [dispatch]);



    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Minhas Compras</h1>

            {purchases.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">Você ainda não realizou nenhuma compra.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {purchases.map((purchase) => (
                        <div key={purchase.orderId} className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Pedido #{purchase.orderId}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {format(new Date(purchase.orderDate), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">
                                        R$ {purchase.totalAmount.toFixed(2)}
                                    </p>
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                        purchase.status === 'COMPLETED' 
                                            ? 'bg-green-100 text-green-800'
                                            : purchase.status === 'PENDING'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {purchase.status === 'COMPLETED' ? 'Concluído' :
                                         purchase.status === 'PENDING' ? 'Pendente' : 'Cancelado'}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mt-4">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">
                                    Itens do Pedido
                                </h3>
                                <div className="space-y-4">
                                    {purchase.items.map((item) => (
                                        <div key={item.productId} className="flex items-center">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.productName}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="ml-4 flex-grow">
                                                <h4 className="text-sm font-medium">
                                                    {item.productName}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    Quantidade: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium">
                                                R$ {(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Purchases; 
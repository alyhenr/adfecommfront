import { MdArrowBack, MdShoppingCart } from "react-icons/md"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/reducers/store"
import { Link } from "react-router-dom"

const Cart = () => {
    const { products, totalPrice } = useSelector((state : RootState) => state.cartState)
    return (
    <div className="lg:px-14 sm:px-8 px-4 py-10">
        <div className="flex flex-col items-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <MdShoppingCart size={36} className="text-gray-700"/>
                Carrinho:
            </h1>
            <p className="text-lg text-gray-600 mt-2">Itens selecionados</p>
        </div>

        <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">
            <div className="md:col-span-2 justify-self-start text-lg text-slate-800">
                Produto
            </div>

            <div className="justify-self-center text-lg text-slate-800">
                Preço
            </div>

            <div className="justify-self-center text-lg text-slate-800">
                Quantidade
            </div>

            <div className="justify-self-center text-lg text-slate-800">
                Total
            </div>
        </div>

        <div className="border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
            <div></div>
            <div className="flex text-sm gap-1 flex-col">
                <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
                    <span>Subtotal{" "}</span>
                    <span>R${totalPrice}</span>
                </div>

                <p className="text-slate-500">
                    Taxas e frete são calculados no checkout
                </p>

                <Link to="/checkout" className="w-full flex justify-end">
                    <button
                        className="font-semibold w-[300px] py-2 px-4 rounded-sm bg-green-700 hover:cursor-pointer hover:opacity-85 text-white flex items-center justify-center gap-2 transition duration-300"
                    >
                        <MdShoppingCart size={20}/>
                        Finalizar
                    </button>
                </Link>
                <Link to="/products" className="flex gap-2 items-center mt-2 text-slate-500">
                    <MdArrowBack />
                    <span>Continuar comprando</span>
                </Link>
            </div>
        </div>
    </div>
    )
}

export default Cart
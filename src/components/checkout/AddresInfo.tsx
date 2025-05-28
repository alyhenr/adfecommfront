import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/reducers/store"
import { useEffect, useState } from "react"
import { fetchAddressThunk } from "../../store/actions"
import Loader, { LoaderType } from "../shared/Loader"
import { FaAddressBook } from "react-icons/fa"
import type { Address } from "../../types"
import AddressInforModal from "./AddressInfoModal"
import AddressForm from "./AddressForm"

const AddresInfo = () => {
    const { addresses } = useSelector((state: RootState) => state.addressState)
    const { isLoading } = useSelector((state: RootState) => state.errorsState)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchAddressThunk())
    }, [dispatch])

    const [selectedAddress, setSelectedAddress] = useState<Address>()
    const [openModal, setOpenModal] = useState(false)
    const handleAddAddress = () => {
        setOpenModal(true);
    }

    return (
    <div className="pt-4">
        <Loader text="" variant={LoaderType.SKELETON} />
        {addresses?.length > 0 ? <div className="relative p-6 rounded-lg max-w-md mx-auto">
            <h1 className="text-slate-800 text-center font-bold text-2xl">
                Selecione um endereço
            </h1>
            {addresses.map(a => <div>
                {a.buildingName}
            </div>)}
        </div> : (!isLoading && <div>
            <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
                <div className="flex">
                    <FaAddressBook size={30} className="text-gray-500 mb-4"/>
                    <h1 className="mb-2 ml-3 text-slate-600 text-center font-semibold text-xl pb-2">
                        Nenhum endereço cadastrado
                    </h1>
                </div>
                <p className="mb-6 text-slate-800 text-center">
                    Necessário um endereço para finalizar a compra
                </p>
            </div>
        </div> || <></>)}
        <div className="w-full flex justify-center">
            <button 
                className="px-4 py-2 bg-blue-600 text-white font-medium
                rounded-md hover:bg-blue-700 transition-all cursor-pointer mt-5"
                onClick={handleAddAddress}
            >
                Adicionar
            </button>
        </div>
        <AddressInforModal isOpen={openModal} setIsOpen={setOpenModal}>
            <AddressForm setIsOpen={setOpenModal}/>
        </AddressInforModal>
    </div>
    )
}

export default AddresInfo
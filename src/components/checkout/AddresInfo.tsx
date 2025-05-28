import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/reducers/store"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { fetchAddressThunk } from "../../store/actions"
import Loader, { LoaderType } from "../shared/Loader"
import { FaAddressBook, FaBuilding, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa"
import { AddressFormOperation, type Address } from "../../types"
import AddressInforModal from "./AddressInfoModal"
import AddressForm from "./AddressForm"

const AddresInfo = ({ selectedAddress, setSelectedAddress } : {
    selectedAddress: Address,
    setSelectedAddress: Dispatch<SetStateAction<Address>>,
}) => {
    const { addresses } = useSelector((state: RootState) => state.addressState)
    const { isLoading } = useSelector((state: RootState) => state.errorsState)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchAddressThunk())
    }, [dispatch])

    const [operation, setOperation] = useState(AddressFormOperation.CREATE)
    const [openModal, setOpenModal] = useState(false)
    const handleAddressForm = (op : AddressFormOperation) => {
        setOperation(op)
        setOpenModal(true);
    }    
    
    return (
    <div className="pt-4">
        <Loader text="" variant={LoaderType.SKELETON} />
        {!isLoading && addresses?.length > 0 ? <div className="space-y-10">
            <h1 className="text-slate-800 text-center font-bold text-2xl">
                Selecione um endereço
            </h1>

            {addresses?.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 w-full">
                {addresses.map((a,i) => <div 
                    key={a.addressId}
                    className={`p-5 border rounded-md border-slate-100 cursor-pointer relative ${selectedAddress.addressId == a.addressId ? "bg-green-100" : "bg-white"} max-w-150`}
                    onClick={() => setSelectedAddress(a)}
                >
                    <div className="flex gap-3 absolute top-4 right-2">
                        <button>
                            <FaEdit 
                                onClick={() => handleAddressForm(AddressFormOperation.EDIT)}
                                size={18} 
                                className="text-blue-700≈ cursor-pointer"
                            />
                        </button>
                        <button>
                            <FaTrash 
                                onClick={() => handleAddressForm(AddressFormOperation.DELETE)}
                                size={17} 
                                className="text-red-800 cursor-pointer"
                            />
                        </button>
                    </div>
                    <div className="flex items-start">
                        <div className="space-y-1">
                            <div className="flex items-center">
                                <FaBuilding size={14} className="mr-2 text-gray-500"/>
                                <p className="font-semibold">
                                    Endereço{" "}{i+1}
                                </p>
                                {selectedAddress.addressId == a.addressId && <FaCheckCircle className="text-green-500 ml-2"/>}
                            </div>
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold">Cidade:</span>{" "}{a.city}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Estado:</span>{" "}{a.state}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">CEP:</span>{" "}{a.zipCode}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Número:</span>{" "} {a.number}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Referência</span>{" "}{a.reference}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Nome do prédio:</span>{" "}{a.buildingName}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Nome da rua:</span>{" "}{a.streetName}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>}

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
                onClick={() => handleAddressForm(AddressFormOperation.CREATE)}
            >
                Adicionar
            </button>
        </div>
        <AddressInforModal isOpen={openModal} setIsOpen={setOpenModal}>
            <AddressForm setIsOpen={setOpenModal} address={selectedAddress} operation={operation}/>
        </AddressInforModal>
    </div>
    )
}

export default AddresInfo
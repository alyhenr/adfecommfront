import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/reducers/store"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { fetchAddressThunk } from "../../store/actions"
import Loader, { LoaderType } from "../shared/Loader"
import { HiLocationMarker, HiPlus, HiPencil, HiTrash } from "react-icons/hi"
import { AddressFormOperation, type Address } from "../../types"
import AddressForm from "./AddressForm"
import { Dialog } from "@headlessui/react"

const AddresInfo = ({ selectedAddress, setSelectedAddress } : {
    selectedAddress: Address,
    setSelectedAddress: Dispatch<SetStateAction<Address>>,
}) => {
    const { addresses } = useSelector((state: RootState) => state.addressState)
    const { isLoading } = useSelector((state: RootState) => state.errorsState)
    const dispatch = useDispatch<AppDispatch>()
    const [showForm, setShowForm] = useState(false)
    const [operation, setOperation] = useState(AddressFormOperation.CREATE)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [addressToDelete, setAddressToDelete] = useState<Address | null>(null)

    useEffect(() => {
        dispatch(fetchAddressThunk())
    }, [dispatch])

    const handleShowForm = (op: AddressFormOperation = AddressFormOperation.CREATE, address?: Address) => {
        if (address) {
            setSelectedAddress(address)
        }
        setOperation(op)
        setShowForm(true)
    }

    const handleDeleteClick = (address: Address) => {
        setAddressToDelete(address)
        setShowDeleteModal(true)
    }

    const handleConfirmDelete = () => {
        if (addressToDelete) {
            setSelectedAddress(addressToDelete)
            handleShowForm(AddressFormOperation.DELETE, addressToDelete)
            setShowDeleteModal(false)
            setAddressToDelete(null)
        }
    }
    
    if (isLoading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Loader text="Carregando endereços..." variant={LoaderType.SKELETON} />
            </div>
        )
    }

    if (showForm) {
        return (
            <div className="max-w-2xl mx-auto">
                <AddressForm 
                    setIsOpen={setShowForm} 
                    address={selectedAddress} 
                    operation={operation}
                />
            </div>
        )
    }

    if (!addresses?.length) {
        return (
            <div className="max-w-md mx-auto text-center">
                <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-8">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiLocationMarker className="w-6 h-6 text-gray-400" />
                    </div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">
                        Nenhum endereço cadastrado
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Adicione um endereço para continuar com sua compra
                    </p>
                    <button
                        onClick={() => handleShowForm()}
                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-black transition-colors"
                    >
                        <HiPlus className="w-5 h-5 mr-2" />
                        Adicionar endereço
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-medium text-gray-900">
                    Selecione um endereço de entrega
                </h2>
                <button
                    onClick={() => handleShowForm()}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                    <HiPlus className="w-5 h-5 mr-2" />
                    Novo endereço
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {addresses.map((address) => (
                    <div
                        key={address.addressId}
                        className={`
                            relative p-4 rounded-lg transition-all
                            ${selectedAddress.addressId === address.addressId
                                ? 'bg-gray-900 text-white border-2 border-gray-900'
                                : 'bg-white border border-gray-200'}
                        `}
                    >
                        <div className="mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <HiLocationMarker 
                                        className={`w-5 h-5 mr-2 ${
                                            selectedAddress.addressId === address.addressId
                                                ? 'text-white'
                                                : 'text-gray-400'
                                        }`}
                                    />
                                    <h3 className="text-sm font-medium">
                                        {address.streetName}, {address.number}
                                    </h3>
                                </div>
                                {selectedAddress.addressId === address.addressId && (
                                    <div className="flex items-center">
                                        <span className="text-xs font-medium bg-white text-gray-900 px-2 py-1 rounded-full">
                                            Selecionado
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`
                            space-y-1 text-sm
                            ${selectedAddress.addressId === address.addressId
                                ? 'text-gray-100'
                                : 'text-gray-500'}
                        `}>
                            <p>{address.city}, {address.state}</p>
                            <p>CEP: {address.zipCode}</p>
                            {address.buildingName && <p>{address.buildingName}</p>}
                            {address.reference && <p>Ref: {address.reference}</p>}
                        </div>

                        <div className="flex items-center justify-end space-x-2 mt-4">
                            <button
                                onClick={() => setSelectedAddress(address)}
                                className={`
                                    px-3 py-1.5 text-xs font-medium rounded-md
                                    ${selectedAddress.addressId === address.addressId
                                        ? 'bg-white text-gray-900'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                                `}
                            >
                                Selecionar
                            </button>
                            <button
                                onClick={() => handleShowForm(AddressFormOperation.EDIT, address)}
                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100"
                            >
                                <HiPencil className="w-3.5 h-3.5 mr-1" />
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteClick(address)}
                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100"
                            >
                                <HiTrash className="w-3.5 h-3.5 mr-1" />
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <Dialog
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-sm rounded-lg bg-white p-6">
                        <Dialog.Title className="text-lg font-medium text-gray-900 mb-2">
                            Confirmar exclusão
                        </Dialog.Title>
                        <Dialog.Description className="text-sm text-gray-500 mb-6">
                            Tem certeza que deseja excluir este endereço? Esta ação não pode ser desfeita.
                        </Dialog.Description>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                            >
                                Excluir
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    )
}

export default AddresInfo
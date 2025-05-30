import { useState, type Dispatch, type SetStateAction, useEffect } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import InputField from "../shared/InputField"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/reducers/store"
import { addAddress, deleteAddress, editAddress } from "../../store/actions"
import toast from "react-hot-toast"
import { HiArrowLeft, HiLocationMarker } from "react-icons/hi"
import { AddressFormOperation, type Address } from "../../types"
import Loader from "../shared/Loader"

interface ViaCEPResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: boolean;
}

const AddressForm = ({ setIsOpen, address, operation } : { 
    setIsOpen: Dispatch<SetStateAction<boolean>>, 
    address: Address,
    operation: AddressFormOperation
}) => {
    const [loading, setLoading] = useState(false)  
    const [loadingCep, setLoadingCep] = useState(false)
    const dispatch = useDispatch<AppDispatch>();

    const {
        register, handleSubmit, formState: { errors }, reset, watch, setValue
    } = useForm<Address>({
        mode: "onTouched"
    })

    // Watch the zipCode field for changes
    const watchZipCode = watch("zipCode")
    
    // Fetch address data when CEP changes
    useEffect(() => {
        const fetchAddress = async () => {
            if (!watchZipCode || watchZipCode.length !== 8) return;
            
            setLoadingCep(true)
            try {
                const response = await fetch(`https://viacep.com.br/ws/${watchZipCode}/json/`)
                const data: ViaCEPResponse = await response.json()
                
                if (data.erro) {
                    toast.error("CEP não encontrado")
                    return
                }

                // Auto-fill the form fields
                setValue("city", data.localidade)
                setValue("state", data.uf)
                setValue("streetName", data.logradouro)
                
                toast.success("Endereço encontrado!")
            } catch (error) {
                toast.error("Erro ao buscar CEP")
                console.error("Error fetching CEP:", error)
            } finally {
                setLoadingCep(false)
            }
        }

        fetchAddress()
    }, [watchZipCode, setValue])

    const executeOperation = async (data: Address) : Promise<{
        success: boolean, message: string
    }> => {
        switch (operation) {
            case AddressFormOperation.CREATE:
                return await dispatch(addAddress(data))
            case AddressFormOperation.EDIT:
                return await dispatch(editAddress({ ...data, addressId: address.addressId }))
            case AddressFormOperation.DELETE:
                return await dispatch(deleteAddress(address.addressId))
            default:
                return { success: false, message: "Invalid operation" };
        }
    }

    const handleRegisterAddress: SubmitHandler<Address> = async (data: Address) => {
        setLoading(true)
        const { success, message } = await executeOperation(data)
        if (success) {
            toast.success(message)
            reset()
            setLoading(false)
            setIsOpen(false)
        } else {
            toast.error(message)
            setLoading(false)
        }
    }

    if (operation === AddressFormOperation.DELETE) {
        return (
            <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-8 text-center">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiLocationMarker className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                    Excluir endereço
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                    Tem certeza que deseja excluir este endereço? Esta ação não pode ser desfeita.
                </p>
                <div className="flex items-center justify-center space-x-4">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => handleRegisterAddress(address)}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader text="" />
                                <span className="ml-2">Excluindo...</span>
                            </>
                        ) : (
                            'Excluir'
                        )}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="mr-4 p-2 -m-2 text-gray-400 hover:text-gray-500"
                    >
                        <HiArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-lg font-medium text-gray-900">
                        {operation === AddressFormOperation.CREATE ? 'Novo endereço' : 'Editar endereço'}
                    </h2>
                </div>
            </div>

            <form onSubmit={handleSubmit(handleRegisterAddress)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                        <InputField 
                            label="CEP"
                            required
                            id="zipCode"
                            register={register}
                            errors={errors}
                            message="CEP é obrigatório"
                            min={8}
                            placeholder="00000000"
                            type="text"
                            value={operation === AddressFormOperation.EDIT ? address.zipCode : ""}
                        />
                        {loadingCep && (
                            <div className="absolute right-2 top-8">
                                <Loader text="" />
                            </div>
                        )}
                    </div>

                    <div>
                        <InputField 
                            label="Número"
                            required
                            id="number"
                            register={register}
                            errors={errors}
                            message="Número é obrigatório"
                            min={1}
                            placeholder="123"
                            type="number"
                            value={operation === AddressFormOperation.EDIT ? address.number.toString() : ""}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <InputField 
                            label="Rua"
                            required
                            id="streetName"
                            register={register}
                            errors={errors}
                            message="Nome da rua é obrigatório"
                            min={3}
                            placeholder="Nome da rua"
                            type="text"
                            value={operation === AddressFormOperation.EDIT ? address.streetName : ""}
                        />
                    </div>

                    <div>
                        <InputField 
                            label="Cidade"
                            required
                            id="city"
                            register={register}
                            errors={errors}
                            message="Cidade é obrigatória"
                            min={3}
                            placeholder="Cidade"
                            type="text"
                            value={operation === AddressFormOperation.EDIT ? address.city : ""}
                        />
                    </div>

                    <div>
                        <InputField 
                            label="Estado"
                            required
                            id="state"
                            register={register}
                            errors={errors}
                            message="Estado é obrigatório"
                            min={2}
                            placeholder="Estado"
                            type="text"
                            value={operation === AddressFormOperation.EDIT ? address.state : ""}
                        />
                    </div>

                    <div>
                        <InputField 
                            label="Nome do prédio"
                            required={false}
                            id="buildingName"
                            register={register}
                            errors={errors}
                            message=""
                            min={3}
                            placeholder="Nome do prédio (opcional)"
                            type="text"
                            value={operation === AddressFormOperation.EDIT ? address.buildingName : ""}
                        />
                    </div>

                    <div>
                        <InputField 
                            label="Referência"
                            required={false}
                            id="reference"
                            register={register}
                            errors={errors}
                            message=""
                            min={3}
                            placeholder="Ponto de referência (opcional)"
                            type="text"
                            value={operation === AddressFormOperation.EDIT ? address.reference : ""}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader text="" />
                                <span className="ml-2">Salvando...</span>
                            </>
                        ) : (
                            operation === AddressFormOperation.CREATE ? 'Adicionar' : 'Salvar'
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddressForm
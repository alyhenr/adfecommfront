import { useState, type Dispatch, type SetStateAction } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import InputField from "../shared/InputField"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/reducers/store"
import { addAddress, deleteAddress, editAddress } from "../../store/actions"
import toast from "react-hot-toast"
import SubmitBtn from "../shared/SubmitBtn"
import { FaSearchLocation } from "react-icons/fa"
import { AddressFormOperation, type Address } from "../../types"

const AddressForm = ({ setIsOpen, address, operation } : { 
    setIsOpen: Dispatch<SetStateAction<boolean>>, 
    address: Address,
    operation: AddressFormOperation
}) => {
    const [loading, setLoading] = useState(false)  
    const dispatch = useDispatch<AppDispatch>();

    const {
        register, handleSubmit, formState: { errors }, reset, setValue
    } = useForm<Address>({
        mode: "onTouched"
    })

    const executeOperation = async (data: Address) : Promise<{
        success: boolean, message: string
    }> => {
        switch (operation) {
            case AddressFormOperation.CREATE:
                return await dispatch(addAddress(data))
            case AddressFormOperation.EDIT:
                return await dispatch(editAddress(data))
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

    return (
    <div className="min-h-fit flex justify-center items-center w-[90%]">
        <form 
            onSubmit={handleSubmit(handleRegisterAddress)}
            className="w-[90%] min-w-[350px] py-8 px-4 rounded-md"
        >
            {operation == AddressFormOperation.DELETE ? <h1 className="font-semibold text-lg">
                Tem certeza que quer deletar esse endereço?
            </h1> : <>
                <div className="flex items-center justify-center gap-4">
                    <FaSearchLocation className="text-slate-800 text-5xl"/>
                    <h1 className="text-slate-800 text-center font-serif font-bold">
                    Cadastro de endereço
                    </h1>
                </div>

                <hr className="mt-2 mb-5 text-slate-600"/>

                <div className="flex flex-col gap-3">
                    <InputField 
                        label="ID"
                        required
                        id="addressId"
                        register={register}
                        errors={errors}
                        className="hidden"
                        message=""
                        min={0}
                        max={Number.MAX_SAFE_INTEGER}
                        placeholder="ID"
                        type="number"
                        value={operation == AddressFormOperation.EDIT ? address.addressId : -1}
                    />

                    <InputField 
                        label="Cidade"
                        required
                        id="city"
                        register={register}
                        errors={errors}
                        className=""
                        message="*Cidade é um campo obrigatório"
                        min={3}
                        max={Number.MAX_SAFE_INTEGER}
                        placeholder="Cidade"
                        type="text"
                        value={operation == AddressFormOperation.EDIT ? address.city : ""}
                    />

                    <InputField 
                        label="Estado"
                        required
                        id="state"
                        register={register}
                        errors={errors}
                        className=""
                        message="*Estado é um campo obrigatório"
                        min={4}
                        max={Number.MAX_SAFE_INTEGER}
                        placeholder="Estado"
                        type="text"
                        value={operation == AddressFormOperation.EDIT ? address.state : ""}
                    />

                    <InputField 
                        label="CEP"
                        required
                        id="zipCode"
                        register={register}
                        errors={errors}
                        className=""
                        message="*CEP é um campo obrigatório"
                        min={8}
                        max={8}
                        placeholder="CEP"
                        type="text"
                        value={operation == AddressFormOperation.EDIT ? address.zipCode : ""}
                    />

                    <InputField 
                        label="Número"
                        required
                        id="number"
                        register={register}
                        errors={errors}
                        className=""
                        message="*Número é um campo obrigatório"
                        min={1}
                        max={Number.MAX_SAFE_INTEGER}
                        placeholder="Número"
                        type="number"
                        value={operation == AddressFormOperation.EDIT ? address.number : ""}
                    />

                    <InputField 
                        label="Referência"
                        required={false}
                        id="reference"
                        register={register}
                        errors={errors}
                        className=""
                        message=""
                        min={3}
                        max={Number.MAX_SAFE_INTEGER}
                        placeholder="Referência"
                        type="text"
                        value={operation == AddressFormOperation.EDIT ? address.reference : ""}
                    />

                    <InputField 
                        label="Nome do prédio"
                        required={false}
                        id="buildingName"
                        register={register}
                        errors={errors}
                        className=""
                        message=""
                        min={3}
                        max={Number.MAX_SAFE_INTEGER}
                        placeholder="Nome do prédio"
                        type="text"
                        value={operation == AddressFormOperation.EDIT ? address.buildingName : ""}
                    />

                    <InputField 
                        label="Nome da rua"
                        required
                        id="streetName"
                        register={register}
                        errors={errors}
                        className=""
                        message="*Nome da rua é um campo obrigatório"
                        min={3}
                        max={Number.MAX_SAFE_INTEGER}
                        placeholder="Nome da rua"
                        type="text"
                        value={operation == AddressFormOperation.EDIT ? address.streetName : ""}
                    />
                </div>
            </>}
            <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-center gap-2">
                <div className="w-70">
                    <button className="text-white font-bold p-2 rounded-sm w-full transition-colors duration-100 my-3 bg-gray-400 hover:cursor-pointer hover:opacity-90"
                        onClick={() => setIsOpen(false)}
                    >
                        Voltar
                    </button>
                </div>
                <div className="w-70">
                    <SubmitBtn loading={loading} text={operation == AddressFormOperation.DELETE ? "Confirmar" : "Salvar"} classes={operation == AddressFormOperation.DELETE ? "bg-red-600 cursor-pointer" : "bg-blue-700 cursor-pointer"}/>
                </div>
            </div>
        </form>
    </div>
    )
}

export default AddressForm
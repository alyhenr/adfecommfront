import { type UseFormRegister } from "react-hook-form"

type InputFieldProps = {
    label: string,
    required: boolean,
    id: string,
    register: UseFormRegister<any>,
    errors: any,
    message: string,
    min?: number,
    placeholder: string,
    type: string,
    value: string,
}

const InputField = ({
    label,
    required,
    id,
    register,
    errors,
    message,
    min,
    placeholder,
    type,
    value,
}: InputFieldProps) => {
  return (
    <div>
        <label 
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
        >
            {label}
        </label>
        <div className="relative">
            <input
                {...register(id, {
                    required: {
                        value: required,
                        message: message
                    },
                    minLength: {
                        value: min ?? 0,
                        message: `${label} deve ter no mínimo ${min} caracteres`
                    }
                })}
                type={type}
                id={id}
                defaultValue={value}
                placeholder={placeholder}
                className={`
                    block w-full px-4 py-2.5
                    text-gray-900 placeholder-gray-400
                    border ${errors[id] ? 'border-red-500' : 'border-gray-300'}
                    rounded-sm
                    focus:outline-none focus:ring-1 
                    ${errors[id] ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-red-500 focus:border-red-500'}
                    transition-colors
                `}
            />
            {errors[id] && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </div>
        {errors[id] && (
            <p className="mt-1 text-sm text-red-600">
                {errors[id].message?.toString()}
            </p>
        )}
    </div>
  )
}

export default InputField
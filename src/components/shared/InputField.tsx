import type { FieldErrors, FieldValues } from "react-hook-form";


export type InputFieldProps = {
    id: string,
    type: string,
    label: string,
    errors: FieldErrors<FieldValues>,
    register: Function,
    required: boolean,
    message: string,
    className?: string,
    min?: number,
    max?: number,
    value: string | number,
    placeholder: string,
}

const InputField = ({
    id,
    type,
    label,
    errors,
    register,
    className = "",
    message,
    min,
    max = Number.MAX_SAFE_INTEGER,
    placeholder,
    required,
    value,
} : InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1 w-full" >
        <label 
            htmlFor={id}
            className={`${className} font-semibold text-sm text-slate-800`}
        >
            {label}
        </label>
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            className={`${className} px-2 py-2 border outline-none bg-transparent text-slate-800 rounded-md ${errors[id]?.message ? "border-red-500" : "border-slate-700"}`}
            {...register(id, {
                required: { value: required, message },
                minLength: min 
                    ? { value: min, message: `Mínimo de ${min} caracteres` }
                    : null,
                maxLength: max
                ? { value: max, message: `Máximo de ${max} caracteres` }
                : null,
                value,
                pattern: (() => {
                    switch (type) {
                        case "email":
                            return {
                                value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                                message: "E-mail inválido",
                            };
                        case "url":
                            return {
                                value: /^(https?:\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
                                message: "URL inválida",
                            };
                        default:
                            return null
                    }
                })()
            })}
        />

        {
            errors[id]?.message && (
                <p className="text-sm font-semibold text-red-600 mt-1">
                    {errors[id].message.toString()}
                </p>
            )
        }
    </div>
  )
}

export default InputField
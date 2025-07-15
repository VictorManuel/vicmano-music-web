import { Controller, Control, FieldError } from "react-hook-form"

interface Props {
    control: Control<any>
    label: string
    name: string
    type?: string
    placeholder: string
    error?: FieldError
}

const InputForm = ({ label, name, type, placeholder, error, control }: Props) => {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={name} className="text-sm font-medium mb-1">{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input className={`border border-gray-300 rounded-md p-2 ${error ? "border-red-500" : ""}`} id={name} type={type} placeholder={placeholder} {...field} />
                )}  
            />
            {error && <div className="text-red-500 text-sm mt-1">{error.message}</div>}
        </div>
    )
}
export default InputForm
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InputForm from "./InputForm"
import { FormValues, schema } from "../../../models"

const CustomForm = () => {
    const  {control, handleSubmit, formState: {errors}} = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onBlur"
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10">
            <InputForm control={control} label="Nombre" name="name" type="text" placeholder="Nombre" error={errors.name} />
            <InputForm control={control} label="Email" name="email" type="email" placeholder="Email" error={errors.email} />
            <InputForm control={control} label="Contraseña" name="password" type="password" placeholder="Contraseña" error={errors.password} />
            <InputForm control={control} label="Confirmar contraseña" name="confirmPassword" type="password" placeholder="Confirmar contraseña" error={errors.confirmPassword} />
            <button type="submit">Enviar</button>
        </form>
    )
}

export default CustomForm
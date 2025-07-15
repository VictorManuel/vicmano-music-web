import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import InputForm from "./InputForm"

const schema = z.object({
    name: z.string("requiere texto").min(1, "es requerido" ),
    email: z.string("requiere correo").email("correo invalido").min(1, "es requerido" ),
    password: z.string("requiere contraseña").min(6, "contraseña debe tener al menos 6 caracteres").max(100, "contraseña debe tener menos de 100 caracteres"),
    confirmPassword: z.string("requiere contraseña").min(6, "contraseña debe tener al menos 6 caracteres").max(100, "contraseña debe tener menos de 100 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "las contraseñas no coinciden",
    path: ["confirmPassword"],
})

type FormValues = z.infer<typeof schema>

const CustomForm = () => {
    const  {control, handleSubmit, formState: {errors}} = useForm<FormValues>({
        resolver: zodResolver(schema)
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
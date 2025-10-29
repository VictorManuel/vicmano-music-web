import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InputForm from "./CustomForm/InputForm"
import { RegistrationFormValues, registrationFormSchema } from "./contact-form.model"

const RegistrationForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    mode: "onBlur"
  })

  const onSubmit: SubmitHandler<RegistrationFormValues> = (data) => {
    console.log(data)
    // Aquí iría la lógica de registro
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10">
      <InputForm 
        control={control} 
        label="Nombre" 
        name="name" 
        type="text" 
        placeholder="Nombre" 
        error={errors.name} 
      />
      <InputForm 
        control={control} 
        label="Email" 
        name="email" 
        type="email" 
        placeholder="Email" 
        error={errors.email} 
      />
      <InputForm 
        control={control} 
        label="Contraseña" 
        name="password" 
        type="password" 
        placeholder="Contraseña" 
        error={errors.password} 
      />
      <InputForm 
        control={control} 
        label="Confirmar contraseña" 
        name="confirmPassword" 
        type="password" 
        placeholder="Confirmar contraseña" 
        error={errors.confirmPassword} 
      />
      <button 
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Registrarse
      </button>
    </form>
  )
}

export default RegistrationForm

import { z } from "zod"

// Schema específico para el formulario de contacto
export const contactFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido").min(1, "El email es requerido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(1000, "El mensaje no puede exceder 1000 caracteres"),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

// Schema genérico para formularios de registro (el que estaba en form.model.ts)
export const registrationFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido").min(1, "El email es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(100, "La contraseña debe tener menos de 100 caracteres"),
  confirmPassword: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(100, "La contraseña debe tener menos de 100 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>

// Este archivo se mantiene por compatibilidad hacia atrás
// Los nuevos schemas están en src/forms/contact-form.model.ts

import { z } from "zod"

// Schema genérico para formularios de registro (mantenido por compatibilidad)
export const schema = z.object({
    name: z.string("requiere nombre").min(1, "es requerido" ),
    email: z.string("requiere correo").email("correo invalido").min(1, "es requerido" ),
    password: z.string("requiere contraseña").min(6, "contraseña debe tener al menos 6 caracteres").max(100, "contraseña debe tener menos de 100 caracteres"),
    confirmPassword: z.string("requiere contraseña").min(6, "contraseña debe tener al menos 6 caracteres").max(100, "contraseña debe tener menos de 100 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "las contraseñas no coinciden",
    path: ["confirmPassword"],
})

export type FormValues = z.infer<typeof schema>

// Re-exportar desde forms para facilitar migración
export { 
  contactFormSchema, 
  registrationFormSchema,
  type ContactFormValues,
  type RegistrationFormValues 
} from '../forms/contact-form.model'
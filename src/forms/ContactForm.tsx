import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InputForm from "./CustomForm/InputForm"
import { ContactFormValues, contactFormSchema } from "./contact-form.model"
import { sendContactFormspree } from "../services/contact.service"
import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { Send } from "lucide-react"

const ContactForm = () => {
  const { t, language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const { control, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur"
  })

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true)
    
    try {
      const response = await sendContactFormspree(data)
      
      if (response.success) {
        setSubmitSuccess(true)
        reset()
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 5000)
      } else {
        console.error('Error al enviar:', response.message)
        alert(language === "en" ? "Error sending message. Please try again." : "Error al enviar el mensaje. Por favor, inténtalo de nuevo.")
      }
    } catch (error) {
      console.error('Error:', error)
      alert(language === "en" ? "Error sending message. Please try again." : "Error al enviar el mensaje. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gradient-to-t from-black to-purple-950 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 md:p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="name" className="block text-white mb-3 text-lg">
              {language === "en" ? "Name" : "Nombre"}
            </label>
            <InputForm 
              control={control} 
              name="name" 
              type="text" 
              placeholder={language === "en" ? "Your name" : "Tu nombre"}
              error={errors.name}
              className="w-full bg-purple-900/50 border border-purple-500/30 rounded-lg px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-lg"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white mb-3 text-lg">
              Email
            </label>
            <InputForm 
              control={control} 
              name="email" 
              type="email" 
              placeholder={language === "en" ? "Your email" : "Tu email"}
              error={errors.email}
              className="w-full bg-purple-900/50 border border-purple-500/30 rounded-lg px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-lg"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-white mb-3 text-lg">
            {language === "en" ? "Message" : "Mensaje"}
          </label>
          <InputForm 
            control={control} 
            name="message" 
            type="textarea"
            placeholder={language === "en" ? "Your message" : "Tu mensaje"}
            error={errors.message}
            className="w-full bg-purple-900/50 border border-purple-500/30 rounded-lg px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-lg"
            rows={6}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-fuchsia-700 hover:from-purple-600 hover:to-fuchsia-600 text-white px-10 py-4 rounded-full transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed font-audiowide text-lg"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {language === "en" ? "Sending..." : "Enviando..."}
              </>
            ) : (
              <>
                <Send size={24} />
                {language === "en" ? "Send Message" : "Enviar Mensaje"}
              </>
            )}
          </button>
        </div>

        {submitSuccess && (
          <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center text-lg">
            {language === "en" ? "Message sent successfully!" : "¡Mensaje enviado con éxito!"}
          </div>
        )}
      </form>
    </div>
  )
}

export default ContactForm

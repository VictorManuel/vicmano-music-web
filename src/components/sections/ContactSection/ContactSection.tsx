import { FC } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { Mail, Instagram } from "lucide-react"
import { MotionDiv } from '../../common/Motion/MyMotionComponents'
// import { type ContactFormData } from "../../../services/contact.service"
// import Footer from "../../common/Footer/Footer"

// interface FormState extends ContactFormData { }

const ContactSection: FC = () => {
  const { t } = useLanguage()
  // const [formState, setFormState] = useState<FormState>({
  //   name: "",
  //   email: "",
  //   message: "",
  // })
  // const [isSubmitting, setIsSubmitting] = useState(false)
  // const [submitSuccess, setSubmitSuccess] = useState(false)

  // const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setFormState({
  //     ...formState,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   // setIsSubmitting(true)

  //   try {
  //     const response = await sendContactFormspree(formState)

  //     if (response.success) {
  //       // setSubmitSuccess(true)
  //       setFormState({ name: "", email: "", message: "" })
  //     } else {
  //       // Manejar error
  //       console.error('Error al enviar:', response.message)
  //       alert(language === "en" ? "Error sending message. Please try again." : "Error al enviar el mensaje. Por favor, inténtalo de nuevo.")
  //     }
  //   } catch (error) {
  //     console.error('Error:', error)
  //     alert(language === "en" ? "Error sending message. Please try again." : "Error al enviar el mensaje. Por favor, inténtalo de nuevo.")
  //   } finally {
  //     // setIsSubmitting(false)

  //     // Reset success message after 5 seconds
  //     setTimeout(() => {
  //       // setSubmitSuccess(false)
  //     }, 5000)
  //   }
  // }

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-b from-black to-purple-950 snap-section full-section">
      <div className="container py-20 mx-auto px-4 flex items-center justify-center min-h-screen">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto w-full"
        >
          <h2 className="text-4xl md:text-6xl font-audiowide font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
            {t("title", "contact")}
          </h2>

          <p className="text-white/80 text-lg text-center max-w-2xl mx-auto mb-6">{t("text", "contact")}</p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
            <a
              href={`mailto:${t("email", "contact")}`}
              className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-lg"
            >
              <Mail size={24} />
              {t("email", "contact")}
            </a>
            <a
              href={`https://instagram.com/${t("instagram", "contact")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-lg"
            >
              <Instagram size={24} />
              @{t("instagram", "contact")}
            </a>
          </div>

          {/* Formulario temporalmente oculto */}
          {/* 
          <div className="bg-gradient-to-t from-black to-purple-950 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-white mb-3 text-lg">
                    {language === "en" ? "Name" : "Nombre"}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-purple-900/50 border border-purple-500/30 rounded-lg px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-lg"
                    placeholder={language === "en" ? "Your name" : "Tu nombre"}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-3 text-lg">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-purple-900/50 border border-purple-500/30 rounded-lg px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-lg"
                    placeholder={language === "en" ? "Your email" : "Tu email"}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-white mb-3 text-lg">
                  {language === "en" ? "Message" : "Mensaje"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-purple-900/50 border border-purple-500/30 rounded-lg px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-lg"
                  placeholder={language === "en" ? "Your message" : "Tu mensaje"}
                ></textarea>
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
          */}
          {/* <Footer /> */}
        </MotionDiv>
      </div>
    </section>
  )
}

export default ContactSection 
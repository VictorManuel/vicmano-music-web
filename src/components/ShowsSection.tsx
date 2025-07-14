import { useLanguage } from "../context/LanguageContext"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin } from "lucide-react"
import { FC } from "react"

interface Show {
  id: number
  date: string
  venue: string
  location: string
  time: string
  ticketLink: string
}

const ShowsSection: FC = () => {
  const { t, language } = useLanguage()

  // Placeholder para próximos shows
  const upcomingShows: Show[] = [
    {
      id: 1,
      date: "2025-06-15",
      venue: "Club Cosmos",
      location: "Barcelona, Spain",
      time: "23:00",
      ticketLink: "#",
    },
    {
      id: 2,
      date: "2025-07-22",
      venue: "Techno Festival",
      location: "Buenos Aires, Argentina",
      time: "22:00",
      ticketLink: "#",
    },
  ]

  return (
    <section id="shows" className="min-h-screen bg-gradient-to-b from-purple-950 to-black snap-section full-section">
      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl"
        >
          <h2 className="text-4xl md:text-6xl font-audiowide font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
            {t("title", "shows")}
          </h2>

          <div>
            <h3 className="text-2xl md:text-3xl font-audiowide font-bold text-white mb-8 text-center">
              {t("upcoming", "shows")}
            </h3>

            {upcomingShows.length > 0 ? (
              <div className="space-y-8">
                {upcomingShows.map((show) => (
                  <motion.div
                    key={show.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-purple-900/40 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-fuchsia-400 mb-3">
                        <Calendar size={20} />
                        <span className="text-lg">
                          {new Date(show.date).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-3">{show.venue}</h4>
                      <div className="flex flex-col sm:flex-row sm:gap-6">
                        <div className="flex items-center gap-2 text-white/70 mb-2 sm:mb-0">
                          <MapPin size={18} />
                          <span className="text-lg">{show.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Clock size={18} />
                          <span className="text-lg">{show.time}</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={show.ticketLink}
                      className="mt-6 md:mt-0 inline-block bg-gradient-to-r from-purple-700 to-fuchsia-700 hover:from-purple-600 hover:to-fuchsia-600 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105 text-center font-audiowide text-lg"
                    >
                      Tickets
                    </a>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-white/70 text-xl">{t("noUpcoming", "shows")}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ShowsSection 
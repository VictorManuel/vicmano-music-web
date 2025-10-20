import { FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Instagram, Youtube, Mail, Ticket, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImage from '/images/logo.png';

interface LinkItem {
  title: string;
  url: string;
  icon: string;
}

interface LinktreeContent {
  title: string;
  subtitle: string;
  links: {
    instagram: LinkItem;
    youtube: LinkItem;
    email: LinkItem;
    tickets?: LinkItem;
  };
}

const LinktreePage: FC = () => {
  const { content, language } = useLanguage();
  const linktreeContent = content[language]?.linktree as unknown as LinktreeContent;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'instagram':
        return <Instagram className="w-6 h-6" />;
      case 'youtube':
        return <Youtube className="w-6 h-6" />;
      case 'mail':
        return <Mail className="w-6 h-6" />;
      case 'ticket':
        return <Ticket className="w-6 h-6" />;
      default:
        return <ExternalLink className="w-6 h-6" />;
    }
  };

  const getLinkStyles = (key: string, isHighlighted: boolean = false) => {
    const baseStyles = "w-full backdrop-blur-lg border rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-all duration-300 group shadow-lg hover:shadow-xl";
    
    const colorStyles = {
      instagram: "bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-400/30 hover:bg-gradient-to-r hover:from-pink-500/30 hover:to-purple-500/30 hover:shadow-pink-500/20",
      youtube: "bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-400/30 hover:bg-gradient-to-r hover:from-red-500/30 hover:to-orange-500/30 hover:shadow-red-500/20",
      email: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-cyan-500/30 hover:shadow-blue-500/20",
      tickets: "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30 hover:bg-gradient-to-r hover:from-green-500/30 hover:to-emerald-500/30 hover:shadow-green-500/20"
    };

    const highlightStyles = isHighlighted 
      ? "ring-2 ring-yellow-400/50 shadow-yellow-400/30 animate-pulse" 
      : "";

    return `${baseStyles} ${colorStyles[key as keyof typeof colorStyles] || colorStyles.instagram} ${highlightStyles}`;
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Valores por defecto en caso de que el contenido no esté disponible
  const defaultLinktreeContent: LinktreeContent = {
    title: "Vicmano",
    subtitle: "Conectá conmigo",
    links: {
      // tickets: {
      //   title: "Entradas Amazonia - Kook\n20 de septiembre",
      //   url: "#",
      //   icon: "ticket"
      // },
      instagram: {
        title: "Instagram",
        url: "https://instagram.com/vicmano.minimal",
        icon: "instagram"
      },
      youtube: {
        title: "YouTube",
        url: "https://youtube.com/@vicmano.music",
        icon: "youtube"
      },
      email: {
        title: "Email",
        url: "mailto:vicmano@gmail.com",
        icon: "mail"
      }
    }
  };

  const finalContent = linktreeContent || defaultLinktreeContent;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Website</span>
          </Link>
        </div>

        {/* Profile Section */}
        <div className="text-center mb-10">
          <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center shadow-2xl shadow-purple-500/25 relative overflow-hidden">
            <img 
              src={logoImage} 
              alt="Vicmano Logo" 
              className="w-full h-full mt-2.5 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            {finalContent.title}
          </h1>
          <p className="text-gray-300 text-lg">{finalContent.subtitle}</p>
        </div>

        {/* Links Section */}
        <div className="space-y-5">
          {Object.entries(finalContent.links).map(([key, link], index) => {
            // Resaltar el enlace de tickets (puedes cambiar esto por cualquier otro)
            const isHighlighted = key === 'tickets';
            
            return (
              <button
                key={key}
                onClick={() => handleLinkClick(link.url)}
                className={`${getLinkStyles(key, isHighlighted)} animate-fade-in-up`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-white group-hover:scale-110 transition-transform duration-300 p-2 rounded-lg bg-white/10 group-hover:bg-white/20">
                    {getIcon(link.icon)}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-white font-semibold text-lg whitespace-pre-line">{link.title}</span>
                    {/* {isHighlighted && (
                      <span className="text-yellow-300 text-xs font-medium">⭐ Destacado</span>
                    )} */}
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" />
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <p className="text-gray-400 text-sm">
            © 2024 Vicmano. Todos los derechos reservados.
          </p>
        </div>
      </div>

    </div>
  );
};

export default LinktreePage;

import React, { useState, useEffect } from 'react';
import {
  Instagram,
  Linkedin,
  Globe,
  MessageCircle,
  Briefcase,
  Users,
  BrainCircuit,
  Share2,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';

// --- Data Configuration ---
const profileData = {
  name: 'Lukmanul Hakim',
  handle: '@null.cloud',
  bio: 'Fullstack Developer | Tech Enthusiast | Content Creator',
  avatarUrl:
    'https://media.licdn.com/dms/image/v2/D5603AQH45LRVNorbGw/profile-displayphoto-shrink_800_800/B56ZlSI.LwG4Ac-/0/1758019708589?e=1772064000&v=beta&t=SICT2IyGO2zkNe2M2n_ZaBudjnMvtIhVEnULvhxGy2k', // Updated avatar URL
};

const links = [
  {
    category: 'Contact & Socials',
    items: [
      {
        id: 1,
        title: 'WhatsApp Me',
        url: 'https://wa.me/6285718532060', // Converted 0857 to 62857
        icon: <MessageCircle size={20} />,
        color: 'hover:shadow-green-500/30 hover:border-green-500/50',
        bg: 'bg-green-500/10',
        textColor: 'text-green-400',
      },
      {
        id: 2,
        title: 'Instagram',
        url: 'https://www.instagram.com/null.cloud',
        icon: <Instagram size={20} />,
        color: 'hover:shadow-pink-500/30 hover:border-pink-500/50',
        bg: 'bg-pink-500/10',
        textColor: 'text-pink-400',
      },
      {
        id: 3,
        title: 'TikTok',
        url: 'https://www.tiktok.com/@nullsanz',
        icon: <span className="font-bold text-lg leading-none">♪</span>, // Custom simple icon for Tiktok if lucide not avail
        color: 'hover:shadow-cyan-500/30 hover:border-cyan-500/50',
        bg: 'bg-cyan-500/10',
        textColor: 'text-cyan-400',
      },
      {
        id: 4,
        title: 'LinkedIn',
        url: 'https://www.linkedin.com/in/lukmanul-hakim-586658309/',
        icon: <Linkedin size={20} />,
        color: 'hover:shadow-blue-600/30 hover:border-blue-600/50',
        bg: 'bg-blue-600/10',
        textColor: 'text-blue-400',
      },
    ],
  },
  {
    category: 'Portofolio & Projects',
    items: [
      {
        id: 5,
        title: 'Web Portofolio Utama',
        subtitle: 'nullsanzz.vercel.app',
        url: 'https://nullsanzz.vercel.app/',
        icon: <Globe size={20} />,
        color: 'hover:shadow-purple-500/30 hover:border-purple-500/50',
        bg: 'bg-purple-500/10',
        textColor: 'text-purple-400',
      },
      {
        id: 6,
        title: 'Project Showcase',
        subtitle: 'portofoliolukman.vercel.app',
        url: 'https://portofoliolukman.vercel.app/',
        icon: <Briefcase size={20} />,
        color: 'hover:shadow-indigo-500/30 hover:border-indigo-500/50',
        bg: 'bg-indigo-500/10',
        textColor: 'text-indigo-400',
      },
      {
        id: 7,
        title: 'Test Psikotes Online',
        subtitle: 'Coba test kepribadian kamu disini',
        url: 'https://testbrayy.vercel.app/',
        icon: <BrainCircuit size={20} />,
        color: 'hover:shadow-orange-500/30 hover:border-orange-500/50',
        bg: 'bg-orange-500/10',
        textColor: 'text-orange-400',
      },
    ],
  },
  {
    category: 'Community',
    items: [
      {
        id: 8,
        title: 'Join Group Loker Bray',
        url: 'https://chat.whatsapp.com/Kf7eyeg3kcJFTt69HCPhh1',
        icon: <Users size={20} />,
        color: 'hover:shadow-yellow-500/30 hover:border-yellow-500/50',
        bg: 'bg-yellow-500/10',
        textColor: 'text-yellow-400',
      },
    ],
  },
];

// --- Components ---

const Background = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#0f172a]">
    {/* Animated Gradient Orbs */}
    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
    <div
      className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"
      style={{ animationDelay: '2s' }}
    ></div>
    <div
      className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"
      style={{ animationDelay: '4s' }}
    ></div>

    {/* Grid Pattern */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
  </div>
);

const Header = ({ profile }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-10 flex flex-col items-center pt-12 pb-8 text-center px-4">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt blur"></div>
        <div className="relative">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-28 h-28 rounded-full border-4 border-[#0f172a] bg-slate-800 object-cover shadow-2xl"
          />
          <button
            onClick={handleShare}
            className="absolute bottom-0 right-0 p-2 bg-slate-800 rounded-full border border-slate-700 text-white hover:bg-slate-700 transition-colors shadow-lg"
            title="Copy Link Profile"
          >
            {copied ? (
              <Check size={14} className="text-green-400" />
            ) : (
              <Share2 size={14} />
            )}
          </button>
        </div>
      </div>

      <h1 className="mt-4 text-2xl font-bold text-white tracking-wide">
        {profile.name}
      </h1>
      <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
        {profile.handle}
      </p>
      <p className="mt-2 text-slate-400 text-sm max-w-xs leading-relaxed">
        {profile.bio}
      </p>
    </div>
  );
};

const LinkCard = ({ item }) => {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative flex items-center p-4 mb-3 
        bg-slate-900/40 backdrop-blur-md 
        border border-white/5 rounded-2xl 
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:scale-[1.02]
        ${item.color}
      `}
    >
      {/* Icon Container */}
      <div
        className={`
        flex items-center justify-center w-12 h-12 rounded-xl 
        ${item.bg} ${item.textColor} 
        transition-transform group-hover:scale-110 group-hover:rotate-3
      `}
      >
        {item.icon}
      </div>

      {/* Text Content */}
      <div className="ml-4 flex-1 text-left">
        <h3 className="text-base font-semibold text-slate-100 group-hover:text-white transition-colors">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
            {item.subtitle}
          </p>
        )}
      </div>

      {/* Arrow Icon */}
      <div className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
        <ExternalLink size={18} />
      </div>
    </a>
  );
};

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-200 selection:bg-purple-500/30">
      <Background />

      <main
        className={`
        relative z-10 max-w-md mx-auto min-h-screen pb-12
        transition-opacity duration-700 ease-in-out
        ${mounted ? 'opacity-100' : 'opacity-0'}
      `}
      >
        <Header profile={profileData} />

        <div className="px-4 space-y-8">
          {links.map((category, idx) => (
            <div
              key={idx}
              className="animate-slide-up"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Category Title */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {category.category}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
              </div>

              {/* Links */}
              <div>
                {category.items.map((item) => (
                  <LinkCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-slate-600 pb-8">
          <p>© {new Date().getFullYear()} Null Cloud. All rights reserved.</p>
          <div className="flex justify-center gap-2 mt-2 opacity-50">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          </div>
        </footer>
      </main>

      {/* Custom Styles for Animation */}
      <style>{`
        @keyframes tilt {
          0%, 50%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        .animate-tilt {
          animation: tilt 5s infinite linear;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; 
        }
      `}</style>
    </div>
  );
}

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
  Check,
  ExternalLink,
  FileText,
  Layers,
  Lock,
  Printer,
  Crop,
  Image as ImageIcon,
  AlertCircle,
  Github,
  Music
} from 'lucide-react';

// --- Data Configuration ---
const profileData = {
  name: 'Lukmanul Hakim',
  handle: '@null.cloud',
  bio: 'Founder & Developer LokerBray',
  miniResume: 'Information Systems Student at Universitas Terbuka | IT Multimedia at PT Ihara',
  avatarUrl:
    'https://res.cloudinary.com/dkjfid0sq/image/upload/w_200,h_200,c_fill,r_max,f_png/v1785336228/719770759_17899290135454188_1095631538196561206_n_o4nkib.jpg',
};

const socials = [
  {
    id: 1,
    title: 'WhatsApp',
    url: 'https://wa.me/6285718532060',
    icon: <MessageCircle size={22} />,
  },
  {
    id: 2,
    title: 'Instagram',
    url: 'https://www.instagram.com/null.cloud',
    icon: <Instagram size={22} />,
  },
  {
    id: 3,
    title: 'TikTok',
    url: 'https://www.tiktok.com/@nullsanz',
    // Using a reliable Lucide icon instead of a unicode character to avoid garbled text bugs
    icon: <Music size={22} />, 
  },
  {
    id: 4,
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/lukmanul-hakim-586658309/',
    icon: <Linkedin size={22} />,
  },
  {
    id: 5,
    title: 'GitHub',
    url: 'https://github.com/nullsanz',
    icon: <Github size={22} />,
  },
];

const links = [
  {
    category: 'Portofolio & Projects',
    items: [
      {
        id: 1,
        title: 'Web Portofolio Utama',
        subtitle: 'nullsanz.anull.cloud',
        url: 'https://nullsanz.anull.cloud/',
        icon: <Globe size={20} />,
      },
      {
        id: 2,
        title: 'Web Portofolio 2',
        subtitle: 'lukman.anull.cloud',
        url: 'https://lukman.anull.cloud/',
        icon: <Briefcase size={20} />,
      },

      {
        id: 4,
        title: 'Dashboard LokerBray',
        subtitle: 'Member Area',
        url: 'https://lokerbrayy.anull.cloud/',
        icon: <Layers size={20} />,
      },
      {
        id: 5,
        title: 'CV Builder Otomatis',
        subtitle: 'Buat CV secara gratis',
        url: 'https://lokerbrayy.anull.cloud/cv-builder',
        icon: <FileText size={20} />,
      },
      {
        id: 6,
        title: 'Doc Merger & Compressor',
        subtitle: 'Gabungkan PDF Anda',
        url: 'https://lokerbrayy.anull.cloud/doc-merger',
        icon: <Briefcase size={20} />,
      },
      {
        id: 7,
        title: 'Test Psikotes Online',
        subtitle: 'testbrayy.anull.cloud',
        url: 'https://testbrayy.anull.cloud/',
        icon: <BrainCircuit size={20} />,
      },
    ],
  },
  {
    category: 'Community (Loker Bray)',
    note: '📍 Harap join 1 grup saja. Proses ACC maksimal 1x24 jam.',
    items: [
      {
        id: 8,
        title: 'Grup Loker Bray 1',
        url: 'https://chat.whatsapp.com/Kf7eyeg3kcJFTt69HCPhh1',
        icon: <Users size={20} />,
      },
      {
        id: 9,
        title: 'Grup Loker Bray 2',
        url: 'https://chat.whatsapp.com/D5Jv7eRkerbJMlRxfEfITm',
        icon: <Users size={20} />,
      },
    ],
  },
  {
    category: 'Project Anul Copy Centre',
    items: [
      {
        id: 10,
        title: 'Tools Print Grup',
        url: '#',
        icon: <Printer size={20} />,
        locked: true,
        badge: 'Private',
      },
      {
        id: 11,
        title: 'Tools Auto Cropping Image',
        url: '#',
        icon: <Crop size={20} />,
        locked: true,
        badge: 'Private',
      },
      {
        id: 12,
        title: 'Tools Mini Photoshop',
        url: '#',
        icon: <ImageIcon size={20} />,
        locked: true,
        badge: 'Segera Launching',
      },
    ],
  },
];

// --- Components ---

const Background = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a0f1c]">
    {/* Animated Gradient Orbs */}
    <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] animate-pulse-slow"></div>
    <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[140px] animate-pulse-slow delay-3s"></div>
    <div className="absolute top-[30%] left-[30%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse-slow delay-5s"></div>

    {/* Grid Pattern using pure CSS Data URI (No external URL) */}
    <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay pointer-events-none"></div>
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
    <div className="relative z-10 flex flex-col items-center pt-14 pb-8 text-center px-4">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-60 group-hover:opacity-100 blur-md transition-all duration-700 group-hover:duration-300 animate-spin-slow"></div>
        <div className="relative p-1 bg-[#0a0f1c] rounded-full">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-28 h-28 rounded-full border-4 border-[#0a0f1c] object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
          />
          <button
            onClick={handleShare}
            className="absolute bottom-1 right-1 p-2 bg-slate-800/90 backdrop-blur-md rounded-full border border-slate-600/50 text-white hover:bg-slate-700 transition-colors shadow-xl z-10"
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

      <h1 className="mt-5 text-2xl md:text-3xl font-extrabold text-white tracking-wide drop-shadow-md">
        {profile.name}
      </h1>
      <p className="mt-1 text-sm md:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-wide">
        {profile.bio}
      </p>
      
      {/* Mini Resume */}
      <p className="mt-2 text-slate-400 text-sm max-w-md leading-relaxed font-medium">
        {profile.miniResume}
      </p>

      {/* Social Icons Row - Clean, Perfect Spacing, Uniform Glow */}
      <div className="flex items-center justify-center gap-x-6 mt-6">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.title}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 backdrop-blur-md bg-slate-900/40 text-slate-300 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:border-purple-400 hover:text-cyan-400"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

const NoteBlock = ({ text }) => (
  <div className="mb-4 p-4 rounded-2xl bg-slate-900/40 border border-amber-500/30 flex items-start gap-3 backdrop-blur-sm shadow-lg">
    <AlertCircle size={20} className="text-amber-400 shrink-0 mt-0.5" />
    <p className="text-sm font-medium text-slate-300 leading-relaxed text-left">
      {text}
    </p>
  </div>
);

const LinkCard = ({ item }) => {
  const isLocked = item.locked;
  
  const CardContent = (
    <>
      {/* Icon Container (Left) */}
      <div
        className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 bg-slate-800/80 text-cyan-400 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:text-purple-400"
      >
        {item.icon}
      </div>

      {/* Text Content (Center) */}
      <div className="ml-4 flex-1 text-left">
        <h3 className={`text-[15px] md:text-base font-semibold transition-colors duration-300 ease-out ${isLocked ? 'text-slate-500' : 'text-slate-200 group-hover:text-white'}`}>
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-xs text-slate-400 transition-colors duration-300 ease-out mt-0.5 group-hover:text-slate-300">
            {item.subtitle}
          </p>
        )}
        {item.badge && (
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-slate-800/60 border-slate-700 text-slate-400">
            {item.badge}
          </span>
        )}
      </div>

      {/* Arrow/Lock Icon (Right) */}
      <div className={`transition-all duration-300 ease-out shrink-0 ml-3 ${isLocked ? 'text-slate-600' : 'text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1.5'}`}>
        {isLocked ? <Lock size={18} /> : <ExternalLink size={18} />}
      </div>
    </>
  );

  // Common glassmorphism classes with subtle noise pattern integration
  const baseClasses = `
    group relative flex items-center p-4 mb-4
    bg-slate-900/60 backdrop-blur-sm 
    border border-white/5 rounded-2xl 
    transition-all duration-300 ease-out overflow-hidden
  `;

  // Premium hover states for unlocked cards (Purple-Cyan glowing border)
  const interactiveClasses = `
    hover:-translate-y-1 hover:scale-[1.01] 
    hover:border-purple-500/50 hover:bg-slate-800/80
    hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]
  `;

  const lockedClasses = `
    opacity-75 cursor-not-allowed
  `;

  if (isLocked) {
    return (
      <div className={`${baseClasses} ${lockedClasses}`}>
        <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay pointer-events-none"></div>
        {CardContent}
      </div>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${interactiveClasses} no-underline`}
    >
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.08]"></div>
      {CardContent}
    </a>
  );
};

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-200 selection:bg-purple-500/30 overflow-x-hidden">
      <Background />

      <main
        className={`
        relative z-10 max-w-md mx-auto min-h-screen pb-12
        transition-opacity duration-1000 ease-in-out
        ${mounted ? 'opacity-100' : 'opacity-0'}
      `}
      >
        <Header profile={profileData} />

        <div className="px-5 space-y-10 mt-6">
          {links.map((category, idx) => (
            <div
              key={idx}
              className={`animate-slide-up opacity-0 delay-${idx * 200 + 300}`}
              style={mounted ? { animation: 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' } : {}}
            >
              {/* Category Title */}
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent"></div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  {category.category}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent"></div>
              </div>

              {/* Note for Community Category */}
              {category.note && (
                <NoteBlock text={category.note} />
              )}

              {/* Links */}
              <div className="space-y-1">
                {category.items.map((item) => (
                  <LinkCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-xs text-slate-500 pb-10">
          <p className="font-medium tracking-wide">© {new Date().getFullYear()} Null Cloud. All rights reserved.</p>
          <div className="flex justify-center gap-2.5 mt-4 opacity-50">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse delay-200"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse delay-500"></span>
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .animate-tilt {
          animation: tilt 5s infinite linear;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        title: 'Dashboard Member LokerBray',
        subtitle: 'Member Area',
        url: 'https://lokerbrayy.anull.cloud/dashboard-member',
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

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

const popVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 20 } },
};

// --- Components ---

const Background = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#030014]">
    {/* Animated Gradient Orbs with framer-motion */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[140px]"
    />
    <motion.div
      animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, -90, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[140px]"
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15], y: [0, -30, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      className="absolute top-[30%] left-[30%] w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-[120px]"
    />

    {/* Grid Pattern */}
    <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay pointer-events-none" />
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
    <motion.div variants={itemVariants} className="relative z-10 flex flex-col items-center pt-14 pb-8 text-center px-4">
      <motion.div variants={popVariants} className="relative group mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full opacity-70 blur-md"
        />
        <div className="relative p-1 bg-[#030014] rounded-full">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-28 h-28 rounded-full border-4 border-[#030014] object-cover shadow-2xl"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="absolute bottom-1 right-1 p-2 bg-slate-800/90 backdrop-blur-md rounded-full border border-slate-600/50 text-white hover:bg-slate-700 hover:text-cyan-400 transition-colors shadow-xl z-10"
            title="Copy Link Profile"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Check size={14} className="text-green-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="share"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Share2 size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      <motion.h1 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold text-white tracking-wide drop-shadow-md">
        {profile.name}
      </motion.h1>
      <motion.p variants={itemVariants} className="mt-1 text-sm md:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-wide">
        {profile.bio}
      </motion.p>
      
      <motion.p variants={itemVariants} className="mt-2 text-slate-400 text-sm max-w-md leading-relaxed font-medium px-4">
        {profile.miniResume}
      </motion.p>

      {/* Social Icons Row */}
      <motion.div variants={itemVariants} className="flex items-center justify-center gap-x-4 sm:gap-x-6 mt-6">
        {socials.map((social) => (
          <motion.a
            whileHover={{ y: -5, scale: 1.1, borderColor: '#a855f7', color: '#22d3ee' }}
            whileTap={{ scale: 0.95 }}
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.title}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 backdrop-blur-md bg-slate-900/50 text-slate-300 shadow-lg transition-colors duration-300"
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

const NoteBlock = ({ text }) => (
  <motion.div variants={itemVariants} className="mb-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 backdrop-blur-sm shadow-lg">
    <AlertCircle size={20} className="text-amber-400 shrink-0 mt-0.5" />
    <p className="text-sm font-medium text-amber-200/80 leading-relaxed text-left">
      {text}
    </p>
  </motion.div>
);

const LinkCard = ({ item }) => {
  const isLocked = item.locked;
  
  const CardContent = (
    <>
      <div className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 bg-slate-800/80 text-cyan-400 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:text-purple-400">
        {item.icon}
      </div>

      <div className="ml-4 flex-1 text-left">
        <h3 className={`text-[15px] md:text-base font-semibold transition-colors duration-300 ease-out ${isLocked ? 'text-slate-500' : 'text-slate-200 group-hover:text-white'}`}>
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-xs text-slate-400 transition-colors duration-300 ease-out mt-0.5 group-hover:text-cyan-200/70">
            {item.subtitle}
          </p>
        )}
        {item.badge && (
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-slate-800/60 border-slate-700 text-slate-400">
            {item.badge}
          </span>
        )}
      </div>

      <div className={`transition-all duration-300 ease-out shrink-0 ml-3 ${isLocked ? 'text-slate-600' : 'text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1'}`}>
        {isLocked ? <Lock size={18} /> : <ExternalLink size={18} />}
      </div>
    </>
  );

  const baseClasses = `
    group relative flex items-center p-4 mb-4
    bg-slate-900/40 backdrop-blur-md 
    border border-white/10 rounded-2xl 
    overflow-hidden shadow-lg
  `;

  if (isLocked) {
    return (
      <motion.div variants={itemVariants} className={`${baseClasses} opacity-70 cursor-not-allowed`}>
        <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay pointer-events-none" />
        {CardContent}
      </motion.div>
    );
  }

  return (
    <motion.a
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} no-underline hover:border-purple-500/50 hover:bg-slate-800/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-colors duration-300`}
    >
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.08]" />
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-cyan-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
      {CardContent}
    </motion.a>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans text-slate-200 selection:bg-purple-500/30 overflow-x-hidden">
      <Background />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-lg mx-auto min-h-screen pb-12"
      >
        <Header profile={profileData} />

        <div className="px-4 sm:px-6 space-y-10 mt-8">
          {links.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              {/* Category Title */}
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400/80">
                  {category.category}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
              </div>

              {category.note && <NoteBlock text={category.note} />}

              {/* Links */}
              <motion.div variants={containerVariants} className="space-y-1">
                {category.items.map((item) => (
                  <LinkCard key={item.id} item={item} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.footer variants={itemVariants} className="mt-20 text-center text-xs text-slate-500 pb-10">
          <p className="font-medium tracking-wide">© {new Date().getFullYear()} Null Cloud. All rights reserved.</p>
          <div className="flex justify-center gap-2.5 mt-4 opacity-50">
            <motion.span 
              animate={{ opacity: [0.3, 1, 0.3] }} 
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} 
              className="w-1.5 h-1.5 rounded-full bg-slate-400" 
            />
            <motion.span 
              animate={{ opacity: [0.3, 1, 0.3] }} 
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} 
              className="w-1.5 h-1.5 rounded-full bg-slate-400" 
            />
            <motion.span 
              animate={{ opacity: [0.3, 1, 0.3] }} 
              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} 
              className="w-1.5 h-1.5 rounded-full bg-slate-400" 
            />
          </div>
        </motion.footer>
      </motion.main>
    </div>
  );
}

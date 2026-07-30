import React, { useState, useEffect } from 'react';
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
  Music,
  Moon,
  Sun
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
  { id: 1, title: 'WhatsApp', url: 'https://wa.me/6285718532060', icon: <MessageCircle size={22} /> },
  { id: 2, title: 'Instagram', url: 'https://www.instagram.com/null.cloud', icon: <Instagram size={22} /> },
  { id: 3, title: 'TikTok', url: 'https://www.tiktok.com/@nullsanz', icon: <Music size={22} /> },
  { id: 4, title: 'LinkedIn', url: 'https://www.linkedin.com/in/lukmanul-hakim-586658309/', icon: <Linkedin size={22} /> },
  { id: 5, title: 'GitHub', url: 'https://github.com/nullsanz', icon: <Github size={22} /> },
];

const links = [
  {
    category: 'Portofolio & Projects',
    items: [
      { id: 1, title: 'Web Portofolio Utama', subtitle: 'nullsanz.anull.cloud', url: 'https://nullsanz.anull.cloud/', icon: <Globe size={20} /> },
      { id: 2, title: 'Web Portofolio 2', subtitle: 'lukman.anull.cloud', url: 'https://lukman.anull.cloud/', icon: <Briefcase size={20} /> },
      { id: 4, title: 'Dashboard Member LokerBray', subtitle: 'Member Area', url: 'https://lokerbrayy.anull.cloud/dashboard-member', icon: <Layers size={20} /> },
      { id: 5, title: 'CV Builder Otomatis', subtitle: 'Buat CV secara gratis', url: 'https://lokerbrayy.anull.cloud/cv-builder', icon: <FileText size={20} /> },
      { id: 6, title: 'Doc Merger & Compressor', subtitle: 'Gabungkan PDF Anda', url: 'https://lokerbrayy.anull.cloud/doc-merger', icon: <Briefcase size={20} /> },
      { id: 7, title: 'Test Psikotes Online', subtitle: 'testbrayy.anull.cloud', url: 'https://testbrayy.anull.cloud/', icon: <BrainCircuit size={20} /> },
    ],
  },
  {
    category: 'Community (Loker Bray)',
    note: '📍 Harap join 1 grup saja. Proses ACC maksimal 1x24 jam.',
    items: [
      { id: 8, title: 'Grup Loker Bray 1', url: 'https://chat.whatsapp.com/Kf7eyeg3kcJFTt69HCPhh1', icon: <Users size={20} /> },
      { id: 9, title: 'Grup Loker Bray 2', url: 'https://chat.whatsapp.com/D5Jv7eRkerbJMlRxfEfITm', icon: <Users size={20} /> },
    ],
  },
  {
    category: 'Project Anul Copy Centre',
    items: [
      { id: 10, title: 'Tools Print Grup', url: '#', icon: <Printer size={20} />, locked: true, badge: 'Private' },
      { id: 11, title: 'Tools Auto Cropping Image', url: '#', icon: <Crop size={20} />, locked: true, badge: 'Private' },
      { id: 12, title: 'Tools Mini Photoshop', url: '#', icon: <ImageIcon size={20} />, locked: true, badge: 'Segera Launching' },
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

const Background = ({ isDark }) => (
  <div className={`fixed inset-0 z-0 overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#030014]' : 'bg-slate-50'}`}>
    {/* Animated Gradient Orbs with framer-motion */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: isDark ? [0.3, 0.5, 0.3] : [0.15, 0.25, 0.15], rotate: [0, 90, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] ${isDark ? 'bg-purple-600/30' : 'bg-purple-400/40'}`}
    />
    <motion.div
      animate={{ scale: [1, 1.3, 1], opacity: isDark ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1], rotate: [0, -90, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      className={`absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] ${isDark ? 'bg-cyan-600/20' : 'bg-cyan-400/30'}`}
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: isDark ? [0.15, 0.3, 0.15] : [0.08, 0.15, 0.08], y: [0, -30, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      className={`absolute top-[30%] left-[30%] w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-pink-500/15' : 'bg-pink-400/20'}`}
    />

    {/* Grid Pattern */}
    <div className={`absolute inset-0 bg-noise mix-blend-overlay pointer-events-none ${isDark ? 'opacity-[0.06]' : 'opacity-[0.03]'}`} />
  </div>
);

const ThemeToggle = ({ isDark, toggleTheme }) => (
  <motion.button
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9 }}
    onClick={toggleTheme}
    className="absolute top-6 right-6 p-3 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-cyan-400 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
    title="Toggle Theme"
  >
    <AnimatePresence mode="wait" initial={false}>
      {isDark ? (
        <motion.div
          key="moon"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <Moon size={20} />
        </motion.div>
      ) : (
        <motion.div
          key="sun"
          initial={{ opacity: 0, rotate: 90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: -90 }}
          transition={{ duration: 0.2 }}
        >
          <Sun size={20} className="text-amber-500" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

const Header = ({ profile }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div variants={itemVariants} className="relative z-10 flex flex-col items-center pt-16 pb-8 text-center px-4">
      <motion.div variants={popVariants} className="relative group mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full opacity-60 dark:opacity-70 blur-md"
        />
        <div className="relative p-1 bg-white dark:bg-[#030014] rounded-full transition-colors duration-500">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            src={profile.avatarUrl}
            alt={profile.name}
            // Reduced border width (border-2 instead of border-4)
            className="w-28 h-28 rounded-full border-2 border-white dark:border-[#030014] object-cover shadow-2xl transition-colors duration-500"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="absolute bottom-1 right-1 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-600/50 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-purple-500 dark:hover:text-cyan-400 transition-colors shadow-xl z-10"
            title="Copy Link Profile"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div key="check" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                  <Check size={14} className="text-green-500 dark:text-green-400" />
                </motion.div>
              ) : (
                <motion.div key="share" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                  <Share2 size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      <motion.h1 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-wide drop-shadow-sm dark:drop-shadow-md">
        {profile.name}
      </motion.h1>
      <motion.p variants={itemVariants} className="mt-1 text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-400 tracking-wide">
        {profile.bio}
      </motion.p>
      
      <motion.p variants={itemVariants} className="mt-2 text-slate-500 dark:text-slate-400 text-sm max-w-md leading-relaxed font-medium px-4">
        {profile.miniResume}
      </motion.p>

      {/* Social Icons Row */}
      <motion.div variants={itemVariants} className="flex items-center justify-center gap-x-4 sm:gap-x-6 mt-6">
        {socials.map((social) => (
          <motion.a
            whileHover={{ y: -5, scale: 1.1, borderColor: '#a855f7', color: '#a855f7' }}
            whileTap={{ scale: 0.95 }}
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.title}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 backdrop-blur-md bg-white/60 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 shadow-md dark:shadow-lg transition-colors duration-300"
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

const NoteBlock = ({ text }) => (
  <motion.div variants={itemVariants} className="mb-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-start gap-3 backdrop-blur-sm shadow-sm dark:shadow-lg">
    <AlertCircle size={20} className="text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
    <p className="text-sm font-medium text-amber-800 dark:text-amber-200/80 leading-relaxed text-left">
      {text}
    </p>
  </motion.div>
);

const LinkCard = ({ item }) => {
  const isLocked = item.locked;
  
  const CardContent = (
    <>
      <div className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 bg-slate-100 dark:bg-slate-800/80 text-purple-600 dark:text-cyan-400 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:text-cyan-500 dark:group-hover:text-purple-400">
        {item.icon}
      </div>

      <div className="ml-4 flex-1 text-left">
        <h3 className={`text-[15px] md:text-base font-semibold transition-colors duration-300 ease-out ${isLocked ? 'text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-white'}`}>
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300 ease-out mt-0.5 group-hover:text-slate-600 dark:group-hover:text-cyan-200/70">
            {item.subtitle}
          </p>
        )}
        {item.badge && (
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
            {item.badge}
          </span>
        )}
      </div>

      <div className={`transition-all duration-300 ease-out shrink-0 ml-3 ${isLocked ? 'text-slate-400 dark:text-slate-600' : 'text-slate-400 dark:text-slate-500 group-hover:text-purple-500 dark:group-hover:text-cyan-400 group-hover:translate-x-1'}`}>
        {isLocked ? <Lock size={18} /> : <ExternalLink size={18} />}
      </div>
    </>
  );

  const baseClasses = `
    group relative flex items-center p-4 mb-4
    bg-white/70 dark:bg-slate-900/40 backdrop-blur-md 
    border border-slate-200/60 dark:border-white/10 rounded-2xl 
    overflow-hidden shadow-sm dark:shadow-lg
  `;

  if (isLocked) {
    return (
      <motion.div variants={itemVariants} className={`${baseClasses} opacity-60 dark:opacity-70 cursor-not-allowed`}>
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.04] mix-blend-overlay pointer-events-none" />
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
      className={`${baseClasses} no-underline hover:border-purple-300 dark:hover:border-purple-500/50 hover:bg-white/90 dark:hover:bg-slate-800/60 hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-300`}
    >
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.04] mix-blend-overlay pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08]" />
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-100 dark:via-cyan-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
      {CardContent}
    </motion.a>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(false); // Default to Light Theme

  useEffect(() => {
    // Check local storage or system preference on mount if needed, but here we force light mode as default
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    // Apply dark class to body/html
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen font-sans selection:bg-purple-500/30 overflow-x-hidden ${isDark ? 'dark text-slate-200' : 'text-slate-800'}`}>
      <Background isDark={isDark} />
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

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
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600/50 to-transparent" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-cyan-400/80">
                  {category.category}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600/50 to-transparent" />
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
        <motion.footer variants={itemVariants} className="mt-20 text-center text-xs text-slate-400 dark:text-slate-500 pb-10">
          <p className="font-medium tracking-wide">© {new Date().getFullYear()} Null Cloud. All rights reserved.</p>
          <div className="flex justify-center gap-2.5 mt-4 opacity-50">
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          </div>
        </motion.footer>
      </motion.main>
    </div>
  );
}

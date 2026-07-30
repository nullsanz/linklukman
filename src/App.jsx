import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { QRCodeCanvas } from 'qrcode.react';
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
  Sun,
  Search,
  Download,
  QrCode,
  X
} from 'lucide-react';

// --- Utility: Micro-interaction Sound ---
const playPop = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Ignore if audio fails or is blocked by browser policy
  }
};

// --- Data Configuration ---
const profileData = {
  name: 'Lukmanul Hakim',
  handle: '@null.cloud',
  bio: 'Founder & Developer LokerBray',
  miniResume: 'Information Systems Student at Universitas Terbuka | IT Multimedia at PT Ihara',
  avatarUrl:
    'https://res.cloudinary.com/dkjfid0sq/image/upload/w_200,h_200,c_fill,r_max,f_png/v1785336228/719770759_17899290135454188_1095631538196561206_n_o4nkib.jpg',
  phone: '+6285718532060',
};

const socials = [
  { id: 1, title: 'WhatsApp', url: `https://wa.me/${profileData.phone}`, icon: <MessageCircle size={22} /> },
  { id: 2, title: 'Instagram', url: 'https://www.instagram.com/null.cloud', icon: <Instagram size={22} /> },
  { id: 3, title: 'TikTok', url: 'https://www.tiktok.com/@nullsanz', icon: <Music size={22} /> },
  { id: 4, title: 'LinkedIn', url: 'https://www.linkedin.com/in/lukmanul-hakim-586658309/', icon: <Linkedin size={22} /> },
  { id: 5, title: 'GitHub', url: 'https://github.com/nullsanz', icon: <Github size={22} /> },
];

const links = [
  {
    category: 'Portofolio & Projects',
    color: 'blue',
    items: [
      {
        id: 1,
        title: 'Web Portofolio Utama',
        subtitle: 'nullsanz.anull.cloud - Showcase lengkap karya & project',
        url: 'https://nullsanz.anull.cloud/',
        icon: <Globe size={24} />,
        isHero: true,
        isHot: true,
        bgImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop', // Abstract code bg
      },
      { id: 2, title: 'Web Portofolio 2', subtitle: 'lukman.anull.cloud', url: 'https://lukman.anull.cloud/', icon: <Briefcase size={20} /> },
      { id: 4, title: 'Dashboard Member LokerBray', subtitle: 'Member Area', url: 'https://lokerbrayy.anull.cloud/dashboard-member', icon: <Layers size={20} /> },
      { id: 5, title: 'CV Builder Otomatis', subtitle: 'Buat CV secara gratis', url: 'https://lokerbrayy.anull.cloud/cv-builder', icon: <FileText size={20} />, isHot: true },
      { id: 6, title: 'Doc Merger & Compressor', subtitle: 'Gabungkan PDF Anda', url: 'https://lokerbrayy.anull.cloud/doc-merger', icon: <Briefcase size={20} /> },
      { id: 7, title: 'Test Psikotes Online', subtitle: 'testbrayy.anull.cloud', url: 'https://testbrayy.anull.cloud/', icon: <BrainCircuit size={20} /> },
    ],
  },
  {
    category: 'Community (Loker Bray)',
    color: 'green',
    note: '📍 Harap join 1 grup saja. Proses ACC maksimal 1x24 jam.',
    items: [
      { id: 8, title: 'Grup Loker Bray 1', url: 'https://chat.whatsapp.com/Kf7eyeg3kcJFTt69HCPhh1', icon: <Users size={20} /> },
      { id: 9, title: 'Grup Loker Bray 2', url: 'https://chat.whatsapp.com/D5Jv7eRkerbJMlRxfEfITm', icon: <Users size={20} /> },
    ],
  },
  {
    category: 'Project Anul Copy Centre',
    color: 'orange',
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
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

// --- Custom Cursor Component ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-difference border border-white"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
};

// --- Components ---

const Background = ({ isDark }) => (
  <div className={`fixed inset-0 z-0 overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#030014]' : 'bg-slate-50'}`}>
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
    <div className={`absolute inset-0 bg-noise mix-blend-overlay pointer-events-none ${isDark ? 'opacity-[0.06]' : 'opacity-[0.03]'}`} />
  </div>
);

const ThemeToggle = ({ isDark, toggleTheme }) => (
  <motion.button
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9 }}
    onMouseEnter={playPop}
    onClick={() => { playPop(); toggleTheme(); }}
    className="fixed top-6 right-6 p-3 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-cyan-400 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
    title="Toggle Theme"
  >
    <AnimatePresence mode="wait" initial={false}>
      {isDark ? (
        <motion.div key="moon" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
          <Moon size={20} />
        </motion.div>
      ) : (
        <motion.div key="sun" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
          <Sun size={20} className="text-amber-500" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

const QRModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl flex flex-col items-center relative border border-slate-200 dark:border-slate-800"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <X size={20} />
          </button>
          <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Scan untuk membagikan</h3>
          <div className="bg-white p-4 rounded-xl shadow-inner border border-slate-100">
            <QRCodeCanvas value={window.location.href} size={200} bgColor={"#ffffff"} fgColor={"#030014"} level={"H"} />
          </div>
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">{profileData.handle}</p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const StickyHeader = ({ scrollY }) => {
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  // Animate header size based on scroll
  const headerY = useTransform(scrollY, [0, 150], [0, 0]);
  const scale = useTransform(scrollY, [0, 150], [1, 0.7]);
  const opacityBio = useTransform(scrollY, [0, 100], [1, 0]);
  const bgOpacity = useTransform(scrollY, [0, 150], [0, 0.8]);

  const handleShare = () => {
    playPop();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Link berhasil disalin ke clipboard! 🚀', { position: 'top-center' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveContact = () => {
    playPop();
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profileData.name}
TITLE:Founder & Developer LokerBray
TEL;TYPE=CELL:${profileData.phone}
URL:https://nullsanz.anull.cloud/
END:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profileData.name.replace(' ', '_')}.vcf`;
    a.click();
    toast.success('Kontak vCard berhasil diunduh! 📇', { position: 'top-center' });
  };

  return (
    <>
      <QRModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />
      
      <motion.div
        style={{ y: headerY, backgroundColor: `rgba(var(--bg-color-rgb), ${bgOpacity.get()})` }}
        className="sticky top-0 z-40 w-full flex flex-col items-center pt-12 pb-4 px-4 backdrop-blur-md border-b border-transparent transition-colors duration-300"
      >
        <motion.div style={{ scale }} className="relative group mb-4 origin-top">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full opacity-60 dark:opacity-70 blur-md"
          />
          <div className="relative p-1 bg-white dark:bg-[#030014] rounded-full transition-colors duration-500">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={profileData.avatarUrl}
              alt={profileData.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-white dark:border-[#030014] object-cover shadow-2xl transition-colors duration-500"
            />
            {/* Share Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="absolute bottom-0 right-0 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-600/50 text-slate-700 dark:text-white hover:text-purple-500 dark:hover:text-cyan-400 shadow-xl z-10"
              title="Copy Link Profile"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
            </motion.button>
            {/* QR Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { playPop(); setQrOpen(true); }}
              className="absolute top-0 right-0 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-600/50 text-slate-700 dark:text-white hover:text-purple-500 dark:hover:text-cyan-400 shadow-xl z-10"
              title="Tampilkan QR Code"
            >
              <QrCode size={14} />
            </motion.button>
          </div>
        </motion.div>

        <motion.h1 style={{ scale }} className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-wide drop-shadow-sm dark:drop-shadow-md origin-top">
          {profileData.name}
        </motion.h1>

        <motion.div style={{ opacity: opacityBio }} className="flex flex-col items-center">
          <p className="mt-1 text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-400 tracking-wide">
            {profileData.bio}
          </p>
          <p className="mt-2 text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed font-medium text-center">
            {profileData.miniResume}
          </p>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-x-4 sm:gap-x-6 mt-5">
            {socials.map((social) => (
              <motion.a
                onMouseEnter={playPop}
                whileHover={{ y: -5, scale: 1.1, borderColor: '#a855f7', color: '#a855f7' }}
                whileTap={{ scale: 0.95 }}
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.title}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-200 dark:border-white/10 backdrop-blur-md bg-white/60 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 shadow-md transition-colors duration-300"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveContact}
            className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
          >
            <Download size={16} />
            Simpan Kontak
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

const LinkCard = ({ item }) => {
  const isLocked = item.locked;
  
  // Define colors per category
  const colorMap = {
    blue: 'text-blue-500 dark:text-cyan-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300',
    green: 'text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300',
    orange: 'text-orange-500 dark:text-amber-400 group-hover:text-orange-600 dark:group-hover:text-amber-300',
  };
  const iconColor = colorMap[item.categoryColor] || colorMap.blue;

  const CardContent = (
    <>
      <div className={`flex items-center justify-center ${item.isHero ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-12 h-12'} rounded-xl shrink-0 bg-slate-100/80 dark:bg-slate-800/80 ${iconColor} transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 backdrop-blur-md shadow-sm`}>
        {item.icon}
      </div>

      <div className="ml-4 flex-1 text-left relative z-10">
        <h3 className={`${item.isHero ? 'text-lg sm:text-xl' : 'text-[15px] md:text-base'} font-bold transition-colors duration-300 ease-out ${isLocked ? 'text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-white'}`}>
          {item.title}
        </h3>
        {item.subtitle && (
          <p className={`${item.isHero ? 'text-sm' : 'text-xs'} text-slate-500 dark:text-slate-400 transition-colors duration-300 ease-out mt-1 group-hover:text-slate-700 dark:group-hover:text-cyan-200/80 line-clamp-2`}>
            {item.subtitle}
          </p>
        )}
        <div className="flex gap-2 items-center flex-wrap mt-2">
          {item.badge && (
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
              {item.badge}
            </span>
          )}
          {item.isHot && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.5)]">
              🔥 Populer
            </span>
          )}
        </div>
      </div>

      <div className={`transition-all duration-300 ease-out shrink-0 ml-3 z-10 ${isLocked ? 'text-slate-400 dark:text-slate-600' : 'text-slate-400 dark:text-slate-500 group-hover:text-purple-500 dark:group-hover:text-cyan-400 group-hover:translate-x-1'}`}>
        {isLocked ? <Lock size={18} /> : <ExternalLink size={18} />}
      </div>
    </>
  );

  const baseClasses = `
    group relative flex items-center p-4 h-full
    bg-white/70 dark:bg-slate-900/40 backdrop-blur-md 
    border border-slate-200/60 dark:border-white/10 rounded-2xl 
    overflow-hidden shadow-sm dark:shadow-lg
    ${item.isHero ? 'md:col-span-2 lg:col-span-2 min-h-[140px]' : ''}
  `;

  if (isLocked) {
    return (
      <motion.div variants={itemVariants} className={`${baseClasses} opacity-60 dark:opacity-70 cursor-not-allowed`}>
        {CardContent}
      </motion.div>
    );
  }

  return (
    <motion.a
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={playPop}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} no-underline hover:border-purple-300 dark:hover:border-purple-500/50 hover:bg-white/90 dark:hover:bg-slate-800/60 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300`}
    >
      {/* Background Image for Hero */}
      {item.isHero && item.bgImage && (
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 transition-opacity duration-500 group-hover:opacity-20 dark:group-hover:opacity-40">
          <img src={item.bgImage} alt="bg" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#030014] via-white/80 dark:via-[#030014]/80 to-transparent" />
        </div>
      )}
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-100 dark:via-cyan-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-0" />
      
      {CardContent}
    </motion.a>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollY } = useScroll();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);
    else setIsDark(false);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.style.setProperty('--bg-color-rgb', '3, 0, 20'); // For dark sticky header
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      document.documentElement.style.setProperty('--bg-color-rgb', '248, 250, 252'); // For light sticky header
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Filter links based on search
  const filteredLinks = useMemo(() => {
    if (!searchQuery.trim()) return links;
    
    return links.map(category => {
      const filteredItems = category.items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      return { ...category, items: filteredItems };
    }).filter(category => category.items.length > 0);
  }, [searchQuery]);

  return (
    <div className={`min-h-screen font-sans selection:bg-purple-500/30 overflow-x-hidden ${isDark ? 'dark text-slate-200' : 'text-slate-800'}`}>
      <CustomCursor />
      <Toaster toastOptions={{ className: 'dark:bg-slate-800 dark:text-white dark:border-slate-700' }} />
      <Background isDark={isDark} />
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

      <StickyHeader scrollY={scrollY} />

      <main className="relative z-10 max-w-4xl mx-auto pb-12 px-4 sm:px-6 mt-8">
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 max-w-lg mx-auto"
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 group-focus-within:text-purple-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Cari project atau link..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-2xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-sm dark:shadow-lg dark:text-white placeholder:text-slate-400"
            />
          </div>
        </motion.div>

        {/* Links Container */}
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredLinks.length > 0 ? filteredLinks.map((category, idx) => (
              <motion.div 
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Category Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600/50 to-transparent" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-cyan-400/80">
                    {category.category}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600/50 to-transparent" />
                </div>

                {category.note && (
                  <div className="mb-6 max-w-lg mx-auto p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-start gap-3 backdrop-blur-sm shadow-sm">
                    <AlertCircle size={20} className="text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200/80 leading-relaxed text-left">
                      {category.note}
                    </p>
                  </div>
                )}

                {/* Grid Layout Container */}
                <motion.div 
                  variants={containerVariants} 
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                  {category.items.map((item) => (
                    <LinkCard key={item.id} item={{ ...item, categoryColor: category.color }} />
                  ))}
                </motion.div>
              </motion.div>
            )) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-20 text-slate-500 dark:text-slate-400"
              >
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p>Tidak ada link yang cocok dengan pencarian "{searchQuery}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-24 text-center text-xs text-slate-400 dark:text-slate-500 pb-10"
        >
          <p className="font-medium tracking-wide">© {new Date().getFullYear()} Null Cloud. All rights reserved.</p>
        </motion.footer>
      </main>
    </div>
  );
}

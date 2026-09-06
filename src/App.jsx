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
  Megaphone,
  Sun,
  Search,
  Download,
  QrCode,
  Mail,
  X
} from 'lucide-react';

// --- Utility: Micro-interaction Sound ---
let audioCtx = null;
let unlocked = false;

const initAndUnlockAudio = () => {
  if (unlocked) return;
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().then(() => {
        unlocked = true;
      }).catch(() => {});
    } else if (audioCtx && audioCtx.state === 'running') {
      unlocked = true;
    }
  } catch (e) {}
};

if (typeof document !== 'undefined') {
  // Attach to multiple interaction types to guarantee we capture a valid gesture
  ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
    document.addEventListener(evt, initAndUnlockAudio, { capture: true, passive: true });
  });
}

const playPop = () => {
  try {
    if (!audioCtx || !unlocked) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
    
    // Increased volume to 0.5 (was 0.05) so it's actually audible
    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (e) {}
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
        bgImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
      },
      { id: 2, title: 'Web Portofolio 2', subtitle: 'lukman.anull.cloud', url: 'https://lukman.anull.cloud/', icon: <Briefcase size={20} /> },
      { id: 4, title: 'Dashboard Member LokerBray', subtitle: 'Member Area', url: 'https://lokerbrayy.anull.cloud/dashboard-member', icon: <Layers size={20} />, isHot: true },
      { id: 5, title: 'CV Builder Otomatis', subtitle: 'Buat CV secara gratis', url: 'https://lokerbrayy.anull.cloud/cv-builder', icon: <FileText size={20} />, isHot: true },
      { id: 55, title: 'Surat Lamaran Kerja Builder', subtitle: '18 Template Resmi & AI Penulis', url: 'https://lokerbrayy.anull.cloud/lamaran-builder', icon: <FileText size={20} />, isHot: true },
      { id: 56, title: 'Kirim Email Lamaran (Gmail API)', subtitle: 'Kirim lamaran via Gmail pribadi ke HRD', url: 'https://lokerbrayy.anull.cloud/email', icon: <Mail size={20} />, isHot: true },
      { id: 6, title: 'Doc Merger & Compressor', subtitle: 'Gabungkan PDF Anda', url: 'https://lokerbrayy.anull.cloud/doc-merger', icon: <Briefcase size={20} />, isHot: true },
      { id: 7, title: 'Test Psikotes Online', subtitle: 'testbrayy.anull.cloud', url: 'https://testbrayy.anull.cloud/', icon: <BrainCircuit size={20} />, isHot: true },
    ],
  },
  {
    category: 'Community (Loker Bray)',
    color: 'green',
    note: '📍 Harap join 1 grup saja. Proses ACC maksimal 1x24 jam.',
    items: [
      { id: 8, title: 'Grup Loker Bray 1', url: 'https://chat.whatsapp.com/Kf7eyeg3kcJFTt69HCPhh1', icon: <Users size={20} /> },
      { id: 9, title: 'Grup Loker Bray 2', url: 'https://chat.whatsapp.com/FrMMZ3MRF0AFZDPoZSnEH0', icon: <Users size={20} /> },
      { id: 10, title: 'Grup Loker Bray 3', url: 'https://chat.whatsapp.com/CZoXRjchOKwFRCoLPelTsK', icon: <Users size={20} /> },
      { id: 101, title: 'Saluran Info Resmi', url: 'https://whatsapp.com/channel/0029Vb8paaO6buMC6R2RoL2T', icon: <Megaphone size={20} /> },
      { id: 102, title: 'TikTok Loker Brayy', subtitle: '@lokerbrayy.anull.cloud - Info lowongan, tips interview & psikotes', url: 'https://www.tiktok.com/@lokerbrayy.anull.cloud', icon: <Music size={20} />, isHot: true, color: 'pink' },
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
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => setIsHovering(!!e.target.closest('a, button'));

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
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-difference border border-white hidden md:block"
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
    {/* Optimized for low-end devices: Using radial-gradient instead of expensive filter: blur() */}
    <motion.div
      animate={{ x: [0, 30, -10, 0], y: [0, -20, 20, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        background: isDark 
          ? 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 60%)' 
          : 'radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, transparent 60%)'
      }}
      className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] min-w-[500px] min-h-[500px] rounded-full pointer-events-none will-change-transform"
    />
    <motion.div
      animate={{ x: [0, -30, 10, 0], y: [0, 20, -20, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        background: isDark 
          ? 'radial-gradient(circle, rgba(8, 145, 178, 0.12) 0%, transparent 60%)' 
          : 'radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, transparent 60%)'
      }}
      className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] min-w-[500px] min-h-[500px] rounded-full pointer-events-none will-change-transform"
    />
    {/* Removed mix-blend-overlay which is notoriously slow on mobile GPUs */}
    <div className={`absolute inset-0 bg-noise pointer-events-none ${isDark ? 'opacity-[0.03]' : 'opacity-[0.02]'}`} />
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

// The dynamic compact header that appears when scrolling down
const CompactStickyHeader = ({ scrollY, isDark, onShare, onQr }) => {
  const [isCopied, setIsCopied] = useState(false);
  
  // Fade in the compact header when scrolled past 150px
  const headerOpacity = useTransform(scrollY, [150, 200], [0, 1]);
  const headerY = useTransform(scrollY, [150, 200], [-20, 0]);
  
  // Conditionally disable pointer events to avoid blocking clicks when hidden
  const [pointerEvents, setPointerEvents] = useState('none');
  
  useEffect(() => {
    return headerOpacity.onChange((v) => {
      setPointerEvents(v > 0.5 ? 'auto' : 'none');
    });
  }, [headerOpacity]);

  const handleCopy = () => {
    onShare();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div 
      style={{ opacity: headerOpacity, y: headerY, pointerEvents }}
      className={`fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between backdrop-blur-lg border-b shadow-sm transition-colors duration-300 ${
        isDark ? 'bg-[#030014]/80 border-slate-800' : 'bg-white/80 border-slate-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <img src={profileData.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 object-cover" />
        <span className="font-bold text-sm sm:text-base text-slate-800 dark:text-white truncate max-w-[150px] sm:max-w-[200px]">
          {profileData.name}
        </span>
      </div>
      <div className="flex items-center gap-2 pr-14">
        <button onClick={onQr} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-purple-500 transition-colors">
          <QrCode size={16} />
        </button>
        <button onClick={handleCopy} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-purple-500 transition-colors">
          {isCopied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
        </button>
      </div>
    </motion.div>
  );
};

// The main static header with all info
const ProfileHeader = ({ onShare, onQr, onSaveContact, opacity, scale, y }) => {
  return (
    <motion.div style={{ opacity, scale, y }} className="w-full flex flex-col items-center pt-16 pb-4 px-4 relative z-10">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} className="relative group mb-6">
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
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-white dark:border-[#030014] object-cover shadow-2xl transition-colors duration-500"
          />
        </div>
      </motion.div>

      <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-wide drop-shadow-sm dark:drop-shadow-md text-center">
        {profileData.name}
      </motion.h1>

      <motion.p variants={itemVariants} className="mt-1 text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-400 tracking-wide text-center">
        {profileData.bio}
      </motion.p>
      
      <motion.p variants={itemVariants} className="mt-3 text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed font-medium text-center">
        {profileData.miniResume}
      </motion.p>
      
      {/* Social Icons */}
      <motion.div variants={itemVariants} className="flex items-center justify-center gap-x-4 sm:gap-x-6 mt-6">
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
            className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 backdrop-blur-md bg-white/60 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 shadow-md transition-colors duration-300"
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>

      {/* Action Buttons Row */}
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-3 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onQr}
          className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm hover:text-purple-500 transition-colors"
          title="QR Code"
        >
          <QrCode size={18} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShare}
          className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm hover:text-purple-500 transition-colors"
          title="Share"
        >
          <Share2 size={18} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSaveContact}
          className="flex items-center gap-2 px-6 h-12 rounded-2xl bg-slate-800 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm shadow-lg hover:shadow-xl hover:bg-slate-700 dark:hover:bg-slate-100 transition-all"
        >
          <Download size={18} />
          Simpan Kontak
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const LinkCard = ({ item }) => {
  const isLocked = item.locked;
  
  const colorMap = {
    blue: 'text-blue-500 dark:text-cyan-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300',
    green: 'text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300',
    orange: 'text-orange-500 dark:text-amber-400 group-hover:text-orange-600 dark:group-hover:text-amber-300',
    pink: 'text-pink-500 dark:text-pink-400 group-hover:text-pink-600 dark:group-hover:text-pink-300',
  };
  const iconColor = colorMap[item.color || item.categoryColor] || colorMap.blue;

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
      {item.isHero && item.bgImage && (
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 transition-opacity duration-500 group-hover:opacity-20 dark:group-hover:opacity-40">
          <img src={item.bgImage} alt="bg" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#030014] via-white/80 dark:via-[#030014]/80 to-transparent" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-100 dark:via-cyan-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-0" />
      {CardContent}
    </motion.a>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [qrOpen, setQrOpen] = useState(false);
  const { scrollY } = useScroll();

  // Parallax animation for ProfileHeader
  const profileOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const profileScale = useTransform(scrollY, [0, 200], [1, 0.9]);
  const profileY = useTransform(scrollY, [0, 200], [0, 50]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);
    else setIsDark(false);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleShare = () => {
    playPop();
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link berhasil disalin ke clipboard! 🚀', { position: 'top-center' });
  };

  const handleQr = () => {
    playPop();
    setQrOpen(true);
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
    <div className={`min-h-screen font-sans selection:bg-purple-500/30 overflow-x-clip ${isDark ? 'dark text-slate-200' : 'text-slate-800'}`}>
      <CustomCursor />
      <Toaster toastOptions={{ className: 'dark:bg-slate-800 dark:text-white dark:border-slate-700' }} />
      <Background isDark={isDark} />
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <QRModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />

      {/* The dynamically appearing compact header on scroll */}
      <CompactStickyHeader scrollY={scrollY} isDark={isDark} onShare={handleShare} onQr={handleQr} />

      <main className="relative z-10 max-w-4xl mx-auto pb-12 px-4 sm:px-6">
        
        {/* The main static header with parallax */}
        <ProfileHeader 
          onShare={handleShare} 
          onQr={handleQr} 
          onSaveContact={handleSaveContact} 
          opacity={profileOpacity} 
          scale={profileScale} 
          y={profileY} 
        />

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 max-w-lg mx-auto mt-6"
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

                <motion.div 
                  variants={containerVariants} 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                  {category.items.map((item) => (
                    <LinkCard key={item.id} item={{ ...item, categoryColor: category.color }} />
                  ))}
                </motion.div>
              </motion.div>
            )) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-slate-500 dark:text-slate-400">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p>Tidak ada link yang cocok dengan pencarian "{searchQuery}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-24 text-center text-xs text-slate-400 dark:text-slate-500 pb-10">
          <p className="font-medium tracking-wide">© {new Date().getFullYear()} Null Cloud. All rights reserved.</p>
        </motion.footer>
      </main>
    </div>
  );
}

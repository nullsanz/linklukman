import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Globe,
  Briefcase,
  Users,
  BrainCircuit,
  Share2,
  Check,
  ExternalLink,
  FileText,
  Layers,
  Printer,
  Crop,
  Image as ImageIcon,
  AlertTriangle,
  Github,
  Music,
  Megaphone,
  Search,
  Download,
  QrCode,
  Mail,
  X,
  MessageCircle,
  Instagram,
  Linkedin,
  Terminal,
  Code2,
  Sparkles,
  ArrowUpRight,
  Menu,
  ChevronDown,
  ChevronUp,
  Cpu,
  ShieldCheck,
  Send,
  Copy
} from 'lucide-react';

// --- Micro-interaction Audio Engine ---
let audioCtx = null;
let audioUnlocked = false;

const initAudio = () => {
  if (audioUnlocked) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().then(() => { audioUnlocked = true; }).catch(() => {});
      } else {
        audioUnlocked = true;
      }
    }
  } catch (e) {}
};

if (typeof document !== 'undefined') {
  ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
    document.addEventListener(evt, initAudio, { capture: true, passive: true });
  });
}

const playPop = () => {
  try {
    if (!audioCtx || !audioUnlocked) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(820, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {}
};

// --- Data Configuration ---
const profileData = {
  name: 'Lukmanul Hakim',
  handle: '@null.cloud',
  titleTag: 'DEVELOPER • FOUNDER • TECH ENTHUSIAST',
  role: 'Founder & Lead Engineer LokerBray',
  miniResume: 'Mahasiswa Sistem Informasi Universitas Terbuka • IT Multimedia PT Ihara Manufacturing Indonesia • Passionate in Fullstack Web, WhatsApp Automation, AI Workflows & Clean Architecture.',
  avatarUrl: 'https://res.cloudinary.com/dkjfid0sq/image/upload/w_300,h_300,c_fill,r_max,f_png/v1785336228/719770759_17899290135454188_1095631538196561206_n_o4nkib.jpg',
  phone: '+6285718532060',
  cleanPhone: '6285718532060',
  location: 'Karawang, Jawa Barat, Indonesia',
  statusBadge: 'ONLINE & READY TO SHIP',
};

const socials = [
  { id: 'wa', title: 'WhatsApp', handle: 'Direct Chat', url: `https://wa.me/${profileData.cleanPhone}`, icon: <MessageCircle size={20} />, color: '#00ff88' },
  { id: 'ig', title: 'Instagram', handle: '@null.cloud', url: 'https://www.instagram.com/null.cloud', icon: <Instagram size={20} />, color: '#c084fc' },
  { id: 'tt', title: 'TikTok', handle: '@nullsanz', url: 'https://www.tiktok.com/@nullsanz', icon: <Music size={20} />, color: '#fcba28' },
  { id: 'li', title: 'LinkedIn', handle: 'Lukmanul Hakim', url: 'https://www.linkedin.com/in/lukmanul-hakim-586658309/', icon: <Linkedin size={20} />, color: '#14b6e5' },
  { id: 'gh', title: 'GitHub', handle: 'nullsanz', url: 'https://github.com/nullsanz', icon: <Github size={20} />, color: '#f9f4da' },
];

const stats = [
  { label: 'KOMUNITAS AKTIF', val: '1,250+', sub: 'Member Loker', color: '#00ff88' },
  { label: 'TEMPLATE RESMI', val: '18+', sub: 'Surat & CV ATS', color: '#fcba28' },
  { label: 'REPOSITORI AKTIF', val: '24+', sub: 'GitHub Projects', color: '#14b6e5' },
  { label: 'SERVICE UPTIME', val: '99.9%', sub: 'VPS PM2 Cloud', color: '#c084fc' },
];

const linkCategories = [
  {
    id: 'portfolio',
    category: 'Portofolio & Flagship Apps',
    badge: 'ECOSYSTEM',
    accentColor: '#14b6e5',
    description: 'Aplikasi web, platform pencari kerja, dan dashboard otomatisasi yang aktif melayani ribuan pengguna.',
    items: [
      {
        id: 'web-1',
        title: 'Web Portofolio Utama',
        subtitle: 'nullsanz.anull.cloud — Showcase interaktif portofolio, arsitektur sistem, dan koleksi karya rekayasa software.',
        url: 'https://nullsanz.anull.cloud/',
        icon: <Globe size={24} />,
        accent: '#14b6e5',
        badge: 'FLAGSHIP ⚡',
        isHero: true,
        previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'dash-loker',
        title: 'Dashboard Member LokerBray',
        subtitle: 'Member area terpusat untuk akses loker terverifikasi, tracking lamaran kerja, dan status verifikasi.',
        url: 'https://lokerbrayy.anull.cloud/dashboard-member',
        icon: <Layers size={22} />,
        accent: '#00ff88',
        badge: 'POPULER 🔥',
      },
      {
        id: 'cv-builder',
        title: 'CV Builder Otomatis (ATS)',
        subtitle: 'Pembuat CV profesional gratis berstandar ATS (Applicant Tracking System) ramah HRD korporat.',
        url: 'https://lokerbrayy.anull.cloud/cv-builder',
        icon: <FileText size={22} />,
        accent: '#fcba28',
        badge: 'GRATIS ✨',
      },
      {
        id: 'lamaran-builder',
        title: 'Surat Lamaran Builder & AI',
        subtitle: '18 template surat lamaran resmi + asisten AI yang merangkai kata motivasi kerja secara presisi.',
        url: 'https://lokerbrayy.anull.cloud/lamaran-builder',
        icon: <Sparkles size={22} />,
        accent: '#c084fc',
        badge: 'AI POWERED 🤖',
      },
      {
        id: 'gmail-hrd',
        title: 'Kirim Email Lamaran (Gmail API)',
        subtitle: 'Kirim lamaran kerja dan berkas PDF resmi langsung dari akun Gmail pribadi kamu ke alamat HRD.',
        url: 'https://lokerbrayy.anull.cloud/email',
        icon: <Mail size={22} />,
        accent: '#ff3344',
        badge: 'DIRECT HRD 📬',
      },
      {
        id: 'doc-merger',
        title: 'Doc Merger & PDF Compressor',
        subtitle: 'Gabungkan seluruh berkas lampiran (KTP, Ijazah, SKCK, Sertifikat) menjadi satu file PDF rapi dan ringan.',
        url: 'https://lokerbrayy.anull.cloud/doc-merger',
        icon: <Briefcase size={22} />,
        accent: '#14b6e5',
      },
      {
        id: 'psikotes',
        title: 'Test Psikotes Spasial Online',
        subtitle: 'Platform simulasi psikotes visual, deret gambar, matematika logika, dan latihan tes kerja pabrik.',
        url: 'https://testbrayy.anull.cloud/',
        icon: <BrainCircuit size={22} />,
        accent: '#00ff88',
        badge: 'INTERAKTIF 🎯',
      },
      {
        id: 'web-2',
        title: 'Web Portofolio 2 (Alternative)',
        subtitle: 'lukman.anull.cloud — Portofolio ringkas dan dokumentasi profil karir profesional.',
        url: 'https://lukman.anull.cloud/',
        icon: <Code2 size={22} />,
        accent: '#fcba28',
      },
    ],
  },
  {
    id: 'community',
    category: 'Komunitas & Saluran Loker Bray',
    badge: 'NETWORK',
    accentColor: '#00ff88',
    description: 'Wadah silaturahmi, sharing info loker PT Karawang-Bekasi, tips interview, dan bantuan pencari kerja.',
    alertNote: '⚠️ ATURAN GRUP: Mohon bergabung di SATU grup saja agar kuota member merata. Verifikasi bot otomatis maksimal 1x24 jam.',
    items: [
      {
        id: 'gc-1',
        title: 'Grup WhatsApp Loker Bray 1',
        subtitle: 'Grup diskusi informasi lowongan kerja manufaktur & tips lolos tes recruitment Karawang.',
        url: 'https://chat.whatsapp.com/Kf7eyeg3kcJFTt69HCPhh1',
        icon: <Users size={22} />,
        accent: '#00ff88',
        badge: 'KOMUNITAS WA',
      },
      {
        id: 'gc-2',
        title: 'Grup WhatsApp Loker Bray 2',
        subtitle: 'Ruang interaksi pencari kerja, jadwal tes offline, dan info validasi loker anti-calo.',
        url: 'https://chat.whatsapp.com/FrMMZ3MRF0AFZDPoZSnEH0',
        icon: <Users size={22} />,
        accent: '#00ff88',
        badge: 'KOMUNITAS WA',
      },
      {
        id: 'gc-3',
        title: 'Grup WhatsApp Loker Bray 3',
        subtitle: 'Grup anggota baru, diskusi persiapan wawancara user, dan update link pendaftaran PT.',
        url: 'https://chat.whatsapp.com/CZoXRjchOKwFRCoLPelTsK',
        icon: <Users size={22} />,
        accent: '#00ff88',
        badge: 'KOMUNITAS WA',
      },
      {
        id: 'saluran-wa',
        title: 'Saluran Info Resmi WhatsApp',
        subtitle: 'Pusat broadcast satu arah info loker A1, format lamaran, dan pengumuman mendesak.',
        url: 'https://whatsapp.com/channel/0029Vb8paaO6buMC6R2RoL2T',
        icon: <Megaphone size={22} />,
        accent: '#14b6e5',
        badge: 'BROADCAST 📢',
      },
      {
        id: 'tiktok-loker',
        title: 'TikTok Edukasi Loker Brayy',
        subtitle: '@lokerbrayy.anull.cloud — Video panduan interview, bedah psikotes gambar, dan info kerja.',
        url: 'https://www.tiktok.com/@lokerbrayy.anull.cloud',
        icon: <Music size={22} />,
        accent: '#fcba28',
        badge: 'KONTEN VIDEO 🎬',
      },
    ],
  },
  {
    id: 'anulcopy',
    category: 'Project Anul Copy Centre & Percetakan',
    badge: 'SPECIALITY',
    accentColor: '#fcba28',
    description: 'Jaringan 2 toko fisik fotocopy & percetakan (Jatisari & Cikalongsari) serta rangkaian tools dokumen digital.',
    items: [
      {
        id: 'web-fotocopy',
        title: 'Web Showcase Anul Copy Centre',
        subtitle: 'fotocopy.anull.cloud — Info resmi 2 cabang toko, katalog jasa, perlengkapan ATK, dan kemitraan SIPLah Kemendikbud.',
        url: 'https://fotocopy.anull.cloud/',
        icon: <Printer size={22} />,
        accent: '#00ff88',
        badge: 'TOKO FISIK 🏪',
      },
      {
        id: 'joki-npwp',
        title: 'Jasa Pembuatan NPWP Coretax DJP',
        subtitle: 'Layanan terima beres pendaftaran NPWP resmi Coretax untuk pegawai/melamar kerja + gratis kartu fisik.',
        url: 'https://wa.me/6285718532060?text=Halo%20bray%20mau%20tanya%20jasa%20joki%20NPWP%20Coretax',
        icon: <FileText size={22} />,
        accent: '#fcba28',
        badge: 'TERIMA BERES 📇',
      },
      {
        id: 'auto-ktp',
        title: 'Tools Auto-Cropping KTP 1:1 Scale',
        subtitle: 'Alat bantu otomatis potong dan presisikan skala KTP 1:1 untuk cetak kartu identitas fisik.',
        url: '#',
        icon: <Crop size={22} />,
        accent: '#c084fc',
        badge: 'INTERNAL STUDIO',
        isLocked: true,
      },
      {
        id: 'cetak-foto',
        title: 'Studio Cetak Pas Foto Otomatis',
        subtitle: 'Generator pas foto cepat berbagai ukuran (2x3, 3x4, 4x6) berlatar merah & biru siap cetak.',
        url: '#',
        icon: <ImageIcon size={22} />,
        accent: '#14b6e5',
        badge: 'INTERNAL STUDIO',
        isLocked: true,
      },
      {
        id: 'print-grup',
        title: 'Layanan Print Online Bebas Antre',
        subtitle: 'Kirim file dokumen via WhatsApp, langsung dicetak dan tinggal diambil di kasir toko tanpa antre.',
        url: 'https://wa.me/6289666708050?text=Halo%20Anul%20Copy%20Centre,%20saya%20mau%20kirim%20file%20untuk%20dicetak',
        icon: <Printer size={22} />,
        accent: '#ff3344',
        badge: 'WA DIRECT ⚡',
      },
    ],
  },
];

// --- BrutStack 3-Layer Retro Stack Card Component ---
const BrutRetroCard = ({ item }) => {
  const isLocked = item.isLocked;
  const accent = item.accent || '#14b6e5';

  const cardContent = (
    <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
      {/* Top row: Accent Icon & Badges */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className="flex items-center justify-center w-12 h-12 border-2 border-black text-black shrink-0 shadow-[2px_2px_0_0_#000]"
            style={{ backgroundColor: accent }}
          >
            {item.icon}
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {item.badge && (
              <span className="inline-block px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider border-2 border-black bg-[#f9f4da] text-black shadow-[2px_2px_0_0_#000]">
                {item.badge}
              </span>
            )}
            <div className="p-1 border border-black bg-[#141414] text-[#f9f4da] group-hover:text-black group-hover:bg-[#f9f4da] transition-colors">
              {isLocked ? <AlertTriangle size={15} /> : <ArrowUpRight size={16} />}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-head text-lg sm:text-xl font-bold uppercase tracking-wide text-white group-hover:text-[#fcba28] transition-colors mb-2">
          {item.title}
        </h3>

        {/* Subtitle / Description */}
        <p className="font-sans text-xs sm:text-sm text-[#f9f4da]/80 leading-relaxed">
          {item.subtitle}
        </p>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-5 pt-3 border-t-2 border-black/60 flex items-center justify-between text-xs font-mono font-bold uppercase">
        <span className="text-[#a3a3a3] group-hover:text-[#f9f4da] transition-colors flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
          {isLocked ? 'MODUL INTERNAL' : 'BUKA APLIKASI'}
        </span>
        <span className="text-[#fcba28] group-hover:translate-x-1 transition-transform flex items-center gap-1">
          {isLocked ? 'TERKUNCI' : 'KUNJUNGI'} ➔
        </span>
      </div>
    </div>
  );

  // Locked Card
  if (isLocked) {
    return (
      <div className="relative group h-full w-full opacity-70 cursor-not-allowed">
        <div
          className="pointer-events-none absolute inset-0 z-0 border-2 border-black bs-layer-bottom"
          style={{ backgroundColor: accent }}
        />
        <div className="pointer-events-none absolute inset-0 z-10 border-2 border-black bg-[#f9f4da] bs-layer-middle" />
        <div className="relative z-20 h-full border-2 border-black bg-[#141414]">
          {cardContent}
        </div>
      </div>
    );
  }

  // Active Clickable Card
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={playPop}
      className={`group relative block h-full w-full no-underline transition-transform ${item.isHero ? 'md:col-span-2' : ''}`}
    >
      {/* Bottom Color Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 border-2 border-black bs-layer-bottom"
        style={{ backgroundColor: accent }}
      />
      {/* Middle Vintage Cream Layer */}
      <div className="pointer-events-none absolute inset-0 z-10 border-2 border-black bg-[#f9f4da] bs-layer-middle" />
      {/* Top Content Layer */}
      <div className="relative z-20 h-full border-2 border-black bg-[#141414] overflow-hidden group-hover:border-[#fcba28] transition-colors">
        {item.isHero && item.previewImage && (
          <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-opacity">
            <img src={item.previewImage} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent" />
          </div>
        )}
        <div className="relative z-10 h-full flex flex-col justify-between">
          {cardContent}
        </div>
      </div>
    </a>
  );
};

// --- QR Code Modal Component ---
const BrutQRModal = ({ isOpen, onClose, url, profileData }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm border-2 border-black bg-[#141414] text-[#f9f4da] p-6 shadow-[8px_8px_0_0_#000]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff3333] border border-black inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#fcba28] border border-black inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#00ff88] border border-black inline-block" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider ml-2 text-white">
              SHARE_PROFILE.QR
            </span>
          </div>
          <button
            onClick={() => { playPop(); onClose(); }}
            className="p-1 border-2 border-black bg-[#ff3333] text-black hover:bg-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* QR Canvas Box */}
        <div className="flex flex-col items-center">
          <div className="p-4 bg-white border-2 border-black shadow-[4px_4px_0_0_#000] mb-4">
            <QRCodeCanvas
              value={url || window.location.href}
              size={200}
              bgColor="#ffffff"
              fgColor="#1a1a1a"
              level="H"
            />
          </div>
          <p className="font-head text-base font-bold text-white uppercase text-center">
            {profileData.name}
          </p>
          <p className="font-mono text-xs text-[#00ff88] tracking-widest mt-1">
            {profileData.handle}
          </p>
          <p className="font-sans text-xs text-[#a3a3a3] text-center mt-3">
            Scan barcode ini dengan kamera ponsel untuk langsung membuka profil & semua tautan proyek.
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => { playPop(); onClose(); }}
          className="mt-6 w-full py-2.5 bg-[#f9f4da] text-black font-head font-bold uppercase text-xs tracking-wider border-2 border-black shadow-[3px_3px_0_0_#000] hover:bg-[#fcba28] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
        >
          TUTUP MODAL
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [qrOpen, setQrOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL');
  const [copiedLink, setCopiedLink] = useState(false);
  const [cliTab, setCliTab] = useState('SPECS');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle Share Link
  const handleShare = () => {
    playPop();
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    toast.success('URL bio.anull.cloud berhasil disalin ke clipboard! 📋', {
      position: 'top-center',
      className: 'font-mono text-xs font-bold border-2 border-black shadow-[4px_4px_0_0_#000] bg-[#f9f4da] text-black',
    });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Download VCF Contact Card
  const handleDownloadVCard = () => {
    playPop();
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profileData.name}
ORG:LokerBray & PT Ihara Manufacturing Indonesia
TITLE:${profileData.role}
TEL;TYPE=CELL,VOICE:${profileData.phone}
EMAIL:nullsanz@null.cloud
URL:https://nullsanz.anull.cloud/
NOTE:${profileData.miniResume}
ADR;TYPE=HOME:;;Karawang;Jawa Barat;;Indonesia
END:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Kontak_${profileData.name.replace(/\s+/g, '_')}.vcf`;
    link.click();
    toast.success('File vCard Kontak berhasil diunduh! 📇', {
      position: 'top-center',
      className: 'font-mono text-xs font-bold border-2 border-black shadow-[4px_4px_0_0_#000] bg-[#00ff88] text-black',
    });
  };

  // Filter links based on search & tab
  const filteredCategories = useMemo(() => {
    return linkCategories
      .map((cat) => {
        // Tab filtering
        if (activeTab === 'PORTFOLIO' && cat.id !== 'portfolio') return null;
        if (activeTab === 'COMMUNITY' && cat.id !== 'community') return null;
        if (activeTab === 'ANULCOPY' && cat.id !== 'anulcopy') return null;

        // Search query filtering
        if (!searchQuery.trim()) return cat;

        const q = searchQuery.toLowerCase();
        const matchingItems = cat.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.subtitle.toLowerCase().includes(q) ||
            (item.badge && item.badge.toLowerCase().includes(q))
        );

        if (matchingItems.length === 0) return null;
        return { ...cat, items: matchingItems };
      })
      .filter(Boolean);
  }, [searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f9f4da] bg-brut-grid flex flex-col justify-between selection:bg-[#00ff88] selection:text-black overflow-x-hidden">
      <Toaster />
      <BrutQRModal
        isOpen={qrOpen}
        onClose={() => setQrOpen(false)}
        url="https://bio.anull.cloud/"
        profileData={profileData}
      />

      {/* =========================================================================
          TOP NAVIGATION BAR (BrutStack Navbar)
      ========================================================================== */}
      <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-[#1a1a1a]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-stretch justify-between h-16">
          {/* Brand Logo */}
          <a
            href="#"
            onMouseEnter={playPop}
            className="flex items-center gap-3 no-underline my-auto group"
          >
            <div className="flex items-center justify-center w-9 h-9 border-2 border-black bg-[#00ff88] text-black font-head font-extrabold text-sm shadow-[2px_2px_0_0_#000] group-hover:bg-[#fcba28] transition-colors">
              LH
            </div>
            <div className="flex flex-col">
              <span className="font-head font-bold text-sm sm:text-base text-white tracking-wider uppercase group-hover:text-[#00ff88] transition-colors">
                NULL.CLOUD
              </span>
              <span className="font-mono text-[10px] text-[#00ff88] tracking-widest uppercase hidden xs:inline-block">
                ● BIO LINK STACK
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-stretch divide-x-2 divide-black border-x-2 border-black font-mono text-xs uppercase tracking-wider font-bold">
            <a
              href="#portfolio"
              onMouseEnter={playPop}
              className="flex items-center px-6 hover:text-[#fcba28] hover:bg-[#141414] transition-colors"
            >
              Portofolio
            </a>
            <a
              href="#community"
              onMouseEnter={playPop}
              className="flex items-center px-6 hover:text-[#00ff88] hover:bg-[#141414] transition-colors"
            >
              Komunitas
            </a>
            <a
              href="#anulcopy"
              onMouseEnter={playPop}
              className="flex items-center px-6 hover:text-[#14b6e5] hover:bg-[#141414] transition-colors"
            >
              Anul Copy
            </a>
            <a
              href="#cli-specs"
              onMouseEnter={playPop}
              className="flex items-center px-6 hover:text-[#c084fc] hover:bg-[#141414] transition-colors"
            >
              Developer Specs
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => { playPop(); setQrOpen(true); }}
              title="Tampilkan QR Code"
              className="p-2 sm:px-3 sm:py-2 border-2 border-black bg-[#141414] text-[#f9f4da] hover:bg-[#f9f4da] hover:text-black font-mono text-xs font-bold uppercase shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-1.5"
            >
              <QrCode size={16} />
              <span className="hidden sm:inline">QR CODE</span>
            </button>

            <button
              onClick={handleShare}
              title="Salin Link Bio"
              className="p-2 sm:px-3 sm:py-2 border-2 border-black bg-[#141414] text-[#f9f4da] hover:bg-[#00ff88] hover:text-black font-mono text-xs font-bold uppercase shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-1.5"
            >
              {copiedLink ? <Check size={16} className="text-black" /> : <Share2 size={16} />}
              <span className="hidden sm:inline">{copiedLink ? 'TERSALIN' : 'BAGIKAN'}</span>
            </button>

            <a
              href={`https://wa.me/${profileData.cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playPop}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 border-2 border-black bg-[#14b6e5] text-black font-head font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0_0_#000] hover:bg-[#00bfc2] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <Send size={15} />
              <span className="hidden xs:inline">CHAT WA</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => { playPop(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="lg:hidden p-2 border-2 border-black bg-[#fcba28] text-black shadow-[2px_2px_0_0_#000]"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t-2 border-black bg-[#141414] px-4 py-4 space-y-2 font-mono text-xs uppercase font-bold"
            >
              <a
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 border-2 border-black bg-[#1a1a1a] text-[#f9f4da] hover:bg-[#fcba28] hover:text-black"
              >
                ➔ Portofolio & Web Apps
              </a>
              <a
                href="#community"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 border-2 border-black bg-[#1a1a1a] text-[#f9f4da] hover:bg-[#00ff88] hover:text-black"
              >
                ➔ Komunitas Loker Bray
              </a>
              <a
                href="#anulcopy"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 border-2 border-black bg-[#1a1a1a] text-[#f9f4da] hover:bg-[#14b6e5] hover:text-black"
              >
                ➔ Anul Copy Centre
              </a>
              <a
                href="#cli-specs"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 border-2 border-black bg-[#1a1a1a] text-[#f9f4da] hover:bg-[#c084fc] hover:text-black"
              >
                ➔ Developer Specs & CLI
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          HERO SECTION (BrutStack Hero Style)
      ========================================================================== */}
      <section className="relative w-full pt-10 pb-14 sm:pt-14 sm:pb-20 border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Status & Role Pill */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="font-mono text-xs font-bold uppercase tracking-wider bg-[#14b6e5] text-black px-3.5 py-1.5 border-2 border-black shadow-[2px_2px_0_0_#000]">
              {profileData.titleTag}
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider bg-[#141414] text-[#00ff88] px-3.5 py-1.5 border-2 border-black shadow-[2px_2px_0_0_#000] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              {profileData.statusBadge}
            </span>
          </div>

          {/* Big Uppercase Brutalist Headline */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-head text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-none">
              BUILD. CODE. <span className="text-[#00ff88]">SHIP.</span>
              <br />
              <span className="text-[#fcba28]">LUKMANUL HAKIM</span>
            </h1>

            <p className="font-sans mt-5 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#f9f4da]/90 leading-relaxed font-medium">
              {profileData.role} • {profileData.miniResume}
            </p>
          </div>

          {/* Interactive Profile Card Window (3-Layer Retro Stack) */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="group relative">
              {/* Bottom Layer */}
              <div className="pointer-events-none absolute inset-0 z-0 border-2 border-black bg-[#00ff88] bs-layer-bottom" />
              {/* Middle Layer */}
              <div className="pointer-events-none absolute inset-0 z-10 border-2 border-black bg-[#f9f4da] bs-layer-middle" />
              {/* Top Layer */}
              <div className="relative z-20 border-2 border-black bg-[#141414] p-5 sm:p-7 shadow-none">
                
                {/* Terminal Header Bar */}
                <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff3333] border border-black inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#fcba28] border border-black inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#00ff88] border border-black inline-block" />
                    <span className="font-mono text-xs font-bold text-white tracking-wider ml-2">
                      lukman@null-cloud:~
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#fcba28] font-bold uppercase tracking-wider hidden sm:inline-block">
                    DEV_ENVIRONMENT: ACTIVE
                  </span>
                </div>

                {/* Profile Flex Content */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={profileData.avatarUrl}
                      alt={profileData.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-black object-cover shadow-[4px_4px_0_0_#000]"
                    />
                    <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-[#00ff88] text-black font-mono font-bold text-[10px] border-2 border-black shadow-[2px_2px_0_0_#000]">
                      VERIFIED
                    </div>
                  </div>

                  {/* Terminal Bio Lines */}
                  <div className="flex-1 font-mono text-xs sm:text-[13px] space-y-1.5 text-left w-full">
                    <p className="text-white">
                      <span className="text-[#00ff88] font-bold">$ whoami:</span> {profileData.name} ({profileData.handle})
                    </p>
                    <p className="text-white">
                      <span className="text-[#fcba28] font-bold">$ focus:</span> Fullstack Web, WhatsApp API, AI Integration
                    </p>
                    <p className="text-white">
                      <span className="text-[#14b6e5] font-bold">$ org:</span> Founder LokerBray & IT Multimedia PT Ihara
                    </p>
                    <p className="text-[#a3a3a3]">
                      <span className="text-[#c084fc] font-bold">$ location:</span> {profileData.location}
                    </p>
                    <p className="text-[#00ff88] font-bold pt-1 flex items-center gap-1">
                      <Terminal size={14} /> ready for high-impact software engineering
                      <span className="inline-block w-2 h-4 bg-[#00ff88] bs-caret ml-1" />
                    </p>
                  </div>
                </div>

                {/* Quick CTA Actions inside hero card */}
                <div className="mt-6 pt-4 border-t-2 border-black/80 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <button
                    onClick={handleDownloadVCard}
                    onMouseEnter={playPop}
                    className="px-4 py-2 border-2 border-black bg-[#f9f4da] text-black font-head font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0_0_#000] hover:bg-[#fcba28] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-1.5"
                  >
                    <Download size={15} /> SIMPAN KONTAK (VCARD)
                  </button>

                  <a
                    href="#portfolio"
                    onMouseEnter={playPop}
                    className="px-4 py-2 border-2 border-black bg-[#00ff88] text-black font-head font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0_0_#000] hover:bg-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-1.5"
                  >
                    JELAJAHI PORTOFOLIO ➔
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* Social Channels Ribbon (Brutalist Divided Bar) */}
          <div className="mt-12 max-w-4xl mx-auto">
            <p className="font-mono text-center text-xs font-bold uppercase tracking-widest text-[#a3a3a3] mb-4">
              CONNECT VIA OFFICIAL SOCIAL NETWORKS
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border-2 border-black divide-x-2 divide-y-2 sm:divide-y-0 divide-black bg-[#141414] shadow-[6px_6px_0_0_#000]">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playPop}
                  className="p-3 sm:p-4 flex flex-col items-center justify-center text-center group hover:bg-[#1a1a1a] transition-colors no-underline"
                >
                  <div
                    className="p-2 border-2 border-black text-black mb-1.5 shadow-[2px_2px_0_0_#000] group-hover:rotate-6 transition-transform"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.icon}
                  </div>
                  <span className="font-head text-xs font-bold uppercase text-white group-hover:text-[#fcba28]">
                    {s.title}
                  </span>
                  <span className="font-mono text-[10px] text-[#a3a3a3] truncate max-w-full">
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          KEY STATS TICKER (BrutStack Stats Section)
      ========================================================================== */}
      <section className="w-full bg-[#141414] border-b-2 border-black py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 border-2 border-black divide-x-2 divide-y-2 md:divide-y-0 divide-black bg-[#1a1a1a] shadow-[6px_6px_0_0_#000]">
            {stats.map((st, idx) => (
              <div key={idx} className="p-4 sm:p-6 text-center group hover:bg-[#141414] transition-colors">
                <p className="font-head text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#00ff88] transition-colors">
                  {st.val}
                </p>
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#fcba28] mt-1">
                  {st.label}
                </p>
                <p className="font-sans text-xs text-[#a3a3a3] mt-0.5">
                  {st.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN SEARCH & FILTER CONTROLS
      ========================================================================== */}
      <section className="w-full pt-12 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input Box */}
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Cari tautan, portofolio, tools, atau grup..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-[#f9f4da] text-black font-mono text-xs sm:text-sm font-bold border-2 border-black shadow-[4px_4px_0_0_#000] focus:outline-none focus:bg-[#fcba28] transition-all placeholder:text-neutral-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-black hover:text-red-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 font-mono text-xs font-bold uppercase scrollbar-none">
              {[
                { id: 'ALL', label: 'SEMUA LINK' },
                { id: 'PORTFOLIO', label: 'PORTOFOLIO' },
                { id: 'COMMUNITY', label: 'LOKER BRAY' },
                { id: 'ANULCOPY', label: 'ANUL COPY' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { playPop(); setActiveTab(tab.id); }}
                  className={`px-3 py-2 border-2 border-black shrink-0 transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#00ff88] text-black shadow-[3px_3px_0_0_#000] -translate-y-0.5'
                      : 'bg-[#141414] text-[#f9f4da] hover:bg-[#f9f4da] hover:text-black shadow-[2px_2px_0_0_#000]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          DYNAMIC LINK CATEGORIES SECTIONS (BrutStack Bento Grid)
      ========================================================================== */}
      <main className="w-full space-y-16 pb-20">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
            >
              {/* Section Header */}
              <div className="flex flex-col items-start mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 border-2 border-black text-black shadow-[2px_2px_0_0_#000]"
                    style={{ backgroundColor: section.accentColor }}
                  >
                    {section.badge}
                  </span>
                  <div className="h-0.5 w-12 bg-black" />
                </div>

                <h2 className="font-head text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white">
                  {section.category}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#a3a3a3] max-w-2xl mt-1">
                  {section.description}
                </p>

                {/* Important Group Alert Notice */}
                {section.alertNote && (
                  <div className="mt-4 w-full p-4 border-2 border-black bg-[#fcba28] text-black font-mono text-xs sm:text-sm font-bold shadow-[4px_4px_0_0_#000] flex items-start gap-3">
                    <AlertTriangle size={20} className="shrink-0 mt-0.5 text-black" />
                    <p className="leading-relaxed">{section.alertNote}</p>
                  </div>
                )}
              </div>

              {/* Cards Grid using BrutStack 3-Layer Retro Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {section.items.map((item) => (
                  <BrutRetroCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="max-w-md mx-auto text-center py-16 px-4 border-2 border-black bg-[#141414] shadow-[6px_6px_0_0_#000]">
            <Search size={40} className="mx-auto mb-3 text-[#fcba28]" />
            <h3 className="font-head text-lg font-bold uppercase text-white">
              Tautan Tidak Ditemukan
            </h3>
            <p className="font-sans text-xs text-[#a3a3a3] mt-1 mb-4">
              Tidak ada link yang sesuai dengan kata kunci "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab('ALL'); }}
              className="px-4 py-2 border-2 border-black bg-[#00ff88] text-black font-mono text-xs font-bold uppercase shadow-[2px_2px_0_0_#000]"
            >
              RESET PENCARIAN
            </button>
          </div>
        )}

        {/* =========================================================================
            DEVELOPER SPECS & TERMINAL SECTION (BrutStack Section 3 Style)
        ========================================================================== */}
        <section id="cli-specs" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 scroll-mt-24">
          <div className="flex flex-col items-start mb-6">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 border-2 border-black bg-[#c084fc] text-black shadow-[2px_2px_0_0_#000] mb-2">
              DEVELOPER EXPERIENCE
            </span>
            <h2 className="font-head text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white">
              INTEGRATION & DEVELOPER SPECS
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#a3a3a3] max-w-xl mt-1">
              Informasi arsitektur sistem, stack teknologi aktif, dan perintah curl kontak untuk integrasi cepat.
            </p>
          </div>

          <div className="border-2 border-black shadow-[8px_8px_0_0_#000] bg-[#0e0e0e] overflow-hidden">
            {/* Terminal Top Navigation Bar */}
            <div className="flex items-center justify-between border-b-2 border-black px-4 py-3 bg-[#141414]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff3333] border border-black inline-block" />
                <span className="h-3 w-3 rounded-full bg-[#fcba28] border border-black inline-block" />
                <span className="h-3 w-3 rounded-full bg-[#00ff88] border border-black inline-block" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white ml-2">
                  NULL_STACK_CLI.SH
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 font-mono text-[11px] font-bold">
                {[
                  { id: 'SPECS', label: 'TECH SPECS' },
                  { id: 'CURL', label: 'CURL API' },
                  { id: 'VCARD', label: 'VCARD DATA' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { playPop(); setCliTab(t.id); }}
                    className={`px-3 py-1 border-2 border-black transition-colors ${
                      cliTab === t.id
                        ? 'bg-[#f9f4da] text-black'
                        : 'bg-transparent text-[#a3a3a3] hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Body Content */}
            <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm text-[#f9f4da] overflow-x-auto">
              {cliTab === 'SPECS' && (
                <div className="space-y-2">
                  <p className="text-[#a3a3a3]"># Arsitektur & Lingkungan Pengembangan Nullsanz:</p>
                  <p><span className="text-[#00ff88]">CORE_FRONTEND:</span> React 19 • Vite 7 • Tailwind CSS v4 • Framer Motion</p>
                  <p><span className="text-[#fcba28]">BACKEND_STACK:</span> Node.js 22 LTS • Baileys Multi-Device WA • Firebase RTDB</p>
                  <p><span className="text-[#14b6e5]">AI_CASCADE:</span> Gemini 3.5 Flash-Lite & 3.8 Flash • RAG lokerKnowledge</p>
                  <p><span className="text-[#c084fc]">INFRASTRUCTURE:</span> Linux VPS (103.169.207.132) • PM2 Services • Vercel Edge</p>
                  <p><span className="text-[#ff3344]">MEDIA_ENGINE:</span> FFmpeg 7.1 • HLG 10-Bit HDR • WASM Document Processing</p>
                </div>
              )}

              {cliTab === 'CURL' && (
                <div className="space-y-3">
                  <p className="text-[#a3a3a3]"># Salin curl untuk ping profil dan endpoint vCard langsung:</p>
                  <div className="p-3 bg-[#141414] border border-black flex items-center justify-between text-[#00ff88] text-xs">
                    <code>curl -s https://bio.anull.cloud/ -H "User-Agent: NullStack/1.0"</code>
                    <button
                      onClick={() => {
                        playPop();
                        navigator.clipboard.writeText('curl -s https://bio.anull.cloud/ -H "User-Agent: NullStack/1.0"');
                        toast.success('Curl command disalin!');
                      }}
                      className="p-1 hover:text-white"
                      title="Salin curl"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                  <p className="text-[#fcba28] text-xs">➔ Response: HTTP 200 OK • Status: Available for Projects</p>
                </div>
              )}

              {cliTab === 'VCARD' && (
                <div className="space-y-1 text-xs text-[#a3a3a3]">
                  <p className="text-[#00ff88]">BEGIN:VCARD</p>
                  <p>VERSION:3.0</p>
                  <p>FN:Lukmanul Hakim</p>
                  <p>TITLE:Founder LokerBray & IT Multimedia PT Ihara</p>
                  <p>TEL;TYPE=CELL:+6285718532060</p>
                  <p>URL:https://nullsanz.anull.cloud/</p>
                  <p className="text-[#00ff88]">END:VCARD</p>
                </div>
              )}
            </div>

            {/* Terminal Footer */}
            <div className="px-4 py-2 border-t-2 border-black bg-[#141414] flex items-center justify-between font-mono text-[11px] text-[#a3a3a3]">
              <span>STATUS: PRODUCTION_READY</span>
              <span className="text-[#00ff88] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] inline-block" /> ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* =========================================================================
          FOOTER (BrutStack 3-Column Grid Footer)
      ========================================================================== */}
      <footer className="w-full border-t-2 border-black bg-[#141414] text-[#f9f4da]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border-2 border-black bg-[#00ff88] text-black font-head font-extrabold text-base flex items-center justify-center shadow-[2px_2px_0_0_#000]">
                  LH
                </div>
                <div>
                  <h3 className="font-head text-xl font-bold uppercase text-white">
                    LUKMANUL HAKIM
                  </h3>
                  <p className="font-mono text-xs text-[#00ff88] tracking-wider">
                    @NULL.CLOUD • LOKERBRAY
                  </p>
                </div>
              </div>
              
              <div className="h-1.5 w-16 bg-[#fcba28] mb-4" />
              
              <p className="font-sans text-xs sm:text-sm text-[#a3a3a3] leading-relaxed">
                Membangun platform digital, solusi otomatisasi WhatsApp, dan sistem bantuan pencari kerja yang transparan, mudah diakses, dan bermanfaat bagi masyarakat.
              </p>
            </div>

            <div className="mt-8 font-mono text-[11px] text-[#737373]">
              © {new Date().getFullYear()} NULL.CLOUD • ALL RIGHTS RESERVED.
            </div>
          </div>

          {/* Col 2: Navigation Index */}
          <div className="p-8 sm:p-10">
            <span className="inline-block px-3 py-1 border-2 border-black bg-[#f9f4da] text-black font-head font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0_0_#000] mb-6">
              SITEMAP & TAUTAN
            </span>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs uppercase font-bold">
              <a href="#portfolio" className="hover:text-[#00ff88] transition-colors py-1">➔ Portofolio</a>
              <a href="#community" className="hover:text-[#fcba28] transition-colors py-1">➔ Komunitas</a>
              <a href="#anulcopy" className="hover:text-[#14b6e5] transition-colors py-1">➔ Anul Copy</a>
              <a href="#cli-specs" className="hover:text-[#c084fc] transition-colors py-1">➔ CLI Specs</a>
              <a href="https://wa.me/6285718532060" target="_blank" rel="noreferrer" className="hover:text-[#00ff88] transition-colors py-1">➔ WhatsApp</a>
              <a href="https://github.com/nullsanz" target="_blank" rel="noreferrer" className="hover:text-white transition-colors py-1">➔ GitHub</a>
            </div>

            <div className="mt-8 p-3 border-2 border-black bg-[#1a1a1a] shadow-[3px_3px_0_0_#000]">
              <p className="font-mono text-[11px] text-[#fcba28] font-bold uppercase mb-1">
                📍 LOKASI KANTOR / BASE:
              </p>
              <p className="font-sans text-xs text-[#a3a3a3]">
                Karawang, Jawa Barat — Indonesia
              </p>
            </div>
          </div>

          {/* Col 3: Direct Actions & Back to Top */}
          <div className="p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 border-2 border-black bg-[#14b6e5] text-black font-head font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0_0_#000] mb-6">
                QUICK ACCESS
              </span>

              <p className="font-sans text-xs text-[#a3a3a3] mb-4">
                Ada tawaran kolaborasi proyek, pertanyaan loker, atau kerjasama percetakan? Hubungi langsung:
              </p>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/${profileData.cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playPop}
                  className="w-full py-2.5 px-4 border-2 border-black bg-[#00ff88] text-black font-head font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0_0_#000] hover:bg-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 no-underline"
                >
                  <MessageCircle size={16} /> CHAT LANGSUNG WHATSAPP
                </a>

                <button
                  onClick={handleDownloadVCard}
                  onMouseEnter={playPop}
                  className="w-full py-2.5 px-4 border-2 border-black bg-[#f9f4da] text-black font-head font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0_0_#000] hover:bg-[#fcba28] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <Download size={16} /> SIMPAN VCARD KE HP
                </button>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t-2 border-black/80 flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#a3a3a3]">
                bio.anull.cloud
              </span>
              <button
                onClick={() => { playPop(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="font-mono text-xs font-bold uppercase text-[#00ff88] hover:underline flex items-center gap-1"
              >
                KEMBALI KE ATAS ↑
              </button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

import React, { useEffect ,useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Download, Shield, Terminal, Network, Wrench, Layers, Cpu, Globe, Link as LinkIcon, Sun, Moon, ExternalLink, MapPin, Calendar } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// ==== Minimal UI primitives (tanpa TypeScript & tanpa shadcn) ====
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Button({ variant = "default", size = "default", className = "", children, ...props }) {
  const base = "inline-flex items-center justify-center rounded-2xl font-medium transition border";
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700 border-transparent",
    secondary: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200/60 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700",
    ghost: "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border-transparent",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    icon: "h-10 w-10 p-0",
  };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

function Card({ className = "", children }) {
  return (
    <div className={cn("rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm", className)}>
      {children}
    </div>
  );
}
function CardContent({ className = "", children }) {
  return <div className={cn("p-4", className)}>{children}</div>;
}
function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm",
        "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
        className
      )}
      {...props}
    />
  );
}
function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm",
        "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
        className
      )}
      {...props}
    />
  );
}
function Badge({ children, className = "", variant = "secondary" }) {
  const variants = {
    secondary: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700",
    outline: "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200",
  };
  return (
    <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs", variants[variant], className)}>
      {children}
    </span>
  );
}

// ====== DATA (Edit di sini) ======
const PROFILE = {
  name: "Azizil Putra",
  role: "Cyber Security & Web Developer",
  location: "Surakarta, Indonesia",
  summary:
    "Mahasiswa TI dengan fokus Blue Team dan minat kuat pada SOC analysis, Wireshark, dan NIPS. Berpengalaman sebagai IT Support, sedang mengerjakan sistem informasi akademik berbasis Laravel, dan suka menulis review film.",
  email: "azizilansarinaputra@gmail.com",
  phone: "+62 851-7969-6211",
  linkedin: "https://www.linkedin.com/in/azizilansarinaputra",
  github: "https://github.com/mas-ajil",
  cvUrl: "#", // 
};

const SKILLS = [
  { name: "Wireshark", level: 85 },
  { name: "Linux/Kali", level: 80 },
  { name: "NIPS/Suricata", level: 75 },
  { name: "Networking", level: 78 },
  { name: "React.js", level: 70 },
  { name: "Laravel", level: 72 },
  { name: "Docker", level: 60 },
];

const STACK = [
  "React", "Tailwind", "JavaScript", "Framer Motion", "Laravel", "MySQL", "MikroTik", "VirtualBox", "Ubuntu", "Git/GitHub"
];

const PROJECTS = [
  {
    title: "Sistem Informasi Akademik – Orang Tua SD N 1 Banjarmangu",
    period: "2025",
    tags: ["Laravel", "MySQL", "Tailwind"],
    description:
      "Aplikasi web untuk memantau nilai, absensi, dan pengumuman. Fokus di UX sederhana untuk orang tua siswa.",
    links: [{ label: "Demo", href: "#" }, { label: "Repo", href: "#" }],
  },
  {
    title: "NIPS Inline – Deteksi Anomali Win Ori vs Win Crack",
    period: "2025",
    tags: ["Suricata", "Linux", "Bridge"],
    description:
      "Eksperimen deteksi anomali jaringan menggunakan NIPS (AF-PACKET/bridge), membandingkan trafik 2 host Windows.",
    links: [{ label: "Paper", href: "#" }],
  },
  {
    title: "Blog Review Film",
    period: "2024–sekarang",
    tags: ["Content", "SEO", "Next.js"],
    description:
      "Menulis ulasan film mingguan, melatih kemampuan analisis dan penulisan.",
    links: [{ label: "Kunjungi", href: "#" }],
  },
];

const EXPERIENCE = [
  {
    role: "IT Support (Magang)",
    company: "Tribunnews",
    period: "2024–2025",
    points: [
      "Troubleshooting jaringan & perangkat (Windows/Office).",
      "Membantu monitoring jaringan kantor dan dokumentasi aset.",
      "Mendukung tim editorial dalam isu teknis harian.",
    ],
  },
  {
    role: "Freelance Tech Helper",
    company: "Self-employed",
    period: "2023–sekarang",
    points: [
      "Pasang & konfigurasi router, switch, dan basic MikroTik.",
      "Instalasi sistem operasi, partisi, dan backup data.",
    ],
  },
];

const CERTS = [
  { name: "Studi Independen – Cyber Blue Team", year: "2024" },
  { name: "Network Fundamentals (self-paced)", year: "2023" },
];

const CONTACT_PLACEHOLDER = {
  subject: "Tertarik berkolaborasi",
  message:
    "Halo Azizil, saya tertarik dengan proyek SOC/NIPS kamu. Yuk jadwalkan diskusi minggu ini!",
};

// ====== UI ======
function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-xl bg-indigo-500/10">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h2 className="text-xl font-semibold leading-tight">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </div>
    </div>
  );
}

function Header({ onToggleTheme, theme, activeSection, onNavClick }) {
  const items = [
    { id: "home", label: "home" },
    { id: "about", label: "Tentang" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Proyek" },
    { id: "experience", label: "Pengalaman" },
    { id: "contact", label: "Kontak" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-950/70 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="font-bold tracking-tight">Azizil Putra</a>

        <nav className="hidden md:flex items-center gap-2 text-sm relative">
          {items.map((it) => {
            const isActive = activeSection === it.id;
            return (
              <button
                key={it.id}
                onClick={() => onNavClick(`#${it.id}`)}
                className="relative px-3 py-2 rounded-lg hover:text-indigo-600 transition"
              >
                {it.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ background: "rgba(99,102,241,0.12)" }} // indigo-500/12
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
          <a href={PROFILE.cvUrl} target="_blank" rel="noreferrer">
            <Button className="gap-2" variant="default">
              <Download className="w-4 h-4" /> CV
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}


export default function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("about");
  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  const onNavClick = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // opsional: update active cepat
    const id = hash.replace("#", "");
    setActiveSection(id);
  };

  React.useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "experience", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // ambil entry paling terlihat
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      {
        rootMargin: "0% 0px 0% 0px", // fokus di bagian atas viewport
        threshold: [0.2, 0.6, 1],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 scroll-smooth">
      <Header onToggleTheme={toggleTheme} theme={theme} activeSection={activeSection} onNavClick={onNavClick} />

      {/* HERO */}
      <section id="home" className="max-w-6xl mx-auto px-4 pt-16 pb-12 scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
        
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 mb-4">
              <Shield className="w-3.5 h-3.5" /> Blue Team Enthusiast
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {PROFILE.role}
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {PROFILE.summary}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <a href={PROFILE.github} target="_blank" rel="noreferrer"><Button variant="secondary" className="gap-2"><Github className="w-4 h-4"/>GitHub</Button></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Button variant="secondary" className="gap-2"><Linkedin className="w-4 h-4"/>LinkedIn</Button></a>
              <a href="#contact"><Button className="gap-2"><Mail className="w-4 h-4"/>Kontak</Button></a>
            </div>
            <div className="flex items-center gap-4 mt-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4"/>{PROFILE.location}</span>
              <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4"/>Available for internship / part-time</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-indigo-500/20 via-transparent to-indigo-500/20 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 p-6 w-full">
                    {[
                      { icon: Terminal, label: "SOC" },
                      { icon: Network, label: "Network" },
                      { icon: Wrench, label: "Troubleshoot" },
                      { icon: Layers, label: "React" },
                      { icon: Cpu, label: "NIPS" },
                      { icon: Globe, label: "Web" },
                    ].map((item, i) => (
                      <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-center bg-white/60 dark:bg-gray-900/60 backdrop-blur">
                        <item.icon className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-10">
        <SectionTitle icon={Shield} title="Tentang Saya" subtitle="Ringkas, jelas, dan relevan" />
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardContent className="p-6 space-y-4 leading-relaxed">
              <p>
                Saya berkuliah di Teknik Informatika dan fokus pada jalur Blue Team. Saya tertarik menjadi SOC Analyst,
                memperdalam teknik analisis paket dengan Wireshark, serta membangun dan menguji NIPS berbasis Suricata.
              </p>
              <p>
                Di sisi lain, saya mengerjakan proyek web menggunakan React & Laravel, dan sesekali menulis ulasan film untuk melatih struktur berpikir.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {STACK.map((s) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-10">
        <SectionTitle icon={Cpu} title="Skills" subtitle="Overview kemampuan (0–100)" />
        <Card>
          <CardContent className="p-6">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SKILLS}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={60} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="level" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-10">
        <SectionTitle icon={Layers} title="Proyek Terpilih" subtitle="Beberapa karya terakhir" />
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, idx) => (
            <Card key={idx} className="group">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold leading-tight">{p.title}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{p.period}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  {p.links?.map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm hover:underline">
                      <LinkIcon className="w-4 h-4" /> {l.label}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* EXPERIENCE & CERTS */}
      <section id="experience" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-10">
        <SectionTitle icon={Terminal} title="Pengalaman" subtitle="Riwayat singkat pekerjaan/magang" />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {EXPERIENCE.map((e, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold leading-tight">{e.role} – {e.company}</h3>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{e.period}</span>
                  </div>
                  <ul className="mt-3 list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-300">
                    {e.points.map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Sertifikat</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {CERTS.map((c, k) => (
                    <li key={k} className="flex items-center justify-between">
                      <span>{c.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{c.year}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-10">
        <SectionTitle icon={Mail} title="Kontak" subtitle="Ayo ngobrol atau kolaborasi" />
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardContent className="p-6 space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <Input placeholder="Nama" />
                <Input placeholder="Email" type="email" defaultValue={PROFILE.email} />
              </div>
              <Input placeholder="Subjek" defaultValue={CONTACT_PLACEHOLDER.subject} />
              <Textarea rows={6} placeholder="Pesan" defaultValue={CONTACT_PLACEHOLDER.message} />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Form ini demo (non-aktif). Hubungi saya via email/LinkedIn.</p>
                <Button>Kirim</Button>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-3">
                <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-2 hover:underline"><Mail className="w-4 h-4"/>{PROFILE.email}</a>
                <a href={`tel:${PROFILE.phone}`} className="flex items-center gap-2 hover:underline"><Phone className="w-4 h-4"/>{PROFILE.phone}</a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><Linkedin className="w-4 h-4"/>LinkedIn</a>
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><Github className="w-4 h-4"/>GitHub</a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-500 dark:text-gray-400 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {PROFILE.name}. Dibuat dengan React, Tailwind, Framer Motion, dan Recharts.</p>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:underline">Kembali ke atas</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

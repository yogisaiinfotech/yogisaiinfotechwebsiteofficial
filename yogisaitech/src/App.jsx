import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Menu, X, Monitor, PanelsTopLeft, PenTool,
  Printer, Code2, Palette, Check, MapPin, Phone, Mail, MessageCircle,
  Sparkles, Globe2, Layers3, Smartphone, Database, Receipt, Boxes,
  Calculator, KeyRound, FileSignature, FileCheck, Briefcase, Landmark,
  Award, ShieldCheck, CheckCircle2, Copy, Camera, BookOpen, Contact,
  Image as ImageIcon
} from "lucide-react";
import { companyInfo, content, services, projects } from "./data/content";

const iconMap = {
  database: Database,
  receipt: Receipt,
  boxes: Boxes,
  calculator: Calculator,
  monitor: Monitor,
  panels: PanelsTopLeft,
  "key-round": KeyRound,
  "file-signature": FileSignature,
  "file-check": FileCheck,
  code: Code2,
  briefcase: Briefcase,
  landmark: Landmark,
  award: Award,
  "shield-check": ShieldCheck,
  camera: Camera,
  "pen-tool": PenTool,
  "book-open": BookOpen,
  contact: Contact,
  image: ImageIcon,
  printer: Printer
};

const waLink = (message) =>
  `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(message)}`;

// Professional Official Brand Logo Component
export function BrandLogo({ light = false, compact = false }) {
  return (
    <a
      href="#home"
      className={`brand-container ${light ? "light-mode" : "dark-mode"}`}
      aria-label="YogisaiInfotech Home"
    >
      <img
        src="/brand-logo.png"
        alt="YogisaiInfotech - IT Solutions, Digital Signature, Compliance, Creative"
        className="brand-logo-img"
      />
    </a>
  );
}

function SectionHeading({ label, title, text, light = false }) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`}>
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceFilter, setServiceFilter] = useState("all");
  const [workFilter, setWorkFilter] = useState("All");
  const [copiedText, setCopiedText] = useState("");
  const [submissionFeedback, setSubmissionFeedback] = useState("");
  const [form, setForm] = useState({ name: "", mobile: "", email: "", service: "", message: "" });

  const t = content[lang];
  const navIds = ["home", "about", "services", "work", "contact"];

  const serviceCategories = [
    { id: "all", label: t.categoryTabs.all },
    { id: "tech", label: t.categoryTabs.tech },
    { id: "digital-sign", label: t.categoryTabs["digital-sign"] },
    { id: "compliance", label: t.categoryTabs.compliance },
    { id: "creative", label: t.categoryTabs.creative }
  ];

  const visibleServices = useMemo(() => {
    if (serviceFilter === "all") return services;
    return services.filter((s) => s.group === serviceFilter);
  }, [serviceFilter]);

  const visibleProjects = useMemo(() => {
    if (workFilter === "All" || workFilter === t.all) return projects;
    return projects.filter((p) => p.category === workFilter);
  }, [workFilter, t.all]);

  const serviceMessage = (name) =>
    `Hello YogisaiInfotech, I would like to know more about ${name}.`;

  const submitForm = (e) => {
    if (e) e.preventDefault();
    if (!form.name || !form.mobile || !form.email || !form.service || !form.message) {
      alert("Please fill in all required fields.");
      return;
    }
    const msg = `Hello YogisaiInfotech!\nName: ${form.name}\nMobile: ${form.mobile}\nEmail: ${form.email}\nService: ${form.service}\nDetails: ${form.message}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSubmissionFeedback("whatsapp");
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <div className="site-shell">
      {/* Top Notification & Quick Contact Bar with Moveable Ticker */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-badge">Verified IT, Compliance & Studio</span>
            <div className="top-ticker" title="Services Ticker - Hover to pause">
              <div className="top-ticker-track">
                <span className="ticker-text">
                  ERP Solutions • Invoicing Software • Inventory • Payroll • Websites & Web Apps • Class 3 Digital Signatures (DSC) • PDF Signer Software • Auto PDF Signer • PDF Signer API • e-Tender Filing & Training • GeM Registration • ISO Certification • Trademark Registration • Logo, Brochure, Visiting Card, Banner & Flex Design •
                </span>
                <span className="ticker-text" aria-hidden="true">
                  ERP Solutions • Invoicing Software • Inventory • Payroll • Websites & Web Apps • Class 3 Digital Signatures (DSC) • PDF Signer Software • Auto PDF Signer • PDF Signer API • e-Tender Filing & Training • GeM Registration • ISO Certification • Trademark Registration • Logo, Brochure, Visiting Card, Banner & Flex Design •
                </span>
              </div>
            </div>
          </div>
          <div className="top-bar-right">
            <a href={companyInfo.websiteUrl} target="_blank" rel="noreferrer" className="top-contact-link">
              <Globe2 size={13} />
              <span>{companyInfo.website}</span>
            </a>
            <span className="top-sep">|</span>
            <a href={`tel:${companyInfo.rawPhones[0]}`} className="top-contact-link">
              <Phone size={13} />
              <span>{companyInfo.phones[0]}</span>
            </a>
            <span className="top-sep">|</span>
            <a href={`tel:${companyInfo.rawPhones[1]}`} className="top-contact-link">
              <Phone size={13} />
              <span>{companyInfo.phones[1]}</span>
            </a>
            <span className="top-sep">|</span>
            <a href={`mailto:${companyInfo.email}`} className="top-contact-link">
              <Mail size={13} />
              <span>{companyInfo.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header">
        <div className="container nav-wrap">
          <BrandLogo />

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            {t.nav.map((label, i) => (
              <a
                key={navIds[i]}
                href={`#${navIds[i]}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              className="nav-cta"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              {t.contact} <ArrowUpRight size={16} />
            </a>
          </nav>

          <div className="nav-actions">
            <button
              className="lang-toggle"
              onClick={() => setLang(lang === "en" ? "ta" : "en")}
              aria-label="Change language"
            >
              <Globe2 size={14} />
              <span>{lang === "en" ? "தமிழ்" : "English"}</span>
            </button>

            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="container hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="hero-kicker">
                <span className="pulse-dot" />
                {t.eyebrow}
              </div>
              <h1>
                {t.heroTitle} <span>{t.heroAccent}</span>
              </h1>
              <p className="hero-description">{t.heroText}</p>

              <div className="hero-buttons">
                <a className="button button-primary" href="#services">
                  {t.explore} <ArrowRight size={18} />
                </a>
                <a className="button button-ghost" href="#contact">
                  {t.contact} <ArrowUpRight size={18} />
                </a>
                <a
                  className="button button-whatsapp"
                  href={waLink("Hello YogisaiInfotech, I would like to enquire about your services.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={17} /> WhatsApp
                </a>
              </div>

              <div className="hero-proof">
                <div className="proof-icon">
                  <Sparkles size={17} />
                </div>
                <span>{t.trusted}</span>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="visual-backdrop" />
              <div className="visual-main">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=90"
                  alt="Modern enterprise technology and creative solutions"
                />
                <div className="visual-overlay">
                  <span>ENTERPRISE, COMPLIANCE & CREATIVE</span>
                  <strong>Innovate. Secure. Create.</strong>
                </div>
              </div>

              {/* Floating badges */}
              <div className="floating-card card-code">
                <span className="float-icon blue">
                  <Database size={18} />
                </span>
                <div>
                  <b>ERP, Invoicing & Websites</b>
                  <small>Automated & GST Compliant</small>
                </div>
              </div>

              <div className="floating-card card-design">
                <span className="float-icon purple">
                  <KeyRound size={18} />
                </span>
                <div>
                  <b>Class 3 DSC & Auto PDF Signer</b>
                  <small>Secure & Paperless Signing</small>
                </div>
              </div>

              <div className="floating-card card-compliance">
                <span className="float-icon green">
                  <Palette size={18} />
                </span>
                <div>
                  <b>Creative Studio & Branding</b>
                  <small>Logo, Brochures & Flex Print</small>
                </div>
              </div>

              <div className="visual-sticker">
                <Sparkles size={18} />
                <span>YSI</span>
              </div>
            </motion.div>
          </div>

          <div className="container hero-bottom">
            <span>{t.scroll}</span>
            <span className="scroll-line" />
          </div>
        </section>

        {/* 4 Strategic Pillars Section */}
        <section className="intro section-pad">
          <div className="container">
            <div className="intro-top">
              <span className="eyebrow">{t.trusted}</span>
              <span className="intro-line" />
            </div>

            <SectionHeading title={t.introTitle} text={t.introText} />

            <div className="division-grid-four">
              {t.divisions.map((div, idx) => (
                <motion.a
                  key={div.tag}
                  whileHover={{ y: -7 }}
                  href="#services"
                  className={`division-card pillar-card-${idx}`}
                >
                  <div className="division-icon">
                    {idx === 0 && <Database size={24} />}
                    {idx === 1 && <KeyRound size={24} />}
                    {idx === 2 && <Award size={24} />}
                    {idx === 3 && <Camera size={24} />}
                  </div>
                  <span className="division-tag">{div.tag}</span>
                  <h3>{div.title}</h3>
                  <p>{div.desc}</p>
                  <span className="division-arrow">
                    <ArrowUpRight size={18} />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section with Category Filters */}
        <section className="services-section section-pad" id="services">
          <div className="container">
            <SectionHeading
              label={t.servicesLabel}
              title={t.servicesTitle}
              text={t.servicesText}
            />

            {/* Service Category Tabs */}
            <div className="service-tabs-row">
              {serviceCategories.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setServiceFilter(tab.id)}
                  className={`service-tab ${serviceFilter === tab.id ? "active" : ""}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Service Grid - All 20 Services */}
            <div className="services-grid">
              {visibleServices.map((s, i) => {
                const Icon = iconMap[s.icon] || Sparkles;
                const serviceTitle = t.serviceNames[s.id];
                const serviceDesc = t.serviceDescs[s.id];

                return (
                  <motion.article
                    className="service-card"
                    key={s.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 6) * 0.04 }}
                  >
                    <div className="service-card-header">
                      <div className={`service-icon group-${s.group}`}>
                        <Icon size={22} />
                      </div>
                      <span className="service-badge">{s.badge}</span>
                    </div>

                    <h3>{serviceTitle}</h3>
                    <p>{serviceDesc}</p>

                    <div className="service-card-footer">
                      <a
                        href={waLink(serviceMessage(serviceTitle))}
                        target="_blank"
                        rel="noreferrer"
                        className="text-link"
                      >
                        {t.learnMore} <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section section-pad" id="about">
          <div className="container about-grid">
            <div className="about-visual">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85"
                alt="YogisaiInfotech team planning and delivering technology and creative solutions"
              />
              <div className="about-stamp">
                <span>YSI</span>
                <small>INNOVATE • SECURE • CREATE</small>
              </div>
              <div className="about-note">
                <CheckCircle2 size={19} />
                <span>Authorized IT, DSC & Creative Solutions</span>
              </div>
            </div>

            <div className="about-copy">
              <SectionHeading
                label={t.aboutLabel}
                title={t.aboutTitle}
                text={t.aboutText}
              />
              <ul className="check-list">
                {t.aboutPoints.map((p) => (
                  <li key={p}>
                    <span>
                      <Check size={15} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="about-actions">
                <a className="button button-dark" href="#contact">
                  {t.aboutButton} <ArrowRight size={17} />
                </a>
                <a
                  className="button button-ghost-dark"
                  href={`tel:${companyInfo.rawPhones[0]}`}
                >
                  <Phone size={16} /> {companyInfo.phones[0]}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio / Proven Impact Section */}
        <section className="work-section section-pad" id="work">
          <div className="container">
            <SectionHeading
              label={t.workLabel}
              title={t.workTitle}
              text={t.workText}
            />

            <div className="filter-row">
              {t.filterCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setWorkFilter(c)}
                  className={workFilter === c ? "filter active" : "filter"}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="portfolio-grid">
              {visibleProjects.map((p, i) => (
                <motion.article layout key={p.title} className="project-card">
                  <div className="project-image">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        // Safe fallback image if primary URL fails
                        e.currentTarget.src = "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=85";
                      }}
                    />
                    <span className="project-open">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <div className="project-info">
                    <div>
                      <span className="project-category">{p.category}</span>
                      <h3>{p.title}</h3>
                      <p className="project-desc">{p.desc}</p>
                    </div>
                    <span className="project-index">0{i + 1}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work Process Section */}
        <section className="process-section section-pad">
          <div className="container">
            <SectionHeading
              label={t.processLabel}
              title={t.processTitle}
            />
            <div className="process-grid">
              {t.process.map((step, i) => (
                <div className="process-item" key={step[0]}>
                  <div className="process-top">
                    <span>{step[0]}</span>
                    {i !== 3 && <div className="process-connector" />}
                  </div>
                  <h3>{step[1]}</h3>
                  <p>{step[2]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="cta-section">
          <div className="container cta-inner">
            <div>
              <span className="eyebrow">YOGISAIINFOTECH / LET'S CONNECT</span>
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaText}</p>
            </div>
            <div className="cta-buttons">
              <a
                className="button button-white"
                href={waLink("Hello YogisaiInfotech, I would like to discuss my project.")}
                target="_blank"
                rel="noreferrer"
              >
                {t.ctaButton} <MessageCircle size={18} />
              </a>
              <a
                className="button button-outline-white"
                href={`tel:${companyInfo.rawPhones[0]}`}
              >
                <Phone size={17} /> Call Now
              </a>
            </div>
            <div className="cta-decoration">
              <Sparkles size={150} />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section section-pad" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <SectionHeading
                label={t.contactLabel}
                title={t.contactTitle}
                text={t.contactText}
              />

              <div className="contact-details-box">
                {/* Phone Numbers */}
                <div className="contact-detail-item">
                  <span className="contact-icon">
                    <Phone size={20} />
                  </span>
                  <div>
                    <small>{t.callUs} / WhatsApp</small>
                    <div className="phone-numbers-list">
                      <a href={`tel:${companyInfo.rawPhones[0]}`}>
                        {companyInfo.phones[0]}
                      </a>
                      <span className="phone-badge">Primary / WhatsApp</span>
                    </div>
                    <div className="phone-numbers-list">
                      <a href={`tel:${companyInfo.rawPhones[1]}`}>
                        {companyInfo.phones[1]}
                      </a>
                      <span className="phone-badge secondary">Support</span>
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="contact-detail-item">
                  <span className="contact-icon">
                    <Mail size={20} />
                  </span>
                  <div>
                    <small>{t.emailUs}</small>
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="email-link"
                    >
                      {companyInfo.email}
                    </a>
                    {copiedText === "email" ? (
                      <span className="copied-tag">Copied!</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(companyInfo.email, "email")}
                        className="copy-btn"
                        title="Copy Email"
                      >
                        <Copy size={12} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Official Website */}
                <div className="contact-detail-item">
                  <span className="contact-icon">
                    <Globe2 size={20} />
                  </span>
                  <div>
                    <small>{t.website}</small>
                    <a
                      href={companyInfo.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="email-link"
                    >
                      {companyInfo.website}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="contact-detail-item">
                  <span className="contact-icon">
                    <MapPin size={20} />
                  </span>
                  <div>
                    <small>{t.address}</small>
                    <p>{companyInfo.address}</p>
                    <a
                      className="map-link-inline"
                      href={companyInfo.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Find us on Google Maps <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form with All 19 Services in Option Groups */}
            <form className="contact-form" onSubmit={submitForm}>
              <div className="form-heading">
                <div>
                  <h3>Send an Enquiry</h3>
                  <p>Our specialists will contact you promptly</p>
                </div>
                <span>
                  <Sparkles size={18} />
                </span>
              </div>

              <label>
                {t.name} *
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Your Name / Company Name"
                />
              </label>

              <div className="form-row">
                <label>
                  {t.mobile} *
                  <input
                    required
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    placeholder="+91 89256 17672"
                  />
                </label>

                <label>
                  {t.email} *
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@company.com"
                  />
                </label>
              </div>

              <label>
                {t.service} *
                <select
                  required
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                >
                  <option value="">{t.choose}</option>

                  <optgroup label="Technology & ERP Systems">
                    <option value="ERP Solutions">{t.serviceNames.erp}</option>
                    <option value="Invoicing Software">{t.serviceNames.invoicing}</option>
                    <option value="Inventory Management">{t.serviceNames.inventory}</option>
                    <option value="Payroll Management">{t.serviceNames.payroll}</option>
                    <option value="Website Design & Development">{t.serviceNames.websites}</option>
                    <option value="Web Application Development">{t.serviceNames.webapps}</option>
                  </optgroup>

                  <optgroup label="Digital Signatures & PDF Automation">
                    <option value="Digital Signature Certificates (DSC)">{t.serviceNames.dsc}</option>
                    <option value="PDF Signer Software">{t.serviceNames["pdf-signer"]}</option>
                    <option value="Auto PDF Signer">{t.serviceNames["auto-pdf-signer"]}</option>
                    <option value="PDF Signer API">{t.serviceNames["pdf-signer-api"]}</option>
                  </optgroup>

                  <optgroup label="Government Compliance & Legal Registrations">
                    <option value="e-Tender Filing & Training">{t.serviceNames.etender}</option>
                    <option value="GeM Registration & Management">{t.serviceNames.gem}</option>
                    <option value="ISO Certification">{t.serviceNames.iso}</option>
                    <option value="Trademark Registration">{t.serviceNames.trademark}</option>
                  </optgroup>

                  <optgroup label="Creative Studio, Graphic Design & Print Media">
                    <option value="Logo Design & Brand Identity">{t.serviceNames["logo-design"]}</option>
                    <option value="Brochure Design">{t.serviceNames["brochure-design"]}</option>
                    <option value="Visiting Card Design">{t.serviceNames["visiting-card"]}</option>
                    <option value="Banner Design">{t.serviceNames["banner-design"]}</option>
                    <option value="Flex Design & Large Format Printing">{t.serviceNames["flex-design"]}</option>
                  </optgroup>
                </select>
              </label>

              <label>
                {t.message} *
                <textarea
                  required
                  rows="4"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your requirements, volume, or timeline..."
                />
              </label>

              <button className="button button-primary form-submit" type="submit">
                <MessageCircle size={18} /> {t.send}
              </button>

              {submissionFeedback === "whatsapp" && (
                <div className="form-feedback-card success">
                  <CheckCircle2 size={16} />
                  <span>Enquiry formatted and opened in <b>WhatsApp</b>!</span>
                </div>
              )}

              <div className="form-direct-actions">
                <span>Or reach us directly:</span>
                <a href={`tel:${companyInfo.rawPhones[0]}`} className="direct-chip">
                  <Phone size={13} /> Call {companyInfo.phones[0]}
                </a>
                <a href={`mailto:${companyInfo.email}`} className="direct-chip">
                  <Mail size={13} /> Email Us
                </a>
                <a href={companyInfo.websiteUrl} target="_blank" rel="noreferrer" className="direct-chip">
                  <Globe2 size={13} /> {companyInfo.website}
                </a>
              </div>

              <small className="form-note">
                Your enquiry directly opens in WhatsApp with prefilled details.
              </small>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-main">
          {/* Column 1: Brand & Contact Info */}
          <div className="footer-brand">
            <BrandLogo light compact={false} />
            <p>{t.footerText}</p>

            <div className="footer-contact-stack">
              <a
                href={companyInfo.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-contact-link"
              >
                <Globe2 size={15} />
                <span>{companyInfo.website}</span>
              </a>
              <a
                href={waLink("Hello YogisaiInfotech, I would like to enquire about your services.")}
                target="_blank"
                rel="noreferrer"
                className="footer-whatsapp"
              >
                <MessageCircle size={16} />
                <span>WhatsApp: {companyInfo.phones[0]}</span>
              </a>
              <a href={`tel:${companyInfo.rawPhones[1]}`} className="footer-contact-link">
                <Phone size={15} />
                <span>Support: {companyInfo.phones[1]}</span>
              </a>
              <a href={`mailto:${companyInfo.email}`} className="footer-contact-link">
                <Mail size={15} />
                <span>{companyInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4>{t.quickLinks}</h4>
            <div className="footer-links-list">
              {t.nav.map((n, i) => (
                <a key={n} href={`#${navIds[i]}`}>
                  {n}
                </a>
              ))}
              <a href={companyInfo.mapUrl} target="_blank" rel="noreferrer">
                {t.address} <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Column 3: Enterprise Software */}
          <div className="footer-col">
            <h4>{t.servicesHeading}</h4>
            <div className="footer-links-list">
              <a href="#services">{t.serviceNames.erp}</a>
              <a href="#services">{t.serviceNames.invoicing}</a>
              <a href="#services">{t.serviceNames.inventory}</a>
              <a href="#services">{t.serviceNames.payroll}</a>
              <a href="#services">{t.serviceNames.websites}</a>
              <a href="#services">{t.serviceNames.webapps}</a>
            </div>
          </div>

          {/* Column 4: Digital Signatures & Compliance */}
          <div className="footer-col">
            <h4>{t.complianceHeading}</h4>
            <div className="footer-links-list">
              <a href="#services">{t.serviceNames.dsc}</a>
              <a href="#services">{t.serviceNames["pdf-signer"]}</a>
              <a href="#services">{t.serviceNames["auto-pdf-signer"]}</a>
              <a href="#services">{t.serviceNames.etender}</a>
              <a href="#services">{t.serviceNames.gem}</a>
              <a href="#services">{t.serviceNames.iso}</a>
              <a href="#services">{t.serviceNames.trademark}</a>
            </div>
          </div>

          {/* Column 5: Creative Studio & Address */}
          <div className="footer-col">
            <h4>{t.creativeHeading}</h4>
            <div className="footer-links-list">
              <a href="#services">{t.serviceNames["logo-design"]}</a>
              <a href="#services">{t.serviceNames["brochure-design"]}</a>
              <a href="#services">{t.serviceNames["visiting-card"]}</a>
              <a href="#services">{t.serviceNames["banner-design"]}</a>
              <a href="#services">{t.serviceNames["flex-design"]}</a>
            </div>

            <div className="footer-address-block">
              <h5>{t.address}</h5>
              <p>{companyInfo.address}</p>
              <a
                href={companyInfo.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-map-link"
              >
                View on Google Maps <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <div className="footer-bottom-left">
            <span>
              © {new Date().getFullYear()} YogisaiInfotech. {t.rights}
            </span>
            <span className="footer-sep">•</span>
            <span>Enterprise IT, Statutory Compliance & Creative Studio Solutions</span>
          </div>
          <div className="footer-bottom-right">
            <span>Chennai, Tamil Nadu, India</span>
            <a href="#home" className="back-to-top" aria-label="Back to top">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action */}
      <a
        className="floating-whatsapp"
        href={waLink("Hello YogisaiInfotech, I would like to know more about your services.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with YogisaiInfotech on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}

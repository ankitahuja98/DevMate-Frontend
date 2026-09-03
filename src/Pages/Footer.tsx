import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../utils/scrollToSection";
import { Github, Linkedin } from "lucide-react";
import DevMateLogoWhite from "../Images/devmateLogo-white.avif";
import "../CSS/Landing.css";

/* ============================================================
   Footer
   ============================================================
   Every link here goes somewhere that actually exists — either a
   route or a section on the landing page. Nothing is a placeholder,
   so a click never dumps the visitor back on the homepage.
   ============================================================ */

type FooterLink = {
  label: string;
  to?: string;
  /* Scrolls to a section on the landing page instead of navigating. */
  anchor?: string;
};

type FooterColumn = { heading: string; links: FooterLink[] };

const columns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Explore Developers", to: "/explore" },
      { label: "How It Works", anchor: "how-it-works" },
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Profile", to: "/profile" },
      { label: "Matches", to: "/matches" },
      { label: "Messages", to: "/matches" },
      { label: "Settings", to: "/setting" },
      { label: "Become a Partner", to: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "About Devmate", to: "/about" },
      { label: "Contact Us", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Refund & Cancellation", to: "/refund-policy" },
    ],
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/ankitahuja98",
    icon: <Github size={18} strokeWidth={2} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ankitahuja98/",
    icon: <Linkedin size={18} strokeWidth={2} />,
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  /* Landing at the top of the destination is handled globally by
     <ScrollToTop /> (src/Components/ScrollToTop.tsx) — which matters most
     here, since the footer is by definition at the bottom of the page. */
  const go = (link: FooterLink) => {
    if (link.anchor) {
      // Anchored sections only exist on the landing page — from anywhere
      // else, route there first. scrollToSection waits for the target to
      // mount, since Home arrives with its lazy chunk.
      if (pathname !== "/") navigate("/");
      scrollToSection(link.anchor);
      return;
    }
    if (link.to) navigate(link.to);
  };

  return (
    <footer className="lp-tokens bg-[#0b1430] text-slate-300">
      <div className="lp-container py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:gap-8 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          {/* Brand */}
          <div className="max-w-[300px]">
            <img
              src={DevMateLogoWhite}
              alt="Devmate"
              className="h-9 w-auto"
              width={140}
              height={36}
            />
            <p className="mt-5 text-[14px] leading-[1.7] text-slate-400">
              Where developers meet, share ideas, and discover exciting
              opportunities to collaborate.
            </p>
            <div className="flex gap-2.5 mt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="lp-focus grid place-items-center w-10 h-10 rounded-xl bg-white/6 border border-white/10 text-slate-300 transition-colors duration-200 hover:bg-[color:var(--lp-violet-600)] hover:border-transparent hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                {column.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => go(link)}
                      className="lp-focus text-[14px] text-slate-400 text-left transition-colors duration-200 hover:text-white cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-slate-500">
            © 2026 Devmate. All rights reserved.
          </p>
          <div className="flex items-center gap-7 text-[13px]">
            <button
              onClick={() => navigate("/privacy-policy")}
              className="lp-focus text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button
              onClick={() => navigate("/terms")}
              className="lp-focus text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Terms
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="lp-focus text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

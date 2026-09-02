import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import DevMateLogo from "../../Images/devmateLogo.avif";
import { useAppSelector } from "../../redux/store/store";
import ResponsiveLayout from "../ResponsiveLayout/ResponsiveLayout";
import "../../CSS/Landing.css";

/* Nav items either route somewhere real or scroll to a landing-page
   section — nothing here is a placeholder. */
type NavItem = { label: string; to?: string; anchor?: string };

const navItems: NavItem[] = [
  { label: "Explore Developers", to: "/explore" },
  { label: "How It Works", anchor: "how-it-works" },
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
];

const PublicRoutesLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { userProfileData, userProfileIsloading } = useAppSelector(
    (store) => store.profile.userProfile,
  );

  /* #root is the scroll container in this app (see App.css), not the
     window — so the "am I scrolled?" listener has to hang off it. */
  useEffect(() => {
    const scroller = document.getElementById("root");
    if (!scroller) return;
    const onScroll = () => setScrolled(scroller.scrollTop > 8);
    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  const isLanding = pathname === "/";

  const goTo = (item: NavItem) => {
    setMenuOpen(false);
    if (item.anchor) {
      if (pathname === "/") {
        document
          .getElementById(item.anchor)
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Section only exists on the landing page — go there, then scroll
        // once the route has painted.
        navigate("/");
        setTimeout(
          () =>
            document
              .getElementById(item.anchor!)
              ?.scrollIntoView({ behavior: "smooth" }),
          150,
        );
      }
      return;
    }
    if (item.to) navigate(item.to);
  };

  if (userProfileIsloading) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#fbfaff]">
        <div className="w-9 h-9 rounded-full border-[3px] border-[#6d3df5] border-t-transparent animate-spin" />
      </div>
    );
  }

  // Logged in → hand off to the authenticated app shell.
  if (userProfileData) {
    return (
      <ResponsiveLayout>
        <Outlet />
      </ResponsiveLayout>
    );
  }

  return (
    <div className="lp relative min-h-screen">
      {/* Ambient hero backdrop, owned by the shell rather than by
          HeroSection so it runs edge-to-edge from y=0 — that's what lets
          the resting header read as part of the hero instead of a white
          bar sitting on top of it. Only the landing page has a hero, so
          only the landing page gets it. Its own overflow-hidden clips the
          blurred blobs; putting that on `.lp` would break the sticky
          header, since #root is the scroll container.

          The height tracks how tall the hero actually gets at each
          breakpoint (it stacks to roughly 1280px on phones), so the grid
          covers the whole first section; `.lp-grid-lines` fades out over
          the last third, so an approximate height never shows a seam. */}
      {isLanding && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1280px] sm:h-[1080px] lg:h-[940px] overflow-hidden z-0"
        >
          <div className="absolute inset-0 lp-grid-lines" />
          <div className="lp-blob w-[420px] h-[420px] top-0 -left-24 bg-[#7c4dff]/18" />
          <div className="lp-blob w-[460px] h-[460px] top-24 -right-32 bg-[#4f7cfa]/16" />
        </div>
      )}

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[color:var(--lp-bg)]/70 backdrop-blur-xl backdrop-saturate-150 border-b border-[color:var(--lp-border)] shadow-[0_1px_16px_-8px_rgba(41,26,92,.35)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="lp-container">
          <div className="flex items-center justify-between h-[72px] gap-6">
            {/* Brand */}
            <button
              onClick={() => navigate("/")}
              aria-label="Devmate home"
              className="lp-focus shrink-0 cursor-pointer"
            >
              <img
                src={DevMateLogo}
                alt="Devmate"
                className="h-9 w-auto"
                width={140}
                height={36}
              />
            </button>

            {/* Centre nav */}
            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center gap-1 mx-auto"
            >
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => goTo(item)}
                  className="lp-focus px-3.5 py-2 rounded-lg text-[14.5px] font-medium text-[color:var(--lp-ink-soft)] transition-colors duration-200 hover:text-[color:var(--lp-violet-600)] hover:bg-[color:var(--lp-tint)] cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => navigate("/login")}
                className="lp-focus hidden sm:block px-4 py-2 rounded-lg text-[14.5px] font-medium text-[color:var(--lp-ink-soft)] transition-colors duration-200 hover:text-[color:var(--lp-violet-600)] cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/login")}
                className="lp-btn lp-btn-primary !h-11 !px-5 !text-[14.5px]"
              >
                Get Started
              </button>

              <button
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="lp-focus lg:hidden grid place-items-center w-11 h-11 rounded-xl border border-[color:var(--lp-border-strong)] bg-white text-[color:var(--lp-ink)] cursor-pointer"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile sheet */}
        {menuOpen && (
          <div className="lg:hidden border-t border-[color:var(--lp-border)] bg-[color:var(--lp-bg)]/90 backdrop-blur-xl">
            <nav aria-label="Primary mobile" className="lp-container py-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => goTo(item)}
                      className="lp-focus w-full text-left px-3 py-3 rounded-xl text-[15px] font-medium text-[color:var(--lp-ink)] hover:bg-[color:var(--lp-tint)] cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li className="pt-2 sm:hidden">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/login");
                    }}
                    className="lp-btn lp-btn-secondary w-full"
                  >
                    Sign In
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicRoutesLayout;

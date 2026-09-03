import { MessageSquare, Rocket, ShieldCheck, Users } from "lucide-react";
import type { AuthMode } from "./authMode";

/* ============================================================
   Brand-panel copy, per mode.
   ============================================================
   The desktop panel and the mobile compact banner both draw from
   here, so switching card modes can never leave one of them saying
   "Welcome back" beside the other's "Create your account" — the
   mismatch a real product doesn't ship, now impossible by
   construction rather than by two files agreeing to stay in sync.

   Sign in keeps the brand's own words. Sign up leans into what a new
   developer gets by joining rather than repeating the tagline back at
   them. Forgot password reuses sign in's badge and features — it's
   still a returning user, just mid-recovery — and only swaps the
   headline and lead to match the task at hand. */

export type FeatureCopy = {
  icon: typeof Users;
  title: string;
  copy: string;
};

export type BrandCopy = {
  badge: string;
  headline: string;
  lead: string;
  leadCompact: string;
  features: FeatureCopy[];
};

const signInFeatures: FeatureCopy[] = [
  {
    icon: Users,
    title: "Connect with developers",
    copy: "Find the right people for your next big idea.",
  },
  {
    icon: MessageSquare,
    title: "Share ideas & collaborate",
    copy: "Real-time chat and project collaboration.",
  },
  {
    icon: Rocket,
    title: "Build amazing things together",
    copy: "Turn ideas into impactful products.",
  },
];

const signIn: BrandCopy = {
  badge: "Where Developers Connect & Build Together",
  headline: "Welcome back to",
  lead: "Your space to meet developers, share ideas, discover collaborators, and grow together in tech.",
  leadCompact: "Meet developers, share ideas, and build together.",
  features: signInFeatures,
};

const signUp: BrandCopy = {
  badge: "Join 10,000+ Developers Already Building",
  headline: "Get started with",
  lead: "Create your profile, get discovered, and start collaborating with developers who share your ambition.",
  leadCompact: "Create your profile and start collaborating today.",
  features: [
    {
      icon: Users,
      title: "Create your developer profile",
      copy: "Showcase your skills, stack, and what you're building.",
    },
    {
      icon: MessageSquare,
      title: "Get matched with the right people",
      copy: "Discover collaborators who complement your skills.",
    },
    {
      icon: Rocket,
      title: "Start building from day one",
      copy: "Join an existing project or launch your own idea.",
    },
  ],
};

const forgot: BrandCopy = {
  ...signIn,
  headline: "Reset access to",
  lead: "We'll help you get back into your account in just a couple of quick steps.",
  leadCompact: "Get back into your account in a couple of steps.",
  features: [
    {
      icon: ShieldCheck,
      title: "Your account, protected",
      copy: "Only you can reset your own password.",
    },
    ...signInFeatures.slice(0, 2),
  ],
};

const COPY: Record<AuthMode, BrandCopy> = { signin: signIn, signup: signUp, forgot };

export const brandCopyFor = (mode: AuthMode): BrandCopy => COPY[mode];

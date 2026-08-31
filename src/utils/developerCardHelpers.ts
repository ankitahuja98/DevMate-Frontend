// Small, honest label/status helpers shared by the Explore grid card and its
// profile modal. Every label maps to a real field already in userData — no
// ratings/reviews and no "verified" badge unless isVerified is actually
// true server-side (there's no data for either of those otherwise).

export const experienceLabel = (exp: number | null | undefined) => {
  switch (exp) {
    case 1:
      return "< 1 Year";
    case 2:
      return "1-2 Years";
    case 3:
      return "3-5 Years";
    case 6:
      return "6-10 Years";
    case 10:
      return "10+ Years";
    default:
      return exp != null ? `${exp}+ Years` : "Experience not set";
  }
};

export const availabilityLabel: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  weekends: "Weekends",
  flexible: "Flexible",
};

// Reuses the same "no lastSeen recorded yet == currently online" convention
// getDate() already uses elsewhere in the app, just as a boolean threshold.
export const isRecentlyActive = (lastSeen?: string | null) => {
  if (!lastSeen) return true;
  const diffMin = (Date.now() - new Date(lastSeen).getTime()) / 60000;
  return diffMin < 5;
};

// "NEW" badge on a Liked You card — a like sent within the last 48h.
export const isRecentlyCreated = (createdAt?: string | null) => {
  if (!createdAt) return false;
  const diffMs = Date.now() - new Date(createdAt).getTime();
  return diffMs < 48 * 60 * 60 * 1000;
};

// "Member since Mar 2024" on the profile overview card — real account
// creation date, formatted short. Returns null (render nothing) rather
// than guessing when the field isn't there.
export const memberSinceLabel = (createdAt?: string | null) => {
  if (!createdAt) return null;
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

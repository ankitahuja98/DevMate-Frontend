import { motion } from "framer-motion";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

interface SearchEmptyStateProps {
  /** The raw search text, if any — swaps in a quoted headline when present. */
  query?: string;
  /** What's being searched, e.g. "developers", "people" — used in copy. */
  entityLabel: string;
  onClear: () => void;
}

// Shared "nothing matched your search/filters" state for Explore & Liked You
// — a soft icon badge + heading/subtext + a real CTA, in place of the old
// bare paragraph-and-button. Mirrors the icon-badge language already used
// for the chat empty state (see .chatEmptyIcon in CSS/Matches.css).
const SearchEmptyState = ({
  query,
  entityLabel,
  onClear,
}: SearchEmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center px-6"
      style={{ padding: "72px 20px" }}
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: 68,
          height: 68,
          background:
            "linear-gradient(135deg, var(--violet-tint-100, #f0e8ff) 0%, var(--violet-tint-300, #ede9fe) 100%)",
        }}
      >
        <SearchOffRoundedIcon sx={{ fontSize: 30, color: "#6D3DF5" }} />
      </div>

      <h3
        className="mt-5"
        style={{ fontSize: 17, fontWeight: 700, color: "#17213D" }}
      >
        {query ? `No results for "${query}"` : "No matches found"}
      </h3>
      <p
        className="mt-1.5"
        style={{ fontSize: 13.5, color: "#6B7691", maxWidth: 320 }}
      >
        {query
          ? `We couldn't find any ${entityLabel} matching that search. Try a different keyword or clear your filters.`
          : `No ${entityLabel} match the filters you've applied. Try adjusting or clearing them.`}
      </p>

      <button
        type="button"
        onClick={onClear}
        className="flex items-center gap-1.5 cursor-pointer"
        style={{
          marginTop: 22,
          padding: "10px 20px",
          borderRadius: 999,
          border: "none",
          background: "#6D3DF5",
          color: "#FFFFFF",
          fontSize: 13.5,
          fontWeight: 700,
          boxShadow: "0 8px 20px rgba(109, 61, 245, 0.28)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#5B2FE0";
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 10px 24px rgba(109, 61, 245, 0.36)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#6D3DF5";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(109, 61, 245, 0.28)";
        }}
      >
        <RestartAltRoundedIcon sx={{ fontSize: 17 }} />
        Clear filters
      </button>
    </motion.div>
  );
};

export default SearchEmptyState;

import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import EmptyState from "./EmptyState";

interface SearchEmptyStateProps {
  /** The raw search text, if any — swaps in a quoted headline when present. */
  query?: string;
  /** What's being searched, e.g. "developers", "people" — used in copy. */
  entityLabel: string;
  onClear: () => void;
}

// "Nothing matched your search/filters" for Explore & Liked You — just the
// copy on top of the shared <EmptyState> block.
const SearchEmptyState = ({
  query,
  entityLabel,
  onClear,
}: SearchEmptyStateProps) => (
  <EmptyState
    icon={<SearchOffRoundedIcon sx={{ fontSize: 30 }} />}
    title={query ? `No results for "${query}"` : "No matches found"}
    description={
      query
        ? `We couldn't find any ${entityLabel} matching that search. Try a different keyword or clear your filters.`
        : `No ${entityLabel} match the filters you've applied. Try adjusting or clearing them.`
    }
    action={{
      label: "Clear filters",
      onClick: onClear,
      icon: <RestartAltRoundedIcon sx={{ fontSize: 17 }} />,
    }}
  />
);

export default SearchEmptyState;

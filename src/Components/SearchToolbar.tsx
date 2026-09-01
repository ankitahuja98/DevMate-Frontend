import { useEffect, useRef, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AdvancedFiltersPanel from "./AdvancedFiltersPanel";
import type { AdvancedFilters } from "../context/SearchContext";
import "../CSS/SearchToolbar.css";

export interface SortOption {
  value: string;
  label: string;
}

interface SearchToolbarProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder: string;

  roleOptions: string[];
  skillOptions: string[];
  filters: AdvancedFilters;
  setFilter: (key: keyof AdvancedFilters, value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;

  sortOptions: SortOption[];
  sortBy: string;
  onSortChange: (value: string) => void;

  // Portal target for the MUI menus, so they render inside the app's
  // fullscreen container rather than escaping it.
  container?: HTMLElement;
  // Distinct per mount point — keeps the filter panel's field ids unique.
  idPrefix: string;
}

// The in-page search + Filters + Sort row shared by Explore and Liked You.
// Deliberately has no card/box around it — the controls sit directly on
// the page background (see SearchToolbar.css).
const SearchToolbar = ({
  query,
  onQueryChange,
  placeholder,
  roleOptions,
  skillOptions,
  filters,
  setFilter,
  clearFilters,
  hasActiveFilters,
  sortOptions,
  sortBy,
  onSortChange,
  container,
  idPrefix,
}: SearchToolbarProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortMenuAnchor, setSortMenuAnchor] = useState<null | HTMLElement>(null);
  const filtersWrapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isFiltersOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // The panel's MUI Selects open their menu in a portal, so it isn't a
      // DOM descendant of filtersWrapRef even though it's visually inside
      // the panel. Without this, picking an option would read as an
      // outside click and close the whole panel.
      if (target.closest(".MuiModal-root")) return;
      if (filtersWrapRef.current && !filtersWrapRef.current.contains(target)) {
        setIsFiltersOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isFiltersOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFiltersOpen(false);
      // ⌘K / Ctrl+K focuses search. This used to live in Topbar, back when
      // the search box did too — it follows the input.
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const currentSortLabel =
    sortOptions.find((o) => o.value === sortBy)?.label || sortOptions[0]?.label;

  return (
    <div className="SearchToolbar">
      <div className="SearchToolbarBox">
        <SearchIcon sx={{ fontSize: 20, color: "#6B7691" }} />
        <input
          ref={searchInputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="SearchToolbarInput"
        />
        {query && (
          <button
            type="button"
            className="SearchToolbarClear"
            title="Clear search"
            onClick={() => {
              onQueryChange("");
              searchInputRef.current?.focus();
            }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </button>
        )}
      </div>

      <div className="SearchToolbarFiltersWrap" ref={filtersWrapRef}>
        <button
          type="button"
          className={`SearchToolbarFiltersBtn ${
            isFiltersOpen || hasActiveFilters ? "active" : ""
          }`}
          onClick={() => setIsFiltersOpen((v) => !v)}
        >
          <TuneIcon sx={{ fontSize: 18 }} />
          Filters
          {hasActiveFilters && <span className="SearchToolbarFiltersDot" />}
        </button>
        {isFiltersOpen && (
          <AdvancedFiltersPanel
            className="AdvancedFiltersPanel--right"
            idPrefix={idPrefix}
            roleOptions={roleOptions}
            skillOptions={skillOptions}
            filters={filters}
            setFilter={setFilter}
            clearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
            container={container}
          />
        )}
      </div>

      <button
        type="button"
        className="SearchToolbarSortBtn"
        onClick={(e) => setSortMenuAnchor(e.currentTarget)}
      >
        <span className="SearchToolbarSortLabel">Sort by</span>
        <span className="SearchToolbarSortValue">
          {currentSortLabel}
          <ExpandMoreIcon sx={{ fontSize: 18 }} />
        </span>
      </button>
      <Menu
        anchorEl={sortMenuAnchor}
        open={!!sortMenuAnchor}
        onClose={() => setSortMenuAnchor(null)}
        container={container}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {sortOptions.map((opt) => (
          <MenuItem
            key={opt.value}
            selected={sortBy === opt.value}
            onClick={() => {
              onSortChange(opt.value);
              setSortMenuAnchor(null);
            }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SearchToolbar;

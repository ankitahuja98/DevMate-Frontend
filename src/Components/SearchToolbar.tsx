import { useEffect, useRef, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import AdvancedFiltersPanel from "./AdvancedFiltersPanel";
import type { AdvancedFilters } from "../context/SearchContext";
import "../CSS/SearchToolbar.css";

export interface SortOption {
  value: string;
  label: string;
}

// The Sort select is an outlined MUI Select like the ones in
// AdvancedFiltersPanel, but sized to sit flush with the search box and
// Filters button beside it (~40px) rather than MUI's default.
const sortSelectSx = {
  "& .MuiInputLabel-root": { fontSize: 14, color: "#6b7691" },
  "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
    transform: "translate(14px, 9px) scale(1)",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "var(--brand-500, #6d3df5)" },
  "& .MuiSelect-select": {
    padding: "9px 14px",
    fontSize: 14,
    fontWeight: 650,
    color: "var(--ink-900, #17213d)",
  },
  "& .MuiOutlinedInput-root": {
    background: "#fff",
    borderRadius: "12px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--border-default, #e4e7ef)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--brand-500, #6d3df5)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--brand-500, #6d3df5)",
    },
  },
};

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

      <FormControl
        className="SearchToolbarSortControl"
        size="small"
        sx={sortSelectSx}
      >
        <InputLabel id={`${idPrefix}SortLabel`}>Sort by</InputLabel>
        <Select
          labelId={`${idPrefix}SortLabel`}
          id={`${idPrefix}Sort`}
          label="Sort by"
          value={sortBy}
          onChange={(e: SelectChangeEvent<string>) =>
            onSortChange(e.target.value)
          }
          MenuProps={{ container }}
        >
          {sortOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchToolbar;

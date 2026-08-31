import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

// Powers the topbar's search + "advanced search" dropdown. The topbar is
// shared across every page, but what search actually *does* is page-specific
// (Explore searches developers, Liked You searches the people who liked
// you) — so the currently-mounted page registers itself here (scope +
// its own filter option lists), and reads the query/filters back out to
// apply them to its own data. No filtering logic lives in this file.

export type SearchScope = "explore" | "likedyou" | null;

export interface AdvancedFilters {
  role: string;
  skill: string;
  experience: string;
  availability: string;
}

const emptyFilters: AdvancedFilters = {
  role: "",
  skill: "",
  experience: "",
  availability: "",
};

interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;

  filters: AdvancedFilters;
  setFilter: (key: keyof AdvancedFilters, value: string) => void;
  clearFilters: () => void;

  // Registered by the active page (see Explore.tsx / LikedYou.tsx) so the
  // topbar knows what it's searching and which advanced fields to offer.
  scope: SearchScope;
  setScope: (scope: SearchScope) => void;
  roleOptions: string[];
  setRoleOptions: (opts: string[]) => void;
  skillOptions: string[];
  setSkillOptions: (opts: string[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<AdvancedFilters>(emptyFilters);
  const [scope, setScopeState] = useState<SearchScope>(null);
  const [roleOptions, setRoleOptions] = useState<string[]>([]);
  const [skillOptions, setSkillOptions] = useState<string[]>([]);

  const setFilter = useCallback((key: keyof AdvancedFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => setFilters(emptyFilters), []);

  // Switching pages starts search fresh — a role filter picked while
  // browsing Explore shouldn't silently carry over and quietly filter
  // Liked You's (unrelated) list too.
  const setScope = useCallback((next: SearchScope) => {
    setScopeState(next);
    setQuery("");
    setFilters(emptyFilters);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        filters,
        setFilter,
        clearFilters,
        scope,
        setScope,
        roleOptions,
        setRoleOptions,
        skillOptions,
        setSkillOptions,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

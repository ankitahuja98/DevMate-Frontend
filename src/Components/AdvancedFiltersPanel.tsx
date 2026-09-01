import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type { AdvancedFilters } from "../context/SearchContext";
import {
  experienceLabel,
  availabilityLabel,
} from "../utils/developerCardHelpers";
import "../CSS/AdvancedFiltersPanel.css";

// Outlined MUI Select, restyled to match the app's compact violet-accented
// inputs rather than MUI's default look. Shared by every place this panel
// renders (Topbar's Liked You search, Explore's Filters dropdown).
const advancedSelectSx = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--border-default, #e4e7ef)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--brand-500, #6d3df5)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--brand-500, #6d3df5)",
  },
  borderRadius: "9px",
};

const experienceOptions = [1, 2, 3, 6, 10];

interface AdvancedFiltersPanelProps {
  roleOptions: string[];
  skillOptions: string[];
  filters: AdvancedFilters;
  setFilter: (key: keyof AdvancedFilters, value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  container?: HTMLElement;
  // Distinct id prefix per mount point (Topbar vs Explore) — cheap
  // insurance against duplicate DOM ids if both ever render at once.
  idPrefix: string;
  className?: string;
}

// The "Role / Skill / Experience / Availability" filter grid — factored
// out of Topbar so Explore's own Filters dropdown can reuse the exact same
// fields/behavior (including the MUI-Select-in-a-portal correctness) with
// zero duplication.
const AdvancedFiltersPanel = ({
  roleOptions,
  skillOptions,
  filters,
  setFilter,
  clearFilters,
  hasActiveFilters,
  container,
  idPrefix,
  className,
}: AdvancedFiltersPanelProps) => {
  const handleChange =
    (key: keyof AdvancedFilters) => (e: SelectChangeEvent<string>) =>
      setFilter(key, e.target.value);

  return (
    <div className={`AdvancedFiltersPanel ${className || ""}`}>
      <div className="AdvancedFiltersPanelHeader">
        <span>Advanced Search</span>
        {hasActiveFilters && (
          <button type="button" onClick={clearFilters}>
            Clear all
          </button>
        )}
      </div>
      <div className="AdvancedFiltersGrid">
        <FormControl size="small" fullWidth>
          <InputLabel id={`${idPrefix}RoleLabel`}>Role</InputLabel>
          <Select
            labelId={`${idPrefix}RoleLabel`}
            id={`${idPrefix}Role`}
            label="Role"
            value={filters.role}
            onChange={handleChange("role")}
            MenuProps={{ container }}
            sx={advancedSelectSx}
          >
            <MenuItem value="">
              <em>All Roles</em>
            </MenuItem>
            {roleOptions.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" fullWidth>
          <InputLabel id={`${idPrefix}SkillLabel`}>Skill</InputLabel>
          <Select
            labelId={`${idPrefix}SkillLabel`}
            id={`${idPrefix}Skill`}
            label="Skill"
            value={filters.skill}
            onChange={handleChange("skill")}
            MenuProps={{ container }}
            sx={advancedSelectSx}
          >
            <MenuItem value="">
              <em>All Skills</em>
            </MenuItem>
            {skillOptions.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" fullWidth>
          <InputLabel id={`${idPrefix}ExperienceLabel`}>
            Experience
          </InputLabel>
          <Select
            labelId={`${idPrefix}ExperienceLabel`}
            id={`${idPrefix}Experience`}
            label="Experience"
            value={filters.experience}
            onChange={handleChange("experience")}
            MenuProps={{ container }}
            sx={advancedSelectSx}
          >
            <MenuItem value="">
              <em>Any</em>
            </MenuItem>
            {experienceOptions.map((exp) => (
              <MenuItem key={exp} value={String(exp)}>
                {experienceLabel(exp)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" fullWidth>
          <InputLabel id={`${idPrefix}AvailabilityLabel`}>
            Availability
          </InputLabel>
          <Select
            labelId={`${idPrefix}AvailabilityLabel`}
            id={`${idPrefix}Availability`}
            label="Availability"
            value={filters.availability}
            onChange={handleChange("availability")}
            MenuProps={{ container }}
            sx={advancedSelectSx}
          >
            <MenuItem value="">
              <em>Any</em>
            </MenuItem>
            {Object.entries(availabilityLabel).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default AdvancedFiltersPanel;

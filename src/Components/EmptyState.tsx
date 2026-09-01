import type { ReactNode } from "react";
import { motion } from "framer-motion";
import "../CSS/EmptyState.css";

interface EmptyStateAction {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
}

interface EmptyStateProps {
  /** Rendered inside the soft violet badge — an MUI icon, typically. */
  icon: ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  /** Rendered beside the primary one, in the quieter outlined style. */
  secondaryAction?: EmptyStateAction;
}

// Shared "nothing here yet" block — icon badge, heading, subtext and up to
// two CTAs. Used directly (Liked You) and wrapped (SearchEmptyState) so
// every empty state in the app reads the same.
const EmptyState = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
}: EmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="EmptyState"
  >
    <div className="EmptyStateIcon">{icon}</div>

    <h3 className="EmptyStateTitle">{title}</h3>
    {description && <p className="EmptyStateText">{description}</p>}

    {(action || secondaryAction) && (
      <div className="EmptyStateActions">
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="EmptyStateBtn EmptyStateBtn--solid"
          >
            {action.icon}
            {action.label}
          </button>
        )}
        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className="EmptyStateBtn EmptyStateBtn--ghost"
          >
            {secondaryAction.icon}
            {secondaryAction.label}
          </button>
        )}
      </div>
    )}
  </motion.div>
);

export default EmptyState;

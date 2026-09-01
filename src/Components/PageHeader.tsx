import type { ReactNode } from "react";
import "../CSS/PageHeader.css";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

// Shared "TopRow" header — the same rounded/gradient title+description box
// Explore and Liked You use, factored out so every page gets one
// consistent treatment instead of each rebuilding it. See PageHeader.css.
const PageHeader = ({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) => (
  <div className={`PageHeaderRow ${className || ""}`}>
    <div>
      <h1 className="PageHeaderTitle">{title}</h1>
      {description && <p className="PageHeaderSubtitle">{description}</p>}
    </div>
    {actions && <div className="PageHeaderActions">{actions}</div>}
  </div>
);

export default PageHeader;

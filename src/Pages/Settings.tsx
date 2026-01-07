import { useNavigate } from "react-router-dom";

type SettingItem = {
  label: string;
  path: string;
};

const accountSettings: SettingItem[] = [
  { label: "Profile", path: "/profile" },
  { label: "Notifications", path: "/settings/notifications" },
  { label: "Subscription", path: "/settings/subscription" },
];

const legalSettings: SettingItem[] = [
  { label: "About Devmate", path: "/about" },
  { label: "Founder", path: "/founder" },
  { label: "Contact Us", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms & Conditions", path: "/terms" },
  { label: "Refund & Cancellation Policy", path: "/refund-policy" },
];

const Settings = () => {
  const navigate = useNavigate();

  const renderSection = (title: string, items: SettingItem[]) => (
    <section className="mb-10 ">
      <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase">
        {title}
      </h2>

      <div className="rounded-xl border border-gray-200 overflow-hidden">
        {items.map((item, index) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center justify-between px-6 py-4 text-left
              hover:bg-gray-50 transition cursor-pointer
              ${index !== items.length - 1 ? "border-b border-gray-200" : ""}
            `}
          >
            <span className="text-base font-medium text-gray-800">
              {item.label}
            </span>

            <span className="text-gray-400 text-xl leading-none">›</span>
          </button>
        ))}
      </div>
    </section>
  );

  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      <header className="mb-5">
        {/* <h1 className="text-3xl font-semibold text-gray-900">Settings</h1> */}
        {/* <p className="mt-2 text-sm text-gray-500">
          Manage your account preferences and legal information
        </p> */}
      </header>

      {renderSection("Account Settings", accountSettings)}
      {renderSection("Information & Legal", legalSettings)}
    </div>
  );
};

export default Settings;

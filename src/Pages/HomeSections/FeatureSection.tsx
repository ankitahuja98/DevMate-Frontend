import { Users, Code2, Briefcase, MessageSquare } from "lucide-react";

const features = [
  {
    icon: <Users size={32} />,
    title: "Connect with Developers",
    description:
      "Find your perfect coding partner. Match with developers who share your tech stack and vision.",
  },
  {
    icon: <Code2 size={32} />,
    title: "Showcase Your Skills",
    description:
      "Build an impressive developer profile highlighting your expertise, projects, and tech stack.",
  },
  {
    icon: <Briefcase size={32} />,
    title: "Collaborate on Projects",
    description:
      "Team up on exciting opportunities, from freelance gigs to startup ventures.",
  },
  {
    icon: <MessageSquare size={32} />,
    title: "Real-Time Chat",
    description:
      "Seamless communication with built-in messaging. Discuss ideas and coordinate instantly.",
  },
];

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="py-10 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
            Everything You Need to
            <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Connect & Collaborate
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Powerful features designed to help developers find their ideal
            coding partners and build amazing projects together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

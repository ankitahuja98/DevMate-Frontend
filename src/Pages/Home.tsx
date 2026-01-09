import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import GroupsIcon from "@mui/icons-material/Groups";
import CodeIcon from "@mui/icons-material/Code";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ForumIcon from "@mui/icons-material/Forum";
import StarIcon from "@mui/icons-material/Star";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const HomePage = () => {
  const navigate = useNavigate();

  type MockProfile = {
    id: number;
    name: string;
    role: string;
    initial: string;
    gradient: string;
    cardGradient: string;
    skills: {
      label: string;
      bg: string;
      text: string;
    }[];
  };

  const mockProfiles: MockProfile[] = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Full-Stack Developer",
      initial: "A",
      gradient: "from-purple-500 to-indigo-500",
      cardGradient: "from-purple-50 to-indigo-50",
      skills: [
        { label: "React", bg: "bg-purple-200", text: "text-purple-700" },
        { label: "Node.js", bg: "bg-blue-200", text: "text-blue-700" },
      ],
    },
    {
      id: 2,
      name: "Sarah Kim",
      role: "UI/UX Designer",
      initial: "S",
      gradient: "from-blue-500 to-cyan-500",
      cardGradient: "from-blue-50 to-cyan-50",
      skills: [
        { label: "Figma", bg: "bg-blue-200", text: "text-blue-700" },
        { label: "CSS", bg: "bg-cyan-200", text: "text-cyan-700" },
      ],
    },
    {
      id: 3,
      name: "Marcus Liu",
      role: "Backend Engineer",
      initial: "M",
      gradient: "from-indigo-500 to-purple-500",
      cardGradient: "from-indigo-50 to-purple-50",
      skills: [
        { label: "Python", bg: "bg-indigo-200", text: "text-indigo-700" },
        { label: "Django", bg: "bg-purple-200", text: "text-purple-700" },
      ],
    },
  ];

  const features = [
    {
      icon: <GroupsIcon sx={{ fontSize: 32 }} />,
      title: "Connect with Developers",
      description:
        "Find your perfect coding partner. Match with developers who share your tech stack and vision.",
    },
    {
      icon: <CodeIcon sx={{ fontSize: 32 }} />,
      title: "Showcase Your Skills",
      description:
        "Build an impressive developer profile highlighting your expertise, projects, and tech stack.",
    },
    {
      icon: <BusinessCenterIcon sx={{ fontSize: 32 }} />,
      title: "Collaborate on Projects",
      description:
        "Team up on exciting opportunities, from freelance gigs to startup ventures.",
    },
    {
      icon: <ForumIcon sx={{ fontSize: 32 }} />,
      title: "Real-Time Chat",
      description:
        "Seamless communication with built-in messaging. Discuss ideas and coordinate instantly.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-7 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                <StarIcon sx={{ fontSize: "18px" }} />
                <span>Where Developers Meet & Build Together</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                Find Your
                <span className="block bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Perfect Dev Partner
                </span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed">
                Connect with talented developers, exchange ideas, and discover
                exciting collaboration opportunities. Your next coding adventure
                starts here.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                >
                  <span>Start Matching</span>
                  <ArrowRightAltIcon sx={{ fontSize: "20px" }} />
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-slate-200 cursor-pointer"
                >
                  Learn More
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-slate-900">10K+</div>
                  <div className="text-sm text-slate-600">
                    Active Developers
                  </div>
                </div>
                <div className="h-12 w-px bg-slate-300"></div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">5K+</div>
                  <div className="text-sm text-slate-600">
                    Successful Matches
                  </div>
                </div>
                <div className="h-12 w-px bg-slate-300"></div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">500+</div>
                  <div className="text-sm text-slate-600">Projects Built</div>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative lg:h-[600px] animate-float">
              {/* floating window Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  {mockProfiles.map((profile) => (
                    <div
                      key={profile.id}
                      className={`flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r ${profile.cardGradient}`}
                    >
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br ${profile.gradient}`}
                      >
                        {profile.initial}
                      </div>

                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">
                          {profile.name}
                        </div>

                        <div className="text-sm text-slate-600">
                          {profile.role}
                        </div>

                        <div className="flex space-x-2 mt-2">
                          {profile.skills.map((skill) => (
                            <span
                              key={skill.label}
                              className={`px-2 py-1 text-xs rounded-full ${skill.bg} ${skill.text}`}
                            >
                              {skill.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <div className="inline-flex items-center space-x-2 text-purple-600 font-medium">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span>1,247 developers online now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm scroll-mt-20"
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-3xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-20"></div>

            <div className="relative px-8 py-16 text-center space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                Ready to Find Your Dev Partner?
              </h2>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                Join thousands of developers already collaborating and building
                amazing projects on Devmate.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  Create Free Account
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 bg-purple-500/20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-purple-500/30 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;

import { useNavigate } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";

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

const HeroSection = () => {
  const navigate = useNavigate();

  return (
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
              <Star size={18} />
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
                <ArrowRight size={20} />
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
                <div className="text-sm text-slate-600">Active Developers</div>
              </div>
              <div className="h-12 w-px bg-slate-300"></div>
              <div>
                <div className="text-3xl font-bold text-slate-900">5K+</div>
                <div className="text-sm text-slate-600">Successful Matches</div>
              </div>
              <div className="h-12 w-px bg-slate-300"></div>
              <div>
                <div className="text-3xl font-bold text-slate-900">500+</div>
                <div className="text-sm text-slate-600">Projects Built</div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative lg:h-[600px] animate-float mt-10">
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
  );
};

export default HeroSection;

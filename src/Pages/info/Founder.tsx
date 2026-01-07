import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import CodeIcon from "@mui/icons-material/Code";

const Founder: React.FC = () => {
  const navigate = useNavigate();

  // Replace with your actual image path
  const founderImage = "/path-to-your-image.jpg"; // Update this with your actual image path

  const techStack = [
    "ReactJS",
    "NextJS",
    "Redux",
    "TypeScript",
    "JavaScript",
    "Java",
    "SpringBoot",
    "PostgreSQL",
    "MongoDB",
    "TailwindCSS",
    "Bootstrap",
    "Jest",
    "Git",
  ];

  const socialLinks = {
    linkedin: "https://linkedin.com/in/your-profile", // Update with your LinkedIn URL
    github: "https://github.com/your-username", // Update with your GitHub URL
    portfolio: "https://your-portfolio.com", // Update with your portfolio URL
    codeforces: "https://codeforces.com/profile/your-username", // Optional: Update with your Codeforces profile
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Content */}
      <div className="pt-7 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Meet the{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Founder
              </span>
            </h1>
            <p className="text-xl text-slate-600">
              Building Devmate to connect developers worldwide
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-5 gap-8 p-8 md:p-12">
              {/* Profile Image Column */}
              <div className="md:col-span-2 flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-xl ring-4 ring-purple-100">
                    <img
                      src={founderImage}
                      alt="Founder"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to a gradient if image fails to load
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.style.background =
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl shadow-lg">
                    <CodeIcon sx={{ fontSize: 20 }} />
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-col space-y-3 w-full">
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    <LinkedInIcon />
                    <span className="font-medium">LinkedIn Profile</span>
                  </a>

                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    <GitHubIcon />
                    <span className="font-medium">GitHub Profile</span>
                  </a>

                  <a
                    href={socialLinks.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all cursor-pointer shadow-lg"
                  >
                    <LanguageIcon />
                    <span className="font-medium">Portfolio Website</span>
                  </a>
                </div>
              </div>

              {/* About Content Column */}
              <div className="md:col-span-3 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Ankit Ahuja
                  </h2>
                  <p className="text-xl text-purple-600 font-semibold mb-6">
                    Founder & Full-Stack Architect
                  </p>

                  <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-4">
                    <p className="text-lg leading-relaxed text-gray-700">
                      I founded <strong>Devmate</strong> to solve the isolation
                      often felt in solo development. With over{" "}
                      <strong>5 years of experience</strong> as a Full-Stack
                      Developer, I built this platform from the first line of
                      code to final deployment. As a{" "}
                      <strong>Frontend Specialist</strong>
                      and <strong>MERN Stack expert</strong>, I’ve ensured that
                      every feature—from the complex matching algorithms to
                      real-time communication—is crafted with
                      <strong> high performance</strong> and{" "}
                      <strong>intuitive design</strong> in mind. My goal is to
                      bridge the gap between heavy engineering and seamless user
                      experiences to help developers find their perfect project
                      partners.
                    </p>
                  </div>
                </div>

                {/* Tech Stack Section */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
                    <CodeIcon className="text-purple-600" />
                    <span>Tech Stack & Expertise</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-200 hover:border-purple-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="mt-12 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4 text-center">
              The Vision Behind Devmate
            </h2>
            <p className="text-lg text-purple-100 leading-relaxed text-center max-w-3xl mx-auto">
              Devmate was born from my own experience of struggling to find the
              right coding partners for projects. I envisioned a platform where
              developers could connect based on skills, interests, and
              compatibility—not just through cold LinkedIn messages or forum
              posts. By combining modern swipe-based matching with professional
              networking, Devmate makes finding your ideal dev partner as
              intuitive as it should be.
            </p>
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/about")}
                className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                Learn More About Devmate
              </button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Let's Connect!
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              Interested in collaborating or want to discuss technology? Reach
              out to me through any of the platforms above.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Founder;

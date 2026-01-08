import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import founderImage from "../../Images/AnkitProfilePic.webp";

const Founder: React.FC = () => {
  const navigate = useNavigate();

  // Tech stack list (now used as simple text labels)
  const techStack = [
    "ReactJS",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "MongoDB",
    "Express.js",
    "Node.js",
    "Redux",
    "Tailwind CSS",
    "Webpack",
    "AWS",
  ];

  const socialLinks = {
    linkedin: "https://www.linkedin.com/in/ankitahuja98/",
    github: "https://github.com/ankitahuja98",
    portfolio: "https://ankitahujaportfolio.netlify.app/",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <div className="pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* HEADER SECTION */}
          <div className="text-center mb-5">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              Meet the{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Founder
              </span>
            </h1>
            <p className="text-xl text-slate-600">
              Building Devmate to connect developers worldwide
            </p>
          </div>

          {/* MAIN CARD */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white mb-6">
            <div className="grid md:grid-cols-12 gap-0">
              {/* LEFT COLUMN */}
              <div className="md:col-span-4 bg-slate-50/50 p-8 flex flex-col items-center border-r border-slate-100">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-44 h-44 rounded-full p-1 bg-gradient-to-tr from-purple-600 to-blue-500 shadow-lg">
                    <div className="bg-white rounded-full p-1 h-full w-full overflow-hidden">
                      <img
                        src={founderImage}
                        alt="Founder"
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement!.style.background =
                            "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)";
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3 mb-8">
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white text-[#0a66c2] rounded-full shadow-sm border border-slate-200 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <LinkedInIcon fontSize="small" />
                  </a>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white text-slate-900 rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <GitHubIcon fontSize="small" />
                  </a>
                  <a
                    href={socialLinks.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white text-purple-600 rounded-full shadow-sm border border-slate-200 hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <LanguageIcon fontSize="small" />
                  </a>
                </div>

                {/* UPDATED TECH STACK */}
                <div className="w-full pt-6 border-t border-slate-200">
                  <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                    <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
                    Tech Expertise
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, index) => (
                      <span key={index} className="interest-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="md:col-span-8 p-10 md:p-14 flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-slate-900 mb-2">
                  Ankit Ahuja
                </h2>
                <p className="text-2xl font-semibold text-purple-600 mb-8">
                  Founder & Full-Stack Architect
                </p>

                <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-4">
                  <p>
                    I founded <strong>Devmate</strong> to solve the isolation
                    many developers face when working alone. With over
                    <strong> 5 years of experience</strong> building full-stack
                    applications, I built this platform to connect developers
                    meaningfully.
                  </p>

                  <p>
                    As a <strong>Frontend Specialist</strong> and{" "}
                    <strong>MERN Stack developer</strong>, I focus on creating
                    high-performance, intuitive digital experiences. From
                    real-time communication to intelligent matching — everything
                    is engineered to feel seamless.
                  </p>
                  <p>
                    Beyond building the platform, I am committed to fostering a
                    community where developers can grow together.{" "}
                    <strong>Devmate</strong> is not just a tool, but a space for
                    collaboration, learning, and shared innovation — empowering
                    developers to turn their ideas into impactful real-world
                    projects. I envision a world where developers can easily
                    find the right partners, break through creative barriers,
                    and build confidently. Together, we can shape a future where
                    collaboration fuels every great idea.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl shadow-2xl p-6 md:p-8 text-white">
            <h2 className="text-3xl font-bold text-center">
              The Vision Behind Devmate
            </h2>
            <p className="text-lg text-purple-100 leading-relaxed text-center max-w-3xl mx-auto">
              Devmate was created to help developers connect based on skills,
              interests, and compatibility — making it easier than ever to find
              the right partners for collaboration.
            </p>

            <div className=" flex justify-center items-center gap-5">
              <div className="mt-5">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  Get in Touch
                </button>
              </div>
              {/* Learn more button remains */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate("/about")}
                  className="px-8 py-4 bg-white/20 backdrop-blur text-white border border-white/30 font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 cursor-pointer"
                >
                  Learn More About Devmate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Founder;

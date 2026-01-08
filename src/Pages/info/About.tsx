import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Content */}
      <div className="pt-7 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Devmate
              </span>
            </h1>

            <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
              <p className=" leading-relaxed">
                Devmate is a platform built to connect developers, inspire
                collaboration, and create meaningful opportunities to build
                amazing projects together. Whether you're looking for a
                teammate, a learning partner, or someone who shares your passion
                for coding, Devmate helps bridge that gap.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                Our Mission
              </h2>
              <p className="leading-relaxed">
                I believe that great software is created through collaboration.
                Devmate exists to help developers find the right people to work
                with — whether it’s a startup co-founder, an open-source
                contributor, or a coding partner to grow together. The mission
                is simple: remove isolation and enable developers to build
                confidently alongside others.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                What We Do
              </h2>
              <p className="leading-relaxed">
                Devmate provides a space for developers to showcase their
                skills, connect with like-minded individuals, and form
                meaningful partnerships. By highlighting tech stacks, interests,
                and project goals, the platform makes it easier to discover
                people who truly complement your strengths. Intelligent matching
                features help streamline this process, ensuring connections that
                actually matter.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                Why Choose Devmate?
              </h2>
              <ul className="space-y-3 list-disc list-inside leading-relaxed">
                <li>
                  <strong>Smart Matching:</strong> Discover collaborators based
                  on skills, goals, and compatibility
                </li>
                <li>
                  <strong>Professional Profiles:</strong> Showcase your
                  experience, projects, and tech stack
                </li>
                <li>
                  <strong>Real-Time Messaging:</strong> Communicate instantly to
                  share ideas and plan projects
                </li>
                <li>
                  <strong>Community Focused:</strong> Join a growing network of
                  passionate developers worldwide
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                My Story
              </h2>
              <p className="leading-relaxed">
                Devmate was built entirely by me — from design and architecture
                to development and deployment. As a developer, I personally
                experienced the challenge of working alone and struggling to
                find the right collaborators. I wanted to create a platform that
                makes connection simple, meaningful, and accessible for all
                developers, regardless of experience level.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                A Solo-Built Platform
              </h2>
              <p className="leading-relaxed">
                Every feature in Devmate is crafted with care: intelligent
                matching, user profiles, real-time chat, and the overall user
                experience. My goal has always been to create a seamless and
                intuitive environment that empowers developers to collaborate
                and bring ideas to life. Devmate represents both my passion and
                commitment to the developer community.
              </p>

              <div className="mt-10 pt-8 border-t border-slate-200">
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  Get Started Today
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

export default About;

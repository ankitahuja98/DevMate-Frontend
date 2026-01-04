import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Devmate
              </span>
            </h1>

            <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
              <p className="text-xl leading-relaxed">
                Devmate is a platform designed to connect developers, foster
                collaboration, and create opportunities for building amazing
                projects together.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                Our Mission
              </h2>
              <p className="leading-relaxed">
                We believe that great software is built by great teams. Our
                mission is to help developers find their perfect coding
                partners, whether you're looking for a co-founder for your
                startup, a collaborator for an open-source project, or simply
                someone to learn and grow with.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                What We Do
              </h2>
              <p className="leading-relaxed">
                Devmate provides a unique platform where developers can showcase
                their skills, discover like-minded professionals, and connect
                based on shared interests, tech stacks, and project goals. Our
                intelligent matching system helps you find developers who
                complement your skills and share your vision.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                Why Choose Devmate?
              </h2>
              <ul className="space-y-3 list-disc list-inside leading-relaxed">
                <li>
                  <strong>Smart Matching:</strong> Find developers based on
                  skills, interests, and project compatibility
                </li>
                <li>
                  <strong>Professional Profiles:</strong> Showcase your
                  expertise, projects, and tech stack
                </li>
                <li>
                  <strong>Real-Time Communication:</strong> Built-in messaging
                  to discuss ideas and coordinate
                </li>
                <li>
                  <strong>Community Driven:</strong> Join a growing community of
                  passionate developers
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                Our Story
              </h2>
              <p className="leading-relaxed">
                Devmate was founded by developers who experienced firsthand the
                challenges of finding the right collaborators for projects. We
                understand the importance of not just technical skills, but also
                compatible working styles, shared goals, and good communication.
                That's why we built Devmate—to make connecting with your ideal
                dev partner as easy as possible.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                Join Our Community
              </h2>
              <p className="leading-relaxed">
                Whether you're a seasoned professional or just starting your
                development journey, Devmate welcomes you. Connect with
                thousands of developers, share your passion for coding, and
                build something amazing together.
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

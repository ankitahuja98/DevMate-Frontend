import React from "react";
import { useNavigate } from "react-router-dom";
import DevMateLogoWhite from "../Images/devmateLogo-white.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const useStyle = {
    logoStyle: {
      height: "40px",
    },
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={DevMateLogoWhite}
                alt="DevMate"
                style={useStyle.logoStyle}
              />
            </div>

            <p className="text-slate-400 leading-relaxed">
              Where developers meet, share ideas, and discover exciting
              opportunities to collaborate.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/ankitahuja98"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>

              <a
                href="https://www.linkedin.com/in/ankitahuja98/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate("/explore")}
                  className="hover:text-purple-400 transition-colors text-left cursor-pointer"
                >
                  Explore Developers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/premium")}
                  className="hover:text-purple-400 transition-colors text-left cursor-pointer"
                >
                  Go Premium
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/features")}
                  className="hover:text-purple-400 transition-colors text-left cursor-pointer"
                >
                  Features
                </button>
              </li>
            </ul>
          </div>

          {/* Account Settings */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Account</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate("/profile")}
                  className="hover:text-purple-400 transition-colors text-left cursor-pointer"
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/matches")}
                  className="hover:text-purple-400 transition-colors text-left cursor-pointer"
                >
                  Matches
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-purple-400 transition-colors text-left cursor-pointer"
                >
                  About Devmate
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/founder")}
                  className="hover:text-purple-400 transition-colors text-left cursor-pointer"
                >
                  Founder
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="hover:text-purple-400 transition-colors text-left cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/privacy-policy")}
                  className="hover:text-purple-400 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/terms")}
                  className="hover:text-purple-400 transition-colors text-left cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/refund-policy")}
                  className="hover:text-purple-400 transition-colors text-left cursor-pointer"
                >
                  Refund & Cancellation
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2026 Devmate. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <button
                onClick={() => navigate("/privacy-policy")}
                className="hover:text-purple-400 transition-colors cursor-pointer"
              >
                Privacy
              </button>
              <button
                onClick={() => navigate("/terms")}
                className="hover:text-purple-400 transition-colors cursor-pointer"
              >
                Terms
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="hover:text-purple-400 transition-colors cursor-pointer"
              >
                Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

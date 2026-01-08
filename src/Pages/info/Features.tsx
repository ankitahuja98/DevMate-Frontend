import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import SwipeIcon from "@mui/icons-material/Swipe";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatIcon from "@mui/icons-material/Chat";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import BarChartIcon from "@mui/icons-material/BarChart";

const Features = () => {
  const navigate = useNavigate();

  const coreFeatures = [
    {
      icon: <SwipeIcon sx={{ fontSize: 48 }} />,
      title: "Smart Swipe Matching",
      description:
        "Browse through developer profiles and swipe right to connect or left to pass. Our intelligent algorithm shows you the most compatible developers based on your skills and interests.",
      details: [
        "Intuitive swipe interface",
        "Personalized recommendations",
        "Filter by tech stack and experience",
        "Save profiles for later review",
      ],
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 48 }} />,
      title: "See Who Likes You",
      description:
        "Premium members can instantly see who swiped right on their profile, making it easier to connect with interested developers without waiting for mutual matches.",
      details: [
        "Instant visibility of interested developers",
        "Priority in their feed",
        "Direct connection option",
        "Premium-only feature",
      ],
      isPremium: true,
    },
    {
      icon: <PersonAddIcon sx={{ fontSize: 48 }} />,
      title: "Connection Requests",
      description:
        "Send connection requests to developers you're interested in collaborating with. Accept or decline incoming requests with a simple tap.",
      details: ["Send requests", "Manage pending requests"],
    },
    {
      icon: <ChatIcon sx={{ fontSize: 48 }} />,
      title: "Real-Time Messaging",
      description:
        "Once connected, chat directly with other developers. Discuss project ideas, share code snippets, or plan your next collaboration.",
      details: ["Instant messaging", "Code snippet sharing"],
    },
  ];

  const profileFeatures = [
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: "Showcase Your Tech Stack",
      description:
        "List all the technologies, frameworks, and tools you work with. Let others discover your expertise.",
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      title: "Project Portfolio",
      description:
        "Display your best work. Free users can showcase 2 projects, while Premium members have unlimited project uploads.",
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
      title: "Profile Verification",
      description:
        "Get verified to build trust. Premium members receive priority verification and exclusive badges.",
    },
  ];

  const premiumFeatures = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: "Priority Visibility",
      description:
        "Your profile appears higher in search results and recommendations, increasing your chances of meaningful connections.",
    },
    {
      icon: <NotificationsActiveIcon sx={{ fontSize: 40 }} />,
      title: "Advanced Notifications",
      description:
        "Get instant alerts when someone views your profile, swipes right, or messages you.",
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 40 }} />,
      title: "Analytics Dashboard",
      description:
        "Track profile views, swipe statistics, and connection success rates to optimize your presence.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Core Features */}
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Core Features
            </h2>
            <p className="text-lg text-slate-600 ">
              Essential tools to find and connect with your ideal development
              partner
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {feature.isPremium && (
                  <div className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-3 py-1 rounded-full mb-4">
                    Premium
                  </div>
                )}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-center space-x-2 text-slate-600"
                    >
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Features */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Build Your Developer Profile
            </h2>
            <p className="text-lg text-slate-600">
              Stand out with a comprehensive profile that showcases your skills
              and experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {profileFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Features */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm px-4 py-2 rounded-full mb-4">
              Premium Only
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Unlock Premium Features
            </h2>
            <p className="text-lg text-slate-600">
              Take your networking to the next level with exclusive premium
              benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {premiumFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300"
              >
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl shadow-2xl p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Upgrade?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Get unlimited swipes, see who likes you, and access all premium
              features for just ₹299/month
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/pricing")}
                className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                View Pricing
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 bg-purple-500/20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-purple-500/30 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                Start Free
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Devmate Works
            </h2>
            <p className="text-lg text-slate-600">
              Getting started is simple and takes just a few minutes
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Create Your Profile
                </h3>
                <p className="text-slate-600">
                  Sign up for free and build your developer profile. Add your
                  tech stack, skills, experience, and showcase your best
                  projects.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Start Swiping
                </h3>
                <p className="text-slate-600">
                  Browse through developer profiles. Swipe right on profiles
                  you're interested in connecting with, or swipe left to pass.
                  Our algorithm learns your preferences over time.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Connect & Chat
                </h3>
                <p className="text-slate-600">
                  When both developers swipe right, it's a match! Send
                  connection requests and start chatting. Discuss ideas, share
                  experiences, and plan collaborations.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Build Together
                </h3>
                <p className="text-slate-600">
                  Collaborate on projects, share knowledge, and grow together.
                  Whether it's a side project, open source contribution, or
                  startup idea, find the right partner on Devmate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to Find Your Perfect Dev Partner?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of developers already building amazing things
            together
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            Get Started Free
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Features;

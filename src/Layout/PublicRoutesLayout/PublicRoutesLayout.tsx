import { Outlet, useNavigate } from "react-router-dom";
import DevMateLogo from "../../Images/devmateLogo.png";

const PublicRoutesLayout = () => {
  const navigate = useNavigate();

  const useStyle = {
    logoStyle: {
      height: "45px",
      margin: "2px 2px 2px 25px",
    },
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 "bg-white/90 backdrop-blur-lg shadow-lg"`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div
              className="flex items-center space-x-3 group cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={DevMateLogo} alt="DevMate" style={useStyle.logoStyle} />
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2.5 text-slate-700 font-medium hover:text-purple-600 transition-colors duration-200 cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default PublicRoutesLayout;

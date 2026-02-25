import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="pb-10 px-4 sm:px-6 lg:px-8">
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
  );
};

export default CTASection;

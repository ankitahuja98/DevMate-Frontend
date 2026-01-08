import Footer from "../Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Contact{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Me
              </span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              I'd love to connect! Whether you want to discuss collaborations,
              share an idea, or just say hello — here are the best ways to reach
              me.
            </p>

            <div className="space-y-6 text-slate-700">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Email</h3>
                <p className="mt-1">
                  <a
                    href="mailto:Ankitahuja80@gmail.com"
                    className="text-indigo-600 hover:underline"
                  >
                    Ankitahuja80@gmail.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900">Phone</h3>
                <p className="mt-1 text-slate-700">+91 7042568767</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  LinkedIn
                </h3>
                <p className="mt-1">
                  <a
                    href="https://www.linkedin.com/in/ankitahuja98/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    https://www.linkedin.com/in/ankitahuja98/
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Portfolio
                </h3>
                <p className="mt-1">
                  <a
                    href="https://ankitahujaportfolio.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    https://ankitahujaportfolio.netlify.app/
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

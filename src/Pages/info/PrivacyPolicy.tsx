import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Content */}
      <div className="pt-7 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Privacy{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-slate-600 mb-8">
              Last updated: December 24, 2025
            </p>

            <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
              <p className="leading-relaxed">
                At Devmate, your privacy is extremely important to us. This
                Privacy Policy outlines how your information is collected, used,
                protected, and managed when you use our platform. By accessing
                or using Devmate, you agree to the practices described in this
                policy.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                1. Information We Collect
              </h2>
              <p className="leading-relaxed">
                We collect personal information that you voluntarily provide
                when creating an account or using the platform, such as your
                name, email address, phone number, bio, skills, work experience,
                projects, and profile image. We also collect your login
                credentials and any communication exchanged through our
                messaging system. Additionally, certain information is collected
                automatically when you access Devmate, including your IP
                address, browser type, operating system, pages you visit, time
                spent on the platform, approximate location derived from your IP
                address, and data gathered through cookies or similar
                technologies used for analytics and functionality enhancement.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="leading-relaxed">
                Your information is used to operate and improve the platform,
                enable intelligent matching, personalize your experience, and
                facilitate interaction between users. We use it to process
                transactions, send service-related updates, respond to support
                inquiries, and ensure the security and integrity of the
                platform. Usage data helps us analyze performance trends,
                improve features, and optimize user experience. When applicable,
                and only with your consent, we may also send promotional or
                marketing communications.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                3. Information Sharing and Disclosure
              </h2>
              <p className="leading-relaxed">
                Certain profile details you choose to provide may be visible to
                other Devmate users to enable professional networking and
                collaboration. We may share your information with trusted
                service providers who assist in operating the platform,
                conducting analytics, or delivering technical support.
                Information may also be disclosed when required by law, in
                connection with protecting our rights, or during business
                transitions such as mergers or acquisitions. Information is only
                shared with your explicit consent when the situation requires
                it.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                4. Data Security
              </h2>
              <p className="leading-relaxed">
                We employ reasonable technical and organizational measures to
                safeguard your personal information from unauthorized access,
                alteration, disclosure, or destruction. Despite these efforts,
                no method of data transmission or storage is completely secure,
                and we cannot guarantee absolute protection against potential
                risks.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                5. Your Rights and Choices
              </h2>
              <p className="leading-relaxed">
                You have the right to access, update, or correct the personal
                information associated with your account. You may request
                deletion of your data, withdraw consent for certain uses.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                6. Data Retention
              </h2>
              <p className="leading-relaxed">
                We retain your personal information only for as long as
                necessary to deliver our services and fulfill the purposes
                outlined in this Privacy Policy. Retention periods may be
                extended when required by law or necessary to resolve disputes
                or enforce agreements.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                7. Children's Privacy
              </h2>
              <p className="leading-relaxed">
                Devmate is intended for users aged 18 and above. We do not
                knowingly collect personal information from individuals under
                this age. If you believe a minor has provided us with personal
                information, please contact us immediately so we can take
                appropriate action.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                8. International Data Transfers
              </h2>
              <p className="leading-relaxed">
                Your information may be processed and stored in countries other
                than your own, where data protection laws may differ. Regardless
                of location, we take measures to ensure your information remains
                protected and handled in accordance with this Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                9. Changes to This Privacy Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy periodically to reflect
                changes in our practices or legal obligations. Any updates will
                be posted on this page along with a revised "Last Updated" date.
                Continued use of Devmate after changes are posted signifies your
                acceptance of the updated policy.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                10. Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have questions, concerns, or requests regarding this
                Privacy Policy or your personal information, please contact us
                at: Ankitahuja80@gmail.com.
              </p>

              <div className="mt-10 pt-8 border-t border-slate-200">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  Contact Us
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

export default PrivacyPolicy;

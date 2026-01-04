import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Privacy{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-slate-600 mb-8">Last updated: January 5, 2026</p>

            <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
              <p className="leading-relaxed">
                At Devmate, we take your privacy seriously. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our platform.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                1. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                Personal Information
              </h3>
              <p className="leading-relaxed">
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>
                  Name and contact information (email address, phone number)
                </li>
                <li>
                  Profile information (bio, skills, experience, profile picture)
                </li>
                <li>Account credentials (username, password)</li>
                <li>
                  Professional information (work history, projects, tech stack)
                </li>
                <li>Communication data (messages sent through our platform)</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                Automatically Collected Information
              </h3>
              <p className="leading-relaxed">
                When you access our platform, we automatically collect certain
                information, including:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>
                  Device information (IP address, browser type, operating
                  system)
                </li>
                <li>Usage data (pages visited, features used, time spent)</li>
                <li>
                  Location data (approximate location based on IP address)
                </li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Match you with compatible developers</li>
                <li>Process your transactions and send related information</li>
                <li>
                  Send you technical notices, updates, and support messages
                </li>
                <li>Respond to your comments and questions</li>
                <li>
                  Detect, prevent, and address technical issues and fraudulent
                  activity
                </li>
                <li>Analyze usage patterns and improve user experience</li>
                <li>Send you marketing communications (with your consent)</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                3. Information Sharing and Disclosure
              </h2>
              <p className="leading-relaxed">
                We may share your information in the following situations:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>
                  <strong>With Other Users:</strong> Your profile information is
                  visible to other users to facilitate connections
                </li>
                <li>
                  <strong>With Service Providers:</strong> We share information
                  with third-party vendors who perform services on our behalf
                </li>
                <li>
                  <strong>For Legal Purposes:</strong> When required by law or
                  to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a
                  merger, acquisition, or sale of assets
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you explicitly agree
                  to share information
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                4. Data Security
              </h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational measures
                to protect your personal information. However, no method of
                transmission over the Internet or electronic storage is 100%
                secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                5. Your Rights and Choices
              </h2>
              <p className="leading-relaxed">
                You have the following rights regarding your personal
                information:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>
                  <strong>Access:</strong> Request access to your personal
                  information
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information
                </li>
                <li>
                  <strong>Data Portability:</strong> Request a copy of your data
                  in a portable format
                </li>
                <li>
                  <strong>Opt-Out:</strong> Opt out of marketing communications
                </li>
                <li>
                  <strong>Cookie Management:</strong> Control cookies through
                  your browser settings
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                6. Data Retention
              </h2>
              <p className="leading-relaxed">
                We retain your personal information for as long as necessary to
                provide our services and fulfill the purposes outlined in this
                Privacy Policy, unless a longer retention period is required by
                law.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                7. Children's Privacy
              </h2>
              <p className="leading-relaxed">
                Our services are not intended for individuals under the age of
                18. We do not knowingly collect personal information from
                children under 18. If you become aware that a child has provided
                us with personal information, please contact us.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                8. International Data Transfers
              </h2>
              <p className="leading-relaxed">
                Your information may be transferred to and processed in
                countries other than your country of residence. We ensure
                appropriate safeguards are in place for such transfers.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                9. Changes to This Privacy Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                10. Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <ul className="space-y-2 list-none leading-relaxed ml-4">
                <li>Email: privacy@devmate.com</li>
                <li>Address: 123 Tech Street, San Francisco, CA 94105</li>
              </ul>

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

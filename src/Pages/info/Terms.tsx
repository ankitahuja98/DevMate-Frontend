import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Content */}
      <div className="pt-7 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Terms &{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Conditions
              </span>
            </h1>
            <p className="text-slate-600 mb-8">Last updated: January 5, 2026</p>

            <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
              <p className="leading-relaxed">
                Welcome to Devmate. By accessing or using our platform, you
                agree to be bound by these Terms and Conditions. Please read
                them carefully.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed">
                By creating an account, accessing, or using Devmate, you agree
                to these Terms and Conditions and our Privacy Policy. If you do
                not agree, please do not use our services.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                2. User Accounts
              </h2>
              <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                Account Creation
              </h3>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>You must be at least 18 years old to create an account</li>
                <li>You must provide accurate and complete information</li>
                <li>
                  You are responsible for maintaining the security of your
                  account
                </li>
                <li>
                  You must notify us immediately of any unauthorized access
                </li>
                <li>
                  One person or legal entity may maintain only one account
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                Account Responsibilities
              </h3>
              <p className="leading-relaxed">
                You are responsible for all activities that occur under your
                account. You agree to:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>Keep your password confidential</li>
                <li>Not share your account with others</li>
                <li>Notify us of any security breaches</li>
                <li>
                  Ensure your profile information is accurate and up-to-date
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                3. User Conduct
              </h2>
              <p className="leading-relaxed">You agree not to:</p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>Violate any laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Post false, misleading, or fraudulent content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Spam or send unsolicited messages</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools to access our services</li>
                <li>Impersonate another person or entity</li>
                <li>Post malicious code or viruses</li>
                <li>Collect user information without consent</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                4. Content
              </h2>
              <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                User Content
              </h3>
              <p className="leading-relaxed">
                You retain ownership of content you post on Devmate. By posting
                content, you grant us a worldwide, non-exclusive, royalty-free
                license to use, display, and distribute your content on our
                platform.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                Content Standards
              </h3>
              <p className="leading-relaxed">All content must:</p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>Be accurate and not misleading</li>
                <li>Not violate any third-party rights</li>
                <li>
                  Not contain illegal, offensive, or inappropriate material
                </li>
                <li>Comply with all applicable laws</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                5. Intellectual Property
              </h2>
              <p className="leading-relaxed">
                The Devmate platform, including its design, features, and
                content (excluding user content), is owned by Devmate and
                protected by intellectual property laws. You may not copy,
                modify, or distribute our content without permission.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                6. Subscriptions and Payments
              </h2>
              <p className="leading-relaxed">
                Some features require a paid subscription. By subscribing, you
                agree to:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>Pay all fees associated with your subscription</li>
                <li>Provide accurate payment information</li>
                <li>Authorize automatic recurring charges (if applicable)</li>
                <li>Review our Refund and Cancellation Policy</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                7. Termination
              </h2>
              <p className="leading-relaxed">
                We may suspend or terminate your account if you violate these
                Terms or engage in fraudulent activity. You may also terminate
                your account at any time through your account settings.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                8. Disclaimers
              </h2>
              <p className="leading-relaxed">
                Devmate is provided "as is" without warranties of any kind. We
                do not guarantee that:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>The service will be uninterrupted or error-free</li>
                <li>Results obtained from the service will be accurate</li>
                <li>All errors will be corrected</li>
                <li>The service is free from viruses or harmful components</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                9. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, Devmate shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages arising from your use of the service.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                10. Indemnification
              </h2>
              <p className="leading-relaxed">
                You agree to indemnify and hold harmless Devmate from any
                claims, damages, or expenses arising from your use of the
                service or violation of these Terms.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                11. Governing Law
              </h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of the State of California, United States, without
                regard to conflict of law provisions.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                12. Changes to Terms
              </h2>
              <p className="leading-relaxed">
                We reserve the right to modify these Terms at any time. We will
                notify you of material changes via email or through the
                platform. Your continued use of the service after changes
                constitutes acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                13. Contact Information
              </h2>
              <p className="leading-relaxed">
                For questions about these Terms, please contact us at:
              </p>
              <ul className="space-y-2 list-none leading-relaxed ml-4">
                <li>Email: legal@devmate.com</li>
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

export default Terms;

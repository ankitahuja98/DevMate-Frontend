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
            <p className="text-slate-600 mb-8">
              Last updated: December 24, 2025
            </p>

            <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
              <p className="leading-relaxed">
                Welcome to Devmate. By accessing or using the Devmate platform,
                you acknowledge that you have read, understood, and agree to be
                bound by these Terms and Conditions as well as our Privacy
                Policy. If you do not agree with any part of these terms, you
                must discontinue use of the platform immediately.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed">
                By creating an account or continuing to use Devmate, you confirm
                your acceptance of these Terms and Conditions. These terms apply
                to all users, including visitors, registered members, and
                individuals accessing the platform on behalf of an organization.
                If you do not agree to the Terms, you are not permitted to
                access or use the platform.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                2. User Accounts
              </h2>
              <p className="leading-relaxed">
                To access certain features of Devmate, you must create an
                account and provide accurate, complete, and current information.
                You must be at least 18 years of age to register. You are solely
                responsible for maintaining the confidentiality of your login
                credentials and any actions that occur under your account. You
                agree to notify us immediately of any suspected unauthorized
                access or security breach. Each individual or entity is
                permitted to maintain one account, and account sharing is
                strictly prohibited.
              </p>

              <p className="leading-relaxed">
                As a user, you are responsible for ensuring the accuracy of your
                profile information and updating it as necessary. You must not
                share your password with others, allow third parties to access
                your account, or engage in any activity that compromises the
                security or integrity of the platform.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                3. User Conduct
              </h2>
              <p className="leading-relaxed">
                By using Devmate, you agree to behave responsibly and comply
                with all applicable laws and regulations. You must not engage in
                conduct that infringes on the rights of others, including the
                posting of misleading, fraudulent, harmful, or defamatory
                content. You must refrain from harassment, abuse, impersonation,
                or the distribution of unsolicited messages. You are prohibited
                from attempting to gain unauthorized access to the platform,
                deploying automated tools, distributing malicious code, or
                collecting information from other users without explicit
                consent.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                4. Content
              </h2>
              <p className="leading-relaxed">
                You retain ownership of the content you publish on Devmate,
                including your profile details, projects, and communication.
                However, by posting content on the platform, you grant Devmate a
                worldwide, non-exclusive, royalty-free license to use, display,
                and distribute your content as necessary to operate the service.
                All content you submit must be truthful, lawful, and free of
                material that infringes on the rights of others or violates any
                intellectual property, privacy, or security laws.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                5. Intellectual Property
              </h2>
              <p className="leading-relaxed">
                All intellectual property related to Devmate, including its
                design, interface, features, branding, and underlying
                technology, is owned by Devmate and protected by applicable
                copyright and trademark laws. You may not copy, reuse, modify,
                or distribute any part of the platform without explicit written
                permission. This excludes content you personally upload, which
                remains your property.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                6. Subscriptions and Payments
              </h2>
              <p className="leading-relaxed">
                Certain features of Devmate may require a paid subscription. By
                subscribing, you agree to provide accurate billing information
                and authorize recurring payments when required. It is your
                responsibility to review and understand our refund and
                cancellation policies. Devmate reserves the right to modify
                subscription fees or introduce new pricing at any time, with or
                without reasonable notice provided to users.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                7. Termination
              </h2>
              <p className="leading-relaxed">
                We reserve the right to suspend or terminate your account at our
                discretion if you violate these Terms, engage in fraudulent or
                harmful behavior, or misuse the platform in any way. You may
                terminate your account at any time through your account
                settings. Upon termination, your access to the platform will
                cease, but certain obligations, such as confidentiality and
                intellectual property restrictions, may continue to apply.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                8. Disclaimers
              </h2>
              <p className="leading-relaxed">
                Devmate is provided “as is” and “as available,” without
                warranties of any kind. We do not guarantee that the platform
                will operate without interruptions, errors, or security
                vulnerabilities. We do not warrant that the results obtained
                from using the service will be accurate or reliable. While we
                strive to maintain a safe and functional environment, we cannot
                guarantee that the platform will be free from viruses or harmful
                components.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                9. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                To the fullest extent permitted by law, Devmate shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages arising from your use of the platform,
                inability to access the service, loss of data, or interactions
                with other users. Your sole remedy for dissatisfaction with the
                service is to discontinue use of the platform.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                10. Indemnification
              </h2>
              <p className="leading-relaxed">
                You agree to indemnify, defend, and hold Devmate harmless from
                any claims, damages, liabilities, legal fees, or expenses
                arising from your use of the platform, violation of these Terms,
                or infringement of any rights of another party. This obligation
                continues even after account termination.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                11. Changes to Terms
              </h2>
              <p className="leading-relaxed">
                We may update or modify these Terms at any time to reflect
                changes in our services, legal requirements, or business
                operations. Any significant changes will be communicated via
                email or platform notifications. Continued use of Devmate after
                updates constitutes acceptance of the revised Terms.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                12. Contact Information
              </h2>
              <p className="leading-relaxed">
                If you have questions or concerns about these Terms and
                Conditions, please contact us at Ankitahuja80@gmail.com we aim
                to respond promptly and address your inquiries professionally.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;

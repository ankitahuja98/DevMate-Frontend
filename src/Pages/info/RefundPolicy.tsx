import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const RefundPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Refund & Cancellation{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-slate-600 mb-8">Last updated: January 5, 2026</p>

            <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
              <p className="leading-relaxed">
                At Devmate, we want you to be completely satisfied with your
                subscription. This Refund and Cancellation Policy outlines the
                terms and conditions for refunds and cancellations.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                1. Subscription Plans
              </h2>
              <p className="leading-relaxed">
                Devmate offers various subscription plans with different
                features and pricing. All subscription fees are billed in
                advance on a recurring basis (monthly or annually, depending on
                your plan).
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                2. Free Trial Period
              </h2>
              <p className="leading-relaxed">
                We may offer a free trial period for certain subscription plans.
                During the trial period:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>You have full access to premium features</li>
                <li>You can cancel at any time without charge</li>
                <li>
                  Your subscription will automatically begin after the trial
                  ends unless cancelled
                </li>
                <li>
                  You will be charged the subscription fee when the trial
                  expires
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                3. Cancellation Policy
              </h2>

              <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                How to Cancel
              </h3>
              <p className="leading-relaxed">
                You can cancel your subscription at any time through:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>Your account settings under "Subscription"</li>
                <li>Contacting our support team at support@devmate.com</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                Cancellation Terms
              </h3>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>
                  Cancellations take effect at the end of your current billing
                  period
                </li>
                <li>
                  You will retain access to premium features until the end of
                  the paid period
                </li>
                <li>
                  No partial refunds are provided for unused time in your
                  billing cycle
                </li>
                <li>
                  Cancelled subscriptions will revert to free accounts (if
                  applicable)
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                4. Refund Policy
              </h2>

              <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                30-Day Money-Back Guarantee
              </h3>
              <p className="leading-relaxed">
                We offer a 30-day money-back guarantee for first-time
                subscribers:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>Applies only to your first subscription payment</li>
                <li>
                  Request a refund within 30 days of your initial purchase
                </li>
                <li>Full refund of the subscription fee will be processed</li>
                <li>
                  Your account will be downgraded to a free plan (if applicable)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                Refund Eligibility
              </h3>
              <p className="leading-relaxed">
                Refunds are available under the following conditions:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>
                  Technical issues that prevent you from using the service
                </li>
                <li>Billing errors or duplicate charges</li>
                <li>Service not as described or advertised</li>
                <li>
                  Within 30 days of initial subscription (first-time subscribers
                  only)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                Non-Refundable Situations
              </h3>
              <p className="leading-relaxed">
                Refunds are not available in the following cases:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>
                  After the 30-day guarantee period (for first-time subscribers)
                </li>
                <li>
                  Renewal payments (after your initial subscription period)
                </li>
                <li>Violation of our Terms and Conditions</li>
                <li>
                  Account suspension or termination due to policy violations
                </li>
                <li>
                  Change of mind after using the service beyond the trial period
                </li>
                <li>
                  Partial refunds for unused portions of your subscription
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                5. Requesting a Refund
              </h2>
              <p className="leading-relaxed">To request a refund:</p>
              <ol className="space-y-3 list-decimal list-inside leading-relaxed ml-4">
                <li>
                  Contact our support team at support@devmate.com or through the
                  contact form
                </li>
                <li>
                  Include your account email and reason for the refund request
                </li>
                <li>
                  Provide any relevant documentation (for technical issues)
                </li>
                <li>Allow 5-7 business days for review and processing</li>
              </ol>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                6. Refund Processing
              </h2>
              <p className="leading-relaxed">Once your refund is approved:</p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>Refunds are processed to the original payment method</li>
                <li>Processing time: 5-10 business days</li>
                <li>Bank processing may add additional time</li>
                <li>
                  You will receive an email confirmation when the refund is
                  processed
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                7. Annual Subscriptions
              </h2>
              <p className="leading-relaxed">For annual subscriptions:</p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>
                  30-day money-back guarantee applies to first-time annual
                  subscribers
                </li>
                <li>
                  After 30 days, no refunds for the remaining subscription
                  period
                </li>
                <li>
                  Cancellation prevents future renewals but doesn't trigger a
                  refund
                </li>
                <li>
                  Access continues until the end of the paid annual period
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                8. Automatic Renewal
              </h2>
              <p className="leading-relaxed">
                All subscriptions automatically renew unless cancelled:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>You will be notified before each renewal</li>
                <li>Cancel before the renewal date to avoid charges</li>
                <li>Renewal charges are non-refundable</li>
                <li>Manage auto-renewal settings in your account</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                9. Billing Disputes
              </h2>
              <p className="leading-relaxed">
                If you notice an incorrect charge:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>Contact us immediately at billing@devmate.com</li>
                <li>We will investigate and resolve billing errors promptly</li>
                <li>Duplicate or erroneous charges will be refunded in full</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                10. Fair Use Policy
              </h2>
              <p className="leading-relaxed">
                We reserve the right to deny refunds if we detect:
              </p>
              <ul className="space-y-2 list-disc list-inside leading-relaxed ml-4">
                <li>Abuse of the refund policy</li>
                <li>Multiple refund requests across different accounts</li>
                <li>Fraudulent activity</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                11. Changes to This Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Refund and Cancellation Policy from time to
                time. Changes will be posted on this page with an updated
                revision date. Continued use of our service after changes
                constitutes acceptance of the updated policy.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                12. Contact Us
              </h2>
              <p className="leading-relaxed">
                For questions about refunds or cancellations:
              </p>
              <ul className="space-y-2 list-none leading-relaxed ml-4">
                <li>Email: support@devmate.com or billing@devmate.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Tech Street, San Francisco, CA 94105</li>
              </ul>

              <div className="mt-10 pt-8 border-t border-slate-200 bg-purple-50 -mx-8 -mb-8 px-8 pb-8 md:-mx-12 md:-mb-12 md:px-12 md:pb-12 rounded-b-2xl">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Need Help?
                </h3>
                <p className="text-slate-600 mb-4">
                  If you have any questions about our refund or cancellation
                  policy, our support team is here to help.
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  Contact Support
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

export default RefundPolicy;

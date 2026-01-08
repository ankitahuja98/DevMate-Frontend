import Footer from "../Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Content */}
      <div className="pt-7 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Refund & Cancellation{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-slate-600 mb-8">
              Last updated: December 24, 2025
            </p>

            <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
              <p className="leading-relaxed">
                At Devmate, we offer a single premium subscription plan called{" "}
                <strong>Devmate Premium</strong>. This plan provides enhanced
                features and additional functionality to improve your overall
                experience. By purchasing Devmate Premium, you acknowledge and
                agree to the terms outlined in this Refund and Cancellation
                Policy. Please read this document carefully before subscribing.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                1. No Free Trial
              </h2>
              <p className="leading-relaxed">
                Devmate does not offer a free trial for Devmate Premium. All
                premium features are made available immediately upon successful
                payment. Since access is granted instantly, the subscription fee
                is charged at the time of purchase and is considered final.
                Users are encouraged to review the available features and
                pricing before upgrading to Premium.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                2. Subscription and Billing
              </h2>
              <p className="leading-relaxed">
                Devmate Premium is billed on a recurring basis depending on the
                billing cycle selected at checkout. By subscribing, you
                authorize Devmate to automatically charge your chosen payment
                method at the beginning of each billing cycle. It is your
                responsibility to ensure that your payment information is
                accurate and up to date to prevent billing failures or
                disruptions in service access.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                3. Cancellation Policy
              </h2>
              <p className="leading-relaxed">
                You may cancel your Devmate Premium subscription at any time
                through your account settings. Once a cancellation is submitted,
                your Premium access will remain active until the end of your
                current billing cycle. After the billing period expires, your
                account will automatically revert to a free plan, and Premium
                features will no longer be available. Cancelling your
                subscription does not trigger a refund, and no partial refunds
                are provided for unused account time.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                4. No Refund Policy
              </h2>
              <p className="leading-relaxed">
                All payments made for Devmate Premium are final and
                non-refundable. Devmate does not issue refunds under any
                circumstances, including but not limited to: accidental
                purchases, change of mind, limited usage, dissatisfaction after
                access to premium features, or failure to cancel before renewal.
                Since premium access is delivered immediately after payment, we
                are unable to reverse or refund charges once processed.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                5. Automatic Renewal
              </h2>
              <p className="leading-relaxed">
                Devmate Premium renews automatically at the end of each billing
                period unless cancelled in advance. Renewal charges are
                non-refundable, and it is solely your responsibility to manage
                or cancel your subscription prior to renewal. Devmate will not
                provide refunds for auto-renewals that occur before cancellation
                is submitted.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                6. Billing Errors
              </h2>
              <p className="leading-relaxed">
                While Devmate does not provide general refunds, we will review
                cases involving confirmed billing errors or duplicate charges.
                If you believe you were incorrectly billed due to a technical
                issue, you must contact our support team promptly with proof of
                the error. Verified duplicate charges will be refunded in full.
                However, this exception applies only to billing system errors
                and not to user mistakes or misunderstandings of policy.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                7. Policy Updates
              </h2>
              <p className="leading-relaxed">
                Devmate may update or revise this Refund and Cancellation Policy
                at any time. Any changes will be posted on this page with an
                updated revision date. Continued use of Devmate Premium after
                policy updates indicates your acceptance of the revised terms.
                Users are encouraged to review this policy periodically to stay
                informed of any modifications.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                8. Contact Information
              </h2>
              <p className="leading-relaxed">
                If you have questions or concerns regarding this Refund and
                Cancellation Policy, you may contact us at{" "}
                <strong>Ankitahuja80@gmail.com</strong>. Our support team will
                assist with billing-related inquiries, account issues, or
                troubleshooting requests. Please note that contacting support
                does not guarantee a refund unless the issue qualifies under the
                Billing Errors section.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RefundPolicy;

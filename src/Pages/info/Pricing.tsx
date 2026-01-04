import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started and exploring the platform",
      features: [
        "Browse unlimited developer profiles",
        "Swipe right/left on profiles",
        "Send connection requests",
        "Accept or ignore requests",
        "Basic profile creation",
        "Showcase 2 projects",
        "List your tech stack",
        "Community access",
      ],
      limitations: [
        "Cannot see who liked you",
        "Limited to 20 swipes per day",
        "Basic profile visibility",
      ],
      buttonText: "Get Started Free",
      highlighted: false,
    },
    {
      name: "Premium",
      price: { monthly: 299, yearly: 2999 },
      description: "Unlock all features and maximize your connections",
      features: [
        "Everything in Free, plus:",
        "✨ See who liked you",
        "Unlimited swipes per day",
        "Priority profile visibility",
        "Showcase unlimited projects",
        "Advanced matching algorithm",
        "Profile badges & verification",
        "Direct messaging without match",
        "Access to premium events",
        "Analytics dashboard",
        "Profile customization options",
        "Early access to new features",
      ],
      limitations: [],
      buttonText: "Upgrade to Premium",
      highlighted: true,
      savingsYearly: "16% off",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Plan
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Start for free and upgrade when you're ready to unlock the full
              power of Devmate
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer relative ${
                  billingCycle === "yearly"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Save 16%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl ${
                  plan.highlighted
                    ? "border-4 border-purple-500 transform md:scale-105"
                    : "border border-slate-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <StarIcon sx={{ fontSize: 16 }} />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-slate-900">
                      ₹{plan.price[billingCycle]}
                    </span>
                    {plan.price[billingCycle] > 0 && (
                      <span className="text-slate-600 ml-2">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    )}
                  </div>
                  {billingCycle === "yearly" && plan.price.yearly > 0 && (
                    <p className="text-sm text-green-600 mt-2">
                      Save ₹{plan.price.monthly * 12 - plan.price.yearly} per
                      year!
                    </p>
                  )}
                </div>

                <button
                  onClick={() => navigate("/login")}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer mb-6 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-xl transform hover:-translate-y-1"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">
                    What's included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircleIcon
                          className="text-green-500 flex-shrink-0 mt-0.5"
                          sx={{ fontSize: 20 }}
                        />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-3">
                        Limitations:
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, idx) => (
                          <li
                            key={idx}
                            className="flex items-start space-x-3 text-slate-500 text-sm"
                          >
                            <span>•</span>
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Can I switch plans anytime?
                </h3>
                <p className="text-slate-600">
                  Yes! You can upgrade from Free to Premium at any time. Your
                  premium features will be activated immediately.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-slate-600">
                  We accept all major credit/debit cards, UPI, net banking, and
                  wallets through our secure payment partner Razorpay.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Is there a free trial for Premium?
                </h3>
                <p className="text-slate-600">
                  While we don't offer a free trial, you can start with our Free
                  plan to explore the platform. You'll only upgrade when you're
                  ready to see who liked you and access premium features.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Can I cancel my subscription?
                </h3>
                <p className="text-slate-600">
                  Yes, you can cancel your Premium subscription at any time from
                  your account settings. Your premium access will continue until
                  the end of your current billing period. See our{" "}
                  <button
                    onClick={() => navigate("/refund-policy")}
                    className="text-purple-600 hover:underline cursor-pointer"
                  >
                    Refund Policy
                  </button>{" "}
                  for more details.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  What happens if I downgrade from Premium to Free?
                </h3>
                <p className="text-slate-600">
                  If you downgrade, you'll lose access to premium features like
                  seeing who liked you, unlimited swipes, and advanced matching.
                  Your profile and connections will remain, but premium benefits
                  will no longer be available.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Is my payment information secure?
                </h3>
                <p className="text-slate-600">
                  Absolutely! We use Razorpay, a PCI DSS compliant payment
                  gateway. We never store your card details on our servers. All
                  transactions are encrypted and secure.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-3xl shadow-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Find Your Dev Partner?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers already connecting and collaborating
              on Devmate
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              Start Free Today
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;

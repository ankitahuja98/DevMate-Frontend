import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../redux/store/store";
import { createOrder } from "../../redux/actions/paymentAction";

const Premium = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isPremium = useAppSelector(
    (store) => store.profile.userProfile.userProfileData.isPremium
  );
  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Perfect for getting started and exploring the platform",
      features: [
        "Browse unlimited developer profiles",
        "Swipe right/left on profiles",
        "Send connection requests",
        "Accept or ignore requests",
        "Basic profile creation",
        "List your tech stack",
      ],
      limitations: ["Cannot see who liked you", "Basic profile visibility"],
      buttonText: "Start Exploring",
      isRazorpayRequired: false,
      highlighted: isPremium ? false : true,
    },
    {
      name: "Premium",
      price: 9,
      description: "Unlock all features and maximize your connections",
      features: [
        "Everything in Free, plus:",
        "✨ See who liked you",
        "Unlimited swipes per day",
        "Priority profile visibility",
        "Advanced matching algorithm",
        "Profile badges & verification",
        "Direct messaging without match",
        "Early access to new features",
      ],
      limitations: [],
      buttonText: isPremium ? " Start Exploring" : "Upgrade to Premium",
      isRazorpayRequired: isPremium ? false : true,
      highlighted: isPremium ? true : false,
      savingsYearly: "8% off",
    },
  ];

  const handleSubscribe = async (isRazorpayRequired: boolean) => {
    if (!isRazorpayRequired) {
      navigate("/explore");
      return;
    }

    if (isRazorpayRequired) {
      const orderDetails = await dispatch(createOrder()).unwrap();

      // open razorpay dailogbox
      const { amount, currency, notes, orderId } = orderDetails;

      const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Devmate",
        description: "Connect with Develoeprs",
        order_id: orderId,
        prefill: {
          name: notes.name,
        },
        method: {
          upi: true,
          card: true,
          wallet: true,
          netbanking: true,
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Content */}
      <div className="pt-7 pb-20 px-4 sm:px-6 lg:px-8">
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
                    {isPremium && (
                      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                        <StarIcon sx={{ fontSize: 16 }} />
                      </div>
                    )}
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-600 mb-4">{plan.description}</p>

                  {plan.name !== "Free" && (
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-slate-900">
                        ₹{plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-slate-600 ml-2">
                          <span className="line-through">99</span> / month
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleSubscribe(plan.isRazorpayRequired)}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer mb-6 ${"bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-xl transform hover:-translate-y-1"}`}
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
                  Our Premium plan is a monthly one-time payment. You only pay
                  for the current month. If you choose not to pay next month,
                  your premium access will simply end automatically—no
                  cancellation steps needed.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  What happens if I downgrade from Premium to Free?
                </h3>
                <p className="text-slate-600">
                  If you downgrade, you'll lose access to premium features like
                  seeing who liked you and advanced matching. Your profile and
                  connections will remain, but premium benefits will no longer
                  be available.
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

export default Premium;

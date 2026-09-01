import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../redux/store/store";
import { createOrder, verifyPayment } from "../../redux/actions/paymentAction";
import { fetchUserProfile } from "../../redux/actions/profileAction";
import { toast } from "react-toastify";
import SEO from "../../Components/SEO";
import PageHeader from "../../Components/PageHeader";

const Premium = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  const { userProfileData } = useAppSelector(
    (store) => store.profile.userProfile,
  );
  const isPremium = useAppSelector(
    (store) => store.profile.userProfile.userProfileData?.isPremium ?? false,
  );

  // This component backs both the public marketing route (/pricing) and
  // the in-app one (/premium, reached from Settings/Sidebar) — a logged-in
  // user gets the compact app-consistent header + no marketing chrome
  // (hero copy, the "Start Free Today" login CTA, the site Footer) instead
  // of the full landing-page treatment a visitor sees.
  const isAppContext = Boolean(userProfileData);

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
      limitations: ["Cannot initiate chats", "Basic profile visibility"],
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
        "✨ Direct messaging without match",
        "Unlimited swipes per day",
        "Priority profile visibility",
        "Advanced matching algorithm",
        "Profile badges & verification",
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

    if (!userProfileData) {
      navigate("/login");
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
        handler: async (response: any) => {
          const result = await dispatch(
            verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          );

          // if payment verified then refresh the user profile so make user premium.
          if (verifyPayment.fulfilled.match(result)) {
            toast.success(result.payload.message);
            setTimeout(async () => {
              await dispatch(fetchUserProfile());
            }, 3000);
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      return;
    }
  };

  return (
    <>
      <SEO
        title="Devmate Premium Plans"
        description="Upgrade to Devmate Premium and unlock advanced matching and networking features."
      />
      <div
        className={
          isAppContext
            ? "min-h-screen"
            : "min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50"
        }
        style={isAppContext ? { background: "var(--page-bg, #f7f8fc)" } : undefined}
      >
        {/* Content */}
        {/* The highlighted plan is `sm:scale-105`, so it renders ~15px
            taller than its layout box in each direction (more as the card
            grows — it's a percentage), and its "featured" badge sits
            another 16px above that (-top-4). In the app layout the page
            scrolls inside a bounded container that clips anything past its
            top edge, so the padding here has to clear both, with room to
            spare for a longer feature list, or the card's top border gets
            sliced off. */}
        <div
          className={
            isAppContext
              ? "pt-10 pb-16 px-4 sm:px-8"
              : "pt-6 pb-16 px-4 sm:px-6 lg:px-8"
          }
        >
          <div className="max-w-7xl mx-auto">
            {/* ── Header ────────────────────────────────────────────────────
                App context gets the same compact PageHeader every other
                in-app page uses; the public route keeps its marketing
                hero. */}
            {isAppContext ? (
              <PageHeader
                title="Go Premium"
                description="Unlock advanced matching and unlimited connections"
              />
            ) : (
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                  Choose Your{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Plan
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
                  Start for free and upgrade when you're ready to unlock the
                  full power of Devmate
                </p>
              </div>
            )}

            {/* ── Pricing Cards ────────────────────────────────────────────── */}
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                // Entrance animation lives on this outer wrapper rather than
                // the card itself — the card below has its own permanent
                // `sm:scale-105` transform on the highlighted plan, and a
                // shared transform-based animation would clobber that once
                // it finishes (animation-fill-mode holds its own final
                // transform value indefinitely).
                <div
                  key={index}
                  className="card-enter"
                  style={{ "--card-index": index } as React.CSSProperties}
                >
                <div
                  className={`relative bg-white rounded-2xl shadow-xl p-5 sm:p-8 transition-all duration-300 hover:shadow-2xl ${
                    plan.highlighted
                      ? "border-4 border-purple-500 sm:transform sm:scale-105"
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

                  <div className="text-center mb-5">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base mb-3">
                      {plan.description}
                    </p>

                    {plan.name !== "Free" && (
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl sm:text-5xl font-bold text-slate-900">
                          ₹{plan.price}
                        </span>
                        {plan.price > 0 && (
                          <span className="text-slate-600 ml-2 text-sm sm:text-base">
                            <span className="line-through">99</span> / month
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleSubscribe(plan.isRazorpayRequired)}
                    className="w-full py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer mb-5 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {plan.buttonText}
                  </button>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                      What's included:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircleIcon
                            className="text-green-500 flex-shrink-0 mt-0.5"
                            sx={{ fontSize: 18 }}
                          />
                          <span className="text-slate-600 text-sm sm:text-base">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <h4 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">
                          Limitations:
                        </h4>
                        <ul className="space-y-1.5">
                          {plan.limitations.map((limitation, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-2 text-slate-500 text-xs sm:text-sm"
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
                </div>
              ))}
            </div>

            {/* ── FAQ Section ──────────────────────────────────────────────── */}
            <div className="mt-14 sm:mt-20 max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-3xl font-bold text-center text-slate-900 mb-7 sm:mb-12">
                Frequently Asked Questions
              </h2>
              <div className="grid gap-4 sm:gap-6">
                {[
                  {
                    q: "Can I switch plans anytime?",
                    a: "Yes! You can upgrade from Free to Premium at any time. Your premium features will be activated immediately.",
                  },
                  {
                    q: "What payment methods do you accept?",
                    a: "We accept all major credit/debit cards, UPI, net banking, and wallets through our secure payment partner Razorpay.",
                  },
                  {
                    q: "Is there a free trial for Premium?",
                    a: "While we don't offer a free trial, you can start with our Free plan to explore the platform. You'll only upgrade when you're ready to see who liked you and access premium features.",
                  },
                  {
                    q: "Can I cancel my subscription?",
                    a: "Our Premium plan is a monthly one-time payment. You only pay for the current month. If you choose not to pay next month, your premium access will simply end automatically—no cancellation steps needed.",
                  },
                  {
                    q: "What happens if I downgrade from Premium to Free?",
                    a: "If you downgrade, you'll lose access to premium features like seeing who liked you and advanced matching. Your profile and connections will remain, but premium benefits will no longer be available.",
                  },
                  {
                    q: "Is my payment information secure?",
                    a: "Absolutely! We use Razorpay, a PCI DSS compliant payment gateway. We never store your card details on our servers. All transactions are encrypted and secure.",
                  },
                ].map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaqIndex((prev) => (prev === i ? -1 : i))
                        }
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 text-left p-3 sm:p-4 cursor-pointer"
                      >
                        <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                          {faq.q}
                        </h3>
                        <ExpandMoreIcon
                          className={`text-slate-500 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                        style={{
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                        }}
                      >
                        <div className="overflow-hidden">
                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed px-3 sm:px-4 pb-3 sm:pb-4">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── CTA Section ──────────────────────────────────────────────── */}
            {/* Only for visitors — a logged-in user browsing this from
                Settings/Sidebar is already a member; "Start Free Today" /
                login doesn't apply to them. */}
            {!isAppContext && (
              <div className="mt-14 sm:mt-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl sm:rounded-3xl shadow-2xl p-7 sm:p-12 text-center">
                <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                  Ready to Find Your Dev Partner?
                </h2>
                <p className="text-sm sm:text-lg md:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Join thousands of developers already connecting and
                  collaborating on Devmate
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer text-sm sm:text-base"
                >
                  Start Free Today
                </button>
              </div>
            )}
          </div>
        </div>

        {!isAppContext && <Footer />}
      </div>
    </>
  );
};

export default Premium;

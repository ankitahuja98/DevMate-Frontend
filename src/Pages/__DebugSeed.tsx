import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { store } from "../redux/store/store";

// TEMPORARY debug-only page — delete before finishing.
// Seeds the redux store with fake data so every authenticated screen can be
// rendered by the responsive audit script without a real backend/login.
// ?stress=1 swaps in deliberately hostile content (very long unbroken names,
// emails, skill names, messages) to shake out text-overflow bugs.

const NAMES = ["Rosie Jaskolski", "Irma Ryan", "Ross Beahan", "Tyler Lakin"];
const STRESS_NAMES = [
  "Bartholomew Maximilian Vandersteenkiste-Wolfeschlegelstein",
  "Anastasiya Konstantinopolskaya-Christodoulopoulou",
  "ThisIsOneVeryLongUnbrokenUsernameWithNoSpacesAtAllToBreakOn",
  "Jean-Baptiste Emmanuel Zorg de la Fontainebleau III",
];
const ROLES = ["Startup Founder", "Mobile Developer", "Full Stack Developer"];
const STRESS_ROLES = [
  "Senior Principal Distinguished Staff Full Stack Platform Engineer II",
  "Chief Technology Officer & Co-Founder of an Extremely Long Company Name",
];
const SKILLS = ["Express", "Next.js", "Python", "MongoDB"];
const STRESS_SKILLS = [
  "ReactNativeWithExpoAndTypeScriptStrictMode",
  "KubernetesHorizontalPodAutoscalerConfiguration",
  "PostgreSQLPerformanceTuning",
  "Rust",
];

const stress = new URLSearchParams(window.location.search).get("stress") === "1";

const mkUser = (i: number) => ({
  _id: `fake-${i}`,
  name: (stress ? STRESS_NAMES : NAMES)[i % (stress ? STRESS_NAMES : NAMES).length],
  emailId: stress
    ? "bartholomew.maximilian.vandersteenkiste@averyverylongcorporatedomainname.example.com"
    : `dev${i}@devmate.com`,
  profilePhoto: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  currentRole: stress ? STRESS_ROLES[i % 2] : ROLES[i % 3],
  location: stress
    ? "Kongelig Frederiksberg Nørrebro Østerbro, Copenhagen Capital Region, Denmark"
    : "Berlin, Germany",
  bio: stress
    ? "Supercalifragilisticexpialidocious_pneumonoultramicroscopicsilicovolcanoconiosis building distributed systems at planetary scale with an unreasonably long biography that just keeps going and going."
    : "Building things for the web and shipping fast.",
  techStack: stress ? STRESS_SKILLS : SKILLS,
  skills: stress ? STRESS_SKILLS : SKILLS,
  interests: stress ? STRESS_SKILLS : ["Open Source", "AI"],
  projects: [
    {
      title: stress
        ? "AnExtremelyLongProjectTitleWithoutAnySpacesToWrapOnAtAll"
        : "Devmate",
      description: stress
        ? "A project description that is quite long and rambling, describing in exhaustive detail every single feature the project has ever shipped."
        : "A networking platform for developers.",
      link: "https://github.com/example/devmate-a-very-long-repository-name-here",
      techStack: stress ? STRESS_SKILLS : SKILLS,
    },
  ],
  githubUrl: "https://github.com/someverylongusernamehere",
  linkedinUrl: "https://linkedin.com/in/someverylongusernamehere",
  portfolioUrl: "https://someverylongportfoliodomainname.example.com",
  experience: (i % 12) + 1,
  availability: ["weekends", "flexible", "part-time", "full-time"][i % 4],
  lookingFor: stress ? "A co-founder for a very ambitious project" : "Co-founder",
  isVerified: i % 2 === 0,
  isOnline: i % 3 === 0,
  lastSeen: new Date().toISOString(),
});

const mkMessage = (i: number) => ({
  _id: `msg-${i}`,
  senderId: i % 3 === 0 ? "me" : "fake-1",
  message: stress
    ? i % 2 === 0
      ? "Supercalifragilisticexpialidociouspneumonoultramicroscopicsilicovolcanoconiosishttps://example.com/a/very/long/url/that/never/breaks/anywhere"
      : "This is a considerably longer chat message that should wrap across several lines inside the bubble without ever pushing the layout sideways, even on a 320px wide phone screen."
    : ["Hey! Loved your project.", "Thanks 🙏", "Want to pair on it?"][i % 3],
  createdAt: new Date(Date.now() - (20 - i) * 3600_000).toISOString(),
});

const DebugSeed = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const to = params.get("to") || "/explore";
  const premium = params.get("premium") === "1";

  useEffect(() => {
    const seed = () => {
      store.dispatch({
        type: "fetchUserProfile/fulfilled",
        payload: {
          ...mkUser(0),
          _id: "me",
          name: stress ? STRESS_NAMES[0] : "Carrie Carroll",
          isPremium: premium,
        },
      });
      store.dispatch({
        type: "getAllUsers/fulfilled",
        payload: {
          data: Array.from({ length: 8 }, (_, i) => mkUser(i)),
          nextCursor: null,
          hasMore: false,
        },
      });
      store.dispatch({
        type: "getAllRequests/fulfilled",
        payload: {
          data: Array.from({ length: 4 }, (_, i) => ({
            _id: `req-${i}`,
            fromUserId: mkUser(i),
            createdAt: new Date().toISOString(),
          })),
        },
      });
      store.dispatch({
        type: "getAllMatches/fulfilled",
        payload: { data: Array.from({ length: 8 }, (_, i) => mkUser(i)) },
      });
      store.dispatch({
        type: "getChatList/fulfilled",
        payload: {
          data: Array.from({ length: 6 }, (_, i) => ({
            user: mkUser(i),
            lastmessage: {
              message: stress
                ? "Averylongsinglewordlastmessagepreviewthatcannotbebrokenanywhere"
                : "See you at the meetup tomorrow!",
              createdAt: new Date().toISOString(),
            },
            isUnread: i % 2 === 0,
          })),
        },
      });
      store.dispatch({
        type: "getChat/fulfilled",
        payload: {
          data: Array.from({ length: 14 }, (_, i) => mkMessage(i)),
          totalMessages: 14,
          page: 1,
          size: 20,
        },
      });
      store.dispatch({
        type: "getNotifications/fulfilled",
        payload: {
          data: Array.from({ length: 6 }, (_, i) => ({
            _id: `notif-${i}`,
            type: ["request", "accepted", "message"][i % 3],
            message: stress
              ? "Bartholomew Maximilian Vandersteenkiste-Wolfeschlegelstein sent you a connection request with an extremely long notification body"
              : "Irma Ryan sent you a connection request",
            isRead: i % 2 === 0,
            createdAt: new Date().toISOString(),
            fromUserId: mkUser(i),
          })),
          total: 6,
          page: 1,
        },
      });
      store.dispatch({
        type: "getUnreadNotificationCount/fulfilled",
        payload: { count: 3 },
      });
    };

    seed();
    // Pages refetch on mount and the thunks will reject against no backend,
    // wiping the seed — keep re-seeding for a while so the screen stays full.
    const interval = setInterval(seed, 200);
    setTimeout(() => clearInterval(interval), 15000);
    navigate(to, { state: { targetUserDetails: mkUser(1), user: mkUser(1) } });
  }, [navigate, to, premium]);

  return null;
};

export default DebugSeed;

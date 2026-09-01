import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { store } from "../redux/store/store";

// TEMPORARY debug-only page — delete before finishing.
const mkUser = (i: number) => ({
  _id: `fake-${i}`,
  name: ["Rosie Jaskolski", "Irma Ryan", "Ross Beahan", "Tyler Lakin"][i % 4],
  profilePhoto: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  currentRole: ["Startup Founder", "Mobile Developer", "Full Stack Developer"][i % 3],
  location: "Berlin, Germany",
  bio: "Building things for the web and shipping fast.",
  techStack: ["Express", "Next.js", "Python", "MongoDB"],
  projects: [{ title: "Devmate" }],
  experience: (i % 12) + 1,
  availability: ["weekends", "flexible", "part-time", "full-time"][i % 4],
  isVerified: i % 2 === 0,
  lastSeen: new Date().toISOString(),
});

const DebugSeed = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const to = params.get("to") || "/explore";
  useEffect(() => {
    store.dispatch({
      type: "fetchUserProfile/fulfilled",
      payload: {
        name: "Carrie Carroll",
        currentRole: "Mobile Developer",
        profilePhoto: "https://i.pravatar.cc/150?img=5",
        isPremium: false,
      },
    });
    const interval = setInterval(() => {
      store.dispatch({
        type: "getAllUsers/fulfilled",
        payload: { data: Array.from({ length: 8 }, (_, i) => mkUser(i)), nextCursor: null, hasMore: false },
      });
      store.dispatch({
        type: "getAllRequests/fulfilled",
        payload: {
          data: Array.from({ length: 4 }, (_, i) => ({
            _id: `req-${i}`, fromUserId: mkUser(i), createdAt: new Date().toISOString(),
          })),
        },
      });
      store.dispatch({
        type: "getAllMatches/fulfilled",
        payload: { data: Array.from({ length: 5 }, (_, i) => mkUser(i)) },
      });
    }, 200);
    setTimeout(() => clearInterval(interval), 10000);
    navigate(to);
  }, [navigate, to]);
  return null;
};

export default DebugSeed;

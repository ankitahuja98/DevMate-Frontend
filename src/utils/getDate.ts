const getDate = (date: Date) => {
  if (!date) return "online";
  const now = new Date();

  const lastSeen = new Date(date);

  const diffSec = now.getTime() - lastSeen.getTime();
  const diffMin = Math.floor(diffSec / (1000 * 60));
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) {
    return "just now";
  }
  if (diffMin < 60) {
    return `${diffMin} min ago`;
  }
  if (diffHr < 24) {
    return `${diffHr} hr ago`;
  }

  if (diffDay === 1) {
    return `${diffDay} day ago`;
  }

  if (diffDay < 7) {
    return `${diffDay} days ago`;
  }

  // more than 24 hours → show only date
  return lastSeen.toLocaleDateString();
};

export default getDate;

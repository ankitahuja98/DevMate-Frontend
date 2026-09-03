/* Scrolls a landing-page section into view, retrying until it exists.

   The section may not be in the DOM yet: anchored links can fire from
   another route, and every page is lazy-loaded, so the target only mounts
   once its chunk has downloaded. A fixed timeout can't cover that — it is
   a race against the network — so poll each frame until the element shows
   up or the deadline passes. */
const DEFAULT_TIMEOUT_MS = 3000;

export const scrollToSection = (id: string, timeoutMs = DEFAULT_TIMEOUT_MS) => {
  const deadline = performance.now() + timeoutMs;

  const attempt = () => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (performance.now() < deadline) requestAnimationFrame(attempt);
  };

  requestAnimationFrame(attempt);
};

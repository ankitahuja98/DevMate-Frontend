const { chromium } = require("playwright");

// Ignore elements inside a horizontally scrollable ancestor — overflowing
// there is the point.
const CHECK = `(() => {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const out = [];
  if (de.scrollWidth > de.clientWidth + 1) out.push("PAGE overflows x by " + (de.scrollWidth - de.clientWidth));
  const inScroller = (el) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (ox === "auto" || ox === "scroll") return true;
    }
    return false;
  };
  document.querySelectorAll("body *").forEach((el) => {
    const b = el.getBoundingClientRect();
    if (!b.width || !b.height) return;
    if ((b.right > vw + 2 || b.left < -2) && !inScroller(el)) {
      const cls = (el.className && String(el.className).split(" ")[0]) || el.tagName;
      out.push(cls + " l:" + Math.round(b.left) + " r:" + Math.round(b.right) + " vw:" + vw);
    }
  });
  return [...new Set(out)].slice(0, 5);
})()`;

const WIDTHS = [1440, 1024, 900, 768, 700, 650, 600, 480, 390, 360];

async function check(browser, to, w, interact, label) {
  const page = await browser.newPage({ viewport: { width: w, height: 800 } });
  await page.goto(`http://localhost:5173/__debug-seed?to=${to}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);
  try { if (interact) await interact(page); } catch (e) { /* control may not exist at this width */ }
  await page.waitForTimeout(400);
  const r = await page.evaluate(CHECK);
  if (r.length) console.log(`${label} @${w}: ${JSON.stringify(r)}`);
  await page.close();
}

(async () => {
  const browser = await chromium.launch();
  for (const w of WIDTHS) {
    // Filters dropdown open (min-width:420px panel — main suspect)
    await check(browser, "/explore", w, async (p) => {
      await p.click(".SearchToolbarFiltersBtn", { timeout: 3000 });
      await p.waitForTimeout(300);
    }, "explore+filters");
    // List view
    await check(browser, "/explore", w, async (p) => {
      await p.click('[aria-label="List view"]', { timeout: 3000 });
      await p.waitForTimeout(400);
    }, "explore+list");
    // Liked You with filters open
    await check(browser, "/likedyou", w, async (p) => {
      await p.click(".SearchToolbarFiltersBtn", { timeout: 3000 });
      await p.waitForTimeout(300);
    }, "likedyou+filters");
  }
  await browser.close();
  console.log("done");
})();

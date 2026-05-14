/* ── CURSOR ── */
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
}
animRing();

/* ── MARQUEE TOOLS ── */
const row1Tools = [
  { emoji: "🎬", name: "Premiere Pro" },
  { emoji: "✨", name: "After Effects" },
  { emoji: "🎨", name: "Figma" },
  { emoji: "🤖", name: "ChatGPT" },
  { emoji: "💎", name: "Gemini" },
  { emoji: "🧠", name: "Claude AI" },
  { emoji: "🎥", name: "DaVinci Resolve" },
  { emoji: "🖌️", name: "Photoshop" },
  { emoji: "🚀", name: "Midjourney" },
  { emoji: "🔊", name: "ElevenLabs" },
  { emoji: "💻", name: "VS Code" },
  { emoji: "🎯", name: "RunwayML" },
];
const row2Tools = [
  { emoji: "🐙", name: "GitHub" },
  { emoji: "⚡", name: "Vercel" },
  { emoji: "🔍", name: "Ahrefs" },
  { emoji: "📊", name: "SEMrush" },
  { emoji: "✂️", name: "CapCut" },
  { emoji: "🎭", name: "Illustrator" },
  { emoji: "📐", name: "Canva" },
  { emoji: "🔮", name: "Sora" },
  { emoji: "🛠️", name: "Cursor AI" },
  { emoji: "📈", name: "Google Analytics" },
  { emoji: "🌊", name: "Framer" },
  { emoji: "🎪", name: "Kling AI" },
];
function buildPills(tools) {
  return tools
    .map(
      (t) =>
        `<div class="tool-pill"><span class="tool-emoji">${t.emoji}</span>${t.name}</div>`,
    )
    .join("");
}
function fillRow(id, tools) {
  const el = document.getElementById(id);
  const pills = buildPills(tools);
  el.innerHTML = pills + pills; // duplicate for seamless loop
}
fillRow("row1", row1Tools);
fillRow("row2", row2Tools);

/* ── WORKS DATA ── */
const works = [
  {
    cat: "video",
    label: "Video",
    title: "Product Launch Campaign",
    desc: "AI-generated ad video series for a D2C fashion brand. 4.2M+ views across platforms.",
    emoji: "🎬",
    bg: "linear-gradient(135deg,#1a0a2e,#0d1b2a)",
  },
  {
    cat: "design",
    label: "Design",
    title: "Brand Identity System",
    desc: "Complete rebrand for a fintech startup — logo, type, color, and UI component library.",
    emoji: "🎨",
    bg: "linear-gradient(135deg,#0a1a12,#0d1b18)",
  },
  {
    cat: "web",
    label: "Web Dev",
    title: "E-commerce Platform",
    desc: "Custom Shopify + Next.js storefront with 99 Lighthouse score and 240% conversion uplift.",
    emoji: "🌐",
    bg: "linear-gradient(135deg,#0a1220,#0d1a28)",
  },
  {
    cat: "seo",
    label: "SEO",
    title: "Organic Growth Sprint",
    desc: "Took a Chennai-based SaaS from page 5 to #1 in 90 days with content + technical SEO.",
    emoji: "📈",
    bg: "linear-gradient(135deg,#1a1a0a,#252510)",
  },
  {
    cat: "video",
    label: "Video",
    title: "Reel Content Pipeline",
    desc: "30 scroll-stopping Instagram reels in 30 days for a food brand. 3x follower growth.",
    emoji: "🎥",
    bg: "linear-gradient(135deg,#1a0a12,#280d18)",
  },
  {
    cat: "design",
    label: "Design",
    title: "App UI/UX Design",
    desc: "End-to-end Figma design for a health & wellness mobile app — 48 screens, 2 user flows.",
    emoji: "📱",
    bg: "linear-gradient(135deg,#0a1228,#0d1835)",
  },
];
function renderWorks(filter) {
  const grid = document.getElementById("worksGrid");
  const filtered =
    filter === "all" ? works : works.filter((w) => w.cat === filter);
  grid.innerHTML = filtered
    .map(
      (w) => `
    <div class="work-card">
      <div class="work-thumb">
        <div class="work-thumb-bg" style="background:${w.bg}"></div>
        <div class="work-thumb-emoji">${w.emoji}</div>
      </div>
      <div class="work-info">
        <div class="work-cat">${w.label}</div>
        <div class="work-title">${w.title}</div>
        <p class="work-desc">${w.desc}</p>
      </div>
      <div class="work-arrow">View Case Study <span>→</span></div>
    </div>
  `,
    )
    .join("");
}
renderWorks("all");
function filterWorks(cat, btn) {
  document
    .querySelectorAll(".filter-tab")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderWorks(cat);
}

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ── COUNTER ANIMATION ── */
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      let start = 0;
      const duration = 1500;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 },
);
document
  .querySelectorAll("[data-count]")
  .forEach((el) => counterObserver.observe(el));

/* ── MOBILE MENU ── */
function toggleMenu() {
  const links = document.querySelector(".nav-links");
  if (!links) return;
  const open = links.style.display === "flex";
  links.style.display = open ? "none" : "flex";
  links.style.flexDirection = "column";
  links.style.position = "fixed";
  links.style.top = "68px";
  links.style.left = "0";
  links.style.right = "0";
  links.style.background = "rgb(255, 255, 255)";
  links.style.padding = "24px";
  links.style.gap = "24px";
  // links.style.boxShadow = "0 2px 24px rgba(77, 77, 77, 0.5)";
  links.style.borderBottom = "1px solid rgba(255,255,255,0.07)";
  links.style.backdropFilter = "blur(20px)";
  if (open) links.style.display = "none";
}

/* ── CONTACT FORM ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector(".submit-btn");
  btn.textContent = "✅ Message Sent!";
  btn.style.background = "#22c55e";
  setTimeout(() => {
    btn.textContent = "Send Message →";
    btn.style.background = "";
  }, 3000);
}

/* ── NAVBAR SCROLL ── */
// window.addEventListener("scroll", () => {
//   const nav = document.getElementById("navbar");
//   nav.style.background =
//     window.scrollY > 50 ? "rgba(8,8,8,0.95)" : "rgba(8,8,8,0.82)";
// });

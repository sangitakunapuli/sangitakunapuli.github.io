const entries = [...document.querySelectorAll<HTMLElement>(".timeline-entry")];
const motion = matchMedia("(prefers-reduced-motion: reduce)");
let observer: IntersectionObserver | undefined;
const revealAll = () => {
  observer?.disconnect();
  entries.forEach((entry) => {
    entry.classList.remove("is-pending");
    entry.classList.add("is-revealed");
  });
};
if (!motion.matches && "IntersectionObserver" in window) {
  try {
    observer = new IntersectionObserver(
      (changes) => {
        changes.forEach((change) => {
          if (!change.isIntersecting) return;
          change.target.classList.remove("is-pending");
          change.target.classList.add("is-revealed");
          observer?.unobserve(change.target);
        });
      },
      { threshold: 0.08 },
    );
    entries.forEach((entry) => {
      entry.classList.add("is-pending");
      observer?.observe(entry);
    });
  } catch {
    revealAll();
  }
} else revealAll();
motion.addEventListener("change", () => {
  if (motion.matches) revealAll();
});
window.addEventListener("beforeprint", revealAll);
// Content stays visible without JavaScript; section links also work with reduced motion.
export {};

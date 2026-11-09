const links = [
  ...document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"),
];
const sections = links
  .map((link) => document.querySelector<HTMLElement>(link.hash))
  .filter((section): section is HTMLElement => !!section);
let scheduled = false;
function updateNavigation() {
  scheduled = false;
  const active = [...sections]
    .reverse()
    .find(
      (section) =>
        section.getBoundingClientRect().top <= window.innerHeight * 0.35,
    );
  links.forEach((link) => {
    if (active && link.hash === `#${active.id}`)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener(
  "scroll",
  () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateNavigation);
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateNavigation);
updateNavigation();
export {};

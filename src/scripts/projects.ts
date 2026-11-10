const section = document.querySelector<HTMLElement>(".projects-section");
const grid = section?.querySelector<HTMLElement>(".project-gallery");
const motion = matchMedia("(prefers-reduced-motion: reduce)");
const behavior = (): ScrollBehavior => (motion.matches ? "auto" : "smooth");

if (section && grid) {
  const cards = [...grid.querySelectorAll<HTMLElement>(".project-card")];
  const previous = section.querySelector<HTMLButtonElement>(
    "[data-gallery-prev]",
  )!;
  const next = section.querySelector<HTMLButtonElement>("[data-gallery-next]")!;
  const status = section.querySelector<HTMLElement>(".gallery-status")!;
  const selectors = [
    ...section.querySelectorAll<HTMLButtonElement>("[data-project-index]"),
  ];
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const bounds = grid.getBoundingClientRect();
    const positions = cards.map((card, index) => ({
      index,
      bounds: card.getBoundingClientRect(),
    }));
    const visible = positions.filter(
      (position) =>
        position.bounds.right > bounds.left + 10 &&
        position.bounds.left < bounds.right - 10,
    );
    if (visible.length) {
      const label = `${visible[0].index + 1}–${visible[visible.length - 1].index + 1} of ${cards.length}`;
      if (status.textContent !== label) status.textContent = label;
    }
    previous.disabled = grid.scrollLeft < 3;
    next.disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 3;
    let nearest = positions.reduce((a, b) =>
      Math.abs(a.bounds.left - bounds.left) <
      Math.abs(b.bounds.left - bounds.left)
        ? a
        : b,
    ).index;
    if (next.disabled) nearest = cards.length - 1;
    selectors.forEach((button, index) =>
      button.setAttribute("aria-pressed", String(index === nearest)),
    );
  };
  const scrollToCard = (index: number) => {
    const card = cards[index];
    if (!card) return;
    const delta =
      card.getBoundingClientRect().left - grid.getBoundingClientRect().left - 4;
    grid.scrollBy({ left: delta, behavior: behavior() });
  };
  const move = (direction: number) => {
    const gap = parseFloat(getComputedStyle(grid).columnGap) || 22;
    grid.scrollBy({
      left: direction * (cards[0].getBoundingClientRect().width + gap),
      behavior: behavior(),
    });
  };
  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  selectors.forEach((button, index) =>
    button.addEventListener("click", () => scrollToCard(index)),
  );
  grid.addEventListener(
    "scroll",
    () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  grid.addEventListener("keydown", (event) => {
    if (event.target !== grid) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      scrollToCard(event.key === "Home" ? 0 : cards.length - 1);
    }
  });
  grid.addEventListener("focusin", (event) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>(
      ".project-card",
    );
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const viewport = grid.getBoundingClientRect();
    if (bounds.left < viewport.left || bounds.right > viewport.right)
      scrollToCard(cards.indexOf(card));
  });
  new ResizeObserver(update).observe(grid);
  update();

  let drag:
    | { id: number; start: number; scroll: number; moved: boolean }
    | undefined;
  let suppressClick = false;
  grid.addEventListener("dragstart", (event) => event.preventDefault());
  grid.addEventListener("pointerdown", (event) => {
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0 ||
      (event.target as HTMLElement).closest("a")
    )
      return;
    suppressClick = false;
    drag = {
      id: event.pointerId,
      start: event.clientX,
      scroll: grid.scrollLeft,
      moved: false,
    };
  });
  grid.addEventListener("pointermove", (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const delta = event.clientX - drag.start;
    if (!drag.moved && Math.abs(delta) > 7) {
      drag.moved = true;
      grid.setPointerCapture(event.pointerId);
      grid.classList.add("is-dragging");
      cards.forEach((card) => {
        card.style.transform = "";
      });
    }
    if (drag.moved) {
      grid.scrollLeft = drag.scroll - delta;
      suppressClick = true;
    }
  });
  const endDrag = (event: PointerEvent) => {
    if (!drag || event.pointerId !== drag.id) return;
    if (grid.hasPointerCapture(event.pointerId))
      grid.releasePointerCapture(event.pointerId);
    grid.classList.remove("is-dragging");
    drag = undefined;
  };
  grid.addEventListener("pointerup", endDrag);
  grid.addEventListener("pointercancel", endDrag);
  grid.addEventListener("pointerleave", () => {
    if (drag && !drag.moved) drag = undefined;
  });
  grid.addEventListener(
    "click",
    (event) => {
      if (suppressClick) {
        event.preventDefault();
        event.stopImmediatePropagation();
        suppressClick = false;
      }
    },
    true,
  );
  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (motion.matches || event.pointerType !== "mouse" || drag?.moved)
        return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.transform = `perspective(1100px) rotateX(${(0.5 - y) * 4}deg) rotateY(${(x - 0.5) * 5}deg) translateY(-3px)`;
      card.style.setProperty("--hover-x", `${x * 100}%`);
      card.style.setProperty("--hover-y", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
  motion.addEventListener("change", () =>
    cards.forEach((card) => {
      card.style.transform = "";
    }),
  );

  document
    .querySelectorAll<HTMLAnchorElement>("[data-ar-link]")
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        const card = grid.querySelector<HTMLElement>("#project-ar");
        if (!card) return;
        event.preventDefault();
        scrollToCard(cards.indexOf(card));
        section.scrollIntoView({ behavior: behavior(), block: "start" });
        card
          .querySelector<HTMLAnchorElement>(".project-links a")
          ?.focus({ preventScroll: true });
      });
    });
}
export {};

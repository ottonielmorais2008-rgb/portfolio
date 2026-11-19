const HOVER_SELECTOR =
  'a, button, .work-card, .skill-row, .journey-row, .portrait, [data-cursor="hover"]';

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function canUseFineCursor(): boolean {
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !prefersReducedMotion()
  );
}

export function initCursor(root: HTMLElement): () => void {
  const el = document.querySelector<HTMLElement>('.cursor');
  if (!el || !canUseFineCursor()) {
    document.body.classList.remove('has-cursor');
    if (el) el.hidden = true;
    return () => undefined;
  }

  document.body.classList.add('has-cursor');
  el.hidden = false;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;
  let scale = 1;
  let targetScale = 1;
  let frame = 0;

  const tick = () => {
    x += (tx - x) * 0.25;
    y += (ty - y) * 0.25;
    scale += (targetScale - scale) * 0.18;
    el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
    frame = requestAnimationFrame(tick);
  };

  const onMove = (event: PointerEvent) => {
    tx = event.clientX;
    ty = event.clientY;
  };

  const onOver = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest(HOVER_SELECTOR)) targetScale = 2.6;
  };

  const onOut = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest(HOVER_SELECTOR)) {
      const next = (event as PointerEvent).relatedTarget;
      if (next instanceof Element && next.closest(HOVER_SELECTOR)) return;
      targetScale = 1;
    }
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  root.addEventListener('pointerover', onOver);
  root.addEventListener('pointerout', onOut);
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', onMove);
    root.removeEventListener('pointerover', onOver);
    root.removeEventListener('pointerout', onOut);
    document.body.classList.remove('has-cursor');
    el.hidden = true;
  };
}

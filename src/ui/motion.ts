import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { prefersReducedMotion } from './cursor';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

export function initSmoothScroll(): void {
  destroySmoothScroll();
  if (prefersReducedMotion()) return;

  lenis = new Lenis({
    autoRaf: false,
    lerp: 0.09,
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  tickerFn = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);
}

export function destroySmoothScroll(): void {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(el, { offset: -88, duration: 1.05 });
    return;
  }
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export function splitChars(el: HTMLElement): HTMLElement[] {
  const chars: HTMLElement[] = [];
  const words = el.querySelectorAll<HTMLElement>('[data-word]');
  const targets = words.length > 0 ? words : [el];

  for (const target of targets) {
    const text = target.dataset.word ?? target.textContent ?? '';
    target.textContent = '';
    const fragment = document.createDocumentFragment();
    for (const symbol of text) {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = symbol;
      fragment.appendChild(span);
      chars.push(span);
    }
    target.appendChild(fragment);
  }
  return chars;
}

export function revealHome(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  const reduced = prefersReducedMotion();

  const name = document.querySelector<HTMLElement>('.hero-name');
  if (name && !name.dataset.split) {
    splitChars(name);
    name.dataset.split = 'true';
  }

  if (reduced) {
    gsap.set(
      ['.hero-name .char', '.hero-left', '.hero-socials', '.portrait', '.section-head', '.work-card', '.skill-row', '.journey-row', '.contact-title', '.contact-copy', '.contact .btn'],
      { clearProps: 'all', opacity: 1, y: 0 },
    );
    return;
  }

  const chars = gsap.utils.toArray<HTMLElement>('.hero-name .char');
  gsap.set(chars, { yPercent: 110, opacity: 0 });
  gsap.to(chars, {
    yPercent: 0,
    opacity: 1,
    duration: 0.95,
    ease: 'power3.out',
    stagger: 0.035,
    delay: 0.1,
  });

  gsap.fromTo(
    ['.hero-left', '.hero-socials'],
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.45, stagger: 0.1 },
  );
  gsap.fromTo(
    '.portrait',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.3 },
  );

  document.querySelectorAll<HTMLElement>('.work-card, .skill-row, .journey-row').forEach((el, i) => {
    gsap.fromTo(
      el,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: (i % 2) * 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      },
    );
  });

  document.querySelectorAll<HTMLElement>('.section-head').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      },
    );
  });

  const contactBits = document.querySelectorAll('.contact-title, .contact-copy, .contact .btn-lg, .contact .badge');
  gsap.fromTo(
    contactBits,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.contact', start: 'top 70%', once: true },
    },
  );

  gsap.fromTo(
    '.contact',
    { clipPath: 'inset(18% 0 0 0)', webkitClipPath: 'inset(18% 0 0 0)' },
    {
      clipPath: 'inset(0% 0 0 0)',
      webkitClipPath: 'inset(0% 0 0 0)',
      ease: 'none',
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 92%',
        end: 'top 42%',
        scrub: true,
      },
    },
  );
}

export function playWipe(onCovered: () => void): Promise<void> {
  const wipe = document.querySelector<HTMLElement>('.wipe');
  if (!wipe || prefersReducedMotion()) {
    onCovered();
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: resolve,
    });
    tl.set(wipe, { transformOrigin: 'top center', scaleY: 0 });
    tl.to(wipe, { scaleY: 1, duration: 0.45, ease: 'power3.inOut' });
    tl.add(() => {
      onCovered();
    });
    tl.set(wipe, { transformOrigin: 'bottom center' });
    tl.to(wipe, { scaleY: 0, duration: 0.5, ease: 'power3.inOut' });
  });
}

export function refreshScroll(): void {
  ScrollTrigger.refresh();
  lenis?.resize();
}

import gsap from 'gsap';
import { portraitUrl, portraitUrl2x, workThumb } from './assets';
import { FILTERS, getProject, projects, type FilterId } from './data/projects';
import { socialPillsMarkup } from './ui/social-icons';
import { journey } from './data/journey';
import { skills } from './data/skills';
import { filterProjects } from './lib/filters';
import { parseHash, titleFor, toHash, type Route } from './lib/router';
import { canUseFineCursor, initCursor } from './ui/cursor';
import {
  getLenis,
  initSmoothScroll,
  playWipe,
  refreshScroll,
  revealHome,
  scrollToId,
} from './ui/motion';

const SECTIONS = new Set(['work', 'skills', 'journey', 'contact']);
let current: Route | null = null;
let activeFilter: FilterId = 'All';
let homeScroll = 0;
let disposeCursor: (() => void) | null = null;
let disposeJourney: (() => void) | null = null;

function sectionFromHash(hash: string): string | null {
  const id = hash.replace(/^#/, '').replace(/^\//, '');
  return SECTIONS.has(id) ? id : null;
}

function qs<T extends HTMLElement>(selector: string, root: ParentNode = document): T {
  const el = root.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

function renderFilters(): void {
  const root = qs('.filters');
  root.replaceChildren();
  for (const id of FILTERS) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-btn' + (id === activeFilter ? ' is-active' : '');
    btn.textContent = id;
    btn.setAttribute('aria-pressed', id === activeFilter ? 'true' : 'false');
    btn.addEventListener('click', () => {
      if (activeFilter === id) return;
      activeFilter = id;
      renderFilters();
      applyFilter();
    });
    root.appendChild(btn);
  }
}

function renderWork(): void {
  const grid = qs('#work-grid');
  grid.replaceChildren();
  for (const project of projects) {
    const card = document.createElement('a');
    card.className = 'work-card';
    card.href = toHash({ name: 'project', slug: project.slug });
    card.dataset.slug = project.slug;
    card.setAttribute('aria-label', `${project.title}, ${project.categories.join(' and ')}`);
    card.innerHTML = `
      <div class="work-frame">
        <img src="${workThumb(project.thumbnail)}" alt="Screenshot of ${project.title}" width="1280" height="800" />
      </div>
      <div class="work-meta">
        <h3 class="work-title">${project.title}</h3>
        <p class="work-cats">${project.categories.join(' / ')}</p>
      </div>
      <p class="work-stack">${project.stack.join(' · ')}</p>
    `;
    grid.appendChild(card);
  }
  applyFilter();
}

function applyFilter(): void {
  const visible = new Set(filterProjects(projects, activeFilter).map((p) => p.slug));
  document.querySelectorAll<HTMLElement>('.work-card').forEach((card) => {
    const slug = card.dataset.slug ?? '';
    card.classList.toggle('is-hidden', !visible.has(slug));
  });
}

function renderSkills(): void {
  const list = qs('#skills-list');
  list.replaceChildren();
  skills.forEach((skill, index) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'skill-row';
    row.id = skill.id;
    row.setAttribute('aria-expanded', 'false');
    const thumbs = skill.thumbnails
      .map(
        (file) =>
          `<img src="${workThumb(file)}" alt="" width="150" height="96" />`,
      )
      .join('');
    row.innerHTML = `
      <div class="skill-row-top">
        <span class="skill-title">${skill.title}</span>
        <span class="skill-index">0${index + 1}</span>
      </div>
      <div class="skill-panel">
        <p class="skill-copy">${skill.summary}</p>
        <div class="skill-thumbs" aria-hidden="true">${thumbs}</div>
      </div>
    `;

    const setOpen = (open: boolean) => {
      row.classList.toggle('is-open', open);
      row.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    row.addEventListener('click', () => {
      const shouldOpen = !row.classList.contains('is-open');
      list.querySelectorAll<HTMLElement>('.skill-row').forEach((other) => {
        other.classList.toggle('is-open', other === row && shouldOpen);
        other.setAttribute('aria-expanded', other === row && shouldOpen ? 'true' : 'false');
      });
    });

    row.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });

    list.appendChild(row);
  });
}

function renderJourney(): void {
  disposeJourney?.();
  const list = qs('#journey-list');
  const cluster = qs<HTMLElement>('.thumb-cluster');
  list.replaceChildren();

  for (const item of journey) {
    const row = document.createElement('a');
    row.className = 'journey-row';
    row.href = item.liveUrl ?? item.repoUrl;
    row.target = '_blank';
    row.rel = 'noopener noreferrer';
    row.dataset.thumbs = item.thumbnails.join(',');
    row.innerHTML = `
      <span class="journey-name">${item.name}</span>
      <span class="journey-type">${item.type}</span>
      <span class="journey-month">${item.month}</span>
    `;
    list.appendChild(row);
  }

  if (!canUseFineCursor() || window.matchMedia('(max-width: 900px)').matches) {
    cluster.hidden = true;
    disposeJourney = null;
    return;
  }

  const xTo = gsap.quickTo(cluster, 'left', { duration: 0.45, ease: 'power3.out' });
  const yTo = gsap.quickTo(cluster, 'top', { duration: 0.45, ease: 'power3.out' });

  const show = (row: HTMLElement, ev: PointerEvent) => {
    const files = (row.dataset.thumbs ?? '').split(',').filter(Boolean);
    if (files.length === 0) {
      cluster.hidden = true;
      return;
    }
    cluster.replaceChildren();
    for (const file of files.slice(0, 3)) {
      const img = document.createElement('img');
      img.src = workThumb(file);
      img.alt = '';
      cluster.appendChild(img);
    }
    cluster.hidden = false;
    xTo(ev.clientX);
    yTo(ev.clientY);
  };

  const move = (ev: PointerEvent) => {
    if (cluster.hidden) return;
    xTo(ev.clientX);
    yTo(ev.clientY);
  };

  const hide = () => {
    cluster.hidden = true;
  };

  const onOver = (event: Event) => {
    const row = (event.target as Element | null)?.closest<HTMLElement>('.journey-row');
    if (row) show(row, event as PointerEvent);
  };
  const onMove = (event: Event) => move(event as PointerEvent);
  const onOut = (event: Event) => {
    const next = (event as PointerEvent).relatedTarget;
    if (next instanceof Element && next.closest('.journey-row')) return;
    hide();
  };

  list.addEventListener('pointerover', onOver);
  list.addEventListener('pointermove', onMove);
  list.addEventListener('pointerout', onOut);

  disposeJourney = () => {
    list.removeEventListener('pointerover', onOver);
    list.removeEventListener('pointermove', onMove);
    list.removeEventListener('pointerout', onOut);
    cluster.hidden = true;
  };
}

function renderProject(slug: string): void {
  const view = qs('#view-project');
  const project = getProject(slug);
  if (!project) {
    view.innerHTML = `
      <article class="project-page project-missing">
        <a class="project-back" href="#/"><span aria-hidden="true">←</span> Back</a>
        <h1 class="project-title">Project not found</h1>
        <p class="project-desc">That project is not in the selected work. Please go back to the home page.</p>
      </article>
    `;
    return;
  }

  const tags = [...project.categories, ...project.stack]
    .map((tag) => `<span>${tag}</span>`)
    .join('');

  view.innerHTML = `
    <article class="project-page">
      <a class="project-back" href="#/"><span aria-hidden="true">←</span> Back</a>
      <p class="project-kicker">/WORK</p>
      <h1 class="project-title">${project.title}</h1>
      <p class="project-tags">${tags}</p>
      <p class="project-desc">${project.description}</p>
      <div class="project-actions">
        <a class="btn btn-dark" href="${project.liveUrl}" rel="noopener noreferrer" target="_blank">
          Live Preview <span class="btn-arrow" aria-hidden="true">→</span>
        </a>
        <a class="btn btn-outline" href="${project.sourceUrl}" rel="noopener noreferrer" target="_blank">
          Source <span class="btn-arrow" aria-hidden="true">→</span>
        </a>
      </div>
      <figure class="project-shot">
        <img src="${workThumb(project.thumbnail)}" alt="Screenshot of ${project.title}" width="1280" height="800" />
      </figure>
    </article>
  `;
}

function showHomeView(): void {
  qs('#view-home').hidden = false;
  qs('#view-project').hidden = true;
  document.body.dataset.view = 'home';
}

function showProjectView(): void {
  qs('#view-home').hidden = true;
  qs('#view-project').hidden = false;
  document.body.dataset.view = 'project';
}

function setTitle(route: Route): void {
  const projectTitle =
    route.name === 'project' ? getProject(route.slug)?.title : undefined;
  document.title = titleFor(route, projectTitle);
}

function rememberHomeScroll(): void {
  homeScroll = getLenis()?.scroll ?? window.scrollY;
}

function restoreHomeScroll(): void {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(homeScroll, { immediate: true });
  } else {
    window.scrollTo(0, homeScroll);
  }
}

function resetScroll(): void {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

async function goTo(route: Route, options: { instant?: boolean; section?: string | null } = {}): Promise<void> {
  const sameView =
    current !== null &&
    current.name === route.name &&
    (route.name !== 'project' || (current.name === 'project' && current.slug === route.slug));

  const apply = () => {
    current = route;
    setTitle(route);
    if (route.name === 'home') {
      showHomeView();
      revealHome();
      refreshScroll();
      if (options.section) {
        requestAnimationFrame(() => scrollToId(options.section as string));
      } else if (options.instant) {
        restoreHomeScroll();
      }
    } else {
      renderProject(route.slug);
      showProjectView();
      resetScroll();
    }
  };

  if (sameView) {
    if (route.name === 'home' && options.section) scrollToId(options.section);
    return;
  }

  if (current?.name === 'home') rememberHomeScroll();

  if (options.instant) {
    apply();
    if (route.name === 'home' && !options.section) restoreHomeScroll();
    return;
  }

  await playWipe(apply);
}

function onHashChange(): void {
  const route = parseHash(location.hash);
  const section = sectionFromHash(location.hash);
  void goTo(route, { section });
}

function initSocials(): void {
  const markup = socialPillsMarkup();
  document.querySelectorAll('.hero-socials, .footer-socials').forEach((list) => {
    list.innerHTML = markup;
  });
}

function initPortrait(): void {
  const img = qs<HTMLImageElement>('#portrait-img');
  img.src = portraitUrl;
  img.srcset = `${portraitUrl} 652w, ${portraitUrl2x} 1304w`;
  img.sizes = img.getAttribute('sizes') || '(max-width: 800px) min(78vw, 340px), 800px';
  const figure = img.closest('.portrait');
  figure?.addEventListener('pointerenter', () => figure.classList.add('is-color'));
  figure?.addEventListener('pointerleave', () => figure.classList.remove('is-color'));
}

function init(): void {
  initPortrait();
  initSocials();
  renderFilters();
  renderWork();
  renderSkills();
  renderJourney();
  initSmoothScroll();
  disposeCursor = initCursor(document.querySelector('.sheet') ?? document.body);

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href') ?? '';
      const section = sectionFromHash(href);
      if (!section) return;
      event.preventDefault();
      if (current?.name !== 'home') {
        location.hash = href;
        return;
      }
      if (location.hash !== href) {
        history.pushState(null, '', href);
      }
      scrollToId(section);
    });
  });

  window.addEventListener('hashchange', onHashChange);

  const route = parseHash(location.hash);
  const section = sectionFromHash(location.hash);
  void goTo(route, { instant: true, section });
}

init();

window.addEventListener('beforeunload', () => {
  disposeCursor?.();
  disposeJourney?.();
});

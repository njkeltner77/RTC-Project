const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const themeIcon = document.querySelector('.theme-icon');
const themeColor = document.querySelector('meta[name="theme-color"]');
const currentYear = document.querySelector('#year');
const filterGroup = document.querySelector('.filters');
const filterStatus = document.querySelector('#filter-status');
const emptyState = document.querySelector('#empty-state');
const timelineEntries = [...document.querySelectorAll('[data-entry]')];
const filterButtons = [...document.querySelectorAll('[data-filter]')];

if (themeToggle && themeLabel && themeIcon) {
  const themePreferenceKey = 'portfolio-theme';
  const storedTheme = localStorage.getItem(themePreferenceKey);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const initialTheme =
    storedTheme === 'dark' || storedTheme === 'light'
      ? storedTheme
      : systemPrefersDark.matches
        ? 'dark'
        : 'light';

  const applyTheme = (theme, persist = false) => {
    document.documentElement.dataset.theme = theme;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    themeLabel.textContent = `${nextTheme === 'dark' ? 'Dark' : 'Light'} mode`;
    themeIcon.textContent = nextTheme === 'dark' ? '☾' : '☀';

    if (themeColor) {
      themeColor.content = theme === 'dark' ? '#211e29' : '#f8f7fb';
    }

    if (persist) {
      localStorage.setItem(themePreferenceKey, theme);
    }
  };

  applyTheme(initialTheme);

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  });

  systemPrefersDark.addEventListener('change', (event) => {
    if (!localStorage.getItem(themePreferenceKey)) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('is-open', !expanded);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
    });
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (filterGroup && filterStatus && emptyState && timelineEntries.length && filterButtons.length) {
  const updateTimeline = (filter) => {
    let visibleCount = 0;

    timelineEntries.forEach((entry) => {
      const isVisible = filter === 'all' || entry.dataset.category === filter;
      entry.hidden = !isVisible;
      visibleCount += Number(isVisible);
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    emptyState.hidden = visibleCount !== 0;
    filterStatus.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'entry' : 'entries'}.`;
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => updateTimeline(button.dataset.filter || 'all'));
  });

  updateTimeline('all');
  filterGroup.hidden = false;
}

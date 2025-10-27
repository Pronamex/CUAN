// Navbar scroll effect
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  header.classList.toggle('header-scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// --- NEW: toggle primer nivel (nav-item con dropdown) en móvil ---
document.querySelectorAll('.nav-item').forEach((item) => {
  const toggle = item.querySelector('.nav-link');
  const menu = item.querySelector(':scope > .dropdown-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();           // evita “cerrar” o navegar
        e.stopPropagation();
        item.classList.toggle('active');
      }
    });
  }
});

// Dropdown functionality for mobile (submenús)
document.querySelectorAll('.dropdown-item').forEach((item) => {
  const toggle = item.querySelector(':scope > .dropdown-link');      // el label "Licenciaturas"
  const submenu = item.querySelector(':scope > .dropdown-submenu');  // su UL anidado

  // Solo si hay submenú, el toggle actúa como acordeón en móvil
  if (toggle && submenu) {
    const handler = (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        e.stopPropagation();
        item.classList.toggle('active');
      }
    };
    toggle.addEventListener('click', handler);
    toggle.addEventListener('touchend', handler);
  }
});

document.querySelectorAll('.dropdown-submenu a.dropdown-link').forEach((a) => {
  a.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) e.stopPropagation();
  });
});


// --- FIX: cerrar el menú solo cuando se hace click en enlaces reales (a[href]) ---
document.querySelectorAll('a.nav-link, a.dropdown-link').forEach((a) => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 992) {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
    }
  });
});

(function () {
  var nav = document.querySelector('.nav');

  // Mobile menu toggle
  var toggle = document.querySelector('.nav__toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.querySelectorAll('.nav__panel a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Solid navbar on scroll (only for transparent-over-hero navs)
  if (nav && !nav.classList.contains('always-solid')) {
    var onScroll = function () {
      if (window.scrollY > 30) nav.classList.add('solid');
      else nav.classList.remove('solid');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Reveal on scroll
  var items = document.querySelectorAll('[data-reveal]');
  var revealAll = function () { items.forEach(function (el) { el.classList.add('in'); }); };
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
    // Safety net: never leave content hidden if the observer misfires.
    window.addEventListener('load', function () { setTimeout(revealAll, 2500); });
  } else {
    revealAll();
  }
})();

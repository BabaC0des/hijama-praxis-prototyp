/* Shared site interactions (classic script — works on file:// and http) */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* header scrolled state */
  var header = document.querySelector('header.site');
  function onScroll(){ if(header) header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); addEventListener('scroll', onScroll, {passive:true});

  /* mobile menu */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  if(burger && menu){
    burger.onclick = function(){ menu.classList.add('open'); };
    var close = document.getElementById('menuClose');
    if(close) close.onclick = function(){ menu.classList.remove('open'); };
    menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ menu.classList.remove('open'); }); });
  }

  /* reveal on scroll */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* highlight active nav link by filename */
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.main a[href]').forEach(function(a){
    if(a.getAttribute('href') === page) a.classList.add('active');
  });

  /* smooth scroll for in-page anchors (Lenis if present) */
  var lenis = null;
  if(window.Lenis && !reduce){
    lenis = new Lenis({lerp:.09});
    function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if(!id || id === '#') return;
      var el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      if(lenis) lenis.scrollTo(el, {offset:-70, duration:1.2});
      else el.scrollIntoView({behavior: reduce ? 'auto' : 'smooth'});
    });
  });

  /* magnetic buttons (fine pointers only) */
  if(!reduce && matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.magnetic').forEach(function(el){
      el.addEventListener('mousemove', function(e){
        var r = el.getBoundingClientRect();
        var x = e.clientX-(r.left+r.width/2), y = e.clientY-(r.top+r.height/2);
        el.style.transform = 'translate('+(x*.22)+'px,'+(y*.3)+'px)';
      });
      el.addEventListener('mouseleave', function(){ el.style.transform=''; });
    });
  }
})();

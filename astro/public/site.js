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

  /* smooth scroll for in-page anchors — native only, no drag/inertia library */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if(!id || id === '#') return;
      var el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior: reduce ? 'auto' : 'smooth'});
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

  /* language switcher — Google website translator (the same engine GTranslate uses) */
  (function(){
    var host = document.createElement('div');
    host.id = 'google_translate_element';
    host.className = 'lang-switch';
    function place(){
      var m = document.getElementById('mobileMenu');
      var n = document.querySelector('.nav-cta');
      if(innerWidth <= 760 && m){ if(host.parentElement !== m) m.appendChild(host); }
      else if(n){ if(host.parentElement !== n) n.insertBefore(host, n.firstChild); }
    }
    place(); addEventListener('resize', place);
    window.googleTranslateElementInit = function(){
      new google.translate.TranslateElement(
        {pageLanguage:'de', includedLanguages:'de,en,ar,sq,tr', autoDisplay:false},
        'google_translate_element');
    };
    var s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(s);
    /* keep Google's injected top-offset from pushing the page down */
    setInterval(function(){ if(document.body.style.top && document.body.style.top !== '0px') document.body.style.top = '0px'; }, 600);
  })();
})();

(function () {
    'use strict';

    document.documentElement.classList.add('js');

    function isMobileViewport() {
      return window.innerWidth <= 991.98;
    }

    const hasHamburger = !!document.getElementById('hamburgerBtn');
    const hasLang = !!document.getElementById('langBtn');
    const hasMobileLang = !!document.getElementById('mLangBtn');
    const hasMobileMenu = !!document.getElementById('mobileMenu');
    console.log('[main.js] bound', { hasHamburger, hasLang, hasMobileLang, hasMobileMenu, viewportWidth: window.innerWidth });
  
    // ============================================================
    // A) Header Scroll Effect
    // ============================================================
    const header = document.getElementById('main-header');
    if (header) {
      window.addEventListener('scroll', function () {
        const y = window.pageYOffset || document.documentElement.scrollTop;
        if (y > 100) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      });
    }
  
    // ============================================================
    // B) Hamburger Animation (삼선 → X) + body.menu-open
    // ============================================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
  
    if (hamburgerBtn && mobileMenu) {
      // Ensure bootstrap collapse instance
      let bsMobile = null;
      if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
        bsMobile = bootstrap.Collapse.getInstance(mobileMenu);
        if (!bsMobile) bsMobile = new bootstrap.Collapse(mobileMenu, { toggle: false });
  
        mobileMenu.addEventListener('show.bs.collapse', function () {
          hamburgerBtn.classList.add('is-open');
          document.body.classList.add('menu-open');
          hamburgerBtn.setAttribute('aria-expanded', 'true');
        });
  
        mobileMenu.addEventListener('hide.bs.collapse', function () {
          hamburgerBtn.classList.remove('is-open');
          document.body.classList.remove('menu-open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        });
      } else {
        // Fallback (bootstrap 없음)
        hamburgerBtn.addEventListener('click', function (e) {
          e.preventDefault();
          const isOpen = mobileMenu.classList.contains('show');
          if (isOpen) {
            mobileMenu.classList.remove('show');
            hamburgerBtn.classList.remove('is-open');
            document.body.classList.remove('menu-open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
          } else {
            mobileMenu.classList.add('show');
            hamburgerBtn.classList.add('is-open');
            document.body.classList.add('menu-open');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
          }
        });
      }
  
      // ESC to close
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
          if (bsMobile) bsMobile.hide();
          else {
            mobileMenu.classList.remove('show');
            hamburgerBtn.classList.remove('is-open');
            document.body.classList.remove('menu-open');
          }
        }
      });
    }
  
    // ============================================================
    // C) Desktop Language Dropdown Toggle
    // ============================================================
    const langBtn = document.getElementById('langBtn');
    const langMenu = document.getElementById('langMenu');
    const langDropdown = document.getElementById('langDropdown');
  
    if (langBtn && langMenu && langDropdown) {
      function toggleLangMenu(open) {
        if (open) {
          langDropdown.classList.add('is-open');
          langMenu.setAttribute('aria-hidden', 'false');
          langBtn.setAttribute('aria-expanded', 'true');
        } else {
          langDropdown.classList.remove('is-open');
          langMenu.setAttribute('aria-hidden', 'true');
          langBtn.setAttribute('aria-expanded', 'false');
        }
      }
  
      langBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = langDropdown.classList.contains('is-open');
        toggleLangMenu(!isOpen);
      });
  
      document.addEventListener('click', function (e) {
        if (!langDropdown.contains(e.target)) toggleLangMenu(false);
      });
  
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && langDropdown.classList.contains('is-open')) {
          toggleLangMenu(false);
        }
      });
  
      const langItems = langMenu.querySelectorAll('.lang-item');
      langItems.forEach(function (item) {
        item.addEventListener('click', function () {
          langItems.forEach((i) => i.classList.remove('is-active'));
          item.classList.add('is-active');
  
          const label = langBtn.querySelector('.lang-label');
          if (label) label.textContent = item.getAttribute('data-lang');
  
          toggleLangMenu(false);
        });
      });
    }
  
    // ============================================================
    // D) Mobile Language Dropdown (inside mobile menu)
    // ============================================================
    const mLangBtn = document.getElementById('mLangBtn');
    const mLangMenu = document.getElementById('mLangMenu');
    const mLangDropdown = mLangBtn ? mLangBtn.closest('.lang-dropdown') : null;
  
    if (mLangBtn && mLangMenu && mLangDropdown) {
      function toggleMobileLangMenu(open) {
        if (open) {
          mLangDropdown.classList.add('is-open');
          mLangMenu.setAttribute('aria-hidden', 'false');
          mLangBtn.setAttribute('aria-expanded', 'true');
        } else {
          mLangDropdown.classList.remove('is-open');
          mLangMenu.setAttribute('aria-hidden', 'true');
          mLangBtn.setAttribute('aria-expanded', 'false');
        }
      }
  
      mLangBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = mLangDropdown.classList.contains('is-open');
        toggleMobileLangMenu(!isOpen);
      });
  
      // close when clicking outside inside menu panel
      if (mobileMenu) {
        mobileMenu.addEventListener('click', function (e) {
          if (!mLangDropdown.contains(e.target)) toggleMobileLangMenu(false);
        });
      }
  
      const mLangItems = mLangMenu.querySelectorAll('.lang-item');
      mLangItems.forEach(function (item) {
        item.addEventListener('click', function () {
          mLangItems.forEach((i) => i.classList.remove('is-active'));
          item.classList.add('is-active');
  
          const label = mLangBtn.querySelector('.lang-label');
          if (label) label.textContent = item.getAttribute('data-lang');
  
          toggleMobileLangMenu(false);
        });
      });
  
      // when mobile menu closes, also close language panel
      if (mobileMenu) {
        mobileMenu.addEventListener('hidden.bs.collapse', function () {
          toggleMobileLangMenu(false);
        });
      }
    }
  
    // ============================================================
    // E) Smooth Scroll (easeOutCubic) – 앵커 링크용
    // ============================================================
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function smoothScrollTo(targetTop, duration, callback) {
      const startTop = window.pageYOffset || document.documentElement.scrollTop;
      const distance = targetTop - startTop;
      const startTime = performance.now();
      let rafId = null;

      function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        window.scrollTo(0, startTop + distance * eased);
        if (progress < 1) rafId = requestAnimationFrame(animate);
        else if (callback) callback();
      }
      rafId = requestAnimationFrame(animate);
      return function cancel() {
        if (rafId) cancelAnimationFrame(rafId);
      };
    }

    // ============================================================
    // F) Scroll Reveal (IntersectionObserver)
    // ============================================================
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1) Hero 텍스트 그룹: 페이지 로드 시 1회 등장
    const heroTextGroup = document.querySelector('#hero .hero-text-group');
    if (heroTextGroup) {
      heroTextGroup.classList.add('reveal', 'reveal-hero');
      if (reduceMotion) {
        heroTextGroup.classList.add('is-inview');
      } else {
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            heroTextGroup.classList.add('is-inview');
          });
        });
      }
    }

    // 2) 스크롤 진입 시 reveal 대상 수집
    const revealConfig = [
      { section: '#company', header: '.section-header', cards: '.company-card', stagger: 90 },
      { section: '#brand', header: '.section-header', cards: '.brand-card', stagger: 90 },
      { section: '#csr', main: '.csr-card', button: '.btn-csr', buttonDelay: 120 },
      { section: '#contact', header: '.section-header', cards: '.contact-card', stagger: 90 }
    ];

    const revealElements = [];

    revealConfig.forEach(function(config) {
      const sectionEl = document.querySelector(config.section);
      if (!sectionEl) return;

      // Header
      if (config.header) {
        const header = sectionEl.querySelector(config.header);
        if (header) {
          header.classList.add('reveal');
          header.setAttribute('data-delay', '0');
          revealElements.push(header);
        }
      }

      // Main (for CSR)
      if (config.main) {
        const main = sectionEl.querySelector(config.main);
        if (main) {
          main.classList.add('reveal', 'reveal-heavy');
          main.setAttribute('data-delay', '0');
          revealElements.push(main);
        }
      }

      // Cards with stagger
      if (config.cards) {
        const cards = sectionEl.querySelectorAll(config.cards);
        cards.forEach(function(card, idx) {
          card.classList.add('reveal');
          const delay = idx * config.stagger;
          card.setAttribute('data-delay', delay.toString());
          card.style.transitionDelay = delay + 'ms';
          revealElements.push(card);
        });
      }

      // Button (for CSR)
      if (config.button) {
        const btn = sectionEl.querySelector(config.button);
        if (btn) {
          btn.classList.add('reveal');
          btn.setAttribute('data-delay', config.buttonDelay.toString());
          btn.style.transitionDelay = config.buttonDelay + 'ms';
          revealElements.push(btn);
        }
      }
    });

    // 3) IntersectionObserver로 관찰
    if (!reduceMotion && revealElements.length) {
      const revealObserver = new IntersectionObserver(
        function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-inview');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
      );
      revealElements.forEach(function(el) { revealObserver.observe(el); });
    } else if (reduceMotion) {
      revealElements.forEach(function(el) { el.classList.add('is-inview'); });
    }

    // ============================================================
    // G) Smooth Scroll for Anchor Links
    //    ✅ 중요: Bootstrap collapse 토글(#shopCollapse 등)은 절대 건드리지 않음
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = link.getAttribute('href');
  
        // 1) 빈 앵커 제외
        if (!href || href === '#' || href === '#!') return;
  
        // 2) Bootstrap collapse 토글은 제외 (SHOP이 여기 걸리면 페이지가 내려감)
        if (link.getAttribute('data-bs-toggle') === 'collapse') return;
  
        // 3) shopCollapse / mobileMenu 같은 UI 토글 앵커는 제외
        if (href === '#shopCollapse' || href === '#mobileMenu') return;
  
        // 4) 일반 섹션 앵커만 스무스 스크롤
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
  
          // 모바일은 기본 스크롤(형님 요청대로), 데스크탑만 부드럽게
          const duration = isMobileViewport() ? 0 : 800;
          if (duration === 0) {
            window.scrollTo(0, targetTop);
          } else {
            smoothScrollTo(targetTop, duration);
          }
        }
      });
    });
  
    // ============================================================
    // H) Brand Card Hover Effect
    // ============================================================
    document.querySelectorAll('.brand-card').forEach(function (card) {
      const description = card.querySelector('.brand-description');
      if (!description) return;
  
      card.addEventListener('mouseenter', function () {
        description.style.opacity = '1';
        description.style.transform = 'translateY(0)';
        description.style.maxHeight = '200px';
      });
  
      card.addEventListener('mouseleave', function () {
        description.style.opacity = '0';
        description.style.transform = 'translateY(20px)';
        description.style.maxHeight = '0';
      });
    });
  
    // ============================================================
    // I) Mobile Menu Close on Link Click
    //    - SHOP 토글은 메뉴 닫지 않음
    //    - SHOP 하위 링크는 메뉴 닫음
    // ============================================================
    if (mobileMenu) {
      const shopCollapse = document.getElementById('shopCollapse');
      const shopToggleBtn = document.querySelector('.mobile-pill-btn[data-bs-toggle="collapse"]');
      const bsMobile = (typeof bootstrap !== 'undefined' && bootstrap.Collapse)
        ? bootstrap.Collapse.getInstance(mobileMenu) || new bootstrap.Collapse(mobileMenu, { toggle: false })
        : null;
  
      // 모바일 메뉴가 닫힐 때 SHOP도 접기
      if (shopCollapse && typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
        mobileMenu.addEventListener('hidden.bs.collapse', function () {
          const bsShop = bootstrap.Collapse.getOrCreateInstance(shopCollapse, { toggle: false });
          bsShop.hide();
        });
      }
  
      // SHOP pill 버튼 클릭 시: 메뉴는 닫지 않음 (Bootstrap이 자동 처리)
      if (shopToggleBtn) {
        shopToggleBtn.addEventListener('click', function(e) {
          // Bootstrap collapse가 자동으로 처리하므로 여기서는 메뉴 닫지 않음
          // aria-expanded는 Bootstrap이 자동 업데이트
        });
      }
  
      // SHOP 하위 링크 클릭 시: 메뉴 닫기
      if (shopCollapse) {
        shopCollapse.querySelectorAll('.mobile-pill-link').forEach(function(link) {
          link.addEventListener('click', function() {
            if (isMobileViewport()) {
              if (bsMobile) bsMobile.hide();
              else mobileMenu.classList.remove('show');
            }
          });
        });
      }
  
      // 일반 nav-link 클릭 시: 메뉴 닫기
      mobileMenu.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
          // SHOP 관련이면 제외
          if (shopCollapse && (shopCollapse.contains(link) || link.closest('.mobile-pill-wrap'))) {
            return;
          }
  
          // 일반 링크 클릭 시: 메뉴 닫기
          if (isMobileViewport()) {
            if (bsMobile) bsMobile.hide();
            else mobileMenu.classList.remove('show');
          }
        });
      });
    }
  })();
  
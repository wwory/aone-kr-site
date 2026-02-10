(function () {
    'use strict';

    document.documentElement.classList.add('js');

    // ============================================================
    // 다국어(버블포인트): localStorage + data-lang + data-i18n
    // ============================================================
    var LANG_STORAGE_KEY = 'aone_lang';

    var I18N = {
      KR: {
        hero_title_1: 'BABY IS OUR',
        hero_title_2: 'FUTURE',
        hero_lead: '대한민국 1등 육아 파트너.\n검증된 자체 기술력과 엄선된 글로벌 브랜드를 만나보세요.',
        hero_cta_primary: 'View Brands',
        hero_cta_outline: 'About Company',
        hero_who_title: 'Who we are',
        hero_who_sub: 'Our Philosophy',
        philosophy_honesty_en: 'Honesty',
        philosophy_honesty_key: '진심을 담은 약속',
        philosophy_honesty_desc: '보이지 않는 과정까지 정직하게, 부모의 마음으로 만듭니다.',
        philosophy_quality_en: 'Quality',
        philosophy_quality_key: '안전을 향한 고집',
        philosophy_quality_desc: '가장 소중한 우리 아이를 위해 작은 디테일도 놓치지 않습니다.',
        philosophy_people_en: 'People',
        philosophy_people_key: '함께하는 행복',
        philosophy_people_desc: '단순한 제품 판매를 넘어, 행복한 육아 문화를 만들어갑니다.',
        brands_title: 'Our Brands',
        brand_ryan_desc: '아이의 안전과 편안함을 최우선으로\n하는 유아용품 브랜드입니다.',
        brand_joie_desc: '세계적인 디자인과 안전성을 갖춘\n프리미엄 유아용품 브랜드입니다.',
        brand_tavo_desc: '반려동물과 가족이 함께하는 행복한\n일상을 만들어가는 브랜드입니다.',
        brand_cta: 'View brand',
        csr_label: 'CSR',
        csr_title: '아이의 오늘을 지키는 일이\n모두의 내일을 밝힙니다',
        csr_desc: 'AONE은 아이와 가족의 건강하고 행복한 미래를 위해\n지속 가능한 사회적 책임을 실천합니다.\n\n안전한 제품 개발, 환경 보호, 지역 사회와의 상생을 통해\n더 나은 내일을 만들어갑니다.',
        csr_btn: 'CSR 이야기 보기 →'
      },
      EN: {
        hero_title_1: 'BABY IS OUR',
        hero_title_2: 'FUTURE',
        hero_lead: 'Korea\'s leading baby gear company\nwith trusted in-house and global imported brands.',
        hero_cta_primary: 'View Brands',
        hero_cta_outline: 'About Company',
        hero_who_title: 'Who we are',
        hero_who_sub: 'Our Philosophy',
        philosophy_honesty_en: 'Honesty',
        philosophy_honesty_key: 'A promise with sincerity',
        philosophy_honesty_desc: 'We act with integrity through every step, with the heart of parents.',
        philosophy_quality_en: 'Quality',
        philosophy_quality_key: 'Obsession with safety',
        philosophy_quality_desc: 'We never overlook the smallest detail for our precious children.',
        philosophy_people_en: 'People',
        philosophy_people_key: 'Happiness together',
        philosophy_people_desc: 'Beyond selling products, we create a culture of happy parenting.',
        brands_title: 'Our Brands',
        brand_ryan_desc: 'A baby care brand that puts\nchildren\'s safety and comfort first.',
        brand_joie_desc: 'A premium baby care brand with\nworld-class design and safety.',
        brand_tavo_desc: 'A brand that creates a happy daily life\nwith pets and family together.',
        brand_cta: 'View brand',
        csr_label: 'CSR',
        csr_title: 'Protecting children today\nbrightens everyone\'s tomorrow',
        csr_desc: 'AONE practices sustainable social responsibility for the healthy, happy future of children and families.\n\nWe create a better tomorrow through safe product development, environmental protection, and coexistence with local communities.',
        csr_btn: 'See CSR story →'
      },
      CN: {
        hero_title_1: 'BABY IS OUR',
        hero_title_2: 'FUTURE',
        hero_lead: '韩国第一育儿伙伴。\n遇见经认证的自主技术与严选全球品牌。',
        hero_cta_primary: 'View Brands',
        hero_cta_outline: 'About Company',
        hero_who_title: 'Who we are',
        hero_who_sub: 'Our Philosophy',
        philosophy_honesty_en: 'Honesty',
        philosophy_honesty_key: '真诚的承诺',
        philosophy_honesty_desc: '连看不见的过程也诚实以对，以父母之心制造。',
        philosophy_quality_en: 'Quality',
        philosophy_quality_key: '对安全的执着',
        philosophy_quality_desc: '为了最珍贵的我们的孩子，连细小细节也不放过。',
        philosophy_people_en: 'People',
        philosophy_people_key: '共同的幸福',
        philosophy_people_desc: '超越单纯的产品销售，创造幸福的育儿文化。',
        brands_title: 'Our Brands',
        brand_ryan_desc: '将孩子的安全与舒适放在首位的\n婴幼儿用品品牌。',
        brand_joie_desc: '拥有世界级设计与安全性的\n高端婴幼儿用品品牌。',
        brand_tavo_desc: '与伴侣动物和家人一起创造幸福\n日常的品牌。',
        brand_cta: 'View brand',
        csr_label: 'CSR',
        csr_title: '守护孩子的今天\n照亮所有人的明天',
        csr_desc: 'AONE为儿童与家庭的健康幸福未来，实践可持续的社会责任。\n\n通过安全产品开发、环境保护、与地区社会的共赢，创造更美好的明天。',
        csr_btn: '查看CSR故事 →'
      }
    };

    function applyI18n(lang) {
      var map = I18N[lang] || I18N.KR;
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (!key || !map[key]) return;
        var text = map[key];
        el.innerHTML = text.replace(/\n/g, '<br>');
      });
    }

    function syncLangButtons(lang) {
      var labelEls = document.querySelectorAll('#langBtn .lang-label, #mLangBtn .lang-label');
      labelEls.forEach(function (l) { l.textContent = lang; });
      document.querySelectorAll('#langMenu .lang-item, #mLangMenu .lang-item').forEach(function (item) {
        item.classList.toggle('is-active', item.getAttribute('data-lang') === lang);
      });
    }

    (function initLang() {
      var lang = localStorage.getItem(LANG_STORAGE_KEY) || 'KR';
      document.documentElement.setAttribute('data-lang', lang);
      syncLangButtons(lang);
      applyI18n(lang);
    })();

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
      // 아이콘 상태: 햄버거 버튼 클릭·메뉴 닫기 시에만 반영 (SHOP 토글 시에는 변경 안 함)
      function syncHamburgerIcon() {
        const isOpen = mobileMenu.classList.contains('show');
        if (isOpen) {
          hamburgerBtn.classList.add('is-open');
          document.body.classList.add('menu-open');
          hamburgerBtn.setAttribute('aria-expanded', 'true');
        } else {
          hamburgerBtn.classList.remove('is-open');
          document.body.classList.remove('menu-open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      }

      // Ensure bootstrap collapse instance
      let bsMobile = null;
      if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
        bsMobile = bootstrap.Collapse.getInstance(mobileMenu);
        if (!bsMobile) bsMobile = new bootstrap.Collapse(mobileMenu, { toggle: false });
  
        // 메뉴가 열렸을 때 아이콘 → X (#mobileMenu만 해당, SHOP 토글 시 미발생)
        mobileMenu.addEventListener('shown.bs.collapse', function () {
          hamburgerBtn.classList.add('is-open');
          document.body.classList.add('menu-open');
          hamburgerBtn.setAttribute('aria-expanded', 'true');
        });
        // 메뉴가 닫혔을 때 아이콘 → 햄버거 (X·링크·ESC로 닫을 때; #mobileMenu만 해당)
        mobileMenu.addEventListener('hidden.bs.collapse', syncHamburgerIcon);
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
  
      // ESC to close (아이콘도 햄버거로)
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
          if (bsMobile) {
            bsMobile.hide();
            hamburgerBtn.classList.remove('is-open');
            document.body.classList.remove('menu-open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
          } else {
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
          var selectedLang = item.getAttribute('data-lang');
          if (selectedLang) {
            localStorage.setItem(LANG_STORAGE_KEY, selectedLang);
            location.reload();
          }
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
          var selectedLang = item.getAttribute('data-lang');
          if (selectedLang) {
            localStorage.setItem(LANG_STORAGE_KEY, selectedLang);
            location.reload();
          }
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

    // 1) Hero: v2는 .hero-copy + .hero-visual 로드 시 1회 등장 (기존 .hero-text-group 폴백)
    const heroCopy = document.querySelector('#hero .hero-copy');
    const heroVisual = document.querySelector('#hero .hero-visual');
    const heroLegacy = document.querySelector('#hero .hero-text-group');
    const heroTargets = heroCopy && heroVisual ? [heroCopy, heroVisual] : (heroLegacy ? [heroLegacy] : []);
    heroTargets.forEach(function(el) {
      el.classList.add('reveal', 'reveal-hero');
      if (reduceMotion) {
        el.classList.add('is-inview');
      } else {
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            el.classList.add('is-inview');
          });
        });
      }
    });

    // CSR 서브페이지 히어로: CSR / 사회공헌활동 / 하위 텍스트 순차 등장 (다른 카테고리와 동일한 느낌)
    if (document.body.classList.contains('page-csr')) {
      var csrHero = document.querySelector('.page-csr .csr-hero-intro');
      if (csrHero) {
        var csrHeroBlocks = csrHero.querySelectorAll('.hero-title-block, .hero-title-sub, .hero-lead');
        csrHeroBlocks.forEach(function(el, idx) {
          el.classList.add('reveal', 'reveal-hero');
          if (reduceMotion) {
            el.classList.add('is-inview');
          } else {
            // 인덱스 기준으로 약간씩 딜레이를 줘서 순차 등장
            var delayMs = 80 * idx;
            el.style.transitionDelay = delayMs + 'ms';
            setTimeout(function() {
              el.classList.add('is-inview');
            }, delayMs);
          }
        });
      }
    }

    // 2) 스크롤 진입 시 reveal 대상 수집 (메인: #brand, #csr)
    const revealConfig = [
      { section: '#brand', header: '.section-header', cards: '.brand-tile', stagger: 80, compact: true },
      { section: '#csr', blocks: ['.csr-anchor-label', '.csr-anchor-title', '.csr-anchor-desc', '.csr-anchor-btn'] }
    ];

    const revealElements = [];
    const revealClass = 'reveal';
    const revealClassCompact = 'reveal-compact';

    revealConfig.forEach(function(config) {
      const sectionEl = document.querySelector(config.section);
      if (!sectionEl) return;
      const useCompact = !!config.compact;
      const addReveal = function(el) {
        el.classList.add(revealClass);
        if (useCompact) el.classList.add(revealClassCompact);
      };

      // Header
      if (config.header) {
        const header = sectionEl.querySelector(config.header);
        if (header) {
          addReveal(header);
          header.setAttribute('data-delay', '0');
          revealElements.push(header);
        }
      }

      // Main (for CSR)
      if (config.main) {
        const main = sectionEl.querySelector(config.main);
        if (main) {
          addReveal(main);
          main.setAttribute('data-delay', '0');
          revealElements.push(main);
        }
      }

      // Cards with stagger
      if (config.cards) {
        const cards = sectionEl.querySelectorAll(config.cards);
        cards.forEach(function(card, idx) {
          addReveal(card);
          const delay = idx * config.stagger;
          card.setAttribute('data-delay', delay.toString());
          card.style.transitionDelay = delay + 'ms';
          revealElements.push(card);
        });
      }

      // Button (for CSR, optional)
      if (config.button) {
        const btn = sectionEl.querySelector(config.button);
        if (btn) {
          btn.classList.add('reveal');
          const delay = config.buttonDelay || 120;
          btn.setAttribute('data-delay', delay.toString());
          btn.style.transitionDelay = delay + 'ms';
          revealElements.push(btn);
        }
      }

      // Blocks: 단일 요소 reveal (타임라인, values 등) — 기존 data-delay 유지
      if (config.blocks && config.blocks.length) {
        config.blocks.forEach(function(sel) {
          const block = sectionEl.querySelector(sel);
          if (block) {
            block.classList.add('reveal');
            if (!block.hasAttribute('data-delay')) block.setAttribute('data-delay', '0');
            revealElements.push(block);
          }
        });
      }
    });

    // COMPANY 허브·서브페이지 + 단일 COMPANY 페이지 reveal 요소 수집 — 동일 Observer로 등장 처리
    ['#ideology', '.company-hub', '.company-history', '.company-awards', '.company-ci', '#company-content'].forEach(function(sel) {
      var parent = sel.charAt(0) === '#' ? document.getElementById(sel.slice(1)) : document.querySelector(sel);
      if (parent) {
        parent.querySelectorAll('.reveal').forEach(function(el) {
          revealElements.push(el);
        });
      }
    });

    // RECRUIT / CSR 페이지: 섹션 reveal 요소 수집
    ['.section-recruit-intro', '.section-recruit-talent', '.section-recruit-family', '.section-csr-timeline'].forEach(function(sel) {
      var parent = document.querySelector(sel);
      if (parent) {
        parent.querySelectorAll('.reveal').forEach(function(el) {
          revealElements.push(el);
        });
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
        { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
      );
      revealElements.forEach(function(el) { revealObserver.observe(el); });
    } else if (reduceMotion) {
      revealElements.forEach(function(el) { el.classList.add('is-inview'); });
    }

    // CSR 섹션: 배경 완전 고정 (진입 시에만 배경 노출)
    var csrSection = document.querySelector('.csr-section');
    if (csrSection) {
      var csrBgObserver = new IntersectionObserver(
        function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              csrSection.classList.add('is-active');
            } else {
              csrSection.classList.remove('is-active');
            }
          });
        },
        { threshold: 0.15 }
      );
      csrBgObserver.observe(csrSection);
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
  
        // 4) 일반 섹션 앵커: 컴퍼니 패널 이동과 동일하게 네이티브 smooth 스크롤
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerOffset = 96;
          var targetTop = target.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - headerOffset;
          targetTop = Math.max(0, targetTop);
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      });
    });

    // Company 서브탭: 클릭 시 active 전환 (서브페이지용)
    document.querySelectorAll('.company-subtab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.company-subtab').forEach(function(t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');
      });
    });

    // ============================================================
    // Company 단일 페이지: 4박스 → 패널 전환 + 날개/하단탭
    // ============================================================
    var companyContent = document.getElementById('company-content');
    var companyWing = document.getElementById('companyWing');
    var companyBottomTabs = document.getElementById('companyBottomTabs');
    if (companyContent) {
      var panels = companyContent.querySelectorAll('.company-panel');
      var panelIds = ['ideology', 'history', 'awards', 'ci'];

      function setActivePanel(panelKey) {
        var idx = panelIds.indexOf(panelKey);
        if (idx === -1) return;
        companyContent.classList.remove('company-content-area--no-panel');
        var ciSlogan = document.querySelector('#panel-ci .ci-hero-slogan');
        if (ciSlogan) ciSlogan.classList.remove('is-visible');
        panels.forEach(function(p) {
          var isActive = p.getAttribute('data-panel') === panelKey;
          p.classList.toggle('is-active', isActive);
          p.setAttribute('hidden', isActive ? null : '');
        });
        if (panelKey === 'ci' && ciSlogan && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setTimeout(function() { ciSlogan.classList.add('is-visible'); }, 180);
        } else if (panelKey === 'ci' && ciSlogan) {
          ciSlogan.classList.add('is-visible');
        }
        document.querySelectorAll('.company-box').forEach(function(b) {
          b.classList.toggle('is-active', b.getAttribute('data-panel') === panelKey);
          b.setAttribute('aria-pressed', b.getAttribute('data-panel') === panelKey ? 'true' : 'false');
        });
        document.querySelectorAll('.company-wing-item').forEach(function(b) {
          b.classList.toggle('is-active', b.getAttribute('data-panel') === panelKey);
        });
        document.querySelectorAll('.company-tab-item').forEach(function(b) {
          b.classList.toggle('is-active', b.getAttribute('data-panel') === panelKey);
        });
      }

      var GNB_OFFSET = 80;

      function scrollToPanelStart(panelKey) {
        var panel = document.getElementById('panel-' + panelKey);
        if (!panel) return;
        setActivePanel(panelKey);
        requestAnimationFrame(function() {
          var top = panel.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - GNB_OFFSET;
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        });
      }

      function goToPanel(panelKey) {
        scrollToPanelStart(panelKey);
      }

      document.querySelectorAll('.company-box').forEach(function(btn) {
        btn.addEventListener('click', function() {
          goToPanel(btn.getAttribute('data-panel'));
        });
      });
      if (companyWing) {
        companyWing.querySelectorAll('.company-wing-item').forEach(function(btn) {
          btn.addEventListener('click', function() {
            goToPanel(btn.getAttribute('data-panel'));
          });
        });
      }
      if (companyBottomTabs) {
        companyBottomTabs.querySelectorAll('.company-tab-item').forEach(function(btn) {
          btn.addEventListener('click', function() {
            goToPanel(btn.getAttribute('data-panel'));
          });
        });
      }

      if (companyWing) {
        var wingThreshold = 400;
        function onScrollWing() {
          if (window.pageYOffset > wingThreshold) {
            companyWing.classList.add('is-visible');
          } else {
            companyWing.classList.remove('is-visible');
          }
        }
        window.addEventListener('scroll', onScrollWing, { passive: true });
        onScrollWing();
      }
    }

    // ============================================================
    // H0) 브랜드 페이지: 오른쪽 날개 · 하단 탭 (섹션 이동, 스크롤 시 활성 표시)
    // ============================================================
    var brandWing = document.getElementById('brandWing');
    var brandBottomTabs = document.getElementById('brandBottomTabs');
    var brandSections = ['ryan', 'joie', 'tavo'];
    var BRAND_GNB_OFFSET = 96;

    function scrollToBrandSection(sectionId) {
      var el = document.getElementById(sectionId);
      if (!el) return;
      var top = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - BRAND_GNB_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    function setBrandActive(sectionId) {
      document.querySelectorAll('.brand-wing-item').forEach(function (btn) {
        btn.classList.toggle('is-active', btn.getAttribute('data-section') === sectionId);
      });
      if (brandBottomTabs) {
        brandBottomTabs.querySelectorAll('.brand-tab-item').forEach(function (btn) {
          btn.classList.toggle('is-active', btn.getAttribute('data-section') === sectionId);
        });
      }
    }

    function updateBrandActiveFromScroll() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      var viewportMid = scrollY + window.innerHeight * 0.4;
      var active = 'ryan';
      brandSections.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
          var rect = el.getBoundingClientRect();
          var sectionTop = rect.top + scrollY;
          if (viewportMid >= sectionTop) active = id;
        }
      });
      setBrandActive(active);
    }

    if (document.body.classList.contains('page-brand')) {
      var brandNavThreshold = 400;
      function onBrandPageScroll() {
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (brandWing) {
          if (scrollY > brandNavThreshold) {
            brandWing.classList.add('is-visible');
          } else {
            brandWing.classList.remove('is-visible');
          }
        }
        if (brandBottomTabs && window.matchMedia('(max-width: 991.98px)').matches) {
          if (scrollY > brandNavThreshold) {
            brandBottomTabs.classList.add('is-visible');
          } else {
            brandBottomTabs.classList.remove('is-visible');
          }
        }
        updateBrandActiveFromScroll();
      }

      if (brandWing) {
        brandWing.querySelectorAll('.brand-wing-item').forEach(function (btn) {
          btn.addEventListener('click', function () {
            scrollToBrandSection(btn.getAttribute('data-section'));
          });
        });
      }
      if (brandBottomTabs) {
        brandBottomTabs.querySelectorAll('.brand-tab-item').forEach(function (btn) {
          btn.addEventListener('click', function () {
            scrollToBrandSection(btn.getAttribute('data-section'));
          });
        });
      }
      window.addEventListener('scroll', onBrandPageScroll, { passive: true });
      onBrandPageScroll();
    }

    // ============================================================
    // H) 브랜드 페이지 RYAN 섹션: 겹침 이미지 좌우 버튼으로 전환 (3장/4장 등 반복 순환)
    // ============================================================
    var ryanStack = document.getElementById('ryanStack');
    var ryanStackPrev = document.getElementById('ryanStackPrev');
    var ryanStackNext = document.getElementById('ryanStackNext');
    var ryanVisual = ryanStack && ryanStack.closest('.brand-block-visual');
    if (ryanStack && ryanStackPrev && ryanStackNext) {
      var cards = ryanStack.querySelectorAll('.brand-stack-card');
      var totalSlides = Math.max(1, cards.length);
      function getProgress() {
        return parseInt(ryanStack.getAttribute('data-progress') || '0', 10);
      }
      function setProgress(idx) {
        var n = (idx % totalSlides + totalSlides) % totalSlides;
        ryanStack.setAttribute('data-progress', String(n));
      }
      function goNext() {
        setProgress(getProgress() + 1);
      }
      function goPrev() {
        setProgress(getProgress() - 1);
      }
      ryanStackNext.addEventListener('click', goNext);
      ryanStackPrev.addEventListener('click', goPrev);
      if (ryanVisual) {
        var touchStartX = 0;
        var touchStartY = 0;
        ryanVisual.addEventListener('touchstart', function (e) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }, { passive: true });
        ryanVisual.addEventListener('touchmove', function (e) {
          if (e.touches.length !== 1) return;
          var dx = e.touches[0].clientX - touchStartX;
          var dy = e.touches[0].clientY - touchStartY;
          var adx = Math.abs(dx);
          var ady = Math.abs(dy);
          if (adx > 8 && adx >= ady) e.preventDefault();
        }, { passive: false });
        ryanVisual.addEventListener('touchend', function (e) {
          if (!e.changedTouches[0]) return;
          var touchEndX = e.changedTouches[0].clientX;
          var delta = touchStartX - touchEndX;
          if (delta > 50) goNext();
          else if (delta < -50) goPrev();
        }, { passive: true });
      }
    }

    // ============================================================
    // H2) 브랜드 페이지 JOIE 섹션: 겹침 이미지 좌우 버튼·스와이프 (4장 순환)
    // ============================================================
    var joieStack = document.getElementById('joieStack');
    var joieStackPrev = document.getElementById('joieStackPrev');
    var joieStackNext = document.getElementById('joieStackNext');
    var joieVisual = joieStack && joieStack.closest('.brand-block-visual');
    if (joieStack && joieStackPrev && joieStackNext) {
      var joieCards = joieStack.querySelectorAll('.brand-stack-card');
      var joieTotal = Math.max(1, joieCards.length);
      function joieGetProgress() {
        return parseInt(joieStack.getAttribute('data-progress') || '0', 10);
      }
      function joieSetProgress(idx) {
        var n = (idx % joieTotal + joieTotal) % joieTotal;
        joieStack.setAttribute('data-progress', String(n));
      }
      function joieGoNext() {
        joieSetProgress(joieGetProgress() + 1);
      }
      function joieGoPrev() {
        joieSetProgress(joieGetProgress() - 1);
      }
      joieStackNext.addEventListener('click', joieGoNext);
      joieStackPrev.addEventListener('click', joieGoPrev);
      if (joieVisual) {
        var joieTouchStartX = 0;
        var joieTouchStartY = 0;
        joieVisual.addEventListener('touchstart', function (e) {
          joieTouchStartX = e.touches[0].clientX;
          joieTouchStartY = e.touches[0].clientY;
        }, { passive: true });
        joieVisual.addEventListener('touchmove', function (e) {
          if (e.touches.length !== 1) return;
          var dx = e.touches[0].clientX - joieTouchStartX;
          var dy = e.touches[0].clientY - joieTouchStartY;
          var adx = Math.abs(dx);
          var ady = Math.abs(dy);
          if (adx > 8 && adx >= ady) e.preventDefault();
        }, { passive: false });
        joieVisual.addEventListener('touchend', function (e) {
          if (!e.changedTouches[0]) return;
          var touchEndX = e.changedTouches[0].clientX;
          var delta = joieTouchStartX - touchEndX;
          if (delta > 50) joieGoNext();
          else if (delta < -50) joieGoPrev();
        }, { passive: true });
      }
    }

    // ============================================================
    // H3) 브랜드 페이지 Tavo Pets 섹션: 겹침 이미지 좌우 버튼·스와이프 (3장 순환)
    // ============================================================
    var tavoStack = document.getElementById('tavoStack');
    var tavoStackPrev = document.getElementById('tavoStackPrev');
    var tavoStackNext = document.getElementById('tavoStackNext');
    var tavoVisual = tavoStack && tavoStack.closest('.brand-block-visual');
    if (tavoStack && tavoStackPrev && tavoStackNext) {
      var tavoCards = tavoStack.querySelectorAll('.brand-stack-card');
      var tavoTotal = Math.max(1, tavoCards.length);
      function tavoGetProgress() {
        return parseInt(tavoStack.getAttribute('data-progress') || '0', 10);
      }
      function tavoSetProgress(idx) {
        var n = (idx % tavoTotal + tavoTotal) % tavoTotal;
        tavoStack.setAttribute('data-progress', String(n));
      }
      function tavoGoNext() {
        tavoSetProgress(tavoGetProgress() + 1);
      }
      function tavoGoPrev() {
        tavoSetProgress(tavoGetProgress() - 1);
      }
      tavoStackNext.addEventListener('click', tavoGoNext);
      tavoStackPrev.addEventListener('click', tavoGoPrev);
      if (tavoVisual) {
        var tavoTouchStartX = 0;
        var tavoTouchStartY = 0;
        tavoVisual.addEventListener('touchstart', function (e) {
          tavoTouchStartX = e.touches[0].clientX;
          tavoTouchStartY = e.touches[0].clientY;
        }, { passive: true });
        tavoVisual.addEventListener('touchmove', function (e) {
          if (e.touches.length !== 1) return;
          var dx = e.touches[0].clientX - tavoTouchStartX;
          var dy = e.touches[0].clientY - tavoTouchStartY;
          var adx = Math.abs(dx);
          var ady = Math.abs(dy);
          if (adx > 8 && adx >= ady) e.preventDefault();
        }, { passive: false });
        tavoVisual.addEventListener('touchend', function (e) {
          if (!e.changedTouches[0]) return;
          var touchEndX = e.changedTouches[0].clientX;
          var delta = tavoTouchStartX - touchEndX;
          if (delta > 50) tavoGoNext();
          else if (delta < -50) tavoGoPrev();
        }, { passive: true });
      }
    }

    // ============================================================
    // I) Brand Card Hover Effect
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
  
      // SHOP 하위 링크 클릭 시: 메뉴 닫기 + 아이콘 햄버거로
      if (shopCollapse) {
        shopCollapse.querySelectorAll('.mobile-pill-link').forEach(function(link) {
          link.addEventListener('click', function() {
            if (isMobileViewport()) {
              if (bsMobile) {
                bsMobile.hide();
                if (hamburgerBtn) {
                  hamburgerBtn.classList.remove('is-open');
                  document.body.classList.remove('menu-open');
                  hamburgerBtn.setAttribute('aria-expanded', 'false');
                }
              } else {
                mobileMenu.classList.remove('show');
                if (hamburgerBtn) hamburgerBtn.classList.remove('is-open');
              }
            }
          });
        });
      }

      // 일반 nav-link 클릭 시: 메뉴 닫기 + 아이콘 햄버거로
      mobileMenu.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
          // SHOP 관련이면 제외
          if (shopCollapse && (shopCollapse.contains(link) || link.closest('.mobile-pill-wrap'))) {
            return;
          }

          // 일반 링크 클릭 시: 메뉴 닫기
          if (isMobileViewport()) {
            if (bsMobile) {
              bsMobile.hide();
              if (hamburgerBtn) {
                hamburgerBtn.classList.remove('is-open');
                document.body.classList.remove('menu-open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
              }
            } else {
              mobileMenu.classList.remove('show');
              if (hamburgerBtn) hamburgerBtn.classList.remove('is-open');
            }
          }
        });
      });
    }

    // ============================================================
    // Hero 우측 이미지 캐러셀 (main_01~03, 클릭·터치·닷, 자동재생)
    // ============================================================
    const heroCarousel = document.getElementById('heroCarousel');
    const heroCarouselTrack = document.getElementById('heroCarouselTrack');
    const heroCarouselDots = document.getElementById('heroCarouselDots');
    if (heroCarousel && heroCarouselTrack && heroCarouselDots) {
      const totalSlides = 6;
      const TRACK_TRANSITION = 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
      let currentIndex = 0;
      let autoTimer = null;
      let isTransitioning = false;
      const AUTO_INTERVAL = 4000;
      const SLIDE_WIDTH = 100 / 8;

      function setTranslateX(percent) {
        heroCarouselTrack.style.transform = 'translateX(' + percent + '%)';
      }
      function updateDots(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        heroCarouselDots.querySelectorAll('.hero-carousel-dot').forEach(function (dot, i) {
          dot.classList.toggle('is-active', i === currentIndex);
          dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
        });
      }
      function logicalToPercent(logicalIndex) {
        return -(logicalIndex + 1) * SLIDE_WIDTH;
      }

      function goTo(logicalIndex) {
        var idx = (logicalIndex + totalSlides) % totalSlides;
        heroCarouselTrack.style.transition = TRACK_TRANSITION;
        setTranslateX(logicalToPercent(idx));
        updateDots(idx);
      }

      function goToNext() {
        if (isTransitioning) return;
        if (currentIndex === totalSlides - 1) {
          isTransitioning = true;
          heroCarouselTrack.style.transition = TRACK_TRANSITION;
          setTranslateX(-(totalSlides + 1) * SLIDE_WIDTH);
          var onEnd = function () {
            heroCarouselTrack.removeEventListener('transitionend', onEnd);
            requestAnimationFrame(function () {
              heroCarouselTrack.style.transition = 'none';
              setTranslateX(logicalToPercent(0));
              currentIndex = 0;
              updateDots(0);
              isTransitioning = false;
              requestAnimationFrame(function () {
                heroCarouselTrack.style.transition = TRACK_TRANSITION;
              });
            });
          };
          heroCarouselTrack.addEventListener('transitionend', onEnd);
        } else {
          goTo(currentIndex + 1);
        }
      }

      function goToPrev() {
        if (isTransitioning) return;
        if (currentIndex === 0) {
          isTransitioning = true;
          heroCarouselTrack.style.transition = TRACK_TRANSITION;
          setTranslateX(0);
          var onEnd = function () {
            heroCarouselTrack.removeEventListener('transitionend', onEnd);
            requestAnimationFrame(function () {
              heroCarouselTrack.style.transition = 'none';
              setTranslateX(logicalToPercent(totalSlides - 1));
              currentIndex = totalSlides - 1;
              updateDots(totalSlides - 1);
              isTransitioning = false;
              requestAnimationFrame(function () {
                heroCarouselTrack.style.transition = TRACK_TRANSITION;
              });
            });
          };
          heroCarouselTrack.addEventListener('transitionend', onEnd);
        } else {
          goTo(currentIndex - 1);
        }
      }

      function startAuto() {
        stopAuto();
        autoTimer = setInterval(goToNext, AUTO_INTERVAL);
      }
      function stopAuto() {
        if (autoTimer) {
          clearInterval(autoTimer);
          autoTimer = null;
        }
      }

      heroCarouselTrack.style.transition = 'none';
      setTranslateX(logicalToPercent(0));
      updateDots(0);
      requestAnimationFrame(function () {
        heroCarouselTrack.style.transition = TRACK_TRANSITION;
      });

      heroCarouselDots.querySelectorAll('.hero-carousel-dot').forEach(function (dot) {
        dot.addEventListener('click', function () {
          var idx = parseInt(dot.getAttribute('data-index'), 10);
          if (!isNaN(idx)) goTo(idx);
          stopAuto();
          startAuto();
        });
      });

      var touchStartX = 0;
      heroCarousel.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        stopAuto();
      }, { passive: true });
      heroCarousel.addEventListener('touchend', function (e) {
        var touchEndX = e.changedTouches[0].clientX;
        var delta = touchStartX - touchEndX;
        if (delta > 50) goToNext();
        else if (delta < -50) goToPrev();
        startAuto();
      }, { passive: true });

      var mouseDownX = 0;
      var isMouseDragging = false;
      function handleMouseEnd(e) {
        if (!isMouseDragging) return;
        var endX = e.clientX !== undefined ? e.clientX : 0;
        var delta = mouseDownX - endX;
        if (delta > 50) goToNext();
        else if (delta < -50) goToPrev();
        startAuto();
        isMouseDragging = false;
        document.removeEventListener('mousemove', preventDragSelect);
        document.removeEventListener('mouseup', handleMouseEnd);
      }
      function preventDragSelect(e) {
        if (isMouseDragging) e.preventDefault();
      }
      heroCarousel.addEventListener('dragstart', function (e) {
        e.preventDefault();
      });
      heroCarousel.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return;
        e.preventDefault();
        mouseDownX = e.clientX;
        isMouseDragging = true;
        stopAuto();
        document.addEventListener('mousemove', preventDragSelect, { passive: false });
        document.addEventListener('mouseup', handleMouseEnd);
      });

      heroCarousel.addEventListener('mouseenter', stopAuto);
      heroCarousel.addEventListener('mouseleave', startAuto);

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        startAuto();
      }
    }

    // ============================================================
    // Hero 항목별 reveal: #hero 진입 시 한 번만 is-visible
    // ============================================================
    const heroSection = document.getElementById('hero');
    if (heroSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const heroObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              heroObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px', threshold: 0.1 }
      );
      heroObserver.observe(heroSection);
    } else if (heroSection) {
      heroSection.classList.add('is-visible');
    }

    // Company 페이지 히어로: 진입 시 좌측 텍스트·버튼 reveal
    const companyHeroSection = document.getElementById('company-hero');
    if (companyHeroSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const companyHeroObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              companyHeroObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px', threshold: 0.1 }
      );
      companyHeroObserver.observe(companyHeroSection);
    } else if (companyHeroSection) {
      companyHeroSection.classList.add('is-visible');
    }

    // Our Brands: 스크롤 진입 시 히어로와 동일하게 is-visible → reveal 애니메이션
    const brandsSection = document.getElementById('brands-magnetic');
    if (brandsSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var brandsObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              brandsObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px', threshold: 0.1 }
      );
      brandsObserver.observe(brandsSection);
    } else if (brandsSection) {
      brandsSection.classList.add('is-visible');
    }

    /*
    // Our Brands: 스크롤 progress → 9 step (보관용)
    const sectionBrands = document.getElementById('brands');
    if (sectionBrands) { ... }
    */

    // Our Brands: 3열 카드 (클릭 시 브랜드 페이지로 이동, CSS 호버만 사용)

    // ============================================================
    // 이미지 레이어 팝업: 클릭 → 큰 이미지, 좌우 화살표로 이전/다음, X·ESC로 닫기
    // ============================================================
    (function () {
      var layer = document.getElementById('imgPopupLayer');
      var closeBtn = layer && layer.querySelector('.img-popup-layer__close');
      var backdrop = layer && layer.querySelector('.img-popup-layer__backdrop');
      var popupImg = layer && layer.querySelector('.img-popup-layer__img');
      var prevBtn = layer && layer.querySelector('.img-popup-layer__arrow--prev');
      var nextBtn = layer && layer.querySelector('.img-popup-layer__arrow--next');

      var imageList = [];
      var currentIndex = 0;

      /** 브랜드 페이지의 브랜드 비주얼 이미지(.brand-stack-img)만 팝업 대상, 나머지 페이지·이미지는 팝업 없음 */
      function isPopupTarget(img) {
        if (!img || !img.closest) return false;
        if (!document.body.classList.contains('page-brand')) return false;
        if (!img.classList.contains('brand-stack-img') || !img.closest('.brand-block-visual')) return false;
        return true;
      }

      /** 클릭한 이미지가 속한 영역(해당 브랜드 블록·회사 패널 등)만 반환 */
      function getScope(img) {
        return img.closest('.brand-block') || img.closest('.company-panel') || img.closest('section') || document.querySelector('main');
      }

      /** 주어진 영역(scope) 안의 팝업 대상 이미지만 DOM 순서로 반환 */
      function getPopupImagesInScope(scope) {
        if (!scope) return [];
        var imgs = scope.querySelectorAll('img');
        var list = [];
        for (var i = 0; i < imgs.length; i++) {
          if (isPopupTarget(imgs[i])) list.push(imgs[i]);
        }
        return list;
      }

      function showImageAt(index) {
        if (!popupImg || !imageList.length) return;
        currentIndex = (index + imageList.length) % imageList.length;
        var img = imageList[currentIndex];
        var src = img.currentSrc || img.getAttribute('src') || img.src;
        if (src) {
          popupImg.src = src;
          popupImg.alt = img.alt || '';
        }
        updateArrowsVisibility();
      }

      function updateArrowsVisibility() {
        var show = imageList.length > 1;
        if (prevBtn) prevBtn.classList.toggle('is-hidden', !show);
        if (nextBtn) nextBtn.classList.toggle('is-hidden', !show);
      }

      function openPopupAt(index, list) {
        if (!layer || !popupImg) return;
        imageList = list && list.length ? list : [];
        if (!imageList.length) return;
        currentIndex = (index + imageList.length) % imageList.length;
        showImageAt(currentIndex);
        layer.removeAttribute('hidden');
        layer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        closeBtn && closeBtn.focus();
      }

      function closePopup() {
        if (!layer) return;
        layer.classList.remove('is-open');
        layer.setAttribute('hidden', '');
        document.body.style.overflow = '';
        popupImg && (popupImg.src = '');
        imageList = [];
      }

      function goPrev() {
        if (imageList.length <= 1) return;
        showImageAt(currentIndex - 1);
      }

      function goNext() {
        if (imageList.length <= 1) return;
        showImageAt(currentIndex + 1);
      }

      function onKeydown(e) {
        if (!layer || !layer.classList.contains('is-open')) return;
        if (e.key === 'Escape') closePopup();
        else if (e.key === 'ArrowLeft') goPrev();
        else if (e.key === 'ArrowRight') goNext();
      }

      if (layer) {
        document.addEventListener('keydown', onKeydown);
        closeBtn && closeBtn.addEventListener('click', closePopup);
        backdrop && backdrop.addEventListener('click', closePopup);
        prevBtn && prevBtn.addEventListener('click', function (e) { e.stopPropagation(); goPrev(); });
        nextBtn && nextBtn.addEventListener('click', function (e) { e.stopPropagation(); goNext(); });
      }

      document.addEventListener('click', function (e) {
        var el = e.target;
        if (!el || el.nodeName !== 'IMG') return;
        if (!isPopupTarget(el)) return;
        e.preventDefault();
        var scope = getScope(el);
        var list = getPopupImagesInScope(scope);
        var index = -1;
        for (var i = 0; i < list.length; i++) {
          if (list[i] === el) { index = i; break; }
        }
        if (index < 0 && list.length) index = 0;
        if (index >= 0) openPopupAt(index, list);
      });
    })();

    // ============================================================
    // TOP 이동 버튼 (우측 하단, 스크롤 시 표시, 클릭 시 맨 위로)
    // ============================================================
    (function () {
      var btnTop = document.getElementById('btnTop');
      if (!btnTop) return;
      var topThreshold = 300;
      function updateTopBtn() {
        if ((window.pageYOffset || document.documentElement.scrollTop) > topThreshold) {
          btnTop.classList.add('is-visible');
        } else {
          btnTop.classList.remove('is-visible');
        }
      }
      function scrollToTop(isMobile) {
        if (isMobile) {
          window.scrollTo(0, 0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      var isMobileMQ = window.matchMedia && window.matchMedia('(max-width: 575.98px)');
      btnTop.addEventListener('click', function () {
        scrollToTop(isMobileMQ.matches);
      });
      // 모바일: 첫 터치에서 바로 반응하도록 touchend 사용 (click은 두 번째 탭에 발생하는 경우 있음)
      btnTop.addEventListener('touchend', function (e) {
        if (!isMobileMQ.matches) return;
        e.preventDefault();
        window.scrollTo(0, 0);
      }, { passive: false });
      window.addEventListener('scroll', updateTopBtn, { passive: true });
      updateTopBtn();
    })();
  })();

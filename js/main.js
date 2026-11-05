/**
 * MONOLINA SARKAR — ACADEMIC & PEDAGOGICAL PORTFOLIO
 * Main Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initAccessibility();
  initStickyHeader();
  initMobileMenu();
  initPublicationFilter();
  initPracticeAreaDiagnostics();
  initPhotoGallery();
  initCopyButtons();
  initModals();
  initContactForm();
});

/* --- 1. Sticky Header --- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- 2. Mobile Menu --- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking a link
  drawer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
      closeMenu();
    }
  });

  function openMenu() {
    toggleBtn.classList.add('open');
    drawer.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    toggleBtn.classList.remove('open');
    drawer.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
}

/* --- 3. Publications Filtering & Search --- */
function initPublicationFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.querySelector('#pub-search-input');
  const pubCards = document.querySelectorAll('.publication-card');
  const countIndicator = document.querySelector('#pub-count-indicator');
  const emptyState = document.querySelector('#pub-empty-state');

  if (!pubCards.length) return;

  let currentYear = 'all';
  let currentQuery = '';

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentYear = btn.getAttribute('data-year') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  function applyFilters() {
    let visibleCount = 0;

    pubCards.forEach(card => {
      const yearStr = card.getAttribute('data-year') || '';
      const yearNum = parseInt(yearStr, 10);
      const text = card.textContent.toLowerCase();

      let matchesYear = false;
      if (currentYear === 'all') {
        matchesYear = true;
      } else if (currentYear === '2025-onwards' || currentYear === '2025+') {
        matchesYear = !isNaN(yearNum) && yearNum >= 2025;
      } else if (currentYear === '2020-onwards' || currentYear === '2020+') {
        matchesYear = !isNaN(yearNum) && yearNum >= 2020;
      } else if (currentYear === 'pre-2020' || currentYear === 'prior-2020') {
        matchesYear = !isNaN(yearNum) && yearNum < 2020;
      } else if (currentYear.endsWith('+') || currentYear.endsWith('-onwards')) {
        const threshold = parseInt(currentYear, 10);
        matchesYear = !isNaN(yearNum) && !isNaN(threshold) && yearNum >= threshold;
      } else if (currentYear.startsWith('pre-') || currentYear.startsWith('prior-')) {
        const threshold = parseInt(currentYear.replace(/^(pre|prior)-/, ''), 10);
        matchesYear = !isNaN(yearNum) && !isNaN(threshold) && yearNum < threshold;
      } else {
        matchesYear = (yearStr === currentYear);
      }

      const matchesQuery = (!currentQuery || text.includes(currentQuery));

      if (matchesYear && matchesQuery) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 250ms ease';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countIndicator) {
      countIndicator.textContent = `${visibleCount} publication${visibleCount === 1 ? '' : 's'} displayed`;
    }

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.style.display = 'block';
        const emptyMsg = emptyState.querySelector('.pub-empty-message');
        const emptySub = emptyState.querySelector('.pub-empty-sub');
        if (currentQuery) {
          if (emptyMsg) emptyMsg.textContent = `No publications found matching "${currentQuery}".`;
          if (emptySub) emptySub.textContent = 'Try adjusting your search terms or clearing your filter selection.';
        } else if (currentYear === '2025-onwards' || currentYear === '2025+') {
          if (emptyMsg) emptyMsg.textContent = 'No published papers recorded for 2025 onwards yet.';
          if (emptySub) emptySub.textContent = 'Forthcoming DBER manuscripts and articles (2025–2026) are currently in preparation and under peer review.';
        } else {
          if (emptyMsg) emptyMsg.textContent = 'No publications found for this selection.';
          if (emptySub) emptySub.textContent = 'Please choose another period filter or click "All" to view all records.';
        }
      } else {
        emptyState.style.display = 'none';
      }
    }
  }
}

/* --- 4. Broader Areas of Practice Diagnostics --- */
const practiceDiagnosticsData = {
  1: {
    area: 'Area 1',
    title: 'Discipline-Based Education Research / Collaborative Publications',
    diagnosticBefore: 'Participated in biology curriculum review committees and co-authored papers on biological mechanisms.',
    diagnosticAfter: 'Spearheaded Discipline-Based Education Research (DBER) across higher education cohorts, translating empirical student misconception data into peer-reviewed pedagogical interventions and multi-institutional studies.',
    keyInterventions: [
      'Pre/Post diagnostic instruments identifying persistent biological misconception clusters.',
      'Data-informed curriculum modifications leading to marked gains in higher-order analytical reasoning.',
      'Peer-reviewed dissemination bridging bench biochemistry and andragogical scholarship.'
    ]
  },
  2: {
    area: 'Area 2',
    title: 'Teaching Experience / Inquiry-Based Supervision',
    diagnosticBefore: 'Taught undergraduate biology courses and supervised student laboratory sessions.',
    diagnosticAfter: 'Orchestrated high-impact, inquiry-based undergraduate learning environments for 10+ years; designed continuous Kaizen feedback loops empowering 500+ students to construct and defend scientific models.',
    keyInterventions: [
      'Replaced rote recipe labs with hypothesis-driven experimental design sandboxes.',
      'Mentored diverse undergraduate cohorts in research methodologies and scientific presentation.',
      'Integrated Universal Design for Learning (UDL) principles ensuring accessible laboratory experiences.'
    ]
  },
  3: {
    area: 'Area 3',
    title: 'International Collaboration & Virtual Exchange (Rutgers GCVEX)',
    diagnosticBefore: 'Helped coordinate international student online meetings.',
    diagnosticAfter: 'Directed cross-border pedagogical exchange via the Rutgers Global Classrooms Virtual Exchange (GCVEX), scaffolding cross-cultural scientific problem-solving and transnational student dialogue.',
    keyInterventions: [
      'Structured collaborative bioethics and global climate resilience case studies.',
      'Facilitated synchronous and asynchronous multicultural student debate cohorts.',
      'Measured intercultural scientific self-efficacy shifts using validated assessment rubrics.'
    ]
  },
  4: {
    area: 'Area 4',
    title: 'Scholarship of Teaching and Learning (SoTL) & Course Redesign',
    diagnosticBefore: 'Updated course syllabi and revised lecture slides periodically.',
    diagnosticAfter: 'Pioneered evidence-based backward course design using National Research Council (NRC) frameworks, systematically auditing learning objectives, formative assessments, and cognitive taxonomies.',
    keyInterventions: [
      'Implemented Bloom-scaffolded active learning modules for complex molecular pathways.',
      'Conducted iterative classroom action research with rigorous SPSS quantitative analytics.',
      'Decreased course attrition rates while elevating conceptual mastery on standardized assessments.'
    ]
  },
  5: {
    area: 'Area 5',
    title: 'Open Educational Resources & MERLOT Leadership',
    diagnosticBefore: 'Used free online biology materials in classroom instruction.',
    diagnosticAfter: 'Curated, evaluated, and championed Open Educational Resources (OER) via MERLOT editorial standards, driving educational equity and removing textbook cost barriers across undergraduate biology curricula.',
    keyInterventions: [
      'Peer-reviewed digital learning objects for scientific rigor and accessibility compliance.',
      'Adopted open-access modular materials saving students substantial curricular expenses.',
      'Facilitated faculty development workshops on effective OER curation and creative commons licensing.'
    ]
  },
  6: {
    area: 'Area 6',
    title: 'Public Science Writing & Knowledge Translation (ASM)',
    diagnosticBefore: 'Wrote summaries of biology topics for general readers.',
    diagnosticAfter: 'Authored accessible scientific translations and public engagement articles affiliated with the American Society for Microbiology (ASM), demystifying complex microbial ecology for broad civic discourse.',
    keyInterventions: [
      'Published public-facing articles translating wastewater biodegradation and antimicrobial resistance.',
      'Engaged non-specialist audiences in the societal implications of environmental nanobiotechnology.',
      'Trained undergraduate researchers in science communication and elevator-pitch storytelling.'
    ]
  }
};

function initPracticeAreaDiagnostics() {
  const practiceCards = document.querySelectorAll('.practice-card');
  const drawer = document.querySelector('#practice-detail-drawer');
  if (!practiceCards.length || !drawer) return;

  practiceCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-area-id');
      const data = practiceDiagnosticsData[id];
      if (!data) return;

      practiceCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      drawer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="section-label">${data.area} · Statement Diagnostic</span>
            <h3 style="font-family: var(--font-display); font-size: 1.85rem; font-weight: 600; color: var(--text-primary); margin-top: 0.35rem;">${data.title}</h3>
          </div>
          <button class="btn-secondary" id="close-practice-drawer" style="padding: 0.4rem 0.9rem; font-size: 0.8rem;">Close</button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          <div style="background-color: #FAF5F5; border-left: 3px solid #D9534F; padding: 1.25rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; color: #D9534F; text-transform: uppercase; margin-bottom: 0.5rem;">Conventional Passive Phrasing</div>
            <p style="font-family: var(--font-serif); font-size: 1.05rem; font-style: italic; color: #555; line-height: 1.5;">"${data.diagnosticBefore}"</p>
          </div>
          <div style="background-color: #F0F7F2; border-left: 3px solid #2E7D32; padding: 1.25rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; color: #2E7D32; text-transform: uppercase; margin-bottom: 0.5rem;">Calibrated DBER High-Impact Rewrite</div>
            <p style="font-family: var(--font-sans); font-size: 0.95rem; font-weight: 500; color: #1B4D20; line-height: 1.55;">"${data.diagnosticAfter}"</p>
          </div>
        </div>

        <div>
          <h4 style="font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent-blue); margin-bottom: 0.85rem;">Key Methodological Pillars & Outcomes</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem;">
            ${data.keyInterventions.map(item => `
              <li style="display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.925rem; color: var(--text-secondary);">
                <span style="color: var(--accent-gold); font-size: 1.1rem; line-height: 1;">✦</span>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;

      drawer.classList.add('visible');
      drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      document.querySelector('#close-practice-drawer')?.addEventListener('click', () => {
        drawer.classList.remove('visible');
        practiceCards.forEach(c => c.classList.remove('active'));
      });
    });
  });
}

/* --- 5. Photo Book / Visual Stories Gallery & Lightbox --- */
const photoItems = [
  {
    src: 'assets/images/yosemite-valley.jpg',
    title: 'Alpine Mirror · Yosemite Valley',
    meta: 'Granite peaks and autumnal reflections along the Merced River',
    category: 'landscapes',
    layoutClass: 'big'
  },
  {
    src: 'assets/images/etretat-cliffs.jpg',
    title: 'Chalk Monoliths · Étretat, Normandy',
    meta: 'Coastal erosion sculpting Atlantic limestone arches',
    category: 'travel',
    layoutClass: 'tall'
  },
  {
    src: 'assets/images/golden-reeds.jpg',
    title: 'Whispering Reeds at Dusk',
    meta: 'Sunlit silhouetted grasses in autumn meadow wind',
    category: 'macro',
    layoutClass: 'tall'
  },
  {
    src: 'assets/images/coastal-rocks.jpg',
    title: 'Volcanic Tide · Basalt Coastline',
    meta: 'Crashing sea spray against weathered metamorphic rocks',
    category: 'landscapes',
    layoutClass: 'wide'
  },
  {
    src: 'assets/images/cherry-blossoms.jpg',
    title: 'Sakura Petals in Spring',
    meta: 'Ephemeral spring cherry blossoms in soft atmospheric focus',
    category: 'macro',
    layoutClass: ''
  },
  {
    src: 'assets/images/desert-dunes.jpg',
    title: 'Caravan Solitude · Desert Horizon',
    meta: 'Camel and travelers silhouetted against solar haze',
    category: 'monochrome',
    layoutClass: 'wide'
  },
  {
    src: 'assets/images/silhouette-canopy.jpg',
    title: 'Arboreal Gathering at Sunset',
    meta: 'Sylvan silhouettes meeting evening light',
    category: 'monochrome',
    layoutClass: ''
  },
  {
    src: 'assets/images/moon.jpg',
    title: 'Celestial Companion · Waxing Moon',
    meta: 'Telescopic lunar topography and crater shadows',
    category: 'landscapes',
    layoutClass: ''
  }
];

function initPhotoGallery() {
  const galleryGrid = document.querySelector('#photo-gallery-grid');
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const lightbox = document.querySelector('#lightbox-modal');

  if (!galleryGrid) return;

  let currentCategory = 'all';
  let activeIndex = 0;
  let filteredItems = [...photoItems];

  function renderGallery() {
    galleryGrid.innerHTML = '';
    filteredItems = photoItems.filter(item => {
      return currentCategory === 'all' || item.category === currentCategory;
    });

    filteredItems.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `gallery-card ${item.layoutClass}`;
      card.innerHTML = `
        <img src="${item.src}" alt="${item.title}" loading="lazy" />
        <div class="gallery-card-overlay">
          <div class="gallery-caption-title">${item.title}</div>
          <div class="gallery-caption-meta">${item.meta}</div>
        </div>
      `;
      card.addEventListener('click', () => openLightbox(index));
      galleryGrid.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderGallery();
    });
  });

  renderGallery();

  // Lightbox functions
  const lightboxImg = document.querySelector('#lightbox-img');
  const lightboxCaption = document.querySelector('#lightbox-caption');
  const closeBtn = document.querySelector('#lightbox-close');
  const prevBtn = document.querySelector('#lightbox-prev');
  const nextBtn = document.querySelector('#lightbox-next');

  function openLightbox(index) {
    if (!lightbox) return;
    activeIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item = filteredItems[activeIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxCaption.innerHTML = `<strong>${item.title}</strong><div style="font-size: 0.9rem; color: #BBB; margin-top: 4px;">${item.meta}</div>`;
  }

  function prevPhoto() {
    activeIndex = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightbox();
  }

  function nextPhoto() {
    activeIndex = (activeIndex + 1) % filteredItems.length;
    updateLightbox();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevPhoto);
  if (nextBtn) nextBtn.addEventListener('click', nextPhoto);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    });
  }
}

/* --- 6. Copy to Clipboard & Toast Notifications --- */
function copyTextSafely(text) {
  // 1. Try modern Clipboard API if supported and in secure context
  if (navigator.clipboard && window.isSecureContext && typeof navigator.clipboard.writeText === 'function') {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  }
  // 2. Synchronous fallback for file://, HTTP, or browsers without clipboard permissions
  return fallbackCopy(text);
}

function fallbackCopy(text) {
  return new Promise((resolve, reject) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.width = '2em';
      textarea.style.height = '2em';
      textarea.style.padding = '0';
      textarea.style.border = 'none';
      textarea.style.outline = 'none';
      textarea.style.boxShadow = 'none';
      textarea.style.background = 'transparent';
      textarea.style.opacity = '0';
      textarea.style.pointerEvents = 'none';
      textarea.style.zIndex = '-9999';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (successful) {
        resolve();
      } else {
        reject(new Error('execCommand copy returned false'));
      }
    } catch (err) {
      reject(err);
    }
  });
}

function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      const label = btn.getAttribute('data-copy-label') || 'Copied to clipboard!';
      const originalHTML = btn.innerHTML;
      const isCardBtn = btn.classList.contains('btn-copy-card');

      copyTextSafely(text).then(() => {
        // Visual on-button feedback
        if (isCardBtn) {
          btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
          btn.style.borderColor = '#2E7D32';
          btn.setAttribute('title', 'Copied!');
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.borderColor = '';
            btn.setAttribute('title', 'Copy');
          }, 2200);
        } else {
          btn.innerHTML = `<span>Email Copied! &#10003;</span>`;
          btn.style.color = '#1B5E20';
          btn.style.borderColor = '#2E7D32';
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2200);
        }

        showToast(label);
      }).catch(() => {
        // Fallback for extreme browser restrictions
        if (text.includes('@')) {
          window.location.href = `mailto:${text}`;
        } else {
          window.prompt('Copy to clipboard: Ctrl+C, Enter', text);
        }
      });
    });
  });
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--accent-gold);">✓</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 200ms ease';
    setTimeout(() => toast.remove(), 200);
  }, 2800);
}

/* --- 7. Modals: Academic CV & Inquiries --- */
const fullAcademicCVHtml = `
  <button class="modal-close-btn" id="cv-modal-close" aria-label="Close CV Modal">✕</button>
  
  <div class="cv-document" id="cv-document">
    <div class="cv-print-header" role="banner">
      <div class="section-label" style="margin-bottom: 0.35rem;">Curriculum Vitae</div>
      <h2 id="cv-modal-title" class="cv-print-title">
        Monolina Sarkar, Ph.D., M.Ed.
      </h2>
      <div class="cv-print-subtitle">
        Biochemistry Doctorate · Master of Education · Discipline-Based Education Research (DBER)
      </div>
      <div class="cv-print-contacts">
        <span><strong>Email:</strong> monolinasarkar1@gmail.com</span>
        <span><strong>ORCID:</strong> 0000-0002-8172-1111</span>
        <span><strong>Web of Science:</strong> GRY-0666-2022</span>
        <span><strong>LinkedIn:</strong> linkedin.com/in/monolinasarkar</span>
      </div>
    </div>

    <section class="cv-section">
      <h3 class="cv-section-title">Scholarly & Pedagogical Profile</h3>
      <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.55;">
        Higher education biology educator and research biochemist with over 10 years of teaching experience. Specializes in Discipline-Based Education Research (DBER), transforming undergraduate classrooms into continuous <em>Kaizen</em> learning laboratories. Investigates how learners iteratively construct, refine, and apply scientific reasoning in unfamiliar biological contexts, with focal emphasis on student AI literacy, conceptual change, and evidence-informed curriculum redesign aligned with National Research Council (NRC, 2012) standards.
      </p>
    </section>

    <section class="cv-section">
      <h3 class="cv-section-title">Education & Credentials</h3>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div class="cv-item">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="cv-item-title">Doctor of Philosophy (Ph.D.) in Biochemistry</span>
            <span class="cv-item-meta">Doctoral Research</span>
          </div>
          <div style="font-size: 0.88rem; color: var(--text-secondary);">
            Focus: Molecular and structural biological mechanisms, Nod-factor independent rhizobial symbiosis, secondary metabolites, and microbial ecotoxicology.
          </div>
        </div>
        <div class="cv-item">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="cv-item-title">Master of Education (M.Ed.)</span>
            <span class="cv-item-meta">Andragogy & Curriculum Design</span>
          </div>
          <div style="font-size: 0.88rem; color: var(--text-secondary);">
            Focus: Adult learning methodologies, learning analytics, action research design, and assessment auditing in higher education STEM.
          </div>
        </div>
      </div>
    </section>

    <section class="cv-section">
      <h3 class="cv-section-title">Higher Education & Teaching Leadership (10+ Years)</h3>
      <ul class="cv-list">
        <li>
          <strong>Faculty & Biology Educator:</strong> Designed, coordinated, and instructed undergraduate courses in General Biology, Molecular Biology, and Biochemistry, pioneering hypothesis-driven active laboratory sandboxes.
        </li>
        <li>
          <strong>Institutional Equity & Andragogical Collaboration:</strong> Partnered with the first women's university in Eastern India to address diverse student demographics, institutional barriers, and implement Universal Design for Learning (UDL).
        </li>
        <li>
          <strong>Rutgers Global Classrooms Virtual Exchange (GCVEX):</strong> Facilitated cross-border virtual exchange cohorts, scaffolding transnational bioethics dialogue and scientific problem-solving.
        </li>
        <li>
          <strong>MERLOT OER Leadership:</strong> Evaluated and curated Open Educational Resources (OER), advancing pedagogical equity and reducing curricular textbook cost barriers.
        </li>
      </ul>
    </section>

    <section class="cv-section">
      <h3 class="cv-section-title">Core Research Vectors (DBER)</h3>
      <ul class="cv-list">
        <li>
          <strong>Critical AI Literacy & Scientific Reasoning:</strong> Developing diagnostic protocols to measure how students interrogate generative AI outputs and preserve epistemic ownership in biological modeling.
        </li>
        <li>
          <strong>Kaizen Classroom Laboratory:</strong> Applying iterative assessment cycles, misconception inventory tracking, and SPSS statistical analytics to systematically eliminate conceptual bottlenecks.
        </li>
        <li>
          <strong>NRC Consensus Alignment (2012):</strong> Grounded in epistemic practices across biological scales, development of representational expertise, and empirically validated interventions.
        </li>
      </ul>
    </section>

    <section class="cv-section">
      <h3 class="cv-section-title">Peer-Reviewed Publications & Book Chapters</h3>
      <ul class="cv-list" style="list-style: decimal;">
        <li>
          <strong>Sarkar, M.</strong> (2023). Light-responsive biodegradation of wastewater pollutants: New developments and potential perspectives. <em>Journal of Hazardous Materials Advances</em>, 10, 100281. DOI: 10.1016/j.hazadv.2023.100281.
        </li>
        <li>
          Das, D. R., <strong>Sarkar, M.</strong>, & Paul, A. (2023). Tools and approaches for assessing stress-responsive secondary metabolites to design climate-smart crops. In <em>Biology and Biotechnology of Environmental Stress Tolerance in Plants</em> (pp. 305–370). Apple Academic Press.
        </li>
        <li>
          Guha, S., Molla, F., <strong>Sarkar, M.</strong>, Ibañez, F., Fabra, A., & DasGupta, M. (2022). Nod factor-independent 'crack-entry' symbiosis in dalbergoid legume <em>Arachis hypogaea</em>. <em>Environmental Microbiology</em>, 24(6), 2732–2746. DOI: 10.1111/1462-2920.15989.
        </li>
        <li>
          <strong>Sarkar, M.</strong>, Paul, A., & Das, D. R. (2022). Availing engineered and biosynthesized metal-based nanoparticles to alleviate abiotic stress. In <em>Response of Field Crops to Abiotic Stress</em> (pp. 15–33). CRC Press / Taylor & Francis. DOI: 10.1201/9781003258063.
        </li>
        <li>
          <strong>Sarkar, M.</strong> (2022). Effect of silver nanoparticles on nitrogen-cycling bacteria in constructed wetlands. <em>Nanotechnology for Environmental Engineering</em>, 7(2), 537–559. DOI: 10.1007/s41204-022-00244-6.
        </li>
        <li>
          Guha, S., <strong>Sarkar, M.</strong>, Ganguly, P., Uddin, M. R., Mandal, S., & DasGupta, M. (2016). Segregation of nod-containing and nod-deficient bradyrhizobia as endosymbionts of <em>Arachis hypogaea</em> and as endophytes of <em>Oryza sativa</em> in intercropped fields of Bengal Basin, India. <em>Environmental Microbiology</em>, 18(8), 2575–2590. DOI: 10.1111/1462-2920.13289.
        </li>
      </ul>
    </section>

    <section class="cv-section" style="margin-bottom: 0;">
      <h3 class="cv-section-title">Professional Affiliations & Service</h3>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
        Member, American Society for Microbiology (ASM) · Discipline-Based Education Research (DBER) Network · Peer Reviewer, MERLOT Biology Editorial Board · Contributor, Public Science Writing & Knowledge Translation.
      </p>
    </section>
  </div>

  <div class="cv-modal-actions" style="display: flex; gap: 1rem; justify-content: flex-end; padding-top: 1.5rem; margin-top: 1.5rem; border-top: 1px solid var(--border-subtle); flex-wrap: wrap;">
    <a href="Monolina_Sarkar_cv.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-primary" id="btn-open-cv-pdf">
      Open PDF in Viewer <span>&rarr;</span>
    </a>
    <button class="btn btn-secondary" id="btn-print-cv" type="button">
      Print / Save as PDF <span>⎙</span>
    </button>
    <a href="mailto:monolinasarkar1@gmail.com?subject=Academic%20Dossier%20Inquiry%20-%20Monolina%20Sarkar" class="btn btn-gold">
      Request Full Dossier <span>✉</span>
    </a>
  </div>
`;

/* --- Document Configurations --- */
const DRIVE_DOCUMENTS = {
  academicCv: 'Monolina_Sarkar_cv.pdf',
  story1Salad: 'https://drive.google.com/file/d/YOUR_STORY_1_DRIVE_ID/view?usp=sharing',
  story2Andragogy: 'https://drive.google.com/file/d/YOUR_STORY_2_DRIVE_ID/view?usp=sharing',
  story3Desks: 'https://drive.google.com/file/d/YOUR_STORY_3_DRIVE_ID/view?usp=sharing'
};

function initModals() {
  const cvModal = document.querySelector('#cv-modal');
  if (cvModal) {
    const modalCard = cvModal.querySelector('.modal-card');
    if (modalCard) {
      modalCard.innerHTML = fullAcademicCVHtml;
    }
  }

  // Academic CV buttons open the CV PDF directly in the browser's PDF viewer
  const openCvBtns = document.querySelectorAll('.open-cv-modal, [data-drive-doc="academicCv"], [data-cv-pdf]');
  openCvBtns.forEach(btn => {
    if (btn.tagName.toLowerCase() === 'a') {
      btn.setAttribute('href', 'Monolina_Sarkar_cv.pdf');
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    }
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('Monolina_Sarkar_cv.pdf', '_blank', 'noopener,noreferrer');
    });
  });

  // Bind any data-drive-doc elements to their respective Drive URLs
  document.querySelectorAll('[data-drive-doc]').forEach(el => {
    const docKey = el.getAttribute('data-drive-doc');
    if (DRIVE_DOCUMENTS[docKey]) {
      if (el.tagName.toLowerCase() === 'a') {
        el.setAttribute('href', DRIVE_DOCUMENTS[docKey]);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      } else {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.open(DRIVE_DOCUMENTS[docKey], '_blank', 'noopener,noreferrer');
        });
      }
    }
  });

  if (closeCvBtn) {
    closeCvBtn.addEventListener('click', () => {
      cvModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        cvModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Ensure Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal && cvModal.classList.contains('open')) {
      cvModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* --- 8. Contact Form Handling --- */
function initContactForm() {
  const form = document.querySelector('#collaboration-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#sender-name')?.value.trim();
    const email = form.querySelector('#sender-email')?.value.trim();
    const message = form.querySelector('#sender-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    // Success response simulation
    showToast(`Thank you, ${name}! Your inquiry has been dispatched.`);
    form.reset();
  });
}

/* ==========================================================================
   9. DIGITAL ACCESSIBILITY SYSTEM (WCAG 2.2 AA)
   ========================================================================== */
function initAccessibility() {
  const PREFS_KEY = 'monolina_a11y_prefs';

  // Default Preferences
  const defaultPrefs = {
    fontSize: 'default', // 'default' | 'md' | 'lg' | 'xl'
    contrast: 'default', // 'default' | 'dark' | 'light' | 'invert'
    dyslexicFont: false,
    highlightLinks: false,
    textSpacing: false,
    readingGuide: false,
    reduceMotion: false,
    largeCursor: false
  };

  // Load preferences from localStorage
  let prefs = { ...defaultPrefs };
  try {
    const saved = localStorage.getItem(PREFS_KEY);
    if (saved) {
      prefs = { ...defaultPrefs, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not read accessibility preferences:', e);
  }

  // 1. Inject Floating Trigger if missing
  if (!document.querySelector('#a11y-trigger')) {
    const trigger = document.createElement('button');
    trigger.id = 'a11y-trigger';
    trigger.className = 'a11y-trigger';
    trigger.setAttribute('type', 'button');
    trigger.setAttribute('aria-label', 'Open accessibility preferences');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'a11y-modal');
    trigger.setAttribute('title', 'Accessibility Preferences (Alt + A)');
    trigger.innerHTML = `
      <span class="a11y-trigger-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="4" r="2"/>
          <path d="M12 6v7M6 8h12M8 13l-3 8M16 13l3 8"/>
        </svg>
      </span>
      <span>Accessibility</span>
    `;
    document.body.appendChild(trigger);
  }

  // 2. Inject Reading Guide if missing
  let readingGuide = document.querySelector('#a11y-reading-guide');
  if (!readingGuide) {
    readingGuide = document.createElement('div');
    readingGuide.id = 'a11y-reading-guide';
    readingGuide.className = 'a11y-reading-guide';
    readingGuide.setAttribute('aria-hidden', 'true');
    document.body.appendChild(readingGuide);
  }

  // 3. Inject Live Region Announcer if missing
  let announcer = document.querySelector('#a11y-announcer');
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'a11y-announcer';
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
  }

  function announce(msg) {
    if (announcer) {
      announcer.textContent = '';
      setTimeout(() => {
        announcer.textContent = msg;
      }, 50);
    }
  }

  // 4. Inject Accessibility Modal if missing
  let modal = document.querySelector('#a11y-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'a11y-modal';
    modal.className = 'a11y-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'a11y-panel-title');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="a11y-panel">
        <div class="a11y-header">
          <div>
            <span class="a11y-header-badge">Inclusive Design · UDL</span>
            <h2 id="a11y-panel-title" class="a11y-title">Accessibility Tools</h2>
            <p class="a11y-subtitle">Adjust typography, color contrast, and reading aids. Settings are saved to this device.</p>
          </div>
          <button type="button" class="a11y-close-btn" id="a11y-close-btn" aria-label="Close accessibility options">✕</button>
        </div>

        <div class="a11y-body">
          <!-- Text Sizing -->
          <div class="a11y-group">
            <span class="a11y-group-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>
              Text Sizing
            </span>
            <div class="a11y-btn-grid" role="group" aria-label="Text Sizing Options">
              <button type="button" class="a11y-option-btn" data-font="default" aria-pressed="false">
                <span>Normal</span>
                <small style="font-size:0.75rem;opacity:0.8;">100%</small>
              </button>
              <button type="button" class="a11y-option-btn" data-font="md" aria-pressed="false">
                <span>Medium</span>
                <small style="font-size:0.75rem;opacity:0.8;">115%</small>
              </button>
              <button type="button" class="a11y-option-btn" data-font="lg" aria-pressed="false">
                <span>Large</span>
                <small style="font-size:0.75rem;opacity:0.8;">130%</small>
              </button>
              <button type="button" class="a11y-option-btn" data-font="xl" aria-pressed="false">
                <span>Extra Large</span>
                <small style="font-size:0.75rem;opacity:0.8;">150%</small>
              </button>
            </div>
          </div>

          <!-- Color Contrast -->
          <div class="a11y-group">
            <span class="a11y-group-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20z"/></svg>
              Color & Contrast
            </span>
            <div class="a11y-btn-grid" role="group" aria-label="Color Contrast Options">
              <button type="button" class="a11y-option-btn" data-contrast="default" aria-pressed="false">
                <span>Default</span>
                <small style="font-size:0.75rem;opacity:0.8;">Warm Academic</small>
              </button>
              <button type="button" class="a11y-option-btn" data-contrast="dark" aria-pressed="false">
                <span>High Dark</span>
                <small style="font-size:0.75rem;opacity:0.8;">Black & Gold</small>
              </button>
              <button type="button" class="a11y-option-btn" data-contrast="light" aria-pressed="false">
                <span>High Light</span>
                <small style="font-size:0.75rem;opacity:0.8;">Black & White</small>
              </button>
              <button type="button" class="a11y-option-btn" data-contrast="invert" aria-pressed="false">
                <span>Invert</span>
                <small style="font-size:0.75rem;opacity:0.8;">Color Inversion</small>
              </button>
            </div>
          </div>

          <!-- Reading Assistance -->
          <div class="a11y-group">
            <span class="a11y-group-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Reading & Dyslexia Support
            </span>

            <div class="a11y-toggle-item">
              <label class="a11y-toggle-label" for="a11y-toggle-dyslexic">
                <span class="a11y-toggle-name">Dyslexia-Friendly Font (Lexend)</span>
                <span class="a11y-toggle-desc">Enhances character distinctiveness and reading speed</span>
              </label>
              <label class="a11y-switch">
                <input type="checkbox" id="a11y-toggle-dyslexic">
                <span class="a11y-slider"></span>
              </label>
            </div>

            <div class="a11y-toggle-item">
              <label class="a11y-toggle-label" for="a11y-toggle-links">
                <span class="a11y-toggle-name">Highlight All Hyperlinks</span>
                <span class="a11y-toggle-desc">Adds vivid background and underlines to all clickable links</span>
              </label>
              <label class="a11y-switch">
                <input type="checkbox" id="a11y-toggle-links">
                <span class="a11y-slider"></span>
              </label>
            </div>

            <div class="a11y-toggle-item">
              <label class="a11y-toggle-label" for="a11y-toggle-spacing">
                <span class="a11y-toggle-name">Enhanced Text & Line Spacing</span>
                <span class="a11y-toggle-desc">Expands line-height to 2.0 and increases letter spacing</span>
              </label>
              <label class="a11y-switch">
                <input type="checkbox" id="a11y-toggle-spacing">
                <span class="a11y-slider"></span>
              </label>
            </div>

            <div class="a11y-toggle-item">
              <label class="a11y-toggle-label" for="a11y-toggle-guide">
                <span class="a11y-toggle-name">Reading Ruler / Focus Guide</span>
                <span class="a11y-toggle-desc">A horizontal guide line following your cursor or focused element</span>
              </label>
              <label class="a11y-switch">
                <input type="checkbox" id="a11y-toggle-guide">
                <span class="a11y-slider"></span>
              </label>
            </div>
          </div>

          <!-- Motion & Interaction -->
          <div class="a11y-group">
            <span class="a11y-group-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
              Motion & Ergonomics
            </span>

            <div class="a11y-toggle-item">
              <label class="a11y-toggle-label" for="a11y-toggle-motion">
                <span class="a11y-toggle-name">Reduce Motion / Stop Animations</span>
                <span class="a11y-toggle-desc">Disables transitions and movements for vestibular safety</span>
              </label>
              <label class="a11y-switch">
                <input type="checkbox" id="a11y-toggle-motion">
                <span class="a11y-slider"></span>
              </label>
            </div>

            <div class="a11y-toggle-item">
              <label class="a11y-toggle-label" for="a11y-toggle-cursor">
                <span class="a11y-toggle-name">Large High-Contrast Cursor</span>
                <span class="a11y-toggle-desc">Expands mouse pointer size for easier tracking</span>
              </label>
              <label class="a11y-switch">
                <input type="checkbox" id="a11y-toggle-cursor">
                <span class="a11y-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div class="a11y-footer">
          <a href="accessibility-statement.html" class="a11y-footer-link">Read Accessibility Statement →</a>
          <button type="button" class="a11y-reset-btn" id="a11y-reset-btn">Reset to Default</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Save preferences
  function savePrefs() {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.warn('Could not save accessibility preferences:', e);
    }
  }

  // Apply all preferences to DOM
  function applyPrefs(shouldAnnounce = false) {
    const root = document.documentElement;
    const body = document.body;

    // Font Size
    root.classList.remove('a11y-font-md', 'a11y-font-lg', 'a11y-font-xl');
    if (prefs.fontSize === 'md') root.classList.add('a11y-font-md');
    else if (prefs.fontSize === 'lg') root.classList.add('a11y-font-lg');
    else if (prefs.fontSize === 'xl') root.classList.add('a11y-font-xl');

    // Contrast
    root.classList.remove('a11y-contrast-dark', 'a11y-contrast-light', 'a11y-contrast-invert');
    if (prefs.contrast === 'dark') root.classList.add('a11y-contrast-dark');
    else if (prefs.contrast === 'light') root.classList.add('a11y-contrast-light');
    else if (prefs.contrast === 'invert') root.classList.add('a11y-contrast-invert');

    // Toggles
    root.classList.toggle('a11y-dyslexic', !!prefs.dyslexicFont);
    root.classList.toggle('a11y-highlight-links', !!prefs.highlightLinks);
    root.classList.toggle('a11y-text-spacing', !!prefs.textSpacing);
    root.classList.toggle('a11y-reduced-motion', !!prefs.reduceMotion);
    root.classList.toggle('a11y-large-cursor', !!prefs.largeCursor);
    body.classList.toggle('a11y-guide-active', !!prefs.readingGuide);

    // Sync UI elements in modal
    modal.querySelectorAll('[data-font]').forEach(btn => {
      const val = btn.getAttribute('data-font');
      const isActive = (val === prefs.fontSize);
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    modal.querySelectorAll('[data-contrast]').forEach(btn => {
      const val = btn.getAttribute('data-contrast');
      const isActive = (val === prefs.contrast);
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    const dysInput = modal.querySelector('#a11y-toggle-dyslexic');
    if (dysInput) dysInput.checked = !!prefs.dyslexicFont;

    const linksInput = modal.querySelector('#a11y-toggle-links');
    if (linksInput) linksInput.checked = !!prefs.highlightLinks;

    const spaceInput = modal.querySelector('#a11y-toggle-spacing');
    if (spaceInput) spaceInput.checked = !!prefs.textSpacing;

    const guideInput = modal.querySelector('#a11y-toggle-guide');
    if (guideInput) guideInput.checked = !!prefs.readingGuide;

    const motionInput = modal.querySelector('#a11y-toggle-motion');
    if (motionInput) motionInput.checked = !!prefs.reduceMotion;

    const cursorInput = modal.querySelector('#a11y-toggle-cursor');
    if (cursorInput) cursorInput.checked = !!prefs.largeCursor;

    if (shouldAnnounce) {
      announce('Accessibility settings updated.');
    }
  }

  // Initial application of saved preferences
  applyPrefs(false);

  // Modal open / close logic
  let lastFocusedElement = null;

  function openModal() {
    lastFocusedElement = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const triggerBtn = document.querySelector('#a11y-trigger');
    if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'true');

    // Focus close button or first focusable
    const closeBtn = modal.querySelector('#a11y-close-btn');
    if (closeBtn) closeBtn.focus();

    announce('Accessibility preferences dialog opened.');
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    const triggerBtn = document.querySelector('#a11y-trigger');
    if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'false');

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
    announce('Accessibility preferences dialog closed.');
  }

  // Bind Open triggers
  document.addEventListener('click', (e) => {
    const openTrigger = e.target.closest('#a11y-trigger, .open-a11y-panel, #skip-a11y-btn');
    if (openTrigger) {
      e.preventDefault();
      if (modal.classList.contains('open')) {
        closeModal();
      } else {
        openModal();
      }
    }
  });

  // Close triggers
  const closeBtn = modal.querySelector('#a11y-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Keyboard Navigation: Alt + A and Escape, plus focus trap
  document.addEventListener('keydown', (e) => {
    // Alt + A (or Option + A) toggles modal
    if (e.altKey && (e.key === 'a' || e.key === 'A')) {
      e.preventDefault();
      if (modal.classList.contains('open')) {
        closeModal();
      } else {
        openModal();
      }
      return;
    }

    if (!modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }

    // Trap focus inside modal
    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // Font Size Selection
  modal.querySelectorAll('[data-font]').forEach(btn => {
    btn.addEventListener('click', () => {
      prefs.fontSize = btn.getAttribute('data-font');
      savePrefs();
      applyPrefs(true);
      announce(`Text size set to ${btn.textContent.trim().replace(/\\s+/g, ' ')}`);
    });
  });

  // Contrast Selection
  modal.querySelectorAll('[data-contrast]').forEach(btn => {
    btn.addEventListener('click', () => {
      prefs.contrast = btn.getAttribute('data-contrast');
      savePrefs();
      applyPrefs(true);
      announce(`Contrast mode set to ${btn.textContent.trim().replace(/\\s+/g, ' ')}`);
    });
  });

  // Toggle Switches
  const bindToggle = (id, prop, label) => {
    const el = modal.querySelector(id);
    if (!el) return;
    el.addEventListener('change', () => {
      prefs[prop] = el.checked;
      savePrefs();
      applyPrefs(true);
      announce(`${label} ${el.checked ? 'enabled' : 'disabled'}`);
    });
  };

  bindToggle('#a11y-toggle-dyslexic', 'dyslexicFont', 'Dyslexia-friendly font');
  bindToggle('#a11y-toggle-links', 'highlightLinks', 'Link highlighting');
  bindToggle('#a11y-toggle-spacing', 'textSpacing', 'Enhanced text spacing');
  bindToggle('#a11y-toggle-guide', 'readingGuide', 'Reading ruler');
  bindToggle('#a11y-toggle-motion', 'reduceMotion', 'Reduced motion');
  bindToggle('#a11y-toggle-cursor', 'largeCursor', 'Large cursor');

  // Reset button
  const resetBtn = modal.querySelector('#a11y-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      prefs = { ...defaultPrefs };
      savePrefs();
      applyPrefs(true);
      announce('All accessibility settings have been restored to defaults.');
      if (typeof showToast === 'function') {
        showToast('Accessibility settings reset to default.');
      }
    });
  }

  // Reading Guide Tracking
  let guideY = window.innerHeight / 2;
  window.addEventListener('mousemove', (e) => {
    if (!prefs.readingGuide || !readingGuide) return;
    guideY = e.clientY;
    readingGuide.style.top = `${guideY}px`;
  }, { passive: true });

  window.addEventListener('focusin', (e) => {
    if (!prefs.readingGuide || !readingGuide || !e.target) return;
    const rect = e.target.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      guideY = rect.top + rect.height / 2;
      readingGuide.style.top = `${guideY}px`;
    }
  });
}


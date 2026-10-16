/**
 * Combinatorics Learning Lab - Master Application Controller
 * Handles routing, themes, student profiles, progress tracking, and module initializations.
 */
(function (window) {
  'use strict';

  // State
  const AppState = {
    currentView: 'home',
    visitedModules: new Set(),
    studentProfile: {
      name: 'Nilesh V.',
      enrolment: 'MCA2026001',
      programme: 'Master of Computer Applications (MCA)',
      semester: '1',
      division: 'A',
      academicYear: '2026–27'
    }
  };

  function initApp() {
    loadSavedData();
    initTheme();
    initNavigation();
    initStudentProfile();
    initProgressTracker();
    initModals();

    // Initialize all specialized modules
    if (window.initModule1) window.initModule1();
    if (window.initModule2) window.initModule2();
    if (window.initModule3) window.initModule3();
    if (window.initModule4) window.initModule4();
    if (window.initModule5) window.initModule5();
    if (window.initModule6) window.initModule6();
    if (window.initModule7) window.initModule7();
    if (window.initModule8) window.initModule8();
    if (window.initModule9) window.initModule9();
    if (window.initModule10) window.initModule10();
    if (window.initModule11) window.initModule11();
    if (window.initModule12) window.initModule12();

    if (window.initQuiz) window.initQuiz();
    if (window.initGlossary) window.initGlossary();
    if (window.initDemoMode) window.initDemoMode();

    // Default to home or hash view
    const initialHash = window.location.hash.replace('#', '');
    navigateTo(initialHash || 'home');
  }

  function loadSavedData() {
    try {
      const savedProfile = localStorage.getItem('mca_student_profile');
      if (savedProfile) {
        AppState.studentProfile = Object.assign(AppState.studentProfile, JSON.parse(savedProfile));
      }
      const savedVisited = localStorage.getItem('mca_visited_modules');
      if (savedVisited) {
        AppState.visitedModules = new Set(JSON.parse(savedVisited));
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('mca_app_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('mca_app_theme', next);
        updateThemeIcon(next);
        showToast(`Theme switched to ${next} mode`);
      });
    }
  }

  function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-toggle-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  function initNavigation() {
    // Links with data-view
    document.querySelectorAll('[data-view]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const viewId = link.getAttribute('data-view');
        navigateTo(viewId);

        // Close mobile sidebar if open
        const sidebar = document.getElementById('app-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        if (sidebar && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
          if (backdrop) backdrop.classList.remove('active');
        }
      });
    });

    // Mobile sidebar toggle & backdrop controls
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('sidebar-close-btn');
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    const closeMobileSidebar = () => {
      if (sidebar) sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
    };

    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('open');
        if (backdrop) backdrop.classList.toggle('active', isOpen);
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeMobileSidebar);
    if (backdrop) backdrop.addEventListener('click', closeMobileSidebar);

    // Print button
    const printBtn = document.getElementById('btn-print-report');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Hash change listener
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== AppState.currentView) {
        navigateTo(hash);
      }
    });
  }

  function navigateTo(viewId) {
    if (!viewId) viewId = 'home';
    const targetPage = document.getElementById(`view-${viewId}`);
    if (!targetPage) {
      viewId = 'home';
    }

    // Deactivate all pages
    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));

    // Activate target page
    const activePage = document.getElementById(`view-${viewId}`);
    if (activePage) activePage.classList.add('active');

    // Update navigation sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
      const itemTarget = item.getAttribute('data-view');
      if (itemTarget === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update breadcrumbs
    const breadcrumbElem = document.getElementById('breadcrumb-current');
    if (breadcrumbElem) {
      const pageTitle = activePage?.getAttribute('data-page-title') || viewId.toUpperCase();
      breadcrumbElem.textContent = pageTitle;
    }

    AppState.currentView = viewId;
    window.location.hash = viewId;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Mark as visited if it's a module
    if (viewId.startsWith('module')) {
      markModuleVisited(viewId);
    }
  }

  function markModuleVisited(moduleId) {
    AppState.visitedModules.add(moduleId);
    try {
      localStorage.setItem('mca_visited_modules', JSON.stringify([...AppState.visitedModules]));
    } catch (e) {}

    // Update sidebar dot
    const navItem = document.querySelector(`.nav-item[data-view="${moduleId}"]`);
    if (navItem) navItem.classList.add('completed');

    updateProgress();
  }

  function updateProgress() {
    const totalModules = 12;
    const visitedCount = AppState.visitedModules.size;
    const percent = Math.min(100, Math.round((visitedCount / totalModules) * 100));

    const fillElem = document.getElementById('sidebar-progress-fill');
    const labelElem = document.getElementById('sidebar-progress-label');

    if (fillElem) fillElem.style.width = `${percent}%`;
    if (labelElem) labelElem.textContent = `${visitedCount} / ${totalModules} Explored (${percent}%)`;
  }

  function initProgressTracker() {
    AppState.visitedModules.forEach(modId => {
      const navItem = document.querySelector(`.nav-item[data-view="${modId}"]`);
      if (navItem) navItem.classList.add('completed');
    });
    updateProgress();
  }

  function initStudentProfile() {
    renderStudentDisplays();

    const editBtn = document.getElementById('btn-edit-student');
    const modal = document.getElementById('student-modal');
    const form = document.getElementById('student-form');

    if (editBtn && modal) {
      editBtn.addEventListener('click', () => {
        // Pre-fill modal form
        document.getElementById('profile-name').value = AppState.studentProfile.name;
        document.getElementById('profile-enrolment').value = AppState.studentProfile.enrolment;
        document.getElementById('profile-programme').value = AppState.studentProfile.programme;
        document.getElementById('profile-semester').value = AppState.studentProfile.semester;
        document.getElementById('profile-division').value = AppState.studentProfile.division;
        document.getElementById('profile-year').value = AppState.studentProfile.academicYear;

        modal.classList.add('active');
      });
    }

    if (form && modal) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        AppState.studentProfile.name = document.getElementById('profile-name').value.trim() || 'Student';
        AppState.studentProfile.enrolment = document.getElementById('profile-enrolment').value.trim() || 'MCA2026';
        AppState.studentProfile.programme = document.getElementById('profile-programme').value.trim() || 'MCA';
        AppState.studentProfile.semester = document.getElementById('profile-semester').value.trim() || '1';
        AppState.studentProfile.division = document.getElementById('profile-division').value.trim() || 'A';
        AppState.studentProfile.academicYear = document.getElementById('profile-year').value.trim() || '2026–27';

        try {
          localStorage.setItem('mca_student_profile', JSON.stringify(AppState.studentProfile));
        } catch (err) {}

        renderStudentDisplays();
        modal.classList.remove('active');
        showToast('Student Profile Saved Successfully!');
      });
    }
  }

  function renderStudentDisplays() {
    const p = AppState.studentProfile;
    document.querySelectorAll('.display-student-name').forEach(el => el.textContent = p.name);
    document.querySelectorAll('.display-student-enrolment').forEach(el => el.textContent = p.enrolment);
    document.querySelectorAll('.display-student-programme').forEach(el => el.textContent = p.programme);
    document.querySelectorAll('.display-student-semester').forEach(el => el.textContent = p.semester);
    document.querySelectorAll('.display-student-division').forEach(el => el.textContent = p.division);
    document.querySelectorAll('.display-student-year').forEach(el => el.textContent = p.academicYear);
  }

  function initModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      const closeBtn = modal.querySelector('.modal-close-btn');
      const cancelBtn = modal.querySelector('.modal-cancel-btn');

      const closeModal = () => modal.classList.remove('active');

      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    });
  }

  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  window.AppState = AppState;
  window.navigateTo = navigateTo;
  window.showToast = showToast;
  window.initApp = initApp;

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})(window);

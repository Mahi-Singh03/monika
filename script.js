document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');

  // Check for saved user preference or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.setAttribute('data-theme', 'dark');
    icon.className = 'fa-solid fa-sun';
  } else {
    body.setAttribute('data-theme', 'light');
    icon.className = 'fa-solid fa-moon';
  }

  themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
      body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      icon.className = 'fa-solid fa-moon';
    } else {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      icon.className = 'fa-solid fa-sun';
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const menuIcon = menuToggle.querySelector('i');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      if (navLinks.classList.contains('active')) {
        menuIcon.className = 'fa-solid fa-xmark';
      } else {
        menuIcon.className = 'fa-solid fa-bars';
      }
    });
  }

  // Smooth Page Transitions
  const links = document.querySelectorAll('a[href$=".html"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('target') === '_blank') return;
      
      e.preventDefault();
      const target = link.getAttribute('href');
      
      // Add fade out animation class
      body.classList.add('fade-out');
      
      // Wait for animation to complete before navigating
      setTimeout(() => {
        window.location.href = target;
      }, 300); // Should match CSS transition duration
    });
  });

  // Intersection Observer for Scroll Animations
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger progress bar animations if inside the revealed element
        if (entry.target.classList.contains('skill-category')) {
          const bars = entry.target.querySelectorAll('.progress');
          bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            // Small timeout to ensure the transition takes effect after render
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
        }
        
        // Unobserve after revealing
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});

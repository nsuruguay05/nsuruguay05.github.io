// Global variables
let currentLang = 'en';

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const langEnBtn = document.getElementById('lang-en');
const langEsBtn = document.getElementById('lang-es');
const contactForm = document.getElementById('contact-form');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeNavigation();
    initializeScrollBehavior();
    initializeContactForm();
    initializeAnimations();
    loadAbout(currentLang);
    loadPublications(currentLang);
    loadExperience(currentLang);
    loadEducation(currentLang);
    loadResearch(currentLang);
    loadLanguages(currentLang);
});

// Language switching functionality
function initializeLanguage() {
    // Set default language based on browser preference or stored preference
    const storedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.substring(0, 2);
    
    if (storedLang) {
        currentLang = storedLang;
    } else if (browserLang === 'es') {
        currentLang = 'es';
    } else {
        currentLang = 'en';
    }
    
    updateLanguage(currentLang);
    
    // Add event listeners for language buttons
    langEnBtn.addEventListener('click', () => switchLanguage('en'));
    langEsBtn.addEventListener('click', () => switchLanguage('es'));
}

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateLanguage(lang);
}

function updateLanguage(lang) {
    // Update language button states
    langEnBtn.classList.toggle('active', lang === 'en');
    langEsBtn.classList.toggle('active', lang === 'es');
    
    // Update document language attribute
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    const elements = document.querySelectorAll('[data-en], [data-es]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.innerHTML.includes('<br>')) {
                element.innerHTML = text;
            } else {
                element.textContent = text;
            }
        }
    });
    // Load about in selected language
    loadAbout(lang);
    // Load publications in selected language
    loadPublications(lang);
    // Load experience in selected language
    loadExperience(lang);
    // Load education in selected language
    loadEducation(lang);
    // Load research in selected language
    loadResearch(lang);
    // Load languages in selected language
    loadLanguages(lang);
}

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Smooth scrolling and active link highlighting
function initializeScrollBehavior() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Create mailto link
            const mailtoLink = `mailto:isastre@fing.edu.uy?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification(currentLang === 'es' ? 'Se abrirá tu cliente de correo para enviar el mensaje.' : 'Your email client will open to send the message.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Animations and scroll effects
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.timeline-item, .teaching-item, .project-item, .publication-item, .stat-item, .contact-item, .language-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
}

// Publications dynamic loading
function loadPublications(lang) {
    fetch('publications.json')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('publications-list');
            if (!list) return;
            list.innerHTML = '';
            data.forEach(pub => {
                const p = pub[lang] || pub['en'];
                let html = `<div class="publication-item">`;
                html += `<h3>${p.title}</h3>`;
                if (p.authors) html += `<p class="authors">${p.authors}</p>`;
                if (p.venue) html += `<p class="venue">${p.venue}</p>`;
                if (p.location) html += `<p class="location">${p.location}</p>`;
                if (p.pages) html += `<p class="pages">${p.pages}</p>`;
                if (p.series) html += `<p class="series">${p.series}</p>`;
                if (p.pdf) html += `<div class="publication-links"><a href="${p.pdf}" target="_blank" class="pub-link"><i class="fas fa-file-pdf"></i> PDF</a></div>`;
                if (p.keywords && p.keywords.length) {
                    html += '<div class="keywords">';
                    p.keywords.forEach(k => html += `<span class="keyword">${k}</span>`);
                    html += '</div>';
                }
                html += `</div>`;
                list.innerHTML += html;
            });
        });
}

// Experience dynamic loading
function loadExperience(lang) {
    fetch('experience.json')
        .then(response => response.json())
        .then(data => {
            // Professional Experience Timeline
            const timeline = document.getElementById('experience-timeline');
            if (timeline) {
                timeline.innerHTML = '';
                data.filter(item => item.type === 'job').forEach(item => {
                    const exp = item[lang] || item['en'];
                    let html = `<div class="timeline-item">`;
                    html += `<div class="timeline-date">${exp.date}</div>`;
                    html += `<div class="timeline-content">`;
                    html += `<h3>${exp.title}</h3>`;
                    html += `<p class="institution">${exp.institution}</p>`;
                    html += `<p class="description">${exp.description}</p>`;
                    html += `</div></div>`;
                    timeline.innerHTML += html;
                });
            }
            // Teaching Activities Grid
            const teachingGrid = document.getElementById('teaching-grid');
            if (teachingGrid) {
                teachingGrid.innerHTML = '';
                data.filter(item => item.type === 'teaching').forEach(item => {
                    const t = item[lang] || item['en'];
                    let html = `<div class="teaching-item">`;
                    html += `<h4>${t.title}</h4>`;
                    html += `<div class="course-info">${t.info}</div>`;
                    html += `<div class="subsection-text">${t.level}</div>`;
                    html += `</div>`;
                    teachingGrid.innerHTML += html;
                });
            }
        });
}

// Education dynamic loading
function loadEducation(lang) {
    fetch('education.json')
        .then(response => response.json())
        .then(data => {
            const timeline = document.getElementById('education-timeline');
            if (!timeline) return;
            timeline.innerHTML = '';
            data.forEach(item => {
                const ed = item[lang] || item['en'];
                let html = `<div class="timeline-item">`;
                html += `<div class="timeline-date">${item.date}</div>`;
                html += `<div class="timeline-content">`;
                html += `<h3>${ed.degree}</h3>`;
                html += `<p class="institution">${ed.institution}</p>`;
                if (ed.thesis) html += `<div class="thesis-title"><strong>${ed.thesis_label}</strong> ${ed.thesis}</div>`;
                if (ed.advisors) html += `<div class="advisors"><strong>${ed.advisors_label}</strong> ${ed.advisors}</div>`;
                if (ed.keywords && ed.keywords.length) {
                    html += '<div class="keywords">';
                    ed.keywords.forEach(k => html += `<span class="keyword">${k}</span>`);
                    html += '</div>';
                }                if (ed.link) {
                    html += `<div class="publication-links"><a href="${ed.pdf}" target="_blank" class="pub-link"><i class="fas fa-file-pdf"></i> PDF</a></div>`;
                }
                html += `</div></div>`;
                timeline.innerHTML += html;
            });
        });
}

// Research dynamic loading
function loadResearch(lang) {
    fetch('research.json')
        .then(response => response.json())
        .then(data => {
            // Research Lines
            const linesDiv = document.getElementById('research-lines');
            if (linesDiv) {
                linesDiv.innerHTML = '';
                data.filter(item => item.type === 'line').forEach(item => {
                    const l = item[lang] || item['en'];
                    let html = `<div class="research-area">`;
                    html += `<h3>${l.title}</h3>`;
                    html += `<div class="research-item">`;
                    html += `<div class="project-role">${l.role}</div>`;
                    html += `<p class="subsection-text">${l.description}</p>`;
                    html += `</div></div>`;
                    linesDiv.innerHTML += html;
                });
            }
            // Research Projects
            const projectsDiv = document.getElementById('research-projects');
            if (projectsDiv) {
                projectsDiv.innerHTML = '<h3 class="subsection-title" data-en="Research Projects" data-es="Proyectos de Investigación">Research Projects</h3>';
                let grid = '<div class="project-grid">';
                data.filter(item => item.type === 'project').forEach(item => {
                    const p = item[lang] || item['en'];
                    grid += `<div class="project-item">`;
                    grid += `<h4>${p.title}</h4>`;
                    grid += `<div class="project-role">${p.role}</div>`;
                    grid += `<p class="subsection-text">${p.description}</p>`;
                    grid += `</div>`;
                });
                grid += '</div>';
                projectsDiv.innerHTML += grid;
            }
            // Extension Activities
            const extDiv = document.getElementById('research-extension');
            if (extDiv) {
                extDiv.innerHTML = '<h3 class="subsection-title" data-en="Extension Activities" data-es="Actividades de Extensión">Extension Activities</h3>';
                data.filter(item => item.type === 'extension').forEach(item => {
                    const e = item[lang] || item['en'];
                    let html = `<div class="extension-item">`;
                    html += `<h4>${e.title}</h4>`;
                    html += `<div class="extension-subtitle">${e.subtitle}</div>`;
                    html += `<p class="subsection-text">${e.description}</p>`;
                    html += `</div>`;
                    extDiv.innerHTML += html;
                });
            }
        });
}

// About dynamic loading
function loadAbout(lang) {
    fetch('about.json')
        .then(response => response.json())
        .then(data => {
            const about = data[lang] || data['en'];
            // About text
            const aboutText = document.getElementById('about-text');
            if (aboutText) {
                aboutText.innerHTML = '';
                about.paragraphs.forEach(p => {
                    aboutText.innerHTML += `<p>${p}</p>`;
                });
            }
        });
}

// Languages dynamic loading
function loadLanguages(lang) {
    fetch('languages.json')
        .then(response => response.json())
        .then(data => {
            const grid = document.getElementById('languages-grid');
            if (!grid) return;
            grid.innerHTML = '';
            data.forEach(item => {
                const l = item[lang] || item['en'];
                let html = `<div class="language-item">`;
                html += `<h3>${l.name}</h3>`;
                html += `<div>${l.description}</div>`;
                if (l.certification) {
                    html += `<div class="certification">${l.certification}</div>`;
                }
                html += `</div>`;
                grid.innerHTML += html;
            });
        });
}

// Utility functions
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2563eb;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Any scroll-based animations or effects can be added here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        'https://cvuy.uy/usuario/foto/id/cad3b46494acf5abecf45db2a72d67d0/tipo/cv/'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// ==========================================
// PORTFOLIO - INTERACTIVE FEATURES
// Muhammad Ali Joya - Full Stack Developer
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    
    // ========== SMOOTH SCROLLING ==========
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ========== SCROLL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .stat-card, .contact-item, .about-card');
    animatedElements.forEach(el => observer.observe(el));
    
    
    // ========== ACTIVE NAV LINK HIGHLIGHT ==========
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.style.color = '#667eea';
                } else {
                    navLink.style.color = '';
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    
    // ========== SKILL CARDS ANIMATION ON HOVER ==========
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    
    // ========== PROJECT CARD INTERACTIONS ==========
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    
    // ========== TYPING EFFECT FOR HERO SUBTITLE (OPTIONAL ENHANCEMENT) ==========
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after hero greeting animation
        setTimeout(typeWriter, 800);
    }
    
    
    // ========== STATS COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateStats() {
        if (hasAnimated) return;
        
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            hasAnimated = true;
            
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const targetNumber = parseFloat(text);
                
                if (!isNaN(targetNumber)) {
                    let currentNumber = 0;
                    const increment = targetNumber / 50;
                    
                    const counter = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= targetNumber) {
                            stat.textContent = text;
                            clearInterval(counter);
                        } else {
                            let displayNumber = currentNumber.toFixed(targetNumber % 1 !== 0 ? 2 : 0);
                            stat.textContent = displayNumber + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                        }
                    }, 30);
                }
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load
    
    
    // ========== PARALLAX EFFECT FOR HERO BACKGROUND ==========
    const heroBackground = document.querySelector('.hero-background::before');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const heroHeight = hero.offsetHeight;
            if (scrolled < heroHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }
    });
    
    
    // ========== PREVENT PROJECT LINK CLICKS (PLACEHOLDER) ==========
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        if (link.getAttribute('href') === '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Project link coming soon! Update the href attribute with your actual project URLs.');
            });
        }
    });
    
    
    // ========== SOCIAL LINK ANIMATIONS ==========
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(360deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
    
    
    // ========== LOG WELCOME MESSAGE ==========
    console.log('%c👋 Welcome to Muhammad Ali Joya\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cFull Stack Developer | React | Node.js | Android', 'color: #764ba2; font-size: 14px;');
    console.log('%cInterested in collaboration? Let\'s connect!', 'color: #4facfe; font-size: 12px;');
});

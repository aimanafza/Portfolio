// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isPercentage = element.textContent.includes('%');
    const hasPlus = element.textContent.includes('+');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (isPercentage ? '%' : '') + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (isPercentage ? '%' : '') + (hasPlus ? '+' : '');
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate stat numbers
            if (entry.target.classList.contains('stat-number')) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number)) {
                    animateCounter(entry.target, number);
                }
            }
        }
    });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// Interactive map pins
document.querySelectorAll('.location-pin').forEach(pin => {
    pin.addEventListener('click', function() {
        const location = this.getAttribute('data-location');
        const description = document.querySelector(`.location-desc[data-location="${location}"]`);
        
        // Remove active class from all
        document.querySelectorAll('.location-desc').forEach(desc => {
            desc.classList.remove('active');
        });
        
        // Add active class to clicked
        if (description) {
            description.classList.add('active');
            description.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

// Add hover effect to project cards
document.querySelectorAll('.project-card, .project-preview-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Mobile menu toggle (if needed)
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

console.log('Portfolio loaded successfully! ✨');


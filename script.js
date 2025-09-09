// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeProductCarousel();
    initializeProductModal();
    initializeContactForm();
    initializeScrollEffects();
    initializeAnimations();
    initializeLanguageSwitcher();
});

// Language switcher functionality
function initializeLanguageSwitcher() {
    // Get current page language
    const currentLang = document.documentElement.lang;
    
    // Update active language button
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if ((currentLang === 'es' && btn.textContent === 'ES') || 
            (currentLang === 'en' && btn.textContent === 'EN')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Product carousel functionality
function initializeProductCarousel() {
    const carousel = document.querySelector('.products-grid');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    let currentIndex = 0;
    let visibleCards = getVisibleCards();
    let filteredCards = [...productCards];
    let maxIndex = Math.max(0, filteredCards.length - visibleCards);

    // Get number of visible cards based on screen size
    function getVisibleCards() {
        if (window.innerWidth >= 1200) return 4;
        if (window.innerWidth >= 768) return 3;
        if (window.innerWidth >= 480) return 2;
        return 1;
    }

    // Update carousel position
    function updateCarousel() {
        const cardWidth = 320 + 32; // card width + gap (updated to match CSS)
        const translateX = -(currentIndex * cardWidth);
        carousel.style.transform = `translateX(${translateX}px)`;
        
        // Update navigation button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        
        // Update indicators (show progress)
        const totalSlides = Math.max(1, maxIndex + 1);
        const progress = maxIndex > 0 ? currentIndex / maxIndex : 0;
        indicators.forEach((indicator, index) => {
            if (index < 3) { // Keep maximum 3 indicators
                const segmentSize = 1 / 3;
                const isActive = progress >= (index * segmentSize) && progress < ((index + 1) * segmentSize);
                indicator.classList.toggle('active', isActive || (index === 2 && progress >= 0.67));
                indicator.style.display = 'block';
            } else {
                indicator.style.display = 'none';
            }
        });
    }

    // Filter products by category
    function filterProducts(category) {
        filteredCards = category === 'all' 
            ? [...productCards] 
            : [...productCards].filter(card => card.dataset.category === category);

        // Hide all cards first
        productCards.forEach(card => card.style.display = 'none');
        
        // Show filtered cards
        filteredCards.forEach(card => card.style.display = 'block');
        
        // Reset carousel position
        currentIndex = 0;
        maxIndex = Math.max(0, filteredCards.length - visibleCards);
        updateCarousel();
    }

    // Navigation buttons - move one image at a time
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Indicator navigation - divide carousel into 3 segments
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (index < 3) {
                const segmentSize = Math.floor(maxIndex / 3);
                currentIndex = Math.min(index * segmentSize, maxIndex);
                updateCarousel();
            }
        });
    });

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });

    // Auto-slide (optional) - move one image at a time
    let autoSlide = setInterval(() => {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 4000); // Slightly faster since we're moving one at a time

    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.products-carousel');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carouselContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 4000);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const newVisibleCards = getVisibleCards();
        if (newVisibleCards !== visibleCards) {
            visibleCards = newVisibleCards;
            maxIndex = Math.max(0, filteredCards.length - visibleCards);
            currentIndex = Math.min(currentIndex, maxIndex);
            updateCarousel();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else if (e.key === 'ArrowRight' && currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        // Minimum swipe distance
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < maxIndex) {
                // Swipe left - next
                currentIndex++;
                updateCarousel();
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous
                currentIndex--;
                updateCarousel();
            }
        }
    });

    // Initialize
    updateCarousel();
}

// Product modal functionality
function initializeProductModal() {
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const closeBtn = document.querySelector('.modal-close');
    const productCards = document.querySelectorAll('.product-card');

    // Product details data
    const productDetails = {
        'Vajilla Elegante': {
            features: ['Porcelana de alta calidad', 'Resistente al microondas', 'Diseño clásico y elegante', 'Apto para lavavajillas', 'Disponible en diferentes tamaños']
        },
        'Copas de Cristal': {
            features: ['Cristal premium sin plomo', 'Perfectas para vino y champagne', 'Diseño sofisticado', 'Resistentes y duraderas', 'Fácil limpieza']
        },
        'Decoración Temática': {
            features: ['Elementos personalizables', 'Variedad de colores', 'Fácil montaje', 'Reutilizables', 'Adaptables a cualquier tema']
        },
        'Arcos Decorativos': {
            features: ['Estructura resistente', 'Montaje rápido', 'Decoración incluida', 'Altura ajustable', 'Perfecto para ceremonias']
        },
        'Mobiliario Premium': {
            features: ['Materiales de primera calidad', 'Diseño ergonómico', 'Fácil limpieza', 'Resistente al uso intensivo', 'Disponible en varios estilos']
        },
        'Mobiliario Elegante': {
            features: ['Acabados refinados', 'Comodidad garantizada', 'Versatilidad de uso', 'Mantenimiento sencillo', 'Variedad de colores']
        },
        'Decoración Especial': {
            features: ['Piezas únicas', 'Diseño exclusivo', 'Materiales premium', 'Efecto visual impactante', 'Personalización disponible']
        },
        'Mobiliario de Lujo': {
            features: ['Materiales exclusivos', 'Diseño de autor', 'Máximo confort', 'Acabados premium', 'Elegancia incomparable']
        },
        'Centros de Mesa': {
            features: ['Arreglos frescos', 'Diseños personalizados', 'Variedad de estilos', 'Flores de temporada', 'Presentación impecable']
        },
        'Decoración Temática': {
            features: ['Adaptable a cualquier ocasión', 'Elementos coordinados', 'Colores personalizables', 'Montaje profesional', 'Efecto visual garantizado']
        },
        'Vajilla Premium': {
            features: ['Diseño exclusivo', 'Materiales de lujo', 'Presentación impecable', 'Durabilidad superior', 'Servicio completo']
        }
    };

    // Open modal when clicking on product card
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const image = card.querySelector('.product-image');
            const title = card.querySelector('.product-title').textContent;
            const description = card.querySelector('.product-description').textContent;

            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            // Add product features
            const features = productDetails[title]?.features || ['Producto de alta calidad', 'Disponible para alquiler', 'Entrega incluida'];
            modalFeatures.innerHTML = '';
            features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                modalFeatures.appendChild(li);
            });

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });
    });

    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
    }

    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                telefono: formData.get('telefono'),
                tipoEvento: formData.get('tipoEvento'),
                mensaje: formData.get('mensaje')
            };

            // Validate form
            if (validateForm(data)) {
                // Show success message
                showMessage('¡Gracias por tu consulta! Te contactaremos pronto.', 'success');
                form.reset();
            } else {
                showMessage('Por favor, completa todos los campos correctamente.', 'error');
            }
        });
    }
}

// Form validation
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;

    return (
        data.nombre.trim().length > 0 &&
        emailRegex.test(data.email) &&
        phoneRegex.test(data.telefono) &&
        data.tipoEvento.trim().length > 0 &&
        data.mensaje.trim().length > 10
    );
}

// Show message to user
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.cssText = `
        padding: 15px 20px;
        border-radius: 8px;
        margin-top: 20px;
        font-weight: 500;
        text-align: center;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' 
            ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
            : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;

    // Insert message after form
    const form = document.getElementById('contactForm');
    form.appendChild(messageElement);

    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }
    }, 5000);
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.service-card, .product-card, .testimonial-card, .contact-item'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });

    // Parallax effect for hero image - DISABLED to prevent text overlap
    window.addEventListener('scroll', () => {
        // Parallax effect removed to keep hero image static
        // This prevents the image from overlapping text when scrolling
    });
}

// Initialize animations
function initializeAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }

        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }

        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .animate-element:nth-child(even) {
            transition-delay: 0.2s;
        }

        .animate-element:nth-child(3n) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll polyfill for older browsers
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
        document.head.appendChild(script);
    }
}

// Initialize smooth scroll polyfill
smoothScrollPolyfill();

// Window resize handler
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments if needed
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}, 250));

// Preload images for better performance
function preloadImages() {
    const images = [
        'img/prod8.jpg',
        'img/prod9.jpg',
        'img/prod10.jpg',
        'img/prod11.jpg',
        'img/prod12.jpg'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
window.addEventListener('load', preloadImages);

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add CSS for loading state
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) .hero-content,
        body:not(.loaded) .hero-image {
            opacity: 0;
        }
        
        body.loaded .hero-content,
        body.loaded .hero-image {
            opacity: 1;
            transition: opacity 0.8s ease-out;
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Error handling for images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Focus management for mobile menu
function manageFocus() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            // Focus first nav link when menu opens
            setTimeout(() => {
                navLinks[0].focus();
            }, 300);
        }
    });
}

// Initialize focus management
manageFocus();

console.log('EventRent website initialized successfully!');

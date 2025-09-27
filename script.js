// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Verificar y cargar iconos
    checkFontAwesome();
    
    // Initialize all functionality
    initializeNavigation();
    initializeProductCarousel();
    initializeProductModal();
    initializeContactForm();
    initializeScrollEffects();
    initializeAnimations();
    initializeLanguageSwitcher();
    initializePerformanceOptimizations();
});

// Verificar si Font Awesome se cargó correctamente
function checkFontAwesome() {
    // Crear un elemento de prueba
    const testIcon = document.createElement('i');
    testIcon.className = 'fas fa-chair';
    testIcon.style.position = 'absolute';
    testIcon.style.visibility = 'hidden';
    document.body.appendChild(testIcon);
    
    // Verificar después de 1 segundo si el icono se renderizó
    setTimeout(() => {
        const computedStyle = window.getComputedStyle(testIcon, '::before');
        const content = computedStyle.getPropertyValue('content');
        
        // Si Font Awesome no se cargó, aplicar fallback
        if (!content || content === 'none' || content === '""') {
            console.warn('Font Awesome no se cargó correctamente, aplicando iconos de respaldo');
            applyIconFallback();
        }
        
        document.body.removeChild(testIcon);
    }, 1000);
}

// Aplicar iconos de respaldo
function applyIconFallback() {
    const iconMap = {
        'fa-chair': '🪑',
        'fa-truck': '🚚', 
        'fa-headset': '🎧',
        'fa-phone': '📞',
        'fa-envelope': '✉️',
        'fa-map-marker-alt': '📍',
        'fa-clock': '🕐',
        'fa-chevron-left': '‹',
        'fa-chevron-right': '›',
        'fa-instagram': '📷',
        'fa-facebook-f': 'f',
        'fa-whatsapp': '💬'
    };
    
    Object.keys(iconMap).forEach(iconClass => {
        const icons = document.querySelectorAll(`.${iconClass}`);
        icons.forEach(icon => {
            icon.innerHTML = iconMap[iconClass];
            icon.style.fontFamily = 'Arial, sans-serif';
            icon.style.fontSize = '1em';
            icon.classList.add('fallback-icon');
        });
    });
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Debounced scroll handler
    let scrollTimeout;
    const handleScroll = () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(() => {
            // Scroll logic here if needed
        });
    };
    
    // Throttled resize handler
    let resizeTimeout;
    const handleResize = () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            // Resize logic here if needed
        }, 250);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
}

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

    if (!carousel || !prevBtn || !nextBtn) {
        console.warn('Carousel elements not found');
        return;
    }

    let currentIndex = 0;
    let visibleCards = getVisibleCards();
    let filteredCards = [...productCards];
    
    // Calculate initial maxIndex correctly
    let maxIndex = filteredCards.length <= visibleCards ? 0 : filteredCards.length - visibleCards;

    // Initialize carousel position
    updateCarousel();

    // Re-initialize after a short delay to ensure proper calculations
    setTimeout(() => {
        visibleCards = getVisibleCards();
        maxIndex = filteredCards.length <= visibleCards ? 0 : filteredCards.length - visibleCards;
        currentIndex = Math.min(currentIndex, maxIndex);
        updateCarousel();
    }, 100);

    // Get number of visible cards based on screen size
    function getVisibleCards() {
        const containerWidth = document.querySelector('.products-carousel').clientWidth;
        const cardWidth = 320;
        const gap = 32;
        const containerPadding = 72; // 2rem left + 2.5rem right
        
        // Calculate available width for cards
        const availableWidth = containerWidth - containerPadding;
        
        // Calculate how many cards fit completely
        const possibleCards = Math.floor((availableWidth + gap) / (cardWidth + gap));
        
        // Fallback to breakpoint-based calculation if needed
        const breakpointBased = window.innerWidth >= 1200 ? 4 :
                               window.innerWidth >= 768 ? 3 :
                               window.innerWidth >= 480 ? 2 : 1;
        
        // Use the smaller value to ensure cards fit properly
        return Math.min(possibleCards, breakpointBased);
    }

    // Update carousel position
    function updateCarousel() {
        const cardWidth = 320; // card width
        const gap = 32; // gap between cards (2rem)
        
        // Ensure currentIndex doesn't exceed the maximum allowed
        currentIndex = Math.min(currentIndex, maxIndex);
        currentIndex = Math.max(currentIndex, 0);
        
        // Calculate the exact position considering gaps only
        // The CSS padding handles the container spacing
        const translateX = -(currentIndex * (cardWidth + gap));
        carousel.style.transform = `translateX(${translateX}px)`;
        
        // Update navigation button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
        
        // Update indicators (show progress) - only if there are slides to navigate
        if (maxIndex > 0) {
            const progress = currentIndex / maxIndex;
            indicators.forEach((indicator, index) => {
                if (index < 3) {
                    const segmentSize = 1 / 3;
                    const isActive = progress >= (index * segmentSize) && progress < ((index + 1) * segmentSize);
                    indicator.classList.toggle('active', isActive || (index === 2 && progress >= 0.67));
                    indicator.style.display = 'block';
                } else {
                    indicator.style.display = 'none';
                }
            });
        } else {
            // No navigation needed, show only first indicator
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === 0);
                indicator.style.display = index < 3 ? 'block' : 'none';
            });
        }
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
        
        // Calculate maxIndex correctly to prevent last item from being cut off
        // If we have fewer or equal cards than visible cards, no scrolling needed
        if (filteredCards.length <= visibleCards) {
            maxIndex = 0;
        } else {
            // Calculate how many positions we can scroll while keeping all visible cards fully visible
            maxIndex = filteredCards.length - visibleCards;
        }
        
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
            if (index < 3 && maxIndex > 0) {
                const segmentSize = Math.max(1, Math.floor(maxIndex / 3));
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
        if (maxIndex > 0) {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }
    }, 4000); // Slightly faster since we're moving one at a time

    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.products-carousel');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carouselContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            if (maxIndex > 0) {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateCarousel();
            }
        }, 4000);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const newVisibleCards = getVisibleCards();
        if (newVisibleCards !== visibleCards) {
            visibleCards = newVisibleCards;
            // Recalculate maxIndex with improved logic
            maxIndex = filteredCards.length <= visibleCards ? 0 : filteredCards.length - visibleCards;
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
        // Generate CSRF token
        generateCSRFToken();
        
        // Initialize character counter for textarea
        initializeCharacterCounter();
        
        // Real-time validation mejorada
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            let hasInteracted = false;
            
            // Marcar que el usuario ha interactuado con el campo
            input.addEventListener('focus', () => {
                if (!hasInteracted) {
                    hasInteracted = true;
                    input.classList.add('field-touched');
                }
            });
            
            // Para select, también marcar al hacer clic
            if (input.tagName === 'SELECT') {
                input.addEventListener('click', () => {
                    if (!hasInteracted) {
                        hasInteracted = true;
                        input.classList.add('field-touched');
                    }
                });
            }
            
            // Validar en tiempo real después de la primera interacción
            input.addEventListener('input', () => {
                if (hasInteracted) {
                    if (input.value.trim() !== '' || input.tagName === 'SELECT') {
                        validateField(input);
                    } else {
                        clearError(input);
                    }
                }
                
                // Update character counter for textarea
                if (input.name === 'mensaje') {
                    updateCharacterCounter(input);
                }
                
                // Validate form state for button enabling
                setTimeout(() => validateFormRealTime(), 100);
            });
            
            // Validar cuando el usuario sale del campo
            input.addEventListener('blur', () => {
                if (hasInteracted) {
                    validateField(input);
                }
            });
            
            // Para select, validar inmediatamente al cambiar
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', () => {
                    if (!hasInteracted) {
                        hasInteracted = true;
                        input.classList.add('field-touched');
                    }
                    validateField(input);
                });
            }
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check honeypot
            const honeypot = form.querySelector('input[name="website"]');
            if (honeypot && honeypot.value !== '') {
                // Bot detected, silently fail
                console.warn('Bot submission detected');
                return;
            }
            
            // Validate CSRF token
            if (!validateCSRFToken()) {
                showMessage('Token de seguridad inválido. Recarga la página.', 'error');
                return;
            }
            
            // Disable submit button to prevent double submission
            const submitBtn = form.querySelector('#submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                nombre: sanitizeInput(formData.get('nombre')),
                email: sanitizeInput(formData.get('email')),
                telefono: sanitizeInput(formData.get('telefono')),
                tipoEvento: sanitizeInput(formData.get('tipoEvento')),
                mensaje: sanitizeInput(formData.get('mensaje'))
            };

            // Validate form
            if (validateForm(data)) {
                // Simulate form submission (replace with actual endpoint)
                setTimeout(() => {
                    showMessage('¡Gracias por tu consulta! Te contactaremos pronto.', 'success');
                    form.reset();
                    generateCSRFToken(); // Generate new token
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Consulta';
                }, 1000);
            } else {
                showMessage('Por favor, corrige los errores en el formulario.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Consulta';
            }
        });
    }
}

// Generate CSRF token
function generateCSRFToken() {
    const token = 'csrf_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    const csrfInput = document.getElementById('csrf-token');
    if (csrfInput) {
        csrfInput.value = token;
    }
    // Store in session storage for validation
    sessionStorage.setItem('csrf_token', token);
}

// Validate CSRF token
function validateCSRFToken() {
    const csrfInput = document.getElementById('csrf-token');
    const storedToken = sessionStorage.getItem('csrf_token');
    return csrfInput && csrfInput.value === storedToken;
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input
        .trim()
        .replace(/[<>]/g, '') // Remove < > characters
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, ''); // Remove event handlers
}

// Validate individual field con feedback visual mejorado
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Si el campo está vacío y es requerido
    if (value === '' && field.hasAttribute('required')) {
        isValid = false;
        errorMessage = getEmptyFieldMessage(fieldName);
    } else if (value !== '') {
        // Solo validar formato si hay contenido
        switch (fieldName) {
            case 'nombre':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'El nombre debe tener al menos 2 caracteres';
                } else if (value.length > 50) {
                    isValid = false;
                    errorMessage = 'El nombre no puede exceder 50 caracteres';
                } else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'El nombre solo puede contener letras y espacios';
                }
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Ingresa un email válido (ejemplo: usuario@dominio.com)';
                } else if (value.length > 100) {
                    isValid = false;
                    errorMessage = 'El email no puede exceder 100 caracteres';
                }
                break;
            case 'telefono':
                if (!/^[+]?[0-9\s\-()]{9,20}$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Ingresa un teléfono válido (9-20 dígitos)';
                }
                break;
            case 'tipoEvento':
                if (value === '' || value === null) {
                    isValid = false;
                    errorMessage = 'Selecciona un tipo de evento';
                }
                break;
            case 'mensaje':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                } else if (value.length > 500) {
                    isValid = false;
                    errorMessage = 'El mensaje no puede exceder 500 caracteres';
                }
                break;
        }
    }

    // Aplicar estilos visuales
    updateFieldVisualState(field, isValid);
    showFieldError(field, isValid ? '' : errorMessage);
    
    return isValid;
}

// Obtener mensaje para campos vacíos
function getEmptyFieldMessage(fieldName) {
    const messages = {
        'nombre': 'El nombre es requerido',
        'email': 'El email es requerido',
        'telefono': 'El teléfono es requerido',
        'tipoEvento': 'Selecciona un tipo de evento',
        'mensaje': 'El mensaje es requerido'
    };
    return messages[fieldName] || 'Este campo es requerido';
}

// Actualizar estado visual del campo
function updateFieldVisualState(field, isValid) {
    const hasContent = field.value.trim() !== '';
    
    // Remover clases previas
    field.classList.remove('field-valid', 'field-invalid', 'field-empty');
    
    if (!hasContent && field.hasAttribute('required')) {
        field.classList.add('field-empty');
    } else if (hasContent) {
        if (isValid) {
            field.classList.add('field-valid');
        } else {
            field.classList.add('field-invalid');
        }
    }
}

// Show field error
function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Clear field error
function clearError(field) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    // Remove visual state classes when clearing, but keep field-touched
    field.classList.remove('field-valid', 'field-invalid', 'field-empty');
}

// Initialize character counter
function initializeCharacterCounter() {
    const messageField = document.getElementById('mensaje');
    const counter = document.getElementById('mensaje-counter');
    
    if (messageField && counter) {
        updateCharacterCounter(messageField);
    }
}

// Update character counter
function updateCharacterCounter(textarea) {
    const counter = document.getElementById('mensaje-counter');
    if (!counter) return;
    
    const currentLength = textarea.value.length;
    const maxLength = parseInt(textarea.getAttribute('maxlength')) || 500;
    const remaining = maxLength - currentLength;
    
    counter.textContent = `${currentLength}/${maxLength}`;
    
    // Update counter styling based on remaining characters
    counter.classList.remove('warning', 'danger');
    
    if (remaining <= 50 && remaining > 20) {
        counter.classList.add('warning');
    } else if (remaining <= 20) {
        counter.classList.add('danger');
    }
}

// Enhanced form validation with real-time feedback
function validateFormRealTime() {
    const form = document.getElementById('contactForm');
    if (!form) return false;
    
    const fields = ['nombre', 'email', 'telefono', 'tipoEvento', 'mensaje'];
    let isFormValid = true;
    
    fields.forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field && !validateField(field)) {
            isFormValid = false;
        }
    });
    
    // Update submit button state
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        if (isFormValid) {
            submitBtn.classList.remove('btn-disabled');
            submitBtn.disabled = false;
        } else {
            submitBtn.classList.add('btn-disabled');
        }
    }
    
    return isFormValid;
}

// Enhanced form validation
function validateForm(data) {
    let isValid = true;
    
    // Validate each field
    const fields = ['nombre', 'email', 'telefono', 'tipoEvento', 'mensaje'];
    fields.forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field && !validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
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
    // Intersection Observer for animations with performance optimization
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Unobserve after animation to save resources
                observer.unobserve(entry.target);
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

console.log('Iwisheventanddecor website initialized successfully!');

// Events Gallery Functionality - New Slideshow Version
function initializeEventsGallery() {
    const slides = document.querySelectorAll('.event-slide');
    const prevBtn = document.querySelector('.events-prev');
    const nextBtn = document.querySelector('.events-next');
    const playPauseBtn = document.querySelector('.events-play-pause-btn');
    const indicators = document.querySelectorAll('.event-indicator');
    const eventsContactBtn = document.querySelector('.events-contact-btn');
    
    if (!slides.length) return;

    let currentSlide = 0;
    let isTransitioning = false;
    let autoSlideInterval;
    let isPlaying = true;

    // Detect language from page
    const isEnglish = document.documentElement.lang === 'en';
    
    // Testimonials data for each event type (bilingual support)
    const testimonialsES = {
        0: { text: '"El baby shower de mi hija fue perfecto! Cada detalle estaba cuidado con amor."', name: 'María González', event: 'Baby Shower' },
        1: { text: '"La celebración de cumpleaños superó todas nuestras expectativas. ¡Increíble trabajo!"', name: 'Carlos Rodríguez', event: 'Cumpleaños' },
        2: { text: '"El primer añito de mi bebé fue un sueño hecho realidad. Gracias por tanto cariño."', name: 'Ana López', event: 'Primer Añito' },
        3: { text: '"La fiesta de mi pequeña fue mágica. Los niños se divirtieron muchísimo."', name: 'Patricia Martínez', event: 'Cumpleaños Infantil' },
        4: { text: '"Nuestra reunión familiar fue especial gracias a su atención a los detalles."', name: 'Roberto Silva', event: 'Evento Social' },
        5: { text: '"La organización fue impecable. Cada momento fue capturado con profesionalismo."', name: 'Laura Fernández', event: 'Celebración Especial' },
        6: { text: '"No podríamos haber pedido un evento mejor. Todo estuvo perfecto."', name: 'Miguel Torres', event: 'Evento Temático' },
        7: { text: '"La creatividad y dedicación se notó en cada rincón del evento. ¡Excepcional!"', name: 'Carmen Díaz', event: 'Evento Corporativo' },
        8: { text: '"Superaron nuestras expectativas. Un evento inolvidable para toda la familia."', name: 'José Herrera', event: 'Reunión Familiar' }
    };
    
    const testimonialsEN = {
        0: { text: '"My daughter\'s baby shower was perfect! Every detail was handled with love."', name: 'Maria Gonzalez', event: 'Baby Shower' },
        1: { text: '"The birthday celebration exceeded all our expectations. Incredible work!"', name: 'Carlos Rodriguez', event: 'Birthday' },
        2: { text: '"My baby\'s first year was a dream come true. Thank you for so much care."', name: 'Ana Lopez', event: 'First Birthday' },
        3: { text: '"My little girl\'s party was magical. The children had so much fun."', name: 'Patricia Martinez', event: 'Children\'s Birthday' },
        4: { text: '"Our family gathering was special thanks to their attention to detail."', name: 'Roberto Silva', event: 'Social Event' },
        5: { text: '"The organization was impeccable. Every moment was captured with professionalism."', name: 'Laura Fernandez', event: 'Special Celebration' },
        6: { text: '"We couldn\'t have asked for a better event. Everything was perfect."', name: 'Miguel Torres', event: 'Themed Event' },
        7: { text: '"The creativity and dedication showed in every corner of the event. Exceptional!"', name: 'Carmen Diaz', event: 'Corporate Event' },
        8: { text: '"They exceeded our expectations. An unforgettable event for the whole family."', name: 'Jose Herrera', event: 'Family Gathering' }
    };
    
    const testimonials = isEnglish ? testimonialsEN : testimonialsES;

    // Initialize slideshow
    function initSlideshow() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
        
        updateIndicators();
        updateTestimonial();
        updateNavButtons();
        updatePlayPauseButton();
    }

    // Update slide with smooth transition
    function updateSlide(newIndex) {
        if (isTransitioning || newIndex === currentSlide) return;
        
        isTransitioning = true;
        
        const prevSlide = slides[currentSlide];
        const newSlide = slides[newIndex];
        
        // Remove active class from current slide
        prevSlide.classList.remove('active');
        
        // Determine transition direction
        const isNext = newIndex > currentSlide || (currentSlide === slides.length - 1 && newIndex === 0);
        
        // Add transition classes
        if (isNext) {
            prevSlide.classList.add('prev');
            newSlide.classList.add('next');
        } else {
            prevSlide.classList.add('next');
            newSlide.classList.add('prev');
        }
        
        // Activate new slide after a brief delay
        setTimeout(() => {
            newSlide.classList.remove('prev', 'next');
            newSlide.classList.add('active');
            
            // Clean up previous slide
            setTimeout(() => {
                prevSlide.classList.remove('prev', 'next');
                isTransitioning = false;
            }, 100);
        }, 50);
        
        currentSlide = newIndex;
        updateIndicators();
        updateTestimonial();
        updateNavButtons();
    }

    // Update indicators
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    // Update testimonial content
    function updateTestimonial() {
        const testimonial = testimonials[currentSlide];
        if (testimonial) {
            const testimonialText = document.getElementById('current-testimonial');
            const testimonialName = document.getElementById('testimonial-name');
            const testimonialEvent = document.getElementById('testimonial-event');
            
            if (testimonialText) {
                testimonialText.style.opacity = '0';
                testimonialName.style.opacity = '0';
                testimonialEvent.style.opacity = '0';
                
                setTimeout(() => {
                    testimonialText.textContent = testimonial.text;
                    testimonialName.textContent = testimonial.name;
                    testimonialEvent.textContent = testimonial.event;
                    
                    testimonialText.style.opacity = '1';
                    testimonialName.style.opacity = '1';
                    testimonialEvent.style.opacity = '1';
                }, 300);
            }
        }
    }

    // Update navigation buttons
    function updateNavButtons() {
        if (prevBtn && nextBtn) {
            // Enable all buttons (circular navigation)
            prevBtn.disabled = false;
            nextBtn.disabled = false;
        }
    }

    // Update play/pause button appearance
    function updatePlayPauseButton() {
        if (playPauseBtn) {
            const icon = playPauseBtn.querySelector('i');
            if (icon) {
                icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
            }
        }
    }

    // Auto-slide functionality
    function startAutoSlide() {
        if (!isPlaying) return;
        
        autoSlideInterval = setInterval(() => {
            if (isPlaying) {
                const nextIndex = (currentSlide + 1) % slides.length;
                updateSlide(nextIndex);
            }
        }, 5000); // Change every 5 seconds as requested
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    function restartAutoSlide() {
        stopAutoSlide();
        if (isPlaying) {
            setTimeout(startAutoSlide, 2000); // Restart after 2 seconds
        }
    }

    function togglePlayPause() {
        isPlaying = !isPlaying;
        updatePlayPauseButton();
        
        if (isPlaying) {
            startAutoSlide();
        } else {
            stopAutoSlide();
        }
    }

    // Navigation event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            updateSlide(prevIndex);
            restartAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIndex = (currentSlide + 1) % slides.length;
            updateSlide(nextIndex);
            restartAutoSlide();
        });
    }

    // Play/pause button event listener
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }

    // Indicator event listeners
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateSlide(index);
            restartAutoSlide();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            updateSlide(prevIndex);
            restartAutoSlide();
        } else if (e.key === 'ArrowRight') {
            const nextIndex = (currentSlide + 1) % slides.length;
            updateSlide(nextIndex);
            restartAutoSlide();
        } else if (e.key === ' ') { // Space bar for play/pause
            e.preventDefault();
            togglePlayPause();
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const slideshow = document.querySelector('.events-slideshow');

    if (slideshow) {
        slideshow.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slideshow.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            restartAutoSlide();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    const nextIndex = (currentSlide + 1) % slides.length;
                    updateSlide(nextIndex);
                } else {
                    // Swipe right - previous slide
                    const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
                    updateSlide(prevIndex);
                }
            }
        }

        // Pause auto-slide on hover (optional behavior)
        slideshow.addEventListener('mouseenter', () => {
            if (isPlaying) {
                stopAutoSlide();
            }
        });
        
        slideshow.addEventListener('mouseleave', () => {
            if (isPlaying) {
                setTimeout(startAutoSlide, 1000);
            }
        });
    }

    // Contact button functionality
    if (eventsContactBtn) {
        eventsContactBtn.addEventListener('click', () => {
            const contactSection = document.querySelector('#contacto');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                setTimeout(() => {
                    const nameInput = document.querySelector('#nombre');
                    if (nameInput) {
                        nameInput.focus();
                    }
                }, 1000);
            }
        });
    }

    // Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && isPlaying) {
                startAutoSlide();
            } else {
                stopAutoSlide();
            }
        });
    }, {
        threshold: 0.5
    });

    const eventsSection = document.querySelector('.events-showcase');
    if (eventsSection) {
        observer.observe(eventsSection);
    }

    // Initialize
    initSlideshow();
    
    // Add smooth transitions to testimonial elements
    const testimonialElements = [
        document.getElementById('current-testimonial'),
        document.getElementById('testimonial-name'),
        document.getElementById('testimonial-event')
    ];
    
    testimonialElements.forEach(element => {
        if (element) {
            element.style.transition = 'opacity 0.3s ease';
        }
    });
}

// Initialize events gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeEventsGallery, 500); // Small delay to ensure other scripts are loaded
});

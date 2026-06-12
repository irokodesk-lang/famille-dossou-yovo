// ============================
// INITIALISATION AOS
// ============================
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ============================
// NAVBAR SCROLL EFFECT
// ============================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================
// HAMBURGER MENU
// ============================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ============================
// NAVIGATION ACTIVE LINK
// ============================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
            item.classList.add('active');
        }
    });
});

// ============================
// GALERIE FILTER
// ============================
const filterBtns = document.querySelectorAll('.filter-btn');
const galerieItems = document.querySelectorAll('.galerie-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galerieItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ============================
// LIGHTBOX
// ============================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentIndex = 0;
let galerieImages = [];

// Collecter les images et captions
document.querySelectorAll('.galerie-item').forEach((item, index) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.galerie-overlay p');

    galerieImages.push({
        src: img.src,
        caption: caption ? caption.textContent : ''
    });

    item.addEventListener('click', () => {
        currentIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.classList.add('active');
    updateLightbox();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateLightbox() {
    lightboxImg.src = galerieImages[currentIndex].src;
    lightboxCaption.textContent = galerieImages[currentIndex].caption;
}

lightboxClose.addEventListener('click', closeLightbox);

lightboxPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galerieImages.length) % galerieImages.length;
    updateLightbox();
});

lightboxNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galerieImages.length;
    updateLightbox();
});

// Fermer avec Echap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + galerieImages.length) % galerieImages.length;
        updateLightbox();
    }
    if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % galerieImages.length;
        updateLightbox();
    }
});

// Fermer en cliquant en dehors
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// ============================
// FORMULAIRE DE CONTACT
// ============================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const relation = document.getElementById('relation').value;
    const message = document.getElementById('message').value;

    // Ajouter dynamiquement le message dans la section Réponses
    const reponsesGrid = document.getElementById('reponses-grid');

    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    const relationLabels = {
        'membre': 'Membre de la famille',
        'ami': 'Ami(e) de la famille',
        'invite': 'Invité(e)',
        'autre': 'Visiteur'
    };

    const newCard = document.createElement('div');
    newCard.className = 'reponse-card';
    newCard.innerHTML = `
        <div class="reponse-quote">
            <i class="fas fa-quote-left"></i>
        </div>
        <p class="reponse-text">"${message}"</p>
        <div class="reponse-author">
            <div class="author-avatar">${initials}</div>
            <div>
                <strong>${name}</strong>
                <span>${relationLabels[relation]}</span>
            </div>
        </div>
    `;

    reponsesGrid.insertBefore(newCard, reponsesGrid.firstChild);

    // Reset form
    contactForm.reset();

    // Notification
    showNotification('Merci ' + name + ' ! Votre message a été ajouté au livre d\'or.');

    // Scroll vers les réponses
    setTimeout(() => {
        document.getElementById('reponses').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
});

// ============================
// NOTIFICATION
// ============================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bleu-roi, #1a3a6b);
        color: white;
        padding: 20px 30px;
        border-radius: 5px;
        border-left: 4px solid #c9a84c;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideIn 0.5s ease forwards;
        font-family: 'Lato', sans-serif;
        max-width: 350px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Ajouter les animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    .nav-links a.active {
        color: #c9a84c !important;
    }
    .nav-links a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// ============================
// BACK TO TOP
// ============================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================
// COMPTEUR D'ANIMATION (Optionnel)
// ============================
function animateOnScroll() {
    const elements = document.querySelectorAll('.membre-card, .reponse-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

animateOnScroll();

console.log('🏠 Site Famille DOSSOU-YOVO chargé avec succès !');
console.log('💛 "Liés par l\'amour"');
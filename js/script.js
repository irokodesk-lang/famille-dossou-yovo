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
// NAVBAR SCROLL
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

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ============================
// ACTIVE LINK ON SCROLL
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
// COUNTDOWN
// ============================
function updateCountdown() {
    const eventDate = new Date('2026-07-11T13:00:00').getTime();
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';

        document.querySelector('.countdown-wrapper').innerHTML =
            '<p style="color: var(--or); font-size: 1.5rem; font-family: Great Vibes, cursive;">🎉 C\'est aujourd\'hui ! Gloire à Dieu ! 🎉</p>';
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================
// CARTE LEAFLET
// ============================
const map = L.map('map').setView([6.358433413674288, 2.3773272037505113], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

const customIcon = L.divIcon({
    html: '<div style="background: #c9a84c; color: #0a0a0a; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 3px solid white;"><i class="fas fa-church"></i></div>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    className: 'custom-marker'
});

L.marker([6.358433413674288, 2.3773272037505113], { icon: customIcon })
    .addTo(map)
    .bindPopup(`
        <div style="text-align: center; font-family: 'Playfair Display', serif; padding: 10px;">
            <h3 style="color: #1a3a6b; margin-bottom: 5px; font-size: 1.1rem;">
                Résidences Saint Roger Annexe
            </h3>
            <p style="color: #6c757d; font-size: 0.85rem; margin-bottom: 8px;">
                Fidjrossè, Cotonou, Bénin
            </p>
            <p style="color: #c9a84c; font-weight: bold; font-size: 0.9rem;">
                ✝ Première Communion de Marie-Yann
            </p>
            <p style="color: #6c757d; font-size: 0.8rem;">
                11 Juillet 2026 à 13h00
            </p>
            <a href="https://www.google.com/maps?q=6.358433413674288,2.3773272037505113"
               target="_blank"
               style="display: inline-block; margin-top: 8px; padding: 5px 15px;
                      background: #1a3a6b; color: white; border-radius: 3px;
                      font-size: 0.8rem; text-decoration: none;">
                📍 Itinéraire
            </a>
        </div>
    `)
    .openPopup();

// ============================
// LIGHTBOX GALERIE
// ============================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentIndex = 0;
let galerieImages = [];

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

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// ============================
// FORMULAIRE RSVP
// ============================
const rsvpForm = document.getElementById('rsvp-form');
const personnesGroup = document.getElementById('personnes-group');

// Cacher "nombre de personnes" si "non"
document.querySelectorAll('input[name="presence"]').forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'non') {
            personnesGroup.style.display = 'none';
        } else {
            personnesGroup.style.display = 'block';
        }
    });
});

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nom = document.getElementById('rsvp-nom').value;
    const tel = document.getElementById('rsvp-tel').value;
    const email = document.getElementById('rsvp-email').value;
    const relation = document.getElementById('rsvp-relation').value;
    const presence = document.querySelector('input[name="presence"]:checked').value;
    const personnes = document.getElementById('rsvp-personnes').value;
    const messe = document.querySelector('input[name="messe"]').checked;
    const reception = document.querySelector('input[name="reception"]').checked;
    const message = document.getElementById('rsvp-message').value;

    // Préparer le message WhatsApp
    const relationLabels = {
        'famille': 'Membre de la famille',
        'ami': 'Ami(e) de la famille',
        'paroisse': 'Paroissien(ne)',
        'parrain': 'Parrain / Marraine',
        'autre': 'Autre'
    };

    let whatsappMessage = `*🎉 RSVP - Première Communion Marie-Yann*\n\n`;
    whatsappMessage += `👤 *Nom :* ${nom}\n`;
    whatsappMessage += `📞 *Téléphone :* ${tel}\n`;
    if (email) whatsappMessage += `📧 *Email :* ${email}\n`;
    whatsappMessage += `❤️ *Lien :* ${relationLabels[relation]}\n`;
    whatsappMessage += `\n*Présence :* ${presence === 'oui' ? '✅ OUI' : '❌ NON'}\n`;

    if (presence === 'oui') {
        whatsappMessage += `👥 *Nombre de personnes :* ${personnes}\n`;
        whatsappMessage += `\n*Participation :*\n`;
        if (messe) whatsappMessage += `⛪ Messe (13h00)\n`;
        if (reception) whatsappMessage += `🥂 Réception (15h00)\n`;
    }

    if (message) {
        whatsappMessage += `\n💌 *Message :*\n${message}\n`;
    }

    whatsappMessage += `\n_Envoyé via le site_`;

    // Ajouter le message dans la section Messages
    if (message.trim() !== '') {
        const messagesGrid = document.getElementById('messages-grid');
        const initials = nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

        const newCard = document.createElement('div');
        newCard.className = 'message-card';
        newCard.style.animation = 'fadeIn 0.5s ease forwards';
        newCard.innerHTML = `
            <div class="message-quote">
                <i class="fas fa-quote-left"></i>
            </div>
            <p class="message-text">"${message}"</p>
            <div class="message-author">
                <div class="author-avatar">${initials}</div>
                <div>
                    <strong>${nom}</strong>
                    <span>${relationLabels[relation]}</span>
                </div>
            </div>
        `;

        messagesGrid.insertBefore(newCard, messagesGrid.firstChild);
    }

    // Notification
    if (presence === 'oui') {
        showNotification(
            `🎉 Merci ${nom} ! Votre présence est confirmée. Marie-Yann sera ravie de vous voir !`,
            'success'
        );
    } else {
        showNotification(
            `Merci ${nom} d'avoir répondu. Nous vous gardons dans nos prières.`,
            'info'
        );
    }

    // Envoyer sur WhatsApp après 2 secondes
    setTimeout(() => {
        const whatsappUrl = `https://wa.me/2290196470098?text=${encodeURIComponent(whatsappMessage)}`;
        if (confirm('Souhaitez-vous envoyer votre réponse par WhatsApp à la famille ?')) {
            window.open(whatsappUrl, '_blank');
        }
    }, 2000);

    // Reset
    rsvpForm.reset();

    // Scroll vers messages
    if (message.trim() !== '') {
        setTimeout(() => {
            document.getElementById('messages').scrollIntoView({ behavior: 'smooth' });
        }, 3000);
    }
});

// ============================
// NOTIFICATION
// ============================
function showNotification(message, type = 'success') {
    const colors = {
        success: { bg: '#1a3a6b', border: '#c9a84c' },
        info: { bg: '#6b1d2a', border: '#c9a84c' }
    };

    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type].bg};
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        border-left: 4px solid ${colors[type].border};
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideIn 0.5s ease forwards;
        font-family: 'Lato', sans-serif;
        max-width: 400px;
        line-height: 1.6;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// ============================
// ANIMATIONS CSS
// ============================
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
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .custom-marker {
        background: none !important;
        border: none !important;
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
// LOG
// ============================
console.log('✝ Site Première Communion de Marie-Yann DOSSOU-YOVO chargé !');
console.log('💛 "Liés par l\'amour"');
console.log('📅 11 Juillet 2026 — Paroisse Sainte Bernadette');
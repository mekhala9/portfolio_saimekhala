console.log("Portfolio Loaded Successfully!");

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Expandable project cards ──
function toggleProject(id) {
    const card = document.getElementById(id);
    const isOpen = card.classList.contains('open');
    document.querySelectorAll('.project-card').forEach(c => {
        c.classList.remove('open');
        const btn = c.querySelector('.toggle-text');
        if (btn) btn.textContent = 'Read More';
    });
    if (!isOpen) {
        card.classList.add('open');
        const btn = card.querySelector('.toggle-text');
        if (btn) btn.textContent = 'Close';
        setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }
}

// ── Active nav highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 140) current = sec.getAttribute('id');
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.style.opacity = '0.7';
        a.style.color = '';
        if (a.getAttribute('href') === `#${current}`) {
            a.style.opacity = '1';
            a.style.color = 'var(--terra)';
        }
    });
});

// ════════════════════════════════════════════════
// ── AUTO GALLERY ─────────────────────────────
// TO ADD MORE PHOTOS:
//   1. Save your photo in the Portfolio folder
//   2. Add the filename to the list below
//   3. Save script.js — done! No HTML changes needed.
// ════════════════════════════════════════════════
const galleryPhotos = [
    { src: 'gallery5.jpeg',  caption: 'My Journey' },
    { src: 'gallery6.jpg',   caption: 'My Journey' },
    { src: 'gallery7.jpeg',  caption: 'Florida Atlantic University' },
    { src: 'gallery8.jpeg',  caption: 'Toast to the Grads — FAU 2025' },
    { src: 'gallery9.jpeg',  caption: 'Graduation Day' },
    { src: 'gallery11.jpeg', caption: 'My Journey' },
    { src: 'gallery12.jpeg', caption: 'My Journey' },
    { src: 'gallery13.jpeg', caption: 'My Journey' },
    { src: 'gallery14.jpeg', caption: 'My Journey' },
    { src: 'gallery15.jpeg', caption: 'My Journey' },
    { src: 'gallery16.jpeg', caption: 'My Journey' },
    { src: 'gallery17.jpeg', caption: 'My Journey' },
    { src: 'gallery18.jpeg', caption: 'My Journey' },
    // ↓ ADD NEW PHOTOS HERE — just copy a line above and change the filename & caption
    // { src: 'gallery18.jpeg', caption: 'My Caption' },
];

function buildGallery() {
    const grid = document.getElementById('masonry-grid');
    if (!grid) return;
    grid.innerHTML = '';

    galleryPhotos.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'gallery-item reveal';
        item.innerHTML = `
            <img src="${photo.src}" alt="${photo.caption}" class="gallery-img"
                 onerror="this.closest('.gallery-item').style.display='none'">
            <div class="gallery-overlay"><span>${photo.caption}</span></div>
        `;
        grid.appendChild(item);
    });

    // Re-run scroll observer for new elements
    document.querySelectorAll('.gallery-item.reveal').forEach(el => revealObserver.observe(el));
}

// ── Scroll reveal (defined before gallery build so observer is available) ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe all existing reveal elements
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Build gallery on page load
buildGallery();
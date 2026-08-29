// =============================================
//  PORTFOLIO INTERACTIVE SCRIPT - SHIVAM SHARMA
// =============================================

// =============================================
//  SCROLL PROGRESS BAR
// =============================================
const scrollBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0 && scrollBar) {
        const progress = (scrollTop / scrollHeight) * 100;
        scrollBar.style.width = progress + '%';
    }
});

// =============================================
//  CUSTOM CURSOR
// =============================================
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

if (cursorDot && cursorRing) {
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.left  = e.clientX + 'px';
        cursorDot.style.top   = e.clientY + 'px';
        setTimeout(() => {
            cursorRing.style.left = e.clientX + 'px';
            cursorRing.style.top  = e.clientY + 'px';
        }, 60);
    });

    document.querySelectorAll('a, button, input, textarea, .service-card, .project-card, .tech-chips span').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
    });
}

// =============================================
//  MOBILE NAVIGATION TOGGLE
// =============================================
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const header = document.getElementById('header');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// =============================================
//  HEADER SHRINK ON SCROLL
// =============================================
window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 50) {
        header.style.padding    = '12px 5%';
        header.style.boxShadow  = '0 8px 30px rgba(0,0,0,0.6)';
    } else {
        header.style.padding    = '20px 5%';
        header.style.boxShadow  = 'none';
    }
});

// =============================================
//  ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 220) {
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

// =============================================
//  TYPING EFFECT (2nd Year Focus)
// =============================================
const typedTextSpan = document.getElementById('typed-text');
const cursorSpan    = document.querySelector('.cursor');
const textArray     = [
    '2nd Year CSE Student.',
    'AI & ML Explorer.',
    'C / C++ & Python Developer.',
    'Future Tech Innovator.'
];
const typingDelay   = 90;
const erasingDelay  = 45;
const newTextDelay  = 2000;
let textArrayIndex  = 0;
let charIndex       = 0;

function type() {
    if (!typedTextSpan || !cursorSpan) return;
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (!typedTextSpan || !cursorSpan) return;
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, typingDelay + 900);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typedTextSpan && textArray.length) {
        setTimeout(type, newTextDelay + 200);
    }
});

// =============================================
//  SCROLL ANIMATIONS (Intersection Observer)
// =============================================
const faders = document.querySelectorAll('[data-aos]');

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('fade-in', 'appear');

        // Animate Skill Bars
        if (entry.target.classList.contains('about-skills')) {
            document.querySelectorAll('.skill-fill').forEach(fill => {
                const width = fill.getAttribute('data-width');
                fill.style.width = width + '%';
            });
        }

        // Animate Stat Counters
        if (entry.target.classList.contains('about-text')) {
            document.querySelectorAll('.stat-number').forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const speed  = 150;
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc   = Math.max(1, Math.ceil(target / speed));
                    if (count < target) {
                        counter.innerText = Math.min(target, count + inc);
                        setTimeout(updateCount, 25);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }

        observer.unobserve(entry.target);
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

faders.forEach(fader => {
    fader.classList.add('fade-in');
    appearOnScroll.observe(fader);
});

// =============================================
//  3D CARD TILT EFFECT ON HOVER
// =============================================
document.querySelectorAll('.service-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x    = e.clientX - rect.left - rect.width  / 2;
        const y    = e.clientY - rect.top  - rect.height / 2;
        const tiltX = (y / rect.height) * 8;
        const tiltY = -(x / rect.width)  * 8;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.4s ease';
    });
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

// =============================================
//  DOWNLOAD CV BUTTON (Native download with visual feedback)
// =============================================
const downloadCvBtn = document.getElementById('download-cv');
if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
        const originalHtml = downloadCvBtn.innerHTML;
        downloadCvBtn.innerHTML = '<i class="fas fa-check"></i> Downloading...';
        setTimeout(() => {
            downloadCvBtn.innerHTML = originalHtml;
        }, 2500);
    });
}

// =============================================
//  CONTACT FORM SUBMISSION (Real Inbox Delivery)
// =============================================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formError   = document.getElementById('form-error');
const submitBtn   = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill out all required fields.');
            return;
        }

        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';
        submitBtn.disabled  = true;

        const accessKey = document.getElementById('web3forms_key')?.value;

        // If a real Web3Forms key is configured, post via Web3Forms API
        if (accessKey && accessKey !== 'YOUR_ACCESS_KEY_HERE') {
            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();

                if (data.success) {
                    showSuccess();
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (err) {
                console.error('Submission error:', err);
                fallbackToMailto(name, email, subject, message);
            }
        } else {
            // Instant fallback: open user's email client directly to pgcshivamsharma@gmail.com
            fallbackToMailto(name, email, subject, message);
        }

        function showSuccess() {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            contactForm.reset();
            if (formSuccess) formSuccess.style.display = 'block';
            if (formError) formError.style.display = 'none';

            setTimeout(() => {
                submitBtn.innerHTML = originalBtnHtml;
                submitBtn.disabled  = false;
                if (formSuccess) formSuccess.style.display = 'none';
            }, 6000);
        }

        function fallbackToMailto(name, email, subject, message) {
            const recipient = 'pgcshivamsharma@gmail.com';
            const mailSubject = encodeURIComponent(subject ? `[Portfolio] ${subject}` : `Message from ${name}`);
            const mailBody = encodeURIComponent(`Hi Shivam,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            
            // Trigger mailto link
            window.location.href = `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;

            showSuccess();
        }
    });
}

// =============================================
//  FUTURISTIC PARTICLE BACKGROUND CANVAS
// =============================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.color = Math.random() > 0.5 ? 'rgba(108, 99, 255, 0.4)' : 'rgba(255, 101, 132, 0.35)';
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width)  this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            this.draw();
        }
    }

    function initParticles() {
        particles = [];
        const numParticles = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        const maxDistance = 110;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    const opacity = 1 - (dist / maxDistance);
                    ctx.strokeStyle = `rgba(108, 99, 255, ${opacity * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => p.update());
        connectParticles();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animate();
}

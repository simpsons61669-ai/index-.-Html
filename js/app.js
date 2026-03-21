// 1. LENIS - BUTTERY SMOOTH SCROLLING
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// 2. NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) document.querySelector('.navbar').classList.add('scrolled');
    else document.querySelector('.navbar').classList.remove('scrolled');
});

// 3. GSAP REVEAL ANIMATIONS
gsap.registerPlugin(ScrollTrigger);

// Hero Entrance
gsap.from(".hero-title", { y: 100, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.2 });
gsap.from(".hero-subtitle", { y: 50, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.4 });

// Card Scroll Reveals
gsap.utils.toArray('.glass-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 85%" },
        y: 100, opacity: 0, duration: 1, ease: "power3.out",
        delay: i * 0.1 // Staggers the cards loading in
    });
});

// 4. THE 3D PARTICLE NETWORK (WEBGL-STYLE CANVAS)
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let width, height, particles;

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    const count = width < 768 ? 40 : 100; // Less particles on mobile for performance
    
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 243, 255, 0.5)';
        ctx.fill();
        
        // Connect nearby particles with lines
        particles.forEach(p2 => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(189, 0, 255, ${0.2 - dist/150})`;
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();

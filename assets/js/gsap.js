const card1 = document.querySelector('.portfolio .col-12.col-sm-6:nth-child(1)');
const card2 = document.querySelector('.portfolio .col-12.col-sm-6:nth-child(2)');
const card3 = document.querySelector('.portfolio .col-12.col-sm-6:nth-child(3)');
const card4 = document.querySelector('.portfolio .col-12.col-sm-6:nth-child(4)');

const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });

// All animations start at the same time
tl.to(card1, {
    duration: 2,
    x: "100%",
    y: "117%",
    ease: "power1.inOut",
}, 0)
    .to(card4, {
        duration: 2,
        x: "-100%",
        y: "-117%",
        ease: "power1.inOut",
    }, 0)
    .to(card2, {
        duration: 2,
        x: "-100%",
        y: "117%",
        ease: "power1.inOut",
    }, 0)
    .to(card3, {
        duration: 2,
        x: "100%",
        y: "-117%",
        ease: "power1.inOut",
    }, 0);


const heroTl = gsap.timeline({
    defaults: { ease: "power3.out" } // Set default easing for all animations
});

heroTl
    .from(".logo, .desktop-nav, .header-cta", {
        y: -100,
        opacity: 0,
        duration: 1, // Reduced from 1.5s for faster load
    })
    .from(".hero h1, .hero p", {
        opacity: 0,
        x: -100, // Reduced from -400px for less extreme movement
        stagger: 0.2, // Reduced from 0.4s
        duration: 0.6, // Reduced from 1s
        ease: "power2.out"
    })
    .from(".hero-btn .button-wrap, .hero .secondary-btn", {
        scale: 0.8, // Changed from 0.3 for less extreme scaling
        opacity: 0,
        stagger: 0.1, // Reduced from 0.2s
        duration: 0.7, // Reduced from 0.5s
    });

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Swiper if element exists
    const swiperEl = document.querySelector('.swiper');
    if (swiperEl) {
        const swiper = new Swiper('.swiper', {
            loop: true,
            slidesPerView: 3,
            spaceBetween: 16,

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            breakpoints: {
                1400: {
                    slidesPerView: 3,
                    spaceBetween: 24
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 16
                },
                0: {
                    slidesPerView: 1,
                    spaceBetween: 12
                }
            }
        });
    }

    // Counter animation with Intersection Observer
    const counters = document.querySelectorAll('.count');
    if (counters.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const increment = target / 100;
                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Circle chart function
    function makesvg(percentage, inner_text = "") {
        var abs_percentage = Math.abs(percentage).toString();
        var percentage_str = percentage.toString();
        var classes = ""

        if (percentage < 0) {
            classes = "danger-stroke circle-chart__circle--negative";
        } else if (percentage > 0 && percentage <= 30) {
            classes = "warning-stroke";
        } else {
            classes = "success-stroke";
        }

        return `<svg class="circle-chart" viewBox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">
            <circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" />
            <circle class="circle-chart__circle ${classes}"
                stroke-dasharray="${abs_percentage},100" cx="16.9" cy="16.9" r="15.9" />
            <g class="circle-chart__info">
                <text class="circle-chart__percent" x="17.9" y="15.5" fill="white">${percentage_str}%</text>
                ${inner_text ? `<text class="circle-chart__subline" x="16.91549431" y="22">${inner_text}</text>` : ''}
            </g>
        </svg>`;
    }

    // Observe the contact section
    const contactSection = document.querySelector('.contact-us');
    if (contactSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Initialize circle charts only when section is visible
                    document.querySelectorAll('.circlechart').forEach(chart => {
                        const percentage = chart.dataset.percentage;
                        const inner_text = chart.textContent;
                        chart.innerHTML = makesvg(percentage, inner_text);
                    });

                    // Stop observing after first trigger
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(contactSection);
    }

    // Scroll header effect
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 0) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile nav functions
    function openMobileNav() {
        const nav = document.querySelector('.mobile-nav');
        if (nav) nav.classList.add('open-nav');
    }

    function closeMobileNav() {
        const nav = document.querySelector('.mobile-nav');
        if (nav) nav.classList.remove('open-nav');
    }

    // Assign these to global scope if needed
    window.openMobileNav = openMobileNav;
    window.closeMobileNav = closeMobileNav;


    const navWrapper = document.querySelector(".nav-wrapper");
    const desktopNav = document.querySelector(".desktop-nav");
    const cursor = document.querySelector(".cursor");

    if (navWrapper && desktopNav && cursor) {
        const links = desktopNav.querySelectorAll(".hover-me");

        // Hover animation
        const animateMe = function (e) {
            const span = this.querySelector("span");
            if (!span) return;

            const { offsetX: x, offsetY: y } = e;
            const { offsetWidth: width, offsetHeight: height } = this;

            const move = 20;
            const xMove = (x / width) * (move * 2) - move;
            const yMove = (y / height) * (move * 2) - move;

            span.style.transform = `translate(${xMove}px, ${yMove}px)`;

            if (e.type === "mouseleave") {
                span.style.transform = "";
            }
        };

        // Cursor follow inside nav
        const editCursor = (e) => {
            const rect = navWrapper.getBoundingClientRect();
            const { clientX: x, clientY: y } = e;

            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                cursor.style.display = "block";
                cursor.style.left = x + "px";
                cursor.style.top = y + "px";
            } else {
                cursor.style.display = "none";
            }
        };

        links.forEach((link) => {
            link.addEventListener("mousemove", animateMe);
            link.addEventListener("mouseleave", animateMe);
        });

        window.addEventListener("mousemove", editCursor);
    }


    const cursorWrapper = document.getElementById('cursor-wrapper');

    if (cursorWrapper) {
        let cursorInitialized = false;

        document.addEventListener('mousemove', function (e) {
            // If the hovered element should not show the cursor
            if (e.target.closest('.no-cursor')) {
                cursorWrapper.style.display = 'none';
                return;
            }

            // Show the cursor only after the first movement
            if (!cursorInitialized) {
                cursorWrapper.style.display = 'flex';
                cursorInitialized = true;
            }

            const offset = 25;
            cursorWrapper.style.left = `${e.pageX - offset}px`;
            cursorWrapper.style.top = `${e.pageY - offset}px`;
        });
    }

});

// Selecting the images
document.addEventListener("DOMContentLoaded", function () {
    // Selecting both images
    const images = document.querySelectorAll('.hoverable-image');
    const firstCard = images[0].closest('.why-us-card');
    const secondCard = images[1].closest('.why-us-card');

    // Initialize the first image to be inactive and the second one to be active
    firstCard.classList.add('inactive');
    secondCard.classList.add('active');

    // Adding event listeners for hover
    images.forEach((image) => {
        image.addEventListener('mouseenter', function () {
            const parentCard = image.closest('.why-us-card');

            // Make the hovered card active and the other inactive
            parentCard.classList.remove('inactive');
            parentCard.classList.add('active');

            images.forEach((img) => {
                const otherCard = img.closest('.why-us-card');
                if (otherCard !== parentCard) {
                    otherCard.classList.remove('active');
                    otherCard.classList.add('inactive');
                }
            });
        });
    });
});


function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skills .percentage');

    progressBars.forEach(bar => {
        // Reset width to 0 before animating
        bar.style.width = '0';

        // Get target width from parent's nth-child rule
        const parent = bar.closest('.progres-bar');
        let targetWidth = '100%';

        if (parent.matches(':nth-child(1)')) {
            targetWidth = '95%';
        } else if (parent.matches(':nth-child(2)')) {
            targetWidth = '90%';
        } else if (parent.matches(':nth-child(3)')) {
            targetWidth = '100%';
        }

        // Animate to target width
        setTimeout(() => {
            bar.style.width = targetWidth;
            bar.style.transition = 'width 1.5s ease-out';
        }, 100);
    });
}

// Initialize Intersection Observer for skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target); // Stop observing after triggering
            }
        });
    }, { threshold: 0.3 }); // Trigger when 30% of section is visible

    observer.observe(skillsSection);
}

// var span = document.querySelector(".typewriter span");
// var textArr = span.getAttribute("data-text").split(", ");
// var maxTextIndex = textArr.length;

// var sPerChar = 0.15;
// var sBetweenWord = 1.5;
// var textIndex = 0;

// typing(textIndex, textArr[textIndex]);

// function typing(textIndex, text) {
//     var charIndex = 0;
//     var maxCharIndex = text.length - 1;

//     var typeInterval = setInterval(function () {
//         span.innerHTML += text[charIndex];
//         if (charIndex == maxCharIndex) {
//             clearInterval(typeInterval);
//             setTimeout(function () { deleting(textIndex, text) }, sBetweenWord * 1000);

//         } else {
//             charIndex += 1;
//         }
//     }, sPerChar * 1000);
// }

// function deleting(textIndex, text) {
//     var minCharIndex = 0;
//     var charIndex = text.length - 1;

//     var typeInterval = setInterval(function () {
//         span.innerHTML = text.substr(0, charIndex);
//         if (charIndex == minCharIndex) {
//             clearInterval(typeInterval);
//             textIndex + 1 == maxTextIndex ? textIndex = 0 : textIndex += 1;
//             setTimeout(function () { typing(textIndex, textArr[textIndex]) }, sBetweenWord * 1000);
//         } else {
//             charIndex -= 1;
//         }
//     }, sPerChar * 1000);
// }





// const searchBar = document.getElementById('searchBar');
// const searchPopup = document.getElementById('searchPopup');
// const searchInput = searchBar.querySelector('input');
// const searchIcon = searchBar.querySelector('i');

// searchBar.addEventListener('click', () => {
//     if (window.innerWidth < 1200) {
//         searchPopup.style.display = 'block';
//     }
// });

// window.addEventListener('click', function (e) {
//     if (!searchPopup.contains(e.target) && !searchBar.contains(e.target)) {
//         searchPopup.style.display = 'none';
//     }
// });

// searchInput.addEventListener('input', () => {
//     if (window.innerWidth >= 1200) {
//         searchIcon.style.display = searchInput.value.trim() !== '' ? 'none' : 'inline';
//     }
// });

// window.addEventListener('resize', () => {
//     if (window.innerWidth >= 1200) {
//         searchIcon.style.display = searchInput.value.trim() !== '' ? 'none' : 'inline';
//     } else {
//         searchIcon.style.display = 'inline';
//     }
// });



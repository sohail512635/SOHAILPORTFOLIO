/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills(){
    let itemClass = this.parentNode.className;

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close';
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tc =>{
            tc.classList.remove('qualification__active');
        });
        target.classList.add('qualification__active');

        tabs.forEach(t =>{
            t.classList.remove('qualification__active');
        });
        tab.classList.add('qualification__active');
    });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((modalBtn, i) =>{
    modalBtn.addEventListener('click', () =>{
        modal(i);
    });
});

modalCloses.forEach((modalClose) =>{
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal');
        });
    });
});

// Close modal on backdrop click
modalViews.forEach((modalView) =>{
    modalView.addEventListener('click', (e) =>{
        if(e.target === modalView){
            modalView.classList.remove('active-modal');
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) =>{
    if(e.key === 'Escape'){
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal');
        });
    }
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if(link){
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header');
    if(this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/*==================== TYPING EFFECT ====================*/
const typingElement = document.getElementById('typing-text');
if(typingElement){
    const titles = [
        'SEO Expert',
        'Digital Marketer',
        'Link Building Specialist',
        'Content Strategist',
        'WordPress Developer',
        'Google Ads Manager'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeEffect(){
        const currentTitle = titles[titleIndex];

        if(isDeleting){
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if(!isDeleting && charIndex === currentTitle.length){
            typingDelay = 2000;
            isDeleting = true;
        } else if(isDeleting && charIndex === 0){
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingDelay = 500;
        }

        setTimeout(typeEffect, typingDelay);
    }

    setTimeout(typeEffect, 1000);
}

/*==================== SCROLL REVEAL ANIMATION ====================*/
function createScrollRevealObserver(){
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if(entry.isIntersecting){
                // Add staggered delay for elements
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    revealElements.forEach((el, index) => {
        // Add staggered delay based on index within same parent
        el.dataset.delay = (index % 4) * 150;
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', createScrollRevealObserver);

/*==================== ANIMATED COUNTER ====================*/
function animateCounters(){
    const counterOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if(current < target){
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, counterOptions);

    // Observe about info and stats
    const aboutInfo = document.querySelector('.about__info');
    if(aboutInfo) counterObserver.observe(aboutInfo);

    const statsContainer = document.querySelector('.stats__container');
    if(statsContainer) counterObserver.observe(statsContainer);
}

document.addEventListener('DOMContentLoaded', animateCounters);

/*==================== SKILL BAR ANIMATION ====================*/
function animateSkillBars(){
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const bars = entry.target.querySelectorAll('.skills__percentage');
                bars.forEach((bar, index) => {
                    const width = bar.dataset.width || bar.style.width || bar.className.match(/skills__\w+/);
                    if(bar.dataset.width){
                        setTimeout(() => {
                            bar.style.width = bar.dataset.width + '%';
                        }, index * 200);
                    }
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsContainers = document.querySelectorAll('.skills__content');
    skillsContainers.forEach(container => {
        skillObserver.observe(container);
    });
}

document.addEventListener('DOMContentLoaded', animateSkillBars);

/*==================== FLOATING PARTICLES ====================*/
function createParticles(){
    const particlesContainer = document.getElementById('particles');
    if(!particlesContainer) return;

    const particleCount = 30;

    for(let i = 0; i < particleCount; i++){
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);

/*==================== SMOOTH PARALLAX ON MOUSE ====================*/
document.addEventListener('mousemove', (e) => {
    const blob = document.querySelector('.home__blob');
    if(!blob) return;

    const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;

    blob.style.transform = `translateY(${-15 + mouseY * 0.3}px) translateX(${mouseX * 0.3}px)`;
});

/*==================== SMOOTH SCROLL FOR ALL ANCHOR LINKS ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*==================== NAV LINK HOVER RIPPLE ====================*/
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('mouseenter', function(){
        this.style.transition = 'all 0.3s cubic-bezier(.34,1.56,.64,1)';
    });
});

/*==================== TILT EFFECT ON SERVICE CARDS ====================*/
document.querySelectorAll('.services__content').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

/*==================== INPUT LABEL ANIMATION ====================*/
document.querySelectorAll('.contact__input').forEach(input => {
    input.addEventListener('focus', function(){
        this.parentNode.querySelector('.contact__label').style.color = 'var(--first-color)';
        this.parentNode.querySelector('.contact__label').style.transform = 'translateY(-2px)';
        this.parentNode.querySelector('.contact__label').style.fontSize = 'var(--smaller-font-size)';
        this.parentNode.querySelector('.contact__label').style.transition = 'all 0.3s ease';
    });
    
    input.addEventListener('blur', function(){
        if(!this.value){
            this.parentNode.querySelector('.contact__label').style.color = '';
            this.parentNode.querySelector('.contact__label').style.transform = '';
        }
    });
});
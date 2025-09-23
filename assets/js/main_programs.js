// assets/js/main_programs.js
const INACTIVITY_TIMEOUT = 5 * 60 * 1000;
let timeoutTimer;

document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keypress', resetTimer);

    initParticles();
    populateMainPrograms();
    handleModals();
    handleFadeInOnScroll();
    handleLogout();
});

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        alert('กรุณาเข้าสู่ระบบ');
        window.location.href = 'index.html';
    } else {
        resetTimer();
    }
}

function resetTimer() {
    clearTimeout(timeoutTimer);
    localStorage.setItem('lastActivity', Date.now());
    timeoutTimer = setTimeout(logoutUser, INACTIVITY_TIMEOUT);
}

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('lastActivity');
    alert('คุณไม่ได้ใช้งานเกิน 5 นาที กรุณาเข้าสู่ระบบอีกครั้ง');
    window.location.href = 'index.html';
}

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#a178e0" },
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#e5e5f7", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                    "repulse": { "distance": 200, "duration": 0.4 },
                    "push": { "particles_nb": 4 },
                    "remove": { "particles_nb": 2 }
                }
            },
            "retina_detect": true
        });
    } else {
        console.error("Particles.js library not found.");
    }
}

function handleFadeInOnScroll() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    if (fadeInElements.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
}

function populateMainPrograms() {
    const mainPrograms = [
        {
            id: '1',
            name: 'Share Flex Message(แชร์ Flex)',
            description: 'ระบบ สร้างและแชร์ Flex Message ไปยังห้องแชท LINE',
            link: 'https://github.com/freebroletgo/shareflex',
            icon: 'fas fa-chart-line',
            usagePage: 'pages/page3.html',
            hasUsagePage: true
        },
        {
            id: '2',
            name: 'Flex-simulator',
            description: 'Flex Message มีให้เลือกใช้งานได้หลายแบบ ฉบับมือโปร',
            link: 'pages/page4.html',
            icon: 'fas fa-money-check-alt',
        },
        {
            id: '3',
            name: 'โปรแกรมวิเคราะห์ข้อมูลการตลาด',
            description: 'เครื่องมือขั้นสูงที่ใช้ในการวิเคราะห์ข้อมูลการตลาดเพื่อการตัดสินใจที่ดียิ่งขึ้น',
            link: 'https://github.com/your-username/marketing-analyzer',
            icon: 'fas fa-search-dollar'
        }
    ];

    const mainProgramsContainer = document.getElementById('main-programs');

    mainPrograms.forEach(program => {
        const item = document.createElement('div');
        item.classList.add('program-item', 'fade-in');
        const programIcon = program.icon ? program.icon : 'fas fa-file-code';

        item.innerHTML = `
            <i class="${programIcon} program-icon"></i>
            <h3>${program.name}</h3>
            <p>${program.description}</p>
        `;

        item.addEventListener('click', () => {
            showProgramModal(program); 
        });

        mainProgramsContainer.appendChild(item);
    });
}

function showProgramModal(program) {
    const modal = document.getElementById('modal-details');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLinks = document.getElementById('modal-links');
    
    modalTitle.textContent = program.name;
    modalDescription.textContent = program.description;
    modalLinks.innerHTML = '';

    const buttonContainer = document.createElement('div');
    // buttonContainer.classList.add('cta-buttons-container');
    
    // สร้างลิงก์หลักสำหรับโปรแกรม
    const mainLink = document.createElement('a');
    mainLink.href = program.link;
    mainLink.textContent = program.id === '2' ? 'ดูคลัง Flex' : 'ดาวน์โหลด';
    mainLink.target = '_blank';
    // mainLink.classList.add('cta-button', 'primary-cta');
    buttonContainer.appendChild(mainLink);
    
    // สร้างลิงก์ "การใช้งาน" ถ้ามี
    if (program.hasUsagePage) {
        const usageLink = document.createElement('a');
        usageLink.href = program.usagePage;
        usageLink.textContent = 'การใช้งาน';
        usageLink.target = '_blank';
        // usageLink.classList.add('cta-button', 'secondary-cta');
        buttonContainer.appendChild(usageLink);
    }
    
    modalLinks.appendChild(buttonContainer);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function handleModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });
}

function handleLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('lastActivity');
            window.location.href = 'index.html';
        });
    }
}
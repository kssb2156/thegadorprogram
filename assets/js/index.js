// assets/js/index.js
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    populatePrograms();
    // ถ้ามี populateMainPrograms() ก็เรียกใช้ที่นี่
    handleModals();
    handleFadeInOnScroll();
});

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#FFFFFF" }, // เปลี่ยนสีของจุดเป็นสีขาว
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#BDBDBD", "opacity": 0.3, "width": 1 }, // เปลี่ยนสีของเส้นเป็นสีเทาอ่อน
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

function populatePrograms() {
    const programs = [
        {
            id: '1',
            name: 'โปรแกรมออกเอกสาร 50 ทวิ',
            description: 'โปรแกรมออกเอกสาร 50 ทวิ สะดวก รวดเร็ว ลดความผิดพลาด',
            isLocked: false,
            link: 'https://drive.google.com/file/d/1S7HSythQTqnWR5_TYxUOaMkOocxxda7C/view',
            icon : 'fas fa-scroll', // เพิ่มไอคอน
            usagePage: 'pages/page1.html' // ไปยังวิธีการใช้งาน
        },
        {
            id: '2',
            name: 'โปรแกรมตีบวก FIFA ',
            description: 'โปรแกรมออโต้คลิกตีบวก FIFA ไม่ดึงเมาส์ ทับหน้าจอได้',
            isLocked: false,
            link: 'https://drive.google.com/file/d/1OTzWOVnND3F-dnON6r26Kb6zsffcJoNy/view?usp=sharing',
            icon : 'fas fa-thumbs-up', // เพิ่มไอคอน
            usagePage: 'pages/page2.html' // ไปยังวิธีการใช้งาน
        },
        {
            id: '3',
            name: 'Share Flex Message(แชร์ Flex)',
            description: 'ระบบ สร้างและแชร์ Flex Message ไปยังห้องแชท LINE',
            isLocked: true,
            link: 'ติดต่อผู้ดูแล',
            icon: 'fas fa-chart-line' // เพิ่มไอคอน
        },
        {
            id: '4',
            name: 'Flex-simulator',
            description: 'Flex Message มีให้เลือกใช้งานได้หลายแบบ ฉบับมือโปร',
            isLocked: true,
            link: 'ติดต่อผู้ดูแล',
            icon: 'fas fa-tools' // เพิ่มไอคอน 
        }   
    ];

    const freeProgramsContainer = document.getElementById('free-programs');
    const lockedProgramsContainer = document.getElementById('locked-programs');

    programs.forEach(program => {
        const item = document.createElement('div');
        item.classList.add('program-item', 'fade-in');
        
        // กำหนดไอคอนเริ่มต้น
        const programIcon = program.icon ? program.icon : 'fas fa-file-code';

        // แก้ไขโค้ดส่วนนี้เพื่อใช้ไอคอนจากข้อมูลโปรแกรม
        item.innerHTML = `
            <i class="${programIcon} program-icon"></i>
            <h3>${program.name}</h3>
            <p>${program.description}</p>
        `;
        
        item.addEventListener('click', () => {
            showProgramModal(program);
        });

        if (program.isLocked) {
            lockedProgramsContainer.appendChild(item);
        } else {
            freeProgramsContainer.appendChild(item);
        }
    });
}

// ฟังก์ชันสำหรับแสดง Modal และนำข้อมูลโปรแกรมไปใส่ในหน้าต่าง
function showProgramModal(program) {
    const modal = document.getElementById('modal-details');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLinks = document.getElementById('modal-links');
    
    modalTitle.textContent = program.name;
    modalDescription.textContent = program.description;
    modalLinks.innerHTML = '';

    if (program.isLocked) {
        const contactLink = document.createElement('a');
        contactLink.href = program.link;
        contactLink.textContent = 'ติดต่อผู้ดูแล';
        modalLinks.appendChild(contactLink);
    } else {
        // สร้างปุ่ม "ดาวน์โหลดฟรี"
        const downloadLink = document.createElement('a');
        downloadLink.href = program.link;
        downloadLink.textContent = 'ดาวน์โหลดฟรี';
        downloadLink.target = '_blank';
        // downloadLink.classList.add('cta-button', 'primary-cta'); // เพิ่มคลาสสำหรับจัดสไตล์

        // สร้างปุ่ม "การใช้งาน"
        const usageLink = document.createElement('a');
        usageLink.href = program.usagePage; // กำหนดให้ลิงก์ไปที่ page.html
        usageLink.textContent = 'การใช้งาน';
        usageLink.target = '_blank'; // เปิดในแท็บใหม่
        // usageLink.classList.add('cta-button', 'secondary-cta'); // เพิ่มคลาสสำหรับจัดสไตล์
        
        // สร้าง div เพื่อครอบปุ่มทั้งสองปุ่ม
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('cta-buttons-container');
        buttonContainer.appendChild(downloadLink);
        buttonContainer.appendChild(usageLink);
        
        // เพิ่ม div ที่มีปุ่มทั้งสองลงใน modal
        modalLinks.appendChild(buttonContainer);
        // 👆 จบส่วนที่เพิ่ม
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// ฟังก์ชันสำหรับจัดการการเปิด-ปิด Modal โดยการคลิกปุ่มปิดหรือคลิกนอกหน้าต่าง
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
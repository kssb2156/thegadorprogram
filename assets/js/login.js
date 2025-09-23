// assets/js/login.js
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    handleLogin();
    checkRememberedUser();
});

// Function to initialize Particles.js
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

// Function to check and pre-fill login fields
function checkRememberedUser() {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    const rememberMeCheckbox = document.getElementById('remember-me');
    
    if (rememberedUsername && rememberedPassword) {
        document.getElementById('username').value = rememberedUsername;
        document.getElementById('password').value = rememberedPassword;
        rememberMeCheckbox.checked = true;
    }
}

// Function to handle login form submission
function handleLogin() {
    const loginForm = document.getElementById('login-form');
    const statusMessage = document.getElementById('login-status');
    const rememberMeCheckbox = document.getElementById('remember-me');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = e.target.username.value;
            const password = e.target.password.value;

            const correctUsername = 'admin';
            const correctPassword = '1234';

            if (username === correctUsername && password === correctPassword) {
                statusMessage.textContent = 'เข้าสู่ระบบสำเร็จ! กำลังนำทาง...';
                statusMessage.style.color = 'var(--accent-color)';
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('lastActivity', Date.now());

                if (rememberMeCheckbox.checked) {
                    localStorage.setItem('rememberedUsername', username);
                    localStorage.setItem('rememberedPassword', password);
                } else {
                    localStorage.removeItem('rememberedUsername');
                    localStorage.removeItem('rememberedPassword');
                }

                setTimeout(() => {
                    window.location.href = 'main_programs.html';
                }, 1500);
            } else {
                statusMessage.textContent = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
                statusMessage.style.color = 'red';
            }
        });
    }
}
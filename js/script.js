document.addEventListener('DOMContentLoaded', () => {
    /*=============================================
       Mobile Navigation Toggle
    =============================================*/
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /*=============================================
       Navbar Background on Scroll
    =============================================*/
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /*=============================================
       Active Link Updating on Scroll
    =============================================*/
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    /*=============================================
       Scroll Reveal Animation using IntersectionObserver
    =============================================*/
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once active
                // observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    /*=============================================
       Form Submission via Formsubmit.co
    =============================================*/
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            // Show loading state
            btn.innerHTML = 'Envoi en cours... <i class="fa-solid fa-circle-notch fa-spin"></i>';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            // Form data
            const formData = new FormData(contactForm);

            // Fetch to formsubmit
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        btn.innerHTML = 'Message Envoyé <i class="fa-solid fa-check"></i>';
                        btn.style.background = '#00f0ff';
                        btn.style.color = '#050a15';
                        btn.style.opacity = '1';

                        contactForm.reset();

                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.style.background = '';
                            btn.style.color = '';
                            btn.disabled = false;
                        }, 4000);
                    } else {
                        throw new Error('Erreur de requête');
                    }
                })
                .catch(error => {
                    btn.innerHTML = 'Erreur <i class="fa-solid fa-triangle-exclamation"></i>';
                    btn.style.background = '#ff3a3a';
                    btn.style.color = '#fff';
                    btn.style.opacity = '1';

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.style.color = '';
                        btn.disabled = false;
                    }, 4000);
                    console.error('Submission Form Error:', error);
                });
        });
    }
});

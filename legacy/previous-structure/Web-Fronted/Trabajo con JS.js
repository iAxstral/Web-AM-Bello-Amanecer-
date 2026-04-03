document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------
    // Funcionalidad del Menú Mobile
    // ----------------------------
    const menuHamburguesa = document.querySelector('.menu-hamburguesa');
    const menuLateral = document.querySelector('.menu-lateral');
    const oscurecer = document.getElementById('oscurecer');
    const cerrarMenu = document.querySelector('.cerrar-menu');
    const body = document.body;

    const toggleMenu = (abrir) => {
        const acciones = abrir ? 'add' : 'remove';
        
        menuLateral.classList[acciones]('mostrar');
        menuHamburguesa.classList[acciones]('activo');
        oscurecer.classList[acciones]('mostrar');
        body.classList[acciones]('body-menu-abierto');
    };

    if (menuHamburguesa) {
        menuHamburguesa.addEventListener('click', () => toggleMenu(true));
    }
    if (cerrarMenu) {
        cerrarMenu.addEventListener('click', () => toggleMenu(false));
    }
    if (oscurecer) {
        oscurecer.addEventListener('click', () => toggleMenu(false));
    }

    document.querySelectorAll('.menu-lateral a').forEach(enlace => {
        enlace.addEventListener('click', () => toggleMenu(false));
    });

    // ----------------------------
    // Selector de Sedes y Mapas
    // ----------------------------
    const sedeSelector = document.getElementById("sedeSelector");
    const sedeInfo = document.getElementById("sedeInfo");
    const sedeMapa = document.getElementById("sedeMapa");

    const sedes = {
        cedritos: {
            nombre: "Sede Cedritos",
            direccion: "Calle 140 # 12-45, Bogotá",
            telefono: "3204941858",
            mapaSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15873.344440000002!2d-74.0326168!3d4.72914855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e388d01d0a5b827%3A0xcb13e9a4e9b72b9a!2sCl.%20140%20%2312-45%2C%20Bogot%C3%A1!5e0!3m2!1ses-419!2sco!4v1717524942994!5m2!1ses-419!2sco"
        },
        normandia1: {
            nombre: "Sede Normandía 1",
            direccion: "Carrera 70 # 50-20, Bogotá",
            telefono: "3143583504",
            mapaSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6212557551066!2d-74.09590802528701!3d4.654030642103554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b23b12f602b%3A0xf5c3b9b4f0b2a9d!2sCra.%2070%20%2350-20%2C%20Bogot%C3%A1!5e0!3m2!1ses-419!2sco!4v1717524968779!5m2!1ses-419!2sco"
        },
        normandia2: {
            nombre: "Sede Normandía 2",
            direccion: "Calle 53 # 72-80, Bogotá",
            telefono: "3143583504",
            mapaSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.637812239459!2d-74.09062322528701!3d4.652155042167664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b233a010d8b%3A0x6b100e12d5e7e1e!2sCl.%2053%20%2372-80%2C%20Bogot%C3%A1!5e0!3m2!1ses-419!2sco!4v1717524996919!5m2!1ses-419!2sco"
        }
    };

    const actualizarSede = () => {
        const selectedSede = sedeSelector.value;
        if (selectedSede === "default") {
            sedeInfo.innerHTML = "<p>Por favor, selecciona una sede para ver sus detalles de contacto y ubicación.</p>";
            if (sedeMapa) sedeMapa.src = "";
            if (sedeMapa) sedeMapa.style.display = "none";
        } else {
            const sede = sedes[selectedSede];
            sedeInfo.innerHTML = `
                <h3>${sede.nombre}</h3>
                <p><strong>Dirección:</strong> ${sede.direccion}</p>
                <p><strong>Teléfono de la Sede:</strong> ${sede.telefono}</p>
            `;
            if (sedeMapa) sedeMapa.src = sede.mapaSrc;
            if (sedeMapa) sedeMapa.style.display = "block";
        }
    };

    if (sedeSelector) {
        sedeSelector.addEventListener("change", actualizarSede);
        actualizarSede();
    }

    // ----------------------------
    // Scroll suave para los enlaces del menú principal
    // ----------------------------
    document.querySelectorAll('.main-nav a, .menu-lateral a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('http') || targetId.endsWith('.html') || targetId.startsWith('#') === false) {
                return;
            }

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = 80; 
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ----------------------------
    // Filtros de Testimonios
    // ----------------------------
    const inicializarFiltrosTestimonios = () => {
        const filtros = document.querySelectorAll(".filtro-btn");
        const testimonios = document.querySelectorAll(".testimonio-card");

        if (!filtros.length || !testimonios.length) return;

        filtros.forEach(filtro => {
            filtro.addEventListener('click', () => {
                filtros.forEach(f => f.classList.remove("activo"));
                filtro.classList.add("activo");

                const categoria = filtro.dataset.categoria;
                testimonios.forEach(testimonio => {
                    if (categoria === "todos" || testimonio.dataset.categoria === categoria) {
                        testimonio.style.display = "block";
                        testimonio.style.animation = 'none';
                        testimonio.offsetHeight;
                        testimonio.style.animation = 'fadeIn 0.6s ease forwards';
                    } else {
                        testimonio.style.display = "none";
                    }
                });
            });
        });
    };

    inicializarFiltrosTestimonios();

    // ------------------------------------
    // --- CÓDIGO DEL FORMULARIO DE CONTACTO ---
    // ------------------------------------
    const contactForm = document.querySelector('.contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                mensaje: document.getElementById('mensaje').value
            };
            
            formMessage.textContent = 'Enviando mensaje...';
            formMessage.style.color = 'gray';

            try {
                const response = await fetch('http://localhost:8080/api/contact/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    formMessage.textContent = result.message;
                    formMessage.style.color = 'green';
                    contactForm.reset();
                } else {
                    throw new Error(result.message);
                }

            } catch (error) {
                console.error('Error:', error);
                formMessage.textContent = error.message || 'No se pudo enviar el mensaje. Intenta de nuevo más tarde.';
                formMessage.style.color = 'red';
            }
        });
    }
});
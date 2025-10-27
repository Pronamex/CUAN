// Función para obtener parámetros de la URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        carrera: params.get('carrera'),
        tipo: params.get('tipo') || 'sep' // Por defecto SEP
    };
}

// Función principal para cargar datos
async function loadCarreraData() {
    const { carrera, tipo } = getQueryParams();
    
    if (!carrera) {
        console.error('No se especificó carrera en los parámetros URL');
        return;
    }

    try {
        // Cargar el JSON
        const response = await fetch('/config.json');
        const data = await response.json();

        // Obtener datos de contacto
        const contacto = data.Contacto[0];
        
        // Seleccionar la sección correcta del JSON
        const seccion = tipo === 'uaem' ? data['Carreras UAEM'] : data['Carreras SEP'];
        const carreraData = seccion[carrera];

        if (!carreraData) {
            console.error(`Carrera ${carrera} no encontrada`);
            return;
        }

        const info = carreraData[0];
        
        // Actualizar datos básicos
        document.title = `${info.nombreCarrera} - CUAN`;
        document.querySelector('.hero h2').textContent = info.nombreCarrera;
        document.querySelector('.hero p').textContent = info.tagline;
        document.querySelector('.description-text h3').textContent = info.subTitulo;
        document.querySelector('.description-text p').innerHTML = info.descripcionCarrera;

        // Actualizar duración
        if (info.duracion) {
            document.querySelector('.carrera-duracion').innerHTML = info.duracion;
        }

        // Actualizar imagen
        if (info.imagen) {
            const imgElement = document.querySelector('.description-image img');
            imgElement.src = info.imagen;
            imgElement.alt = info.nombreCarrera;
        }

        // Actualizar botón de video
        if (info.videoYoutube) {
            const videoBtn = document.querySelector('.video-btn');
            videoBtn.href = info.videoYoutube;
            videoBtn.target = "_blank";
            videoBtn.innerHTML = `Ver video de ${info.nombreCarrera}`;
        }

        // Actualizar validez oficial
        const validezElement = document.querySelector('.carrera-validez');
        if (tipo === 'uaem') {
            validezElement.textContent = contacto.incorporacionUAEM;
        } else {
            validezElement.textContent = info.claveCarrera || '';
        }

        // Cargar plan de estudios
        loadPlanEstudios(info.planEstudios);

        // Actualizar información de contacto
        updateContactInfo(contacto);

    } catch (error) {
        console.error('Error cargando datos:', error);
    }
}

// Función para cargar el plan de estudios
function loadPlanEstudios(planEstudios) {
    const container = document.querySelector('.semesters-container');
    container.innerHTML = '';

    Object.entries(planEstudios).forEach(([semestre, materias], index) => {
        const semesterDiv = document.createElement('div');
        semesterDiv.className = 'semester';
        
        const materiasArray = Object.values(materias);
        const subjectsGrid = materiasArray.map(materia => 
            `<div class="subject"><h4>${materia}</h4></div>`
        ).join('');

        semesterDiv.innerHTML = `
            <div class="semester-header">
                <h3>${semestre}</h3>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="semester-content">
                <div class="subjects-grid">${subjectsGrid}</div>
            </div>
        `;

        container.appendChild(semesterDiv);
    });

    // Reactivar acordeones
    attachAccordionEvents();
}

// Función para actualizar información de contacto
function updateContactInfo(contacto) {
    // Actualizar sección de contacto
    document.querySelector('.contacto-direccion').textContent = contacto.direccion;
    document.querySelector('.contacto-telefono').textContent = contacto.contactoNum;
    document.querySelector('.contacto-email').textContent = contacto.email;
    document.querySelector('.contacto-horarios').innerHTML = contacto.horarios || "Lunes a Viernes: 8:00 - 20:00<br>Sábados: 9:00 - 14:00";
}

// Reactivar funcionalidad de acordeones
function attachAccordionEvents() {
    const semesterHeaders = document.querySelectorAll('.semester-header');
    semesterHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const semester = header.parentElement;
            semester.classList.toggle('active');
        });
    });
}

// Ejecutar cuando se cargue la página
document.addEventListener('DOMContentLoaded', loadCarreraData);
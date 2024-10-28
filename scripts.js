document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;

    const showPage = (index) => {
        pages.forEach((page, idx) => {
            page.classList.toggle('active', idx === index);
        });
    };

    showPage(currentPage);

    const nextBtns = document.querySelectorAll('.next');
    const prevBtns = document.querySelectorAll('.prev');

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentPage < pages.length - 1) {
                currentPage++;
                showPage(currentPage);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                showPage(currentPage);
            }
        });
    });

    const familiaresContainer = document.getElementById('familiaresContainer');
    const addFamiliarBtn = document.getElementById('addFamiliar');
    let familiarCount = 0;

    addFamiliarBtn.addEventListener('click', () => {
        familiarCount++;
        const familiarDiv = document.createElement('div');
        familiarDiv.classList.add('familiar');
        familiarDiv.innerHTML = `
            <label>Familiar ${familiarCount}:</label>
            <input type="text" placeholder="Nombre" required>
            <input type="text" placeholder="Parentesco" required>
            <input type="number" placeholder="Edad" required>
        `;
        familiaresContainer.appendChild(familiarDiv);
    });

    const form = document.getElementById('multiStepForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const datosPersonales = {
            nombre: document.getElementById('nombre').value,
            cedula: document.getElementById('cedula').value,
            telefono: document.getElementById('telefono').value
        };

        const familiares = [...document.querySelectorAll('.familiar')].map(familiar => ({
            nombre: familiar.querySelector('input[type="text"]').value,
            parentesco: familiar.querySelector('input[type="text"]:nth-child(2)').value,
            edad: familiar.querySelector('input[type="number"]').value
        }));

        const condiciones = {
            enfermedad: document.getElementById('enfermedad').value,
            tiempo: document.getElementById('tiempo').value
        };

        const internamientos = {
            fecha: document.getElementById('fecha').value,
            centro: document.getElementById('centro').value,
            diagnostico: document.getElementById('diagnostico').value
        };

        const resumen = {
            datosPersonales,
            familiares,
            condiciones,
            internamientos
        };

        // Guardar en localStorage
        localStorage.setItem('formData', JSON.stringify(resumen));
        mostrarResumen(resumen);
        currentPage++;
        showPage(currentPage);
    });

    const mostrarResumen = (data) => {
        const resumenDiv = document.getElementById('resumen');
        resumenDiv.innerHTML = `
            <h3>Datos Personales:</h3>
            <p>Nombre: ${data.datosPersonales.nombre}</p>
            <p>Cédula: ${data.datosPersonales.cedula}</p>
            <p>Teléfono: ${data.datosPersonales.telefono}</p>
            
            <h3>Familiares:</h3>
            ${data.familiares.map(fam => `<p>${fam.nombre} / ${fam.parentesco} / ${fam.edad} años</p>`).join('')}
            
            <h3>Condiciones Pre-Existentes:</h3>
            <p>Enfermedad: ${data.condiciones.enfermedad}</p>
            <p>Tiempo con la enfermedad: ${data.condiciones.tiempo} años</p>
            
            <h3>Internamientos:</h3>
            <p>Fecha: ${data.internamientos.fecha}</p>
            <p>Centro Médico: ${data.internamientos.centro}</p>
            <p>Diagnóstico: ${data.internamientos.diagnostico}</p>
        `;
    };

    const verRegistrosBtn = document.getElementById('verRegistros');
    const registrosAnterioresDiv = document.getElementById('registrosAnteriores');

    verRegistrosBtn.addEventListener('click', () => {
        registrosAnterioresDiv.innerHTML = "<h2>Registros Anteriores</h2>";

        const registro = localStorage.getItem('formData');
        if (registro) {
            const data = JSON.parse(registro);
            registrosAnterioresDiv.innerHTML += `
                <h3>Datos Personales:</h3>
                <p>Nombre: ${data.datosPersonales.nombre}</p>
                <p>Cédula: ${data.datosPersonales.cedula}</p>
                <p>Teléfono: ${data.datosPersonales.telefono}</p>

                <h3>Familiares:</h3>
                ${data.familiares.map(fam => `<p>${fam.nombre} / ${fam.parentesco} / ${fam.edad} años</p>`).join('')}

                <h3>Condiciones Pre-Existentes:</h3>
                <p>Enfermedad: ${data.condiciones.enfermedad}</p>
                <p>Tiempo con la enfermedad: ${data.condiciones.tiempo} años</p>

                <h3>Internamientos:</h3>
                <p>Fecha: ${data.internamientos.fecha}</p>
                <p>Centro Médico: ${data.internamientos.centro}</p>
                <p>Diagnóstico: ${data.internamientos.diagnostico}</p>
            `;
        } else {
            registrosAnterioresDiv.innerHTML += "<p>No hay registros anteriores.</p>";
        }

        registrosAnterioresDiv.classList.add('active');
    });
});

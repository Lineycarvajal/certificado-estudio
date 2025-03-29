document.addEventListener('DOMContentLoaded', function() {
    // Establecer fechas por defecto
    const hoy = new Date();
    document.getElementById('inicio').valueAsDate = hoy;
    
    const fin = new Date();
    fin.setMonth(hoy.getMonth() + 4); // 4 meses después
    document.getElementById('fin').valueAsDate = fin;
    
    // Manejar el botón de generación
    document.getElementById('generarBtn').addEventListener('click', generarCertificado);
});

function generarCertificado() {
    // Validar formulario
    const form = document.getElementById('certificadoForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const documento = document.getElementById('documento').value;
    const programa = document.getElementById('programa').value;
    const modulo = document.getElementById('modulo').value;
    const horas = document.getElementById('horas').value;
    const totalHoras = document.getElementById('totalHoras').value;
    const periodo = document.getElementById('periodo').value;
    const inicio = new Date(document.getElementById('inicio').value);
    const fin = new Date(document.getElementById('fin').value);
    
    // Formatear fechas
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const inicioFormateada = inicio.toLocaleDateString('es-CO', options);
    const finFormateada = fin.toLocaleDateString('es-CO', options);
    const hoyFormateada = new Date().toLocaleDateString('es-CO', options);
    
    // Generar HTML del certificado
    const certificadoHTML = `
        <div class="certificado" id="certificadoContent">
            <div class="certificado-header">
                <h2>REGISTRO Y CONTROL CESDE</h2>
                <p>LICENCIA DE FUNCIONAMIENTO DE LA SECRETARÍA DE EDUCACIÓN</p>
                <p>DEL MUNICIPIO DE LA PINTADA 2020060127237 DE 2020-12-02</p>
                <p>RESOLUCIÓN OFICIAL DEL PROGRAMA 2021060010827 DE 2021-05-20</p>
                <p>NIT. 890.913.319-1</p>
            </div>
            
            <div style="text-align: right; margin-bottom: 20px;">
                <p>La Pintada, ${hoyFormateada}</p>
            </div>
            
            <div class="certificado-body">
                <p style="text-align: center; font-weight: bold; margin-bottom: 30px;">LA JEFE DE REGISTRO Y CONTROL<br>CERTIFICA:</p>
                
                <p style="text-align: justify; margin-bottom: 20px; text-indent: 40px;">
                    Que ${nombre.toUpperCase()}, identificado con documento número ${documento}, 
                    para el período ${periodo} se encuentra cursando el ${modulo} módulos académicos, 
                    correspondientes al programa ${programa}, con una intensidad del período de 
                    ${horas} horas teórico-prácticas para un total del programa de ${totalHoras} horas.
                </p>
                
                <p style="text-align: justify; margin-bottom: 20px; text-indent: 40px;">
                    La fecha de inicio para el semestre ${periodo} pactada por la Institución es para el 
                    ${inicioFormateada} y la fecha de finalización del semestre es para el ${finFormateada}.
                </p>
                
                <p style="text-align: justify; margin-bottom: 20px; text-indent: 40px;">
                    De acuerdo con la Ley 115 de 1994 y el Decreto 1075 de 2015, CESDE es una Institución 
                    de Educación para el Trabajo y el Desarrollo Humano.
                </p>
                
                <p style="text-align: justify; margin-bottom: 20px;">
                    Este certificado se expide por Solicitud del Interesado.
                </p>
            </div>
            
            <div class="certificado-footer">
                <div style="text-align: center; margin-top: 80px;">
                    <div class="firma">
                        <p>SANDRA MILENA BÉTANCUR DEOSSA</p>
                        <div class="firma-line"></div>
                        <p>Jefe de Registro y Control</p>
                        <p>C.C. 1.128.385.408</p>
                    </div>
                </div>
                
                <div style="margin-top: 30px; text-align: center; font-size: 14px;">
                    <p>Luisa D. (604) 480 88 22 ext. 2301</p>
                    <p>Cesde.edu.co</p>
                    <p>Kilómetro 2 vía Puente Iglesias</p>
                    <p>Colombia - Antioquia – La Pintada</p>
                </div>
            </div>
        </div>
    `;
    
    // Mostrar vista previa
    const preview = document.getElementById('certificadoPreview');
    preview.innerHTML = certificadoHTML;
    preview.style.display = 'block';
    
    // Generar PDF
    generarPDF();
}

function generarPDF() {
    const { jsPDF } = window.jspdf;
    const element = document.getElementById('certificadoContent');
    
    html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('certificado_estudiantil.pdf');
    });
}
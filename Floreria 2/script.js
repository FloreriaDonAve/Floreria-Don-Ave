document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario-pedido');
    const radioTransferencia = document.getElementById('transferencia');
    const radioEfectivo = document.getElementById('efectivo');
    const infoTransferenciaDiv = document.getElementById('info-transferencia');
    const fechaEntregaInput = document.getElementById('fecha_entrega');

    // 1. LÓGICA para mostrar/ocultar la información de transferencia
    function toggleTransferInfo() {
        if (radioTransferencia && radioTransferencia.checked) {
            infoTransferenciaDiv.style.display = 'block'; 
        } else {
            infoTransferenciaDiv.style.display = 'none';
        }
    }

    if (radioTransferencia && radioEfectivo) {
        radioTransferencia.addEventListener('change', toggleTransferInfo);
        radioEfectivo.addEventListener('change', toggleTransferInfo);
        // Inicializa el estado al cargar
        toggleTransferInfo();
    }

    // 2. LÓGICA de Validación del Formulario (Incluye verificación de 7 días)
    if (form) {
        form.addEventListener('submit', function(event) {
            
            // --- Validación de la fecha de anticipación (7 días) ---
            const fechaDeseadaStr = fechaEntregaInput.value;
            if (!fechaDeseadaStr) {
                alert("Por favor, selecciona una fecha de entrega.");
                event.preventDefault(); 
                return;
            }

            const fechaDeseada = new Date(fechaDeseadaStr);
            const hoy = new Date();
            // Calcula la fecha mínima de pedido (hoy + 7 días)
            // Se normaliza la hora para evitar problemas de zona horaria en la comparación
            const fechaMinima = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 7);
            
            // Si la fecha deseada es menor que la fecha mínima, no se puede hacer el pedido
            if (fechaDeseada < fechaMinima) {
                alert(⚠ Atención: El pedido debe hacerse con al menos 7 días de anticipación. Por favor, selecciona una fecha a partir de ${fechaMinima.toLocaleDateString('es-MX')}.);
                event.preventDefault(); // Detiene el envío del formulario
                fechaEntregaInput.focus();
                return;
            }
            // --------------------------------------------------------

            // Validación de forma de pago
            const pago = document.querySelector('input[name="forma_pago"]:checked');
            if (!pago) {
                alert("Por favor, selecciona una forma de pago inicial (50%).");
                event.preventDefault(); 
                return;
            }

            // Si todas las validaciones son exitosas, se puede enviar (o mostrar el mensaje final)
            // Se detiene el envío real a PHP/XAMPP para mostrar el mensaje de confirmación
            event.preventDefault(); 
            
            alert(`
                ✅ ¡Pedido Registrado, ${document.getElementById('nombre').value}!
                
                Tu solicitud ha sido enviada.
                
                Te enviaremos la cotización detallada a tu WhatsApp (${document.getElementById('telefono').value}) dentro de una hora. 
                
                Recuerda que el anticipo (50%) debe ser por ${pago.value}.
            `);

            // Para que la conexión con XAMPP funcione, DEBERÍAS descomentar la línea de abajo y comentar la línea 'event.preventDefault();'
            // form.submit();
        });
    }
});
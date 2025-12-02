const display = document.getElementById('resultado');
const botonesContainer = document.querySelector('.botones');

// Obtener el elemento del display y asegurarse de que no esté vacío
if (!display) {
    console.error('Elemento #resultado no encontrado en el DOM');
} else if (display.value === '') {
    display.value = '0';
}

// Delegación de eventos en el contenedor `.botones` usando un handler nombrado
if (botonesContainer) {
    botonesContainer.addEventListener('click', handleBotonesClick);
}

function handleBotonesClick(e) {
    const btn = e.target.closest('button');
    if (!btn || !botonesContainer.contains(btn)) return;
    const valor = btn.dataset.valor || btn.textContent.trim();
    manejarClick(valor);
}

function manejarClick(valor) {
    // Si el display muestra "Error", reiniciar
    if (display.value === 'Error') {
        display.value = '0';
        return;
    }

    switch (valor) {
        case 'C':
            limpiar();
            break;
        case '←':
            borrarUltimo();
            break;
        case '=':
            calcular();
            break;
        case '%':
            calcularPorcentaje();
            break;
        default:
            agregarCaracter(valor);
    }
}

function agregarCaracter(caracter) {
    // Si el display muestra solo "0" y se ingresa un número, reemplazar el cero
    if (display.value === '0' && caracter !== '.' && !isNaN(caracter)) {
        display.value = caracter;
        return;
    }

    // Si el display muestra solo "0" y se ingresa un punto, agregar "0."
    if (display.value === '0' && caracter === '.') {
        display.value = '0.';
        return;
    }

    // No permitir operadores como primer carácter
    if (display.value === '0' && ['+', '-', 'x', '÷'].includes(caracter)) {
        alert('El formato usado no es válido!');
        return;
    }

    // No permitir más de un punto decimal en el número actual
    // obtener el último operador en la cadena
    const operadores = ['+', '-', '÷'];
    let indice = -1;

    operadores.forEach(op => {
        let pos = display.value.lastIndexOf(op);
        if (pos > indice) indice = pos;
    });

    // obtener el último número escrito
    const ultimoNumero = display.value.slice(indice + 1);

    // evitar que se ponga más de un punto decimal
    if (caracter === '.' && ultimoNumero.includes('.')) {
        return;
    }

    display.value += caracter;
}

function limpiar() {
    display.value = '0';
}

function borrarUltimo() {
    if (display.value.length === 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calcularPorcentaje() {
    try {
        const valor = parseFloat(display.value);
        if (!isNaN(valor)) {
            display.value = (valor / 100).toString();
        }
    } catch (error) {
        display.value = 'Error';
    }
}

function calcular() {
    try {

        let multi = resultado.value.replace(/x/g, "*");


        // Prevenir división por cero

        if (multi.includes("/0")) {
            throw new Error("division zero");
        }

        let resultado = eval(multi);

        if (isNaN(resultado) || resultado === Infinity) {
            throw new Error("invalido");
        }

        display.value = resultado;

        // Después de unos segundos, volver a 0
        setTimeout(function () {
            display.value = "0";
        }, 2000);

    } catch (error) {
        display.value = "Error";
    }
}
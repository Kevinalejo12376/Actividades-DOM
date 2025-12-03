

const display = document.getElementById('resultado');

if (display.value === '') {
    display.value = '0';
}

function manejarClick(valor) {
    // Si el display muestra "Error", reiniciar
    if (display.value === 'Error') {
        display.value = '0';
        return;
    }

    // Decidir qué hacer según el valor del botón clickeado
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
    const operadores = ['+', '-', 'x', '÷'];

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
    if (display.value === '0' && operadores.includes(caracter)) {
        alert('El formato usado no es válido!');
        return;
    }

    // No permitir más de un punto decimal en el número actual
    // Obtener el último operador en la cadena
    let indice = -1;

    operadores.forEach(op => {
        let pos = display.value.lastIndexOf(op);
        if (pos > indice) indice = pos;
    });

    // Obtener el último número escrito
    const ultimoNumero = display.value.slice(indice + 1);

    // Evitar que se ponga más de un punto decimal
    if (caracter === '.' && ultimoNumero.includes('.')) {
        return;
    }

    // Agregar el carácter al display
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
        // Reemplazar TODAS las 'x' con '*' y TODAS las '÷' con '/' para que eval() funcione
        // La /g significa "global" = reemplazar todas las ocurrencias, no solo la primera
        let expresion = display.value.replace(/x/g, '*').replace(/÷/g, '/');

        // Prevenir división por cero
        if (expresion.includes("/0")) {
            throw new Error("division zero");
        }

        let resultado = eval(expresion);

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
const display = document.getElementById('resultado');
const botonesContainer = document.querySelector('.botones');

// Control de paréntesis
let parenAbierto = false;


// Obtener el elemento del display y asegurarse de que no esté vacío
if (display.value === '') {
    display.value = '0';
}

// Escuchar clicks en todos los botones de la calculadora
if (botonesContainer) {
    botonesContainer.addEventListener('click', handleBotonesClick);
}

function handleBotonesClick(evento) {
    // Obtener el botón que fue clickeado
    const botonClickeado = evento.target;

    // Verificar que realmente sea un botón
    if (botonClickeado.tagName !== 'BUTTON') return;

    // Obtener el valor del botón (puede ser un número, operador, etc.)
    let valor = botonClickeado.textContent.trim();

    // Llamar a la función que maneja ese valor
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
        case '()':
            manejarParentesis();
            break;
        case '√':
            calcularRaiz();
            break;
        case 'x^y':
            agregarCaracter('^');
            break;
        case 'x^2':
            agregarCaracter('^2');
            break;
        case 'n√':
            agregarCaracter('√');
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
    // obtener el último operador en la cadena
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
    parenAbierto = false;
}

function calcularPorcentaje() {
    try {
        const valor = parseFloat(display.value);
        if (!isNaN(valor)) {
            display.value = (valor / 100).toString();
        }
        setTimeout(() => {
            display.value = "0";
        }, 2000);

    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = "0";
        }, 2000);

    }
}

function borrarUltimo() {
    if (display.value.length === 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calcular() {
    try {

        let expr = display.value;

        if (expr.includes("√")) {

            let partes = expr.split("√");

            // parte A (lo que está antes de √)
            let a = partes[0];

            if (a === "") {
                a = 1;   
            } else {
                a = Number(a);
            }

            // parte B (lo que está después de √)
            let b = Number(partes[1]);

            if (isNaN(a) || isNaN(b)) {
                throw new Error("Formato inválido");
            }
            let resultado = a * Math.sqrt(b);

            display.value = resultado;

            setTimeout(() => {
                display.value = "0";
            }, 2000);

            return;
        }

        let expresion = display.value
            .replace(/x/g, '*')
            .replace(/÷/g, '/')
            .replace(/\^/g, '**');

        // Prevenir división por cero
        if (expresion.includes("/0")) {
            throw new Error("division zero");
        }

        let resultado = eval(expresion);

        if (isNaN(resultado) || resultado === Infinity) {
            throw new Error("invalido");
        }

        // Mostrar el resultado
        display.value = resultado;

        // Volver a 0 después de 2 segundos
        setTimeout(() => {
            display.value = "0";
        }, 2000);

    } catch (error) {
        display.value = "Error";
        setTimeout(() => {
            display.value = "0";
        }, 2000);

    }
}

function calcularRaiz() {
    try {
        const valor = parseFloat(display.value);
        if (!isNaN(valor) && valor >= 0) {
            display.value = Math.sqrt(valor);
        } else if (isNaN(valor)) {
            alert('Ingresa un número válido');
        } else {
            alert('No puedes calcular raíz de números negativos');
        }

        setTimeout(() => {
            display.value = "0";
        }, 2000);

    } catch (error) {
        display.value = 'Error';   
    }
}

function manejarParentesis() {
    // Si el display está en 0, abrir paréntesis
    if (display.value === '0') {
        display.value = '(';
        parenAbierto = true;
        return;
    }

    // Si ya hay paréntesis abierto, cerrar
    if (parenAbierto) {
        display.value += ')';
        parenAbierto = false;
        return;
    }

    // Abrir paréntesis: verificar qué hay antes
    const ultimo = display.value.slice(-1);
    const operadores = ['+', '-', 'x', '÷'];

    // Si el último carácter es un operador o '.', abrir directamente
    if (operadores.includes(ultimo)) {
        display.value += '(';
    } else {
        // Si es un número o ')', insertar '*' antes de abrir
        display.value += '*(';
    }

    parenAbierto = true;
}
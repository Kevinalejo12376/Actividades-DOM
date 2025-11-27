// Obtener cada botón por su ID
const btnLeon = document.getElementById("Leon");
const btnConejos = document.getElementById("Conejos");
const btnPandas = document.getElementById("pandas");
const btnFlamencos = document.getElementById("flamencos");

// Función que cambia el fondo de la página
function cambiarFondo(rutaImagen) {
    document.body.style.background = `url(${rutaImagen})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}

// Eventos para cada botón
btnLeon.addEventListener("click", () => {
    cambiarFondo("https://i.pinimg.com/736x/49/39/f5/4939f5cfab0969d169a435cb9213281a.jpg");
});

btnConejos.addEventListener("click", () => {
    cambiarFondo("https://i.pinimg.com/736x/51/c1/99/51c1991357753db356745ef4995d19db.jpg");
});

btnPandas.addEventListener("click", () => {
    cambiarFondo("https://i.pinimg.com/1200x/cc/62/d4/cc62d46dd46c565dd9e8eb61c549e7e0.jpg");
});

btnFlamencos.addEventListener("click", () => {
    cambiarFondo("https://i.pinimg.com/736x/98/00/ab/9800ab835fd42b79945e2c571f6c37fb.jpg");
});

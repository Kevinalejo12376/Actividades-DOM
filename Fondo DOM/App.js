const Guitarra = document.getElementById('guitarra');
const Piano = document.getElementById('piano');
const GuitarraElectrica = document.getElementById('guitarra-electrica');
const Bateria = document.getElementById('bateria');

// AQUÍ pones el fondo que tiene tu página al empezar
const fondoInicial = "url(https://wallpapers.com/images/hd/musical-1600-x-1200-background-fr6zqzd9qvlqbrxn.jpg) no-repeat center center/cover";

function cambiarFondo() {
    const texto = this.innerText.trim();

    if (texto === "Guitarra") {
        document.body.style.background = "url(https://chachiguitar.com/wp-content/uploads/2013/11/Acoustic-Guitar-Wall-Panorama-01.jpg) no-repeat center center/cover";
    } else if (texto === "Piano") {
        document.body.style.background = "url(https://cdn.thewirecutter.com/wp-content/media/2025/05/BEST-BEGINNER-DIGITAL-PIANOS-2048px-9855.jpg?auto=webp&quality=75&width=1024) no-repeat center center/cover";
    } else if (texto === "Guitarra Electrica") {
        document.body.style.background = "url(https://solokingguitar-la.com/cdn/shop/articles/guitars_fa754ad1-475f-4620-9acd-ce96fd039f01.jpg?v=1752603964&width=1080) no-repeat center center/cover";
    } else if (texto === "Bateria") {
        document.body.style.background = "url(https://i.pinimg.com/originals/1c/2f/f3/1c2ff3a2e0d6e452dc0f97d51d7d200d.jpg) no-repeat center center/cover";
    }
}

function fondoPorDefecto() {
    document.body.style.background = fondoInicial;
}

Guitarra.addEventListener("mouseenter", cambiarFondo);
Guitarra.addEventListener("mouseleave", fondoPorDefecto);

Piano.addEventListener("mouseenter", cambiarFondo);
Piano.addEventListener("mouseleave", fondoPorDefecto);

GuitarraElectrica.addEventListener("mouseenter", cambiarFondo);
GuitarraElectrica.addEventListener("mouseleave", fondoPorDefecto);

Bateria.addEventListener("mouseenter", cambiarFondo);
Bateria.addEventListener("mouseleave", fondoPorDefecto);

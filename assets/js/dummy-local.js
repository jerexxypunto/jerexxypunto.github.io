const img_placeholder = "https://picsum.photos/300/200";

// Rcopila todas las imagenes del DOM
const img = document.querySelectorAll("img");

// Valida si la carga de las imagenes es correcta
// Si no es correcta, se reemplaza por una imagen de placeholder
img.forEach((element, i ) => {
    const rand_id = i + 1;
    element.onerror = () => {
        element.src = img_placeholder + `?random=${rand_id}`;
    };
});
// Esta variable inicia una instancia del objeto Muuri
const grid = new Muuri('.galeria__grid', {
    layout: {
        rounding: true
    }
});
// Esta variable contiene el botón de cierre del modal
const modal_close = document.querySelector("#modal .modal-cabezera p");

// Esta variable contiene la etiqueta <img> dentro del modal
const modal_img = document.querySelector("#modal .modal-img picture img");

// Esta variable contiene un array con las flechas del slider en el modal
const arrows = document.querySelectorAll("#modal .modal-img picture span");

// Esta variable contiene un array con todos los items de la galeria Muuri
const items = document.querySelectorAll(".galeria__grid .item");

const desc_modal = document.querySelector("#modal .modal-des p");

// En este array estaran contenidas solo las imagenes que se muestran
let img_shows = [];

// Inicializo la variable src_modal
let src_modal;

// Inicializo array src_modal_array
let src_modal_array = [];
// 
let src_modal_array_contenido = [];

let indice_modal;

// Inyecyo en un array todos los valores del atributo src en los elementos img de la galeria Muuri
for (let i = 0; i < items.length; i++) {
    src_modal_array.push(items[i].children[0].children[0].getAttribute("src"));
}
for (let i = 0; i < items.length; i++) {
    src_modal_array_contenido.push(items[i].getAttribute("data-description"));
}
arrows[0].addEventListener('click',()=>{
    indice_modal === 0 ? indice_modal = src_modal_array.length - 1 : indice_modal--;
    modal_img.setAttribute('src', src_modal_array[indice_modal]);
    desc_modal.innerText = src_modal_array_contenido[indice_modal];
    document.querySelector("#modal").style.display = "block";
    setTimeout(() => {
        document.querySelector("#modal").classList.add("aparecer");
    }, 300);
});
arrows[1].addEventListener('click',()=>{

    indice_modal === src_modal_array.length - 1 ? indice_modal = 0 : indice_modal++;
    modal_img.setAttribute('src', src_modal_array[indice_modal]);
    desc_modal.innerText = `${src_modal_array_contenido[indice_modal]}`;
    document.querySelector("#modal").style.display = "block";
    setTimeout(() => {
        document.querySelector("#modal").classList.add("aparecer");
    }, 100);
});

items.forEach((item, index) => {
    item.addEventListener('click',()=>{
        indice_modal = index;
        desc_modal.innerText = `${src_modal_array_contenido[indice_modal]}`;
        modal_img.setAttribute('src', src_modal_array[indice_modal]);
        document.querySelector("#modal").style.display = "block";
        setTimeout(() => {
            document.querySelector("#modal").classList.add("aparecer");
    }, 100);
    });
});

// cerrar modal
modal_close.addEventListener('click',()=>{
    document.querySelector("#modal").classList.remove("aparecer");
    setTimeout(() => {
        document.querySelector("#modal").style.display = "none";
    }, 100);
});

window.addEventListener('load', ()=>{
    grid.refreshItems().layout;
    document.querySelector(".galeria__grid").classList.add('imagenes-cargadas');

    // agregar listener para enlaces
    const enalces = document.querySelectorAll('#enlaces a');

    enalces.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            enalces.forEach((enlace)=> enlace.classList.remove('active'));
            event.target.classList.add('active');

            const categoria = event.target.innerText.toLowerCase();
            /* 
            -- condicional ternario --
            si se cumple muuri filtra los elementos html con el atributo [data-categoria],
            si no se cumple muuri solo filtrara los elementos con [data-categoria="la categoria pinchada"]
            */
            categoria === 'todo' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);

            setTimeout(() => {
                img_shows = [];
                items.forEach((Element, index) => {
                    if (Element.classList.contains("muuri-item-shown")) {
                        img_shows.push(items[index]);
                    }
                });
            }, 100);
        });
    });

    // Agrega listener para barra de busqueda
    document.querySelector("#barra-de-busqueda").addEventListener('input', (e)=>{
        const busqueda = e.target.value;
        grid.filter((item)=> item.getElement().dataset.etiquetas.includes(busqueda));
    });
});
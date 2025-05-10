import { loadHeader, getPageList } from './templates/header.js';
import { loadFooter } from './templates/footer.js';
import { ContratoGenerator } from './cotizacion/contrato.js';


/**
 * Obtiene el contenido de una sección
 * @param {*} content 
 * @returns 
 */
async function getSectionContent(content) {
    try {
        const req = await fetch(location.origin + '/content/sections/' + content);
        if (!req.ok) {
            throw new Error(`Error fetching content: ${req.status} ${req.statusText}`);
        }
        const res = await req.text();
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function sectionDynamicContent(){

	const nodes = Array.from(document.querySelectorAll('.section-dynamic-content'));
	nodes.forEach( node => {
		const pathContent = node.getAttribute('data-section-content');
		if( pathContent ){
			getSectionContent(pathContent)
			.then( markdownContent => {
				const htmlContent = marked.parse(markdownContent);
				node.innerHTML = htmlContent;
			})
			.catch( err => {
				console.error(err);
				node.innerHTML = `<p>Error al cargar el contenido: ${pathContent}</p>`;
			});
		}

	});
}

function cotizacionFormHanlder(){

	const $contratoForm = document.querySelector('#cotizacion-form');

    if( !$contratoForm ) return;

	if( !$cotizacionApp ) return;

    const $contratoFormTexarea = $contratoForm.querySelector('#cotizacion-form-texarea');

	$contratoForm.addEventListener('submit', (e) => {
		e.preventDefault();
		location.href = "/app/cotizar.html?msg="+$contratoFormTexarea.value;
	});

}

function contratoHanlder(){

	function handdlerInput( input, contratoHandler  ){
		
		const { value, name, parentElement } = input;

		const $msg = document.createElement('p');	

		try{
			switch (name) {
				case 'nombre':
					// Handle nombre input
					contratoHandler.setClienteNombre(value);
					break;
				case 'run':
					// Handle run input
					contratoHandler.setClienteRun(value);
					
					break;
				case 'empresa':
					// Handle empresa input
					contratoHandler.setClienteEmpresa(value);
					break;
				default:
					break;
			}
		} catch (error) {
			$msg.classList.add('error');
			$msg.innerHTML = error.message;
			parentElement.appendChild($msg);
			throw error;
		}
	}

	const $contrato = document.querySelector('#contrato-app form');
	if( !$contrato ) return;

	$contrato.addEventListener("submit", (e) => {
		e.preventDefault();

		const $clienteNombre = $contrato.querySelector("input#nombre");
		const $clienteRun = $contrato.querySelector("input#run");
		const $clienteEmpresa = $contrato.querySelector("input#empresa");

		const contratoHandler = new ContratoGenerator();

		handdlerInput( $clienteNombre, contratoHandler  );
		handdlerInput( $clienteRun, contratoHandler  );
		handdlerInput( $clienteEmpresa, contratoHandler  );

		$contrato.classList.add("disabled");

		const contrato = contratoHandler.generateContrato();

		setTimeout(() => {
			contratoHandler.addHtmltoDom( contrato, $contrato );
			$contrato.classList.remove("disabled");
		}, 1000);

	});

}

function url_params(){
	const parametros = new URLSearchParams(window.location.search);
	// Convierte a objeto plano (opcional)
	const datos = Object.fromEntries(parametros.entries());

	return datos;
}

function togglewWebsiteDesc(){
	const tagname = "website-type-spec";
	const label = document.querySelector(`label[for="${tagname}"]`);
	const texarea = document.querySelector(`#${tagname}`);

	const select = document.querySelector(".website-type-select");

	select.addEventListener("change", (e) => {
		const value = e.target.value;
		if( value === "Otro" ){
			label.classList.add("active");
			texarea.classList.add("active");
			texarea.removeAttribute("disabled");
		}else{
			label.classList.remove("active");
			texarea.classList.remove("active");
			texarea.setAttribute("disabled", "true");
		}
		
	} );

	
}

function cotizacionAppHanlder(){

	const $cotizacionApp = document.querySelector('#cotizacion-app form');
	if( !$cotizacionApp ) return;

	const { msg } = url_params();
	const $cotizacionAppTexarea = $cotizacionApp.querySelector('#cotizacion-form-texarea');
	$cotizacionAppTexarea.value = msg;

	togglewWebsiteDesc();

	$cotizacionApp.addEventListener("submit", (e) => {
		e.preventDefault();

		const formData = new FormData(e.target); // Captura los datos del formulario
		const datos = Object.fromEntries(formData.entries()); // Convierte a objeto plano
	  
		console.log(datos); // Muestra todos los campos y valores capturados
		
	});
}

// Load header and footer
loadHeader();
loadFooter();
sectionDynamicContent();
cotizacionFormHanlder();
contratoHanlder();
cotizacionAppHanlder();
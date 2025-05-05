export const contrato = [
"<h1>CONTRATO DE PRESTACIÓN DE SERVICIOS</h1>",

`<p>En la República de Chile a <dia> de <mes> de <año>, don Jeremías San Martín, RUN:
20.255.983-2 como Desarrollador y por otra parte como Cliente:<clienteNombre>, RUN:
<clienteRun> en representación de <clienteEmpresa> , han convenido lo
siguiente en el presente contrato de prestación de servicios: </p>`,

`<p> <b>PRIMERO: </b> Por medio del presente contrato el Desarrollador se obliga a prestar al Cliente los
servicios de Diseño y construcción de un sitio web.
EL Desarrollador se compromete a proporcionar un SERVICIO CORDIAL, ÓPTIMO, PROFESIONAL
Y ESTABLE, así como también a reponer en un plazo máximo de 48 horas cualquier falla
ocasionada por problemas técnicos de su responsabilidad.</p>`,

`
<h4>DESCRIPCIÓN DE CONCEPTOS</h4>
<ul>
    <li> <b>Hosting: </b> Servicio de terceros que consiste en el almacenamiento y distribucion de los ficheros del sitio web en cuestion. </li>
    <li> <b>Dominio: </b> Servicio de terceros que consiste en la renta de un nombre con la estructura "dominio.com" en dónde "dominio" es el nombre de dominio y ".com" corresponde a la extención del nombre de dominio. Cuando rentas un nombre de dominio, rentas la convinacion de un nombre de dominio + su extención "tudominio.com" </li>
    <li> <b>Indexación en Google: </b> Servicio prestado por el desarrollador que consiste en la carga del dominio del sistio web a la lista de indices de busqueda de google. </li>
    <li> <b>Correos corporativos: </b> Servicio de terceros que consiste en la renta de un correo electronico con la estructura 
</ul>`,

`<h4>DEFINICIÓN DEL SERVICIO</h4>
<ul>
    <li> Diseño de un sitio web autoadministrable segun la nececidades del proyecto. </li>
    <li> Construcción del sitio web autoadministrable del sitio web en base al diseño. </li>
    <li> Capacitación al cliente para el uso del sitio web autoadministrable. </li>
    <li> Soporte técnico por 30 días desde la entrega del sitio web. </li>
    <li> Indexación en Google. </li>
    <li> Correos corporativos. </li>
    <li> Hosting y dominio por 1 año. </li>
</ul>`,

`<h4>EXCLUSIONES DE SERVICIO</h4>
<p>El Desarrollador no se hará responsable ante cualquiera de los siguientes eventos fortuitos:</p>
<ul>
    <li>Terremotos y desastres naturales que impidan entregar el servicio.</li>
    <li>Corte de los enlaces nacionales que son provistos por compañías externas.</li>
    <li>Borrado de archivos del hosting del cliente por este o por la acción maliciosa de
    terceros.</li>
    <li>Borrado de archivos de correos del cliente por este o por la acción maliciosa de
    terceros.</li>
    <li>Cortes prolongados de energía eléctrica que deriven en sobrepasar la capacidad de
    respaldo del Desarrollador.</li>
</ul>`,

`<p>Desarrollador no será responsable por los contenidos en el sitio web del Cliente, en todo caso y
no obstante lo anterior el Cliente NO podrá solicitar publicar o mantener cualquier contenido
que sea, contrario a la moral como pornografía o cualquier actividad directa o indirectamente
relacionada a ella o actividades que de alguna forma incite al delito, que haga apología de la
violencia o venta de armas ilegales, que transgreda el Derecho de Autor y en general cualquier
acción contraria a las Leyes de la Republica de Chile.</p>`,

`<p> De lo contrario la cuenta y/o contrato será eliminado de nuestra base de datos
instantáneamente sin previo aviso y reportada a las autoridades de Policía Local e Internacional
si el caso lo amerita. </p>`,

`<p> <b>SEGUNDO: </b> Con relación al Proyecto: Para dar comienzo al desarrollo, del proyecto, el Cliente,
tendrá que transferir o depositar el 100% del monto acordado por ambas partes y se entenderá
que al momento de realizar dicha transacción a favor del Desarrollador el Cliente no tendrá
derecho a devoluciones parciales o totales de dineros por proyectos en desarrollo y/o puestos
ONLINE.</p>`,

`<p> <b>TERCERO: </b> El Cliente declara que todos los datos de la empresa son VERÍDICOS y garantiza que
la información entregada al Desarrollador obedece a la verdad haciéndose responsable de
acuerdo con la LEY en caso de entregar información maliciosa o engañosa.</p>`,

`<h4>CLÁUSULA DE CONFIDENCIALIDAD</h4>
<p> El Desarrollador se compromete a no divulgar, difundir ni utilizar, directa o indirectamente, así
como a no usar en beneficio propio, ajeno o de otra entidad, información de carácter
confidencial del cliente a la que pudiese tener acceso en el desempeño de sus funciones.</p>`,

`<h4>Valor de proyecto</h4>
<h2> <PrecioProyecto> </h2>
`
];
export class ContratoGenerator {
    constructor() {
        this.dia = new Date().getDate();
        this.mes = new Date().toLocaleString('default', { month: 'long' });
        this.año = new Date().getFullYear();
        this.clienteNombre = "Nombre del Cliente";
        this.clienteRun = "RUN del Cliente";
        this.clienteEmpresa = "Nombre de la Empresa";
        this.precioProyecto = 200000;
    }

    showPrince(){
        const precio = this.precioProyecto.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });
        return precio;
    }

    setClienteNombre(nombre) {
        this.clienteNombre = nombre;
    }
    setClienteRun(run) {
        const runPattern = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;
        if (runPattern.test(run)) {
            this.clienteRun = run;
        } else {
            throw new Error("El RUN no es válido. Debe seguir el patrón 00.000.000-0");
        }
    }
    setClienteEmpresa(empresa) {
        this.clienteEmpresa = empresa;
    }
    setFecha(dia, mes, año) {
        this.dia = dia;
        this.mes = mes;
        this.año = año;
    }

    generateContrato() {
        const contratoMap = {
            "<dia>": this.dia,
            "<mes>": this.mes,
            "<año>": this.año,
            "<clienteNombre>": `<i>${this.clienteNombre}</i>`,
            "<clienteRun>": `<i>${this.clienteRun}</i>`,
            "<clienteEmpresa>": `<i>${this.clienteEmpresa}</i>`,
            "<PrecioProyecto>": `<b class="normal-font" >${this.showPrince()}</b>`
        };

        const contratoGenerado = contrato.map((section) => {
            if (section.includes("<")) {
                Object.keys(contratoMap).forEach((key) => {
                    section = section.replace(new RegExp(key, 'g'), contratoMap[key]);
                });
            }
            return section;
        });

        return contratoGenerado;
    }

    addButtonPrint() {
        const printButton = document.createElement("button");
        printButton.innerHTML = "Imprimir";
        printButton.classList.add("contrato-button");

        printButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.print();
        });

        return printButton;
    }

    addButtonEdit(){
        const editButton = document.createElement("button");
        editButton.innerHTML = "Editar"; 
        editButton.classList.add("contrato-button"); 

        editButton.addEventListener("click", (e) => {
            e.preventDefault();
            location.href = location.origin + "/app/cotizar.html";

        });

        return editButton;
    }

    addHtmltoDom( contrato, domTag  ) {

        const frament = document.createElement("div");
        frament.classList.add("contrato-fragment");
        frament.classList.add("paper");


        const nodos = contrato.map( (item, index) => {
			const nodo = document.createElement('p');
			nodo.innerHTML = item;
			return nodo;	
		} );

        const printButton = this.addButtonPrint();
        const editButton = this.addButtonEdit();

        nodos.push(printButton);
        nodos.push(editButton);

		nodos.forEach( nodo => {
			frament.appendChild(nodo);
		} );

        const parentElement = domTag.parentElement;

        parentElement.innerHTML = '';
		parentElement.appendChild(frament);
    }
}
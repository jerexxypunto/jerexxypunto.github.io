
/**
 * Obtiene el contenido de un archivo
 * @param {*} content 
 * @returns 
 */
async function getContent(content) {
    try {
        const req = await fetch(location.origin + '/content/files/' + content);
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

/**
 *  Lista de archivos
 * @returns 
 */
async function getPageList() {
    try {
        const req = await fetch(location.origin + '/content/conf/list.json');
        if (!req.ok) {
            throw new Error(`Error fetching page list: ${req.status} ${req.statusText}`);
        }
        const res = await req.json();
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



const header_html = `
		
						<div class="inner">

							<!-- Logo -->
								<a href="index.html" class="logo">
									<span class="symbol"><img src="images/logo.svg" alt="" /></span><span class="title">Desarrollador de Software</span>
								</a>

							<!-- Nav -->
								<nav>
									<ul>
										<li><a href="#menu">Menu</a></li>
									</ul>
								</nav>

						</div>
					
`;



function dynamicNav( navCallaback ){

    const menuItems = [
        { href: "index.html", text: "Home" },
        { href: "galeria.html", text: "Galeria" },
        { href: "animaciones.html", text: "Animaciones" },
    ];

    getPageList()
    .then( res => {
        const { posts } = res;
        posts.forEach( post => {
            const item = {
                href: `single.html?post=${post.file}`,
                text: `${post.title}`
            };
            menuItems.push(item);
        } );

         const nav_html = `
            <div class="inner">
                <h2>Menu</h2>
                <ul>
                    ${menuItems.map(item => `<li><a href="${item.href}">${item.text}</a></li>`).join('')}
                </ul>
            </div>
            <a class="close" href="#menu">Close</a>
            `;
            navCallaback( nav_html );

    } )
    .catch( err => {
        console.error(err);
    }
    );

   
}


function loadHeader() {
    const header = document.getElementById("header");
    const menu = document.getElementById("menu");
    if (header) {
        header.innerHTML = header_html;
    }

    if (menu) {
        dynamicNav( e => menu.innerHTML = e );
    }
}

export { loadHeader, getContent, getPageList };
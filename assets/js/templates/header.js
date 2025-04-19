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

const menuItems = [
    { href: "index.html", text: "Home" },
    { href: "galeria.html", text: "Galeria" },
    { href: "animaciones.html", text: "Animaciones" },
];

const nav_html = `
<div class="inner">
    <h2>Menu</h2>
    <ul>
        ${menuItems.map(item => `<li><a href="${item.href}">${item.text}</a></li>`).join('')}
    </ul>
</div>
<a class="close" href="#menu">Close</a>
`;


function loadHeader() {
    const header = document.getElementById("header");
    const menu = document.getElementById("menu");
    if (header) {
        header.innerHTML = header_html;
    }

    if (menu) {
        menu.innerHTML = nav_html;
    }
}
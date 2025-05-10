import { render_stop_by } from './template_utils.js';

const socialLinks = [
    { href: "https://web.facebook.com/jeremias.sanmartin.52/", class: "icon brands style2 fa-facebook-f", label: "Facebook" },
    { href: "https://www.instagram.com/thinker_existencial/?next=%2F", class: "icon brands style2 fa-instagram", label: "Instagram" },
    { href: "https://jerexxypunto.github.io/", class: "icon brands style2 fa-github", label: "GitHub" },
    { href: "+56990055107", class: "icon solid style2 fa-phone", label: "Phone" },
    { href: "jerexxypunto@gmail.com", class: "icon solid style2 fa-envelope", label: "Email" }
];

const socialLinksHTML = socialLinks.map(link => `
    <li> <a href="${link.href}"  target="_blank" class="${link.class}"><span class="label">${link.label}</span></a></li>
`).join("");

function createContactForm() {

    const formTitle = "Contactame";
    const sendButton = {
        "text": "Enviar",
        "class": "primary"
    };

    const formFields = [
        { type: "text", name: "name", id: "name", placeholder: "Nombre", class: "field half" },
        { type: "email", name: "email", id: "email", placeholder: "Email", class: "field half" },
        { type: "textarea", name: "message", id: "message", placeholder: "Mensaje", class: "field" }
    ];

    const fieldsHTML = formFields.map(field => {
        if (field.type === "textarea") {
            return `<div class="${field.class}"><textarea name="${field.name}" id="${field.id}" placeholder="${field.placeholder}"></textarea></div>`;
        } else {
            return `<div class="${field.class}"><input type="${field.type}" name="${field.name}" id="${field.id}" placeholder="${field.placeholder}" /></div>`;
        }
    }).join("");

    const formHTML = `
        <section>
            <h2>${formTitle}</h2>
            <form id="contactForm" method="post" action="#">
                <div class="fields">
                    ${fieldsHTML}
                </div>
                <ul class="actions">
                    <li><input type="submit" value="${sendButton.text}" class="${sendButton.class}" /></li>
                </ul>
            </form>
        </section>
    `;

    // Add event listener for form submission
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("contactForm");
        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault(); // Prevent default form submission
                const name = document.getElementById("name").value;
                const email = document.getElementById("email").value;
                const message = document.getElementById("message").value;

                console.log("Form submitted:", { name, email, message });
                alert("Thank you for your message!");
            });
        }
    });

    return formHTML;
}

const footer_html = `
    <div class="inner">
        ${createContactForm()}
        <section>
            <h2>Follow</h2>
            <ul class="icons">
                ${socialLinksHTML}
            </ul>
        </section>
        <ul class="copyright">
            <li>&copy; Jeremias San Martin. Todos los derechos reservados</li>
            <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
        </ul>
    </div>
`;

function loadMdParser(){
    const mdParserUrl = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
    const script = document.createElement("script");
    script.src = mdParserUrl;
    document.body.appendChild(script);
}

function loadFooter() {

    const footer = document.getElementById("footer");

    if ( render_stop_by( [ "contrato" ] )  ){
        footer.remove()
        return;
    }

    if (footer) {
        footer.innerHTML = footer_html;
    }
    loadMdParser();
}

export { loadFooter };
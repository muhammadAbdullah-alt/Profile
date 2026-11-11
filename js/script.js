// preloading
var loader = document.getElementById("preloader");

setTimeout(() => {
    if (loader) loader.style.display = "none";
}, 1000);

// navbar scrolling effect
var navbar = document.getElementById("navbar");
var topButton = document.getElementById("top-button");

if (navbar) {
    navbar.classList.add("container", "px-0", "mt-4", "position-absolute", "navbar-absolute");
}
if (topButton) topButton.classList.add("d-none");

function navbarScrolling() {
    if (!navbar) return;
    if (window.scrollY >= 20) {
        navbar.classList.add("position-fixed", "navbar-animation", "mb-5");
        navbar.classList.remove("container", "px-0", "mt-4", "position-absolute", "navbar-absolute");
        if (topButton) topButton.classList.remove("d-none");
    } else {
        navbar.classList.add("container", "px-0", "mt-4", "position-absolute", "navbar-absolute");
        navbar.classList.remove("position-fixed", "navbar-animation", "mb-5");
        if (topButton) topButton.classList.add("d-none");
    }
}
window.addEventListener("scroll", navbarScrolling);

// navbar link highlighting (scrollspy) — guarded so a missing link never breaks it
var navLinks = document.querySelectorAll(".navbar-nav .nav-item a");
var spySections = document.querySelectorAll("main section[id]");

function updateActiveNav() {
    if (!spySections.length || !navLinks.length) return;
    var top = window.scrollY + 140;
    var currentId = spySections[0].getAttribute("id");
    spySections.forEach(function (section) {
        if (section.offsetTop <= top) currentId = section.getAttribute("id");
    });
    navLinks.forEach(function (link) {
        var isCurrent = link.getAttribute("href") === "#" + currentId;
        link.classList.toggle("active", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
    });
}
window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// Collapse navbar on click (mobile)
var navbarNavLinks = document.querySelectorAll(".navbar-nav a");
var navbarCollapse = document.querySelector(".navbar-collapse");
navbarNavLinks.forEach(function (element) {
    element.addEventListener("click", function () {
        if (navbarCollapse) navbarCollapse.classList.remove("show");
    });
});

// image modal
var imageModal = document.getElementById("image-modal-content");
var imageModalClose = document.getElementById("image-modal-close");

function handleImageModal(imageSrc) {
    if (!imageModal) return;
    var imgElement = imageModal.getElementsByTagName("img");
    if (imgElement.length === 0) {
        var image = document.createElement("img");
        image.src = imageSrc;
        image.alt = "Project screenshot preview";
        image.classList.add("rounded-3");
        imageModal.appendChild(image);
    }
}

if (imageModalClose) {
    imageModalClose.addEventListener("click", function () {
        var imgElement = imageModal.getElementsByTagName("img");
        if (imgElement.length > 0) {
            imgElement[0].parentNode.removeChild(imgElement[0]);
        }
    });
}

// footer copyright year
var yearEl = document.getElementById("copyright-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// contact form — honest mailto fallback.
// This site has no form backend and no paid service, so the form does NOT
// submit anything. After validation it opens the visitor's own email app
// with the enquiry pre-filled, and says so on the page.
var contactForm = document.getElementById("contact-form");
if (contactForm) {
    var submitBtn = document.getElementById("contact-submit");
    var statusEl = document.getElementById("contact-status");
    var defaultStatus = statusEl ? statusEl.textContent : "";

    function setError(fieldId, errorId, message) {
        var field = document.getElementById(fieldId);
        var error = document.getElementById(errorId);
        if (!field || !error) return false;
        if (message) {
            field.setAttribute("aria-invalid", "true");
            error.textContent = message;
            error.hidden = false;
            return false;
        }
        field.removeAttribute("aria-invalid");
        error.hidden = true;
        return true;
    }

    function validateContact() {
        var name = document.getElementById("contact-name").value.trim();
        var email = document.getElementById("contact-email").value.trim();
        var type = document.getElementById("contact-type").value;
        var message = document.getElementById("contact-message").value.trim();
        var ok = true;

        ok = setError("contact-name", "name-error",
            name.length < 2 ? "Please enter your full name." : "") && ok;
        ok = setError("contact-email", "email-error",
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "" : "Please enter a valid email address.") && ok;
        ok = setError("contact-type", "type-error",
            type ? "" : "Please choose a project type.") && ok;
        ok = setError("contact-message", "message-error",
            message.length >= 20 ? "" : "Please describe your project in a few words (at least 20 characters).") && ok;

        if (!ok) {
            var firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
            if (firstInvalid) firstInvalid.focus();
        }
        return ok;
    }

    ["contact-name", "contact-email", "contact-type", "contact-message"].forEach(function (id) {
        var field = document.getElementById(id);
        if (field) {
            field.addEventListener("input", function () { validateContact(); });
            field.addEventListener("change", function () { validateContact(); });
        }
    });

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!validateContact()) return;

        var name = document.getElementById("contact-name").value.trim();
        var email = document.getElementById("contact-email").value.trim();
        var type = document.getElementById("contact-type").value;
        var budget = document.getElementById("contact-budget").value || "Prefer to discuss";
        var message = document.getElementById("contact-message").value.trim();

        var subject = "Project enquiry — " + type + " — " + name;
        var body = "Hi Muhammad,\n\n"
            + "Name: " + name + "\n"
            + "Email: " + email + "\n"
            + "Project type: " + type + "\n"
            + "Estimated budget: " + budget + "\n\n"
            + "Project description:\n" + message + "\n";

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Opening your email app…";
        }
        if (statusEl) {
            statusEl.textContent = "Opening your email app with this enquiry ready to send — please press Send there. Nothing was submitted from this website.";
        }

        window.location.href = "mailto:m.abdullahsirhandi14@gmail.com"
            + "?subject=" + encodeURIComponent(subject)
            + "&body=" + encodeURIComponent(body);

        setTimeout(function () {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "Open in My Email App";
            }
            if (statusEl) {
                statusEl.textContent = "If your email app did not open, email me directly at m.abdullahsirhandi14@gmail.com or message me on WhatsApp at +92 370 123 1945.";
            }
        }, 2500);
    });
}

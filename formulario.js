<script>
document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        let form = document.querySelector("#z5w33M form");
        if (form) {
            console.log("✅ Formulario encontrado.");
            observer.disconnect(); // Deja de observar cuando lo encuentra
            setupFormListener(form);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});

function setupFormListener(form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let nameInput = form.querySelector("input[placeholder='Introduce tu nombre']");
        let emailInput = form.querySelector("input[placeholder='Introduce tu email ']");

        if (!nameInput || !emailInput) {
            alert("❌ Error: No se encontraron los campos del formulario.");
            return;
        }

        let data = {
            email: emailInput.value,
            attributes: { NAME: nameInput.value },
            listIds: [3] // Reemplaza con el ID de tu lista en Brevo
        };

        fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "api-key": "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"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.id) {
                alert("✅ Gracias por registrarte, recibirás un email pronto.");
                form.reset();
            } else {
                alert("❌ Hubo un error al registrar tu email.");
                console.error("Error en la API:", result);
            }
        })
        .catch(error => {
            alert("❌ Error de conexión con Brevo.");
            console.error("Error:", error);
        });
    });
}
</script>

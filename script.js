/* =======================================================
   ALLFAWISE — SCRIPT.JS
   ATENÇÃO: não altere a URL abaixo nem os atributos "name"
   do formulário no HTML (nome, whatsapp, cidade, estado, idade,
   comunicativa, tem_celular, trabalhar_casa, experiencia,
   tiktok, instagram, mensagem). Isso quebraria a conexão com a planilha.
   ======================================================= */

// EDITAR URL DO APPS SCRIPT: cole aqui a URL de implantação do seu Google Apps Script, se precisar trocar
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzvKWBJQAJACMckVDRrjjrWKAWYHv6Aib857JIK_XK_7GrhYJvT-d1lnEz5sQlTot3K/exec";

// ---------- MENU MOBILE ----------
const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.getElementById("navLinks");

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// ---------- ENVIO DO FORMULÁRIO PARA O GOOGLE SHEETS ----------
const leadForm = document.getElementById("leadForm");
const formMessage = document.getElementById("formMessage");

if (leadForm) {
  leadForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (GOOGLE_SCRIPT_URL.includes("COLE_AQUI")) {
      formMessage.textContent = "Formulário pronto. Falta conectar a URL do Google Apps Script.";
      formMessage.classList.remove("success", "error");
      formMessage.classList.add("error");
      return;
    }

    const submitButton = leadForm.querySelector("button[type=submit]");
    const originalButtonText = submitButton ? submitButton.textContent : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    formMessage.classList.remove("success", "error");
    formMessage.textContent = "Enviando seus dados...";

    try {
      const formData = new FormData(leadForm);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      formMessage.textContent = "Cadastro enviado com sucesso. A Allfawise entrará em contato.";
      formMessage.classList.add("success");
      leadForm.reset();
    } catch (error) {
      formMessage.textContent = "Não foi possível enviar seus dados agora. Tente novamente em instantes.";
      formMessage.classList.add("error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

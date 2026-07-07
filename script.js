/* =======================================================
   ALLFAWISE — SCRIPT.JS
   ATENÇÃO: não altere a URL abaixo nem os atributos "name"
   do formulário no HTML (nome, whatsapp, cidade, maioridade,
   interesse, origem). Isso quebraria a conexão com a planilha.
   ======================================================= */

// EDITAR URL DO APPS SCRIPT: cole aqui a URL de implantação do seu Google Apps Script, se precisar trocar
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw2p2lMauVOihReJPqSBkvFUjKvEQbLeeld1CFhGoavvnhikirvyljgXyFTbX5xjHRN/exec";

// ---------- MENU MOBILE ----------
const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.getElementById("navLinks");

mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ---------- ENVIO DO FORMULÁRIO PARA O GOOGLE SHEETS ----------
const leadForm = document.getElementById("leadForm");
const formMessage = document.getElementById("formMessage");

leadForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (GOOGLE_SCRIPT_URL.includes("COLE_AQUI")) {
    formMessage.textContent = "Formulário pronto. Falta conectar a URL do Google Apps Script.";
    formMessage.style.color = "#991b1b";
    formMessage.style.fontWeight = "800";
    return;
  }

  const button = leadForm.querySelector("button");
  button.disabled = true;
  button.textContent = "Enviando...";

  const formData = new FormData(leadForm);
  formData.append("data_envio", new Date().toLocaleString("pt-BR"));

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    leadForm.reset();
    formMessage.textContent = "Cadastro enviado com sucesso. A Allfawise entrará em contato.";
    formMessage.style.color = "#166534";
    formMessage.style.fontWeight = "800";
  } catch (error) {
    formMessage.textContent = "Não foi possível enviar agora. Tente novamente.";
    formMessage.style.color = "#991b1b";
    formMessage.style.fontWeight = "800";
  } finally {
    button.disabled = false;
    button.textContent = "Enviar interesse";
  }
});

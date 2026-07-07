// Cole aqui a URL do Web App do Google Apps Script depois de publicá-lo
const GOOGLE_SCRIPT_URL = "COLE_AQUI_A_URL_DO_GOOGLE_APPS_SCRIPT";

// Menu mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Formulário Live Seller
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formMessage = document.getElementById('formMessage');
    const submitBtn = leadForm.querySelector('button[type="submit"]');

    const data = {
      nome: document.getElementById('nome').value,
      whatsapp: document.getElementById('whatsapp').value,
      cidade: document.getElementById('cidade').value,
      estado: document.getElementById('estado').value,
      idade: document.getElementById('idade').value,
      comunicativa: document.getElementById('comunicativa').value,
      temCelular: document.getElementById('temCelular').value,
      trabalharCasa: document.getElementById('trabalharCasa').value,
      experiencia: document.getElementById('experiencia').value,
      mensagem: document.getElementById('mensagem').value
    };

    formMessage.textContent = "Enviando cadastro...";
    if (submitBtn) submitBtn.disabled = true;

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(() => {
        formMessage.textContent = "Cadastro enviado com sucesso! Nossa equipe entrará em contato.";
        leadForm.reset();
      })
      .catch(() => {
        formMessage.textContent = "Erro ao enviar. Tente novamente ou chame no WhatsApp.";
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
}

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzvKWBJQAJACMckVDRrjjrWKAWYHv6Aib857JIK_XK_7GrhYJvT-d1lnEz5sQlTot3K/exec";
const GENERAL_JOBS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzdTXpX1-VH15wLep1_n7zBJtrpyCI78N5ZvrYZT4k3WZ7zMr36fx7BO87o7BLX8sYH5g/exec";
const COMPANY_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzSmV7LcNDQqOjIlOC69CdO4TV-Z7G93dFOoN_V4Sdw7BCxY39BW4dsqjTJZ967QgIz/exec";

const toggle = document.getElementById("mobileToggle");
const nav = document.getElementById("navLinks");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

function setMessage(element, text, type) {
  if (!element) return;
  element.textContent = text;
  element.classList.remove("success", "error");
  if (type) element.classList.add(type);
}

function lockSubmit(form, busyText) {
  const button = form.querySelector("button[type=submit]");
  if (!button) return () => {};
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = busyText;
  return () => { button.disabled = false; button.textContent = originalText; };
}

const leadForm = document.getElementById("leadForm");
const leadMessage = document.getElementById("formMessage");
if (leadForm) {
  leadForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const unlock = lockSubmit(leadForm, "Enviando cadastro...");
    setMessage(leadMessage, "Enviando seus dados...");
    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", body: new FormData(leadForm) });
      leadForm.reset();
      setMessage(leadMessage, "Cadastro recebido com sucesso. Obrigado pelo seu interesse em participar da triagem para Live Seller. Nossa equipe poderá entrar em contato pelo WhatsApp caso seu perfil avance para a próxima etapa.", "success");
    } catch (error) {
      setMessage(leadMessage, "Não foi possível enviar seus dados agora. Tente novamente em alguns instantes.", "error");
    } finally { unlock(); }
  });
}

const otherForm = document.getElementById("generalJobsForm");
const otherMessage = document.getElementById("generalJobsFormMessage");
if (otherForm) {
  otherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const unlock = lockSubmit(otherForm, "Enviando cadastro...");
    setMessage(otherMessage, "Enviando seus dados...");
    const data = new FormData(otherForm);
    const payload = {
      formType: "outras_vagas", nomeCompleto: data.get("nomeCompleto") || "", whatsapp: data.get("whatsapp") || "", email: data.get("email") || "", cidade: data.get("cidade") || "", estado: data.get("estado") || "", vagaEscolhida: data.get("vagaEscolhida") || "", disponibilidade: data.get("disponibilidade") || "", modeloTrabalho: data.get("modeloTrabalho") || "", ultimaEmpresa: data.get("ultimaEmpresa") || "", funcao: data.get("funcao") || "", atividades: data.get("atividades") || "", linkedin: data.get("linkedin") || "", nivelIngles: data.get("nivelIngles") || "", sobreVoce: data.get("sobreVoce") || ""
    };
    try {
      await fetch(GENERAL_JOBS_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
      otherForm.reset();
      setMessage(otherMessage, "Cadastro recebido. Manteremos seu perfil no banco de talentos para futuras oportunidades.", "success");
    } catch (error) {
      setMessage(otherMessage, "Não foi possível enviar seu cadastro agora. Tente novamente em alguns instantes.", "error");
    } finally { unlock(); }
  });
}

const companyForm = document.getElementById("companyQuoteForm");
const companyMessage = document.getElementById("companyQuoteFormMessage");
if (companyForm) {
  companyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const unlock = lockSubmit(companyForm, "Enviando solicitação...");
    setMessage(companyMessage, "Enviando sua solicitação...");
    try {
      await fetch(COMPANY_SCRIPT_URL, { method: "POST", mode: "no-cors", body: new FormData(companyForm) });
      companyForm.reset();
      setMessage(companyMessage, "Solicitação recebida. Nossa equipe fará o retorno comercial.", "success");
    } catch (error) {
      setMessage(companyMessage, "Não foi possível enviar sua solicitação agora. Tente novamente em alguns instantes.", "error");
    } finally { unlock(); }
  });
}

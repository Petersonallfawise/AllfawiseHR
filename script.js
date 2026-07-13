const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzvKWBJQAJACMckVDRrjjrWKAWYHv6Aib857JIK_XK_7GrhYJvT-d1lnEz5sQlTot3K/exec";
const GENERAL_JOBS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzdTXpX1-VH15wLep1_n7zBJtrpyCI78N5ZvrYZT4k3WZ7zMr36fx7BO87o7BLX8sYH5g/exec";
const COMPANY_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzSmV7LcNDQqOjIlOC69CdO4TV-Z7G93dFOoN_V4Sdw7BCxY39BW4dsqjTJZ967QgIz/exec";

// Cole aqui o link criado pelo WhatsApp para o Canal oficial da Allfawise.
// Exemplo: https://whatsapp.com/channel/0123456789ABCDEF
const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029Vb8bxZLKbYMMlBSE8902";

// --- Rastreamento: atribuição de origem (GA4) ---
const ATTRIBUTION_STORAGE_KEY = "allfawise_attribution";
const ATTRIBUTION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias

function readStoredAttribution() {
  try {
    const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.savedAt || !parsed.source) return null;
    if (Date.now() - parsed.savedAt > ATTRIBUTION_MAX_AGE_MS) {
      localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch (error) {
    return null;
  }
}

function captureAttribution() {
  const stored = readStoredAttribution();
  if (stored) return stored;

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");

  if (utmSource) {
    const fresh = {
      source: utmSource,
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
      content: params.get("utm_content") || "",
      savedAt: Date.now(),
    };
    try {
      localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(fresh));
    } catch (error) {
      /* localStorage indisponível: segue apenas em memória, sem persistir */
    }
    return fresh;
  }

  return { source: "direto", medium: "", campaign: "", content: "", savedAt: null };
}

const attribution = captureAttribution();

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

const channelLinks = document.querySelectorAll("[data-channel-link]");
function configureChannelLinks() {
  if (!WHATSAPP_CHANNEL_URL) return;
  channelLinks.forEach((link) => {
    link.href = WHATSAPP_CHANNEL_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.removeAttribute("aria-disabled");
    if (link.classList.contains("channel-link")) link.textContent = "Seguir o Canal oficial";
    link.addEventListener("click", () => {
      if (typeof gtag === "function") {
        gtag("event", "click_whatsapp_channel", {
          source: attribution.source,
          campaign: attribution.campaign,
          content: attribution.content,
        });
      }
    });
  });
}
configureChannelLinks();

const leadForm = document.getElementById("leadForm");
const leadMessage = document.getElementById("formMessage");
if (leadForm) {
  leadForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const mensagemField = leadForm.querySelector('[name="mensagem"]');
    if (mensagemField) {
      mensagemField.value =
        "Interesse declarado: deseja receber informações e os próximos passos pelo WhatsApp e Canal oficial." +
        " | Origem: " + attribution.source +
        " | Meio: " + (attribution.medium || "-") +
        " | Campanha: " + (attribution.campaign || "-") +
        " | Conteúdo: " + (attribution.content || "-");
    }
    const unlock = lockSubmit(leadForm, "Enviando cadastro...");
    setMessage(leadMessage, "Enviando seus dados...");
    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", body: new FormData(leadForm) });
      leadForm.reset();
      setMessage(leadMessage, "Cadastro recebido com sucesso. Obrigado pelo seu interesse em participar da triagem para Live Seller. Nossa equipe poderá entrar em contato pelo WhatsApp caso seu perfil avance para a próxima etapa.", "success");
      if (typeof gtag === "function") {
        gtag("event", "generate_lead", {
          source: attribution.source,
          medium: attribution.medium,
          campaign: attribution.campaign,
          content: attribution.content,
        });
      }
      if (WHATSAPP_CHANNEL_URL) {
        const channelSuccessLink = leadForm.querySelector(".channel-success-link");
        if (channelSuccessLink) {
          channelSuccessLink.hidden = false;
          channelSuccessLink.classList.add("visible");
        }
      }
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

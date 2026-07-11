/* =======================================================
ALLFAWISE — SCRIPT.JS
ATENÇÃO: não altere a URL abaixo nem os atributos "name"
do formulário no HTML (nome, whatsapp, cidade, estado, idade,
comunicativa, tem_celular, trabalhar_casa, experiencia,
tiktok, instagram, mensagem). Isso quebraria a conexão com a planilha.
======================================================= */

// EDITAR URL DO APPS SCRIPT: cole aqui a URL de implantação do seu Google Apps Script, se precisar trocar
// ATENÇÃO: URL existente do formulário Live Seller. Não trocar sem confirmação explícita do responsável pelo projeto.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzvKWBJQAJACMckVDRrjjrWKAWYHv6Aib857JIK_XK_7GrhYJvT-d1lnEz5sQlTot3K/exec";
const WHATSAPP_NUMBER = "14074540102";

function showWhatsAppConfirmation(messageElement, statusText, whatsappText) {
if (!messageElement) return;

const whatsappLink = document.createElement("a");
whatsappLink.className = "whatsapp-confirmation";
whatsappLink.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(whatsappText);
whatsappLink.target = "_blank";
whatsappLink.rel = "noopener";
whatsappLink.textContent = "Confirmar pelo WhatsApp";

messageElement.replaceChildren(document.createTextNode(statusText), whatsappLink);
}

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

// ---------- ENVIO DO FORMULÁRIO PARA O GOOGLE SHEETS (LIVE SELLER) ----------
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
const candidateName = formData.get("nome") || "";

await fetch(GOOGLE_SCRIPT_URL, {
method: "POST",
mode: "no-cors",
body: formData,
});

showWhatsAppConfirmation(
formMessage,
"Cadastro enviado para processamento. Se desejar, confirme o envio diretamente com nossa equipe.",
"Olá, Allfawise! Acabei de enviar meu cadastro para Live Seller. Meu nome é " + candidateName + "."
);
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

// ---------- WIZARD MULTI-STEP: FORMULÁRIO OUTRAS VAGAS (generalJobsForm) ----------
// ATENÇÃO: não altere a URL abaixo nem os nomes de campo do payload
// (nomeCompleto, whatsapp, email, cidade, estado, vagaEscolhida, disponibilidade,
// modeloTrabalho, ultimaEmpresa, funcao, atividades, linkedin, nivelIngles, sobreVoce).
const GENERAL_JOBS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzdTXpX1-VH15wLep1_n7zBJtrpyCI78N5ZvrYZT4k3WZ7zMr36fx7BO87o7BLX8sYH5g/exec';

const generalJobsForm = document.getElementById('generalJobsForm');

if (generalJobsForm) {
const steps = Array.from(generalJobsForm.querySelectorAll('.wizard-step'));
const totalSteps = steps.length;
let currentStep = 1;
const progressFill = document.getElementById('wizardProgressFill');
const stepLabel = document.getElementById('wizardStepLabel');
const generalFormMessage = document.getElementById('generalJobsFormMessage');
let isSubmittingGeneralForm = false;

document.querySelectorAll('a[data-vaga]').forEach((link) => {
link.addEventListener('click', () => {
const vagaSelect = generalJobsForm.querySelector('select[name="vagaEscolhida"]');
if (vagaSelect) {
vagaSelect.value = link.dataset.vaga;
}
});
});

function showStep(stepNumber) {
steps.forEach((step) => {
step.classList.toggle('is-active', Number(step.dataset.step) === stepNumber);
});
if (progressFill) {
progressFill.style.width = ((stepNumber / totalSteps) * 100) + '%';
}
if (stepLabel) {
stepLabel.textContent = 'Etapa ' + stepNumber + ' de ' + totalSteps;
}
}

function getStepFields(stepNumber) {
const stepEl = steps.find((step) => Number(step.dataset.step) === stepNumber);
return stepEl ? Array.from(stepEl.querySelectorAll('input, select, textarea')) : [];
}

function showWizardError(stepNumber, message) {
const errorEl = generalJobsForm.querySelector('.wizard-error[data-error-for="' + stepNumber + '"]');
if (errorEl) {
errorEl.textContent = message;
errorEl.classList.add('is-visible');
}
}

function clearWizardError(stepNumber) {
const errorEl = generalJobsForm.querySelector('.wizard-error[data-error-for="' + stepNumber + '"]');
if (errorEl) {
errorEl.textContent = '';
errorEl.classList.remove('is-visible');
}
}

function validateStep(stepNumber) {
clearWizardError(stepNumber);
const fields = getStepFields(stepNumber);
let firstInvalid = null;

fields.forEach((field) => field.classList.remove('is-invalid'));

fields.forEach((field) => {
if (!field.hasAttribute('required')) return;
const value = field.value.trim();

if (!value) {
field.classList.add('is-invalid');
if (!firstInvalid) firstInvalid = field;
return;
}

if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
field.classList.add('is-invalid');
if (!firstInvalid) firstInvalid = field;
}
});

if (firstInvalid) {
if (firstInvalid.type === 'email' && firstInvalid.value.trim()) {
showWizardError(stepNumber, 'Digite um e-mail válido para continuar.');
} else {
const label = firstInvalid.closest('label');
const labelText = label && label.childNodes[0] ? label.childNodes[0].textContent.trim() : 'este campo';
showWizardError(stepNumber, 'Preencha ' + labelText.toLowerCase() + ' para continuar.');
}
firstInvalid.focus();
return false;
}

return true;
}

generalJobsForm.querySelectorAll('.wizard-next').forEach((button) => {
button.addEventListener('click', () => {
if (!validateStep(currentStep)) return;
if (currentStep < totalSteps) {
currentStep += 1;
showStep(currentStep);
}
});
});

generalJobsForm.querySelectorAll('.wizard-back').forEach((button) => {
button.addEventListener('click', () => {
if (currentStep > 1) {
currentStep -= 1;
showStep(currentStep);
}
});
});

generalJobsForm.addEventListener('submit', async (event) => {
event.preventDefault();
if (isSubmittingGeneralForm) return;
if (!validateStep(currentStep)) return;

const submitButton = generalJobsForm.querySelector('.wizard-submit');
const originalButtonText = submitButton ? submitButton.textContent : '';

isSubmittingGeneralForm = true;
if (submitButton) {
submitButton.disabled = true;
submitButton.textContent = 'Enviando cadastro...';
}
if (generalFormMessage) {
generalFormMessage.classList.remove('success', 'error');
generalFormMessage.textContent = 'Enviando seu cadastro...';
}

const data = new FormData(generalJobsForm);
const payload = {
formType: 'outras_vagas',
nomeCompleto: data.get('nomeCompleto') || '',
whatsapp: data.get('whatsapp') || '',
email: data.get('email') || '',
cidade: data.get('cidade') || '',
estado: data.get('estado') || '',
vagaEscolhida: data.get('vagaEscolhida') || '',
disponibilidade: data.get('disponibilidade') || '',
modeloTrabalho: data.get('modeloTrabalho') || '',
ultimaEmpresa: data.get('ultimaEmpresa') || '',
funcao: data.get('funcao') || '',
atividades: data.get('atividades') || '',
linkedin: data.get('linkedin') || '',
nivelIngles: data.get('nivelIngles') || '',
sobreVoce: data.get('sobreVoce') || '',
};

try {
await fetch(GENERAL_JOBS_SCRIPT_URL, {
method: 'POST',
mode: 'no-cors',
headers: { 'Content-Type': 'text/plain;charset=utf-8' },
body: JSON.stringify(payload),
});

if (generalFormMessage) {
showWhatsAppConfirmation(
generalFormMessage,
'Cadastro enviado para processamento. Se desejar, confirme o envio diretamente com nossa equipe.',
'Olá, Allfawise! Acabei de enviar meu cadastro para outras vagas. Meu nome é ' + payload.nomeCompleto + ' e tenho interesse em ' + (payload.vagaEscolhida || 'oportunidades profissionais') + '.'
);
generalFormMessage.classList.add('success');
}

generalJobsForm.reset();
currentStep = 1;
showStep(currentStep);
steps.forEach((step) => {
step.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
});
for (let i = 1; i <= totalSteps; i += 1) clearWizardError(i);
} catch (error) {
if (generalFormMessage) {
generalFormMessage.textContent = 'Não foi possível enviar seu cadastro agora. Tente novamente em alguns instantes.';
generalFormMessage.classList.add('error');
}
} finally {
isSubmittingGeneralForm = false;
if (submitButton) {
submitButton.disabled = false;
submitButton.textContent = originalButtonText;
}
}
});

showStep(currentStep);
}

// ---------- FORMULÁRIO DE ORÇAMENTO (EMPRESAS — companyQuoteForm) ----------
// URL do Apps Script (Empresas) implantada e conectada à planilha "AllfawiseHR — Leads e Triagem".
const COMPANY_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzSmV7LcNDQqOjIlOC69CdO4TV-Z7G93dFOoN_V4Sdw7BCxY39BW4dsqjTJZ967QgIz/exec';

const companyQuoteForm = document.getElementById('companyQuoteForm');
const companyQuoteFormMessage = document.getElementById('companyQuoteFormMessage');

if (companyQuoteForm) {
companyQuoteForm.addEventListener('submit', async (event) => {
event.preventDefault();

if (COMPANY_SCRIPT_URL.includes('COLE_AQUI')) {
if (companyQuoteFormMessage) {
companyQuoteFormMessage.textContent = 'Formulário pronto. Falta conectar a URL do Google Apps Script da planilha de Empresas.';
companyQuoteFormMessage.classList.remove('success');
companyQuoteFormMessage.classList.add('error');
}
return;
}

const submitButton = companyQuoteForm.querySelector('button[type=submit]');
const originalButtonText = submitButton ? submitButton.textContent : '';

if (submitButton) {
submitButton.disabled = true;
submitButton.textContent = 'Enviando...';
}
if (companyQuoteFormMessage) {
companyQuoteFormMessage.classList.remove('success', 'error');
companyQuoteFormMessage.textContent = 'Enviando solicitação...';
}

try {
const formData = new FormData(companyQuoteForm);
const companyName = formData.get('empresa_nome') || '';
const contactName = formData.get('responsavel') || '';

await fetch(COMPANY_SCRIPT_URL, {
method: 'POST',
mode: 'no-cors',
body: formData,
});

if (companyQuoteFormMessage) {
showWhatsAppConfirmation(
companyQuoteFormMessage,
'Solicitação enviada para processamento. Se desejar, confirme o pedido diretamente com nossa equipe.',
'Olá, Allfawise! Acabei de enviar uma solicitação de orçamento pela empresa ' + companyName + '. Meu nome é ' + contactName + '.'
);
companyQuoteFormMessage.classList.add('success');
}
companyQuoteForm.reset();
} catch (error) {
if (companyQuoteFormMessage) {
companyQuoteFormMessage.textContent = 'Não foi possível enviar sua solicitação agora. Tente novamente em instantes ou fale conosco pelo WhatsApp.';
companyQuoteFormMessage.classList.add('error');
}
} finally {
if (submitButton) {
submitButton.disabled = false;
submitButton.textContent = originalButtonText;
}
}
});
}

// ---------- ISOLAMENTO DE FLUXO (CANDIDATO x EMPRESA) ----------
// Cada seção com [data-isolate] pertence a um fluxo: "candidato", "empresa" ou "common".
// Seções "common" ficam sempre visíveis. Ao escolher um fluxo (clique em [data-flow]
// ou navegação para uma seção marcada), escondemos as seções do outro fluxo, evitando
// que Candidatos, Empresas, IA e outras vagas apareçam todos juntos.
(function () {
var isolatedSections = Array.from(document.querySelectorAll('section[data-isolate]'));

function sectionForId(id) {
var el = document.getElementById(id);
if (!el) return null;
return el.tagName === 'SECTION' ? el : el.closest('section');
}

function flowForId(id) {
var sec = sectionForId(id);
return sec ? sec.getAttribute('data-isolate') : null;
}

function applyFlow(flow) {
isolatedSections.forEach(function (sec) {
var value = sec.getAttribute('data-isolate');
if (value === 'common') {
sec.classList.remove('flow-hidden');
return;
}
if (flow && value === flow) {
sec.classList.remove('flow-hidden');
} else {
sec.classList.add('flow-hidden');
}
});
document.body.setAttribute('data-active-flow', flow || '');
}

document.addEventListener('click', function (event) {
var flowLink = event.target.closest('[data-flow]');
if (flowLink) {
applyFlow(flowLink.getAttribute('data-flow'));
return;
}
var anchor = event.target.closest('a[href^="#"]');
if (anchor) {
var targetId = anchor.getAttribute('href').substring(1);
var flow = flowForId(targetId);
if (flow && flow !== 'common') {
applyFlow(flow);
}
}
});

window.addEventListener('hashchange', function () {
var id = window.location.hash.substring(1);
var flow = flowForId(id);
if (flow && flow !== 'common') applyFlow(flow);
});

// Estado inicial: se a URL já chega com uma âncora de um fluxo específico, ativa esse
// fluxo; caso contrário, nenhum fluxo fica ativo (apenas hero + seções comuns visíveis).
(function initialFlow() {
var id = window.location.hash.substring(1);
var flow = id ? flowForId(id) : null;
applyFlow(flow && flow !== 'common' ? flow : null);
})();
})();

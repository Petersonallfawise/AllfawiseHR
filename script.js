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
        generalFormMessage.textContent = 'Cadastro recebido! Obrigado pelo seu interesse. Nossa equipe analisará suas informações e poderá entrar em contato quando identificarmos uma oportunidade compatível com o seu perfil.';
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


// ---------- NAVEGAÇÃO PROGRESSIVA (MOSTRAR/ESCONDER SEÇÕES) ----------
(function () {
  function sectionFor(id) {
    var el = document.getElementById(id);
    if (!el) return null;
    return el.tagName === 'SECTION' ? el : el.closest('section');
  }

  function revealFlowSection(id) {
    var sec = sectionFor(id);
    if (sec && sec.classList.contains('flow-hidden')) {
      sec.classList.remove('flow-hidden');
    }
  }

  function revealFromHash() {
    if (window.location.hash) {
      revealFlowSection(window.location.hash.substring(1));
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) return;
    var targetId = link.getAttribute('href').substring(1);
    if (targetId) revealFlowSection(targetId);
  });

  window.addEventListener('hashchange', revealFromHash);
  revealFromHash();
})();

import { submitDonorLead, submitPatientCase } from "../services/formsService.js";

export function renderMiniAppsShell() {
  return `<div class="miniapps-root" data-miniapps-root></div>`;
}

function donorChoiceCard(value, label, description) {
  return `
    <button class="choice-card" type="button" data-donor-choice="${value}">
      <strong>${label}</strong>
      <span>${description}</span>
    </button>
  `;
}

function renderDonorChoice() {
  return `
    <div class="miniapp-panel-copy">
      <span class="eyebrow">Mini app doador</span>
      <h3>Voce ja e doador?</h3>
      <p>
        A resposta muda o caminho. Quem ja esta na rede precisa manter o REDOME atualizavel. Quem ainda nao esta pode registrar interesse, disponibilidade e orientacao.
      </p>
    </div>
    <div class="choice-grid">
      ${donorChoiceCard("sim", "Sim, ja sou doador", "Quero orientacao e atualizacao de dados no REDOME.")}
      ${donorChoiceCard("nao", "Ainda nao sou doador", "Quero entrar para a rede FlaMedula e receber orientacao.")}
    </div>
  `;
}

function renderDonorExisting(redomeUrl, status) {
  return `
    <div class="miniapp-panel-copy">
      <span class="eyebrow">Doador ja cadastrado</span>
      <h3>Mantenha-se encontravel</h3>
      <p>
        Se seus dados mudaram, atualizar telefone, cidade e e-mail no REDOME pode ser tao importante quanto o cadastro original.
      </p>
    </div>
    <form class="mini-form" data-form="donor-existing">
      <div class="field-grid field-grid-2">
        <label class="field">
          <span>Nome</span>
          <input name="nome" type="text" autocomplete="name" required />
        </label>
        <label class="field">
          <span>Telefone</span>
          <input name="telefone" type="tel" autocomplete="tel" required />
        </label>
      </div>
      <div class="field-grid field-grid-2">
        <label class="field">
          <span>E-mail</span>
          <input name="email" type="email" autocomplete="email" required />
        </label>
        <label class="field">
          <span>Cidade / Estado</span>
          <input name="cidade_estado" type="text" placeholder="Ex.: Rio de Janeiro / RJ" required />
        </label>
      </div>
      <label class="field">
        <span>Como prefere ser contatado pela equipe?</span>
        <select name="canal_preferido">
          <option value="WhatsApp">WhatsApp</option>
          <option value="Ligacao">Ligacao</option>
          <option value="E-mail">E-mail</option>
        </select>
      </label>
      <label class="checkbox-row">
        <input name="consentimento_contato" type="checkbox" required />
        <span>Autorizo contato da FlaMedula para orientacao, campanhas e atualizacao de cadastro.</span>
      </label>
      <div class="miniapp-actions">
        <button class="button button-secondary" type="button" data-donor-back>Voltar</button>
        <a class="button button-warm" href="${redomeUrl}" target="_blank" rel="noreferrer">
          Atualizar cadastro no REDOME
        </a>
        <button class="button button-brand" type="submit">Registrar interesse de contato</button>
      </div>
      ${renderStatus(status)}
    </form>
  `;
}

function renderSelect(name, options, label) {
  return `
    <label class="field">
      <span>${label}</span>
      <select name="${name}">
        ${options.map((option) => `<option value="${option}">${option}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderDonorNew(options, status) {
  return `
    <div class="miniapp-panel-copy">
      <span class="eyebrow">Novo interesse</span>
      <h3>Cadastro de interesse para a rede FlaMedula</h3>
      <p>
        Este fluxo prepara o futuro payload de donor_leads sem depender de Supabase agora. O objetivo e organizar orientacao, campanhas e disponibilidade.
      </p>
    </div>
    <form class="mini-form" data-form="donor-new">
      <div class="field-grid field-grid-2">
        <label class="field">
          <span>Nome completo</span>
          <input name="nome" type="text" autocomplete="name" required />
        </label>
        <label class="field">
          <span>E-mail</span>
          <input name="email" type="email" autocomplete="email" required />
        </label>
      </div>
      <div class="field-grid field-grid-3">
        <label class="field">
          <span>Telefone</span>
          <input name="telefone" type="tel" autocomplete="tel" required />
        </label>
        <label class="field">
          <span>Cidade</span>
          <input name="cidade" type="text" required />
        </label>
        <label class="field">
          <span>Estado</span>
          <input name="estado" type="text" maxlength="2" required />
        </label>
      </div>
      <div class="field-grid field-grid-3">
        <label class="field">
          <span>Idade</span>
          <input name="idade" type="number" min="18" max="65" />
        </label>
        <label class="field">
          <span>Peso (kg)</span>
          <input name="peso" type="number" min="40" step="0.1" />
        </label>
        ${renderSelect("tipo_sanguineo", options.bloodTypes, "Tipo sanguineo")}
      </div>
      <div class="field-grid field-grid-2">
        ${renderSelect("quer_doar_sangue", ["Sim", "Nao", "Talvez"], "Tem interesse em doar sangue?")}
        ${renderSelect(
          "quer_doar_medula",
          options.medulaInterestOptions,
          "Quer receber orientacao sobre medula?"
        )}
      </div>
      <div class="field-grid field-grid-2">
        ${renderSelect("canal_preferido", options.preferredChannels, "Canal preferido")}
        ${renderSelect("disponibilidade", options.donorAvailability, "Disponibilidade inicial")}
      </div>
      <label class="field">
        <span>Observacoes</span>
        <textarea name="observacoes" rows="3" placeholder="Conte algo importante sobre seu interesse ou disponibilidade."></textarea>
      </label>
      <label class="checkbox-row">
        <input name="consentimento_contato" type="checkbox" required />
        <span>Autorizo a equipe FlaMedula a entrar em contato para orientacao e mobilizacoes relacionadas a doacao.</span>
      </label>
      <label class="checkbox-row">
        <input name="quer_receber_campanhas" type="checkbox" />
        <span>Quero receber campanhas, novidades e convites da rede.</span>
      </label>
      <div class="miniapp-actions">
        <button class="button button-secondary" type="button" data-donor-back>Voltar</button>
        <button class="button button-brand" type="submit">Enviar interesse</button>
      </div>
      ${renderStatus(status)}
    </form>
  `;
}

function renderPatientForm(options, status) {
  return `
    <div class="miniapp-panel-copy">
      <span class="eyebrow">Mini app paciente</span>
      <h3>Quem esta cadastrando este caso?</h3>
      <p>
        O fluxo abaixo organiza dados clinicos basicos, contexto do caso e autorizacoes iniciais para futura integracao com a tabela patients.
      </p>
    </div>
    <form class="mini-form" data-form="patient">
      ${renderSelect("cadastro_por", options.patientRoles, "Origem do cadastro")}
      <div class="field-grid field-grid-2">
        <label class="field">
          <span>Nome do paciente</span>
          <input name="nome_paciente" type="text" required />
        </label>
        <label class="field">
          <span>Idade</span>
          <input name="idade" type="number" min="0" max="120" />
        </label>
      </div>
      <div class="field-grid field-grid-2">
        <label class="field">
          <span>Diagnostico</span>
          <input name="diagnostico" type="text" required />
        </label>
        ${renderSelect("tipo_sanguineo", ["Nao informado", ...options.bloodTypes], "Tipo sanguineo")}
      </div>
      <div class="field-grid field-grid-2">
        <label class="field">
          <span>Hospital</span>
          <input name="hospital" type="text" required />
        </label>
        ${renderSelect("tipo_necessidade", options.patientNeedTypes, "Necessidade principal")}
      </div>
      <div class="field-grid field-grid-3">
        <label class="field">
          <span>Cidade</span>
          <input name="cidade" type="text" required />
        </label>
        <label class="field">
          <span>Estado</span>
          <input name="estado" type="text" maxlength="2" required />
        </label>
        ${renderSelect("urgencia", options.urgencyLevels, "Urgencia")}
      </div>
      <div class="field-grid field-grid-2">
        <label class="field">
          <span>Nome do medico</span>
          <input name="nome_medico" type="text" />
        </label>
        <label class="field">
          <span>CRM do medico</span>
          <input name="crm_medico" type="text" />
        </label>
      </div>
      <div class="field-grid field-grid-2">
        <label class="field">
          <span>Nome do responsavel</span>
          <input name="nome_responsavel" type="text" required />
        </label>
        <label class="field">
          <span>Relacao com o paciente</span>
          <input name="relacao_paciente" type="text" required />
        </label>
      </div>
      <div class="field-grid field-grid-2">
        <label class="field">
          <span>Telefone do responsavel</span>
          <input name="telefone_responsavel" type="tel" required />
        </label>
        <label class="field">
          <span>E-mail do responsavel</span>
          <input name="email_responsavel" type="email" required />
        </label>
      </div>
      <div class="field-grid field-grid-2">
        <label class="field">
          <span>Data limite</span>
          <input name="data_limite" type="date" />
        </label>
        ${renderSelect("necessita_medula", ["Sim", "Nao", "Em avaliacao"], "Necessita mobilizacao para medula?")}
      </div>
      <label class="field">
        <span>Mensagem publica ou contexto adicional</span>
        <textarea name="mensagem_publica" rows="4" placeholder="Explique o contexto do caso, sempre com responsabilidade."></textarea>
      </label>
      <label class="checkbox-row">
        <input name="autorizacao_divulgacao" type="checkbox" />
        <span>Existe autorizacao para divulgar o caso publicamente se a equipe considerar necessario.</span>
      </label>
      <label class="checkbox-row">
        <input name="usar_nome_paciente" type="checkbox" />
        <span>O nome do paciente pode ser utilizado em possiveis comunicacoes futuras.</span>
      </label>
      <div class="miniapp-actions">
        <button class="button button-patient" type="submit">Enviar caso</button>
      </div>
      ${renderStatus(status)}
    </form>
  `;
}

function renderStatus(status) {
  if (!status) {
    return `<p class="miniapp-status" aria-live="polite"></p>`;
  }

  return `
    <p class="miniapp-status miniapp-status-${status.type}" aria-live="polite">
      ${status.message}
    </p>
  `;
}

function getCheckboxValue(formData, name) {
  return formData.get(name) === "on";
}

function getFieldValue(formData, name) {
  return formData.get(name) ?? "";
}

export function initMiniApps({ miniAppOptions, redomeConfig }) {
  const root = document.querySelector("[data-miniapps-root]");

  if (!root) {
    return;
  }

  const state = {
    activeTab: "doador",
    donorStep: "choice",
    donorStatus: null,
    patientStatus: null
  };

  const render = () => {
    root.innerHTML = `
      <div class="miniapps-frame">
        <div class="miniapps-tabs" role="tablist" aria-label="Escolha entre cadastro de doador ou paciente">
          <button class="miniapps-tab ${state.activeTab === "doador" ? "is-active" : ""}" type="button" role="tab" aria-selected="${String(state.activeTab === "doador")}" data-tab-target="doador">
            Doador
          </button>
          <button class="miniapps-tab ${state.activeTab === "paciente" ? "is-active" : ""}" type="button" role="tab" aria-selected="${String(state.activeTab === "paciente")}" data-tab-target="paciente">
            Paciente
          </button>
        </div>

        <div class="miniapps-panel ${state.activeTab === "doador" ? "" : "is-hidden"}" role="tabpanel">
          ${
            state.donorStep === "choice"
              ? renderDonorChoice()
              : state.donorStep === "existing"
                ? renderDonorExisting(redomeConfig.url, state.donorStatus)
                : renderDonorNew(miniAppOptions, state.donorStatus)
          }
        </div>

        <div class="miniapps-panel ${state.activeTab === "paciente" ? "" : "is-hidden"}" role="tabpanel">
          ${renderPatientForm(miniAppOptions, state.patientStatus)}
        </div>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    root.querySelectorAll("[data-tab-target]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeTab = button.dataset.tabTarget;
        render();
      });
    });

    root.querySelectorAll("[data-donor-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        state.donorStatus = null;
        state.donorStep = button.dataset.donorChoice === "sim" ? "existing" : "new";
        render();
      });
    });

    root.querySelectorAll("[data-donor-back]").forEach((button) => {
      button.addEventListener("click", () => {
        state.donorStatus = null;
        state.donorStep = "choice";
        render();
      });
    });

    const donorExistingForm = root.querySelector('[data-form="donor-existing"]');
    donorExistingForm?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(donorExistingForm);

      const payload = {
        nome: getFieldValue(formData, "nome"),
        email: getFieldValue(formData, "email"),
        telefone: getFieldValue(formData, "telefone"),
        cidade: getFieldValue(formData, "cidade_estado"),
        estado: null,
        ja_doador_sangue: true,
        quer_doar_sangue: true,
        quer_doar_medula: true,
        consentimento_contato: getCheckboxValue(formData, "consentimento_contato"),
        quer_receber_campanhas: true,
        canal_preferido: getFieldValue(formData, "canal_preferido"),
        disponibilidade: "Atualizar REDOME",
        observacoes: "Fluxo de doador ja cadastrado",
        origem: "landing-existing-donor"
      };

      const result = await submitDonorLead(payload);
      state.donorStatus = { type: result.ok ? "success" : "error", message: result.message };
      render();
    });

    const donorNewForm = root.querySelector('[data-form="donor-new"]');
    donorNewForm?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(donorNewForm);

      const payload = {
        nome: getFieldValue(formData, "nome"),
        email: getFieldValue(formData, "email"),
        telefone: getFieldValue(formData, "telefone"),
        cidade: getFieldValue(formData, "cidade"),
        estado: getFieldValue(formData, "estado"),
        idade: getFieldValue(formData, "idade"),
        peso: getFieldValue(formData, "peso"),
        tipo_sanguineo: getFieldValue(formData, "tipo_sanguineo"),
        ja_doador_sangue: false,
        quer_doar_sangue: getFieldValue(formData, "quer_doar_sangue"),
        quer_doar_medula: getFieldValue(formData, "quer_doar_medula"),
        consentimento_contato: getCheckboxValue(formData, "consentimento_contato"),
        quer_receber_campanhas: getCheckboxValue(formData, "quer_receber_campanhas"),
        canal_preferido: getFieldValue(formData, "canal_preferido"),
        disponibilidade: getFieldValue(formData, "disponibilidade"),
        observacoes: getFieldValue(formData, "observacoes"),
        origem: "landing-new-donor"
      };

      const result = await submitDonorLead(payload);
      state.donorStatus = { type: result.ok ? "success" : "error", message: result.message };
      render();
    });

    const patientForm = root.querySelector('[data-form="patient"]');
    patientForm?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(patientForm);

      const payload = {
        nome_paciente: getFieldValue(formData, "nome_paciente"),
        idade: getFieldValue(formData, "idade"),
        diagnostico: getFieldValue(formData, "diagnostico"),
        tipo_sanguineo: getFieldValue(formData, "tipo_sanguineo"),
        necessita_medula: getFieldValue(formData, "necessita_medula"),
        hospital: getFieldValue(formData, "hospital"),
        cidade: getFieldValue(formData, "cidade"),
        estado: getFieldValue(formData, "estado"),
        nome_medico: getFieldValue(formData, "nome_medico"),
        crm_medico: getFieldValue(formData, "crm_medico"),
        telefone_responsavel: getFieldValue(formData, "telefone_responsavel"),
        tipo_necessidade: getFieldValue(formData, "tipo_necessidade"),
        urgencia: getFieldValue(formData, "urgencia"),
        data_limite: getFieldValue(formData, "data_limite"),
        autorizacao_divulgacao: getCheckboxValue(formData, "autorizacao_divulgacao"),
        usar_nome_paciente: getCheckboxValue(formData, "usar_nome_paciente"),
        mensagem_publica: getFieldValue(formData, "mensagem_publica"),
        nome_responsavel: getFieldValue(formData, "nome_responsavel"),
        relacao_paciente: getFieldValue(formData, "relacao_paciente"),
        email_responsavel: getFieldValue(formData, "email_responsavel"),
        origem: getFieldValue(formData, "cadastro_por")
      };

      const result = await submitPatientCase(payload);
      state.patientStatus = { type: result.ok ? "success" : "error", message: result.message };
      render();
    });
  };

  render();

  document.querySelectorAll("[data-miniapp-target]").forEach((link) => {
    link.addEventListener("click", () => {
      state.activeTab = link.dataset.miniappTarget === "paciente" ? "paciente" : "doador";
      if (state.activeTab === "doador") {
        state.donorStep = "choice";
      }
      render();
    });
  });
}

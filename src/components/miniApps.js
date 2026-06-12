import { submitDonorLead, submitPatientCase } from "../services/formsService.js";

const FLOW_LABELS = {
  donor: "Doador",
  patient: "Paciente"
};

const DEFAULT_DONOR = {
  ja_doador_sangue: "",
  nome: "",
  telefone: "",
  email: "",
  cidade: "",
  estado: "",
  idade: "",
  peso: "",
  tipo_sanguineo: "",
  disponibilidade: "",
  quer_doar_sangue: "",
  quer_doar_medula: "",
  consentimento_contato: false,
  quer_receber_campanhas: false,
  canal_preferido: "",
  observacoes: ""
};

const DEFAULT_PATIENT = {
  cadastro_por: "",
  nome_paciente: "",
  idade: "",
  cidade: "",
  estado: "",
  hospital: "",
  diagnostico: "",
  tipo_sanguineo: "",
  tipo_necessidade: "",
  necessita_medula: "",
  urgencia: "",
  data_limite: "",
  nome_medico: "",
  crm_medico: "",
  telefone_responsavel: "",
  nome_responsavel: "",
  relacao_paciente: "",
  email_responsavel: "",
  autorizacao_divulgacao: false,
  usar_nome_paciente: false,
  mensagem_publica: ""
};

function clone(value) {
  return { ...value };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function selected(current, value) {
  return current === value ? "selected" : "";
}

function checked(value) {
  return value ? "checked" : "";
}

function renderMiniSelect(name, label, value, options, required = true) {
  return `
    <label class="field">
      <span>${label}</span>
      <select name="${name}" ${required ? "required" : ""}>
        <option value="">Selecione</option>
        ${options.map((option) => `<option value="${escapeHtml(option)}" ${selected(value, option)}>${option}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderTextField({ name, label, value, type = "text", required = true, autocomplete = "", attrs = "" }) {
  return `
    <label class="field">
      <span>${label}</span>
      <input
        name="${name}"
        type="${type}"
        value="${escapeHtml(value)}"
        ${required ? "required" : ""}
        ${autocomplete ? `autocomplete="${autocomplete}"` : ""}
        ${attrs}
      />
    </label>
  `;
}

function renderChoiceButton({ name, value, current, title, text, tone = "brand", icon = "💧" }) {
  const active = current === value;

  return `
    <button
      class="choice-card choice-card-${tone} ${active ? "is-selected" : ""}"
      type="button"
      data-choice-name="${name}"
      data-choice-value="${value}"
      aria-pressed="${String(active)}"
    >
      <span class="choice-emoji" aria-hidden="true">${icon}</span>
      <span class="choice-content">
        <strong>${title}</strong>
        <span>${text}</span>
      </span>
    </button>
  `;
}

function renderProgress(state) {
  const steps = getSteps(state.activeFlow, state);
  const current = Math.min(state.steps[state.activeFlow] + 1, steps.length);
  const percent = Math.round((current / steps.length) * 100);
  const icon = state.activeFlow === "patient" ? "🏥" : "🩸";

  return `
    <div class="wizard-progress" aria-label="Progresso do fluxo ${FLOW_LABELS[state.activeFlow]}">
      <div class="wizard-progress-copy">
        <span>${icon} ${FLOW_LABELS[state.activeFlow]}</span>
        <strong>Etapa ${current} de ${steps.length}</strong>
      </div>
      <div class="wizard-progress-bar" aria-hidden="true">
        <span style="width: ${percent}%"></span>
      </div>
    </div>
  `;
}

function getSteps(flow, state) {
  if (flow === "donor") {
    return [
      "Perfil",
      "Dados basicos",
      "Disponibilidade",
      "Sangue",
      "Medula",
      "Contato e LGPD",
      "Resumo",
      "Sucesso"
    ];
  }

  return [
    "Quem cadastra",
    "Dados do caso",
    "Necessidade",
    state.patient.cadastro_por === "Medico ou profissional de saude" ? "Medico" : "Responsavel",
    "Autorizacao e LGPD",
    "Resumo",
    "Sucesso"
  ];
}

function renderEntry() {
  return `
    <div class="miniapp-welcome">
      <p class="miniapp-guidance">
        O FlaMedula usa essas informacoes para orientar, organizar casos e mobilizar pessoas quando houver necessidade.
      </p>
      <div class="choice-grid choice-grid-entry">
        <button class="choice-card choice-card-brand" type="button" data-open-mini-flow="donor">
          <span class="choice-emoji" aria-hidden="true">🩸</span>
          <span class="choice-content">
            <strong>Quero me cadastrar como doador</strong>
            <span>Para quem ja doa, quer doar sangue, quer receber orientacao ou tem interesse em medula.</span>
          </span>
        </button>
        <button class="choice-card choice-card-patient" type="button" data-open-mini-flow="patient">
          <span class="choice-emoji" aria-hidden="true">🏥</span>
          <span class="choice-content">
            <strong>Quero cadastrar um paciente</strong>
            <span>Para responsaveis, familiares ou profissionais que querem informar um caso para analise e mobilizacao.</span>
          </span>
        </button>
      </div>
      <p class="miniapp-safe-note">🔒 Cada opcao abre apenas o mini app correspondente.</p>
    </div>
  `;
}

function renderDonorStep(state, options) {
  const data = state.donor;
  const step = state.steps.donor;

  if (state.success.donor) {
    return renderSuccess(
      "Cadastro recebido",
      "Recebemos seus dados. A equipe podera entrar em contato conforme seu consentimento. A FlaMedula orienta e mobiliza; cadastro, triagem e doacao seguem com REDOME, hemocentros e canais oficiais."
    );
  }

  if (step === 0) {
    return `
      <div class="wizard-step" data-wizard-step>
        <div class="miniapp-panel-copy">
          <span class="eyebrow">Perfil</span>
          <h3>Voce ja e doador?</h3>
          <p>Se ja for doador, mantenha seus dados oficiais atualizados no REDOME. Voce tambem pode seguir aqui para receber orientacoes e campanhas da rede.</p>
        </div>
        <div class="miniapp-context-note">
          <span aria-hidden="true">🔒</span>
          <p>O cadastro no FlaMedula nao substitui canais oficiais de hemocentros, bancos de sangue ou REDOME. Ele ajuda na orientacao e mobilizacao.</p>
        </div>
        <div class="choice-grid">
          ${renderChoiceButton({
            name: "ja_doador_sangue",
            value: "Sim",
            current: data.ja_doador_sangue,
            title: "Sim, ja sou doador",
            text: "Quero manter contato com a FlaMedula e lembrar de atualizar meus dados oficiais.",
            tone: "brand",
            icon: "🩸"
          })}
          ${renderChoiceButton({
            name: "ja_doador_sangue",
            value: "Nao",
            current: data.ja_doador_sangue,
            title: "Ainda nao sou doador",
            text: "Quero entender o caminho e registrar meu interesse com seguranca.",
            tone: "brand",
            icon: "✨"
          })}
        </div>
      </div>
    `;
  }

  if (step === 1) {
    return `
      <div class="wizard-step" data-wizard-step>
        <div class="miniapp-panel-copy">
          <span class="eyebrow">Dados basicos</span>
          <h3>Como podemos identificar voce?</h3>
          <p>Use dados reais para que a equipe consiga orientar e organizar a rede por cidade/estado.</p>
        </div>
        <div class="field-grid field-grid-2">
          ${renderTextField({ name: "nome", label: "Nome completo", value: data.nome, autocomplete: "name" })}
          ${renderTextField({ name: "telefone", label: "Telefone", value: data.telefone, type: "tel", autocomplete: "tel" })}
          ${renderTextField({ name: "email", label: "E-mail", value: data.email, type: "email", autocomplete: "email" })}
          ${renderTextField({ name: "cidade", label: "Cidade", value: data.cidade, autocomplete: "address-level2" })}
          ${renderTextField({ name: "estado", label: "Estado", value: data.estado, autocomplete: "address-level1", attrs: 'maxlength="2" placeholder="UF"' })}
        </div>
      </div>
    `;
  }

  if (step === 2) {
    return `
      <div class="wizard-step" data-wizard-step>
        <div class="miniapp-panel-copy">
          <span class="eyebrow">Disponibilidade</span>
          <h3>Alguns dados ajudam na organizacao da rede.</h3>
          <p>Essas informacoes apoiam orientacao inicial e campanhas, sem substituir triagem oficial.</p>
        </div>
        <div class="field-grid field-grid-2">
          ${renderTextField({ name: "idade", label: "Idade", value: data.idade, type: "number", required: false, attrs: 'min="18" max="65"' })}
          ${renderTextField({ name: "peso", label: "Peso (kg)", value: data.peso, type: "number", required: false, attrs: 'min="40" step="0.1"' })}
          ${renderMiniSelect("tipo_sanguineo", "Tipo sanguineo", data.tipo_sanguineo, options.bloodTypes, false)}
          ${renderMiniSelect("disponibilidade", "Disponibilidade de contato", data.disponibilidade, options.donorAvailability)}
        </div>
      </div>
    `;
  }

  if (step === 3) {
    return `
      <div class="wizard-step" data-wizard-step>
        <div class="miniapp-panel-copy">
          <span class="eyebrow">Interesse em sangue</span>
          <h3>Voce tem interesse em doar sangue?</h3>
          <p>Escolha uma opcao. O wizard avanca automaticamente para a orientacao sobre medula.</p>
        </div>
        <div class="choice-grid">
          ${renderChoiceButton({
            name: "quer_doar_sangue",
            value: "Sim",
            current: data.quer_doar_sangue,
            title: "Tenho interesse em doar sangue",
            text: "Quero receber orientacao sobre campanhas e necessidades da rede.",
            tone: "brand",
            icon: "🩸"
          })}
          ${renderChoiceButton({
            name: "quer_doar_sangue",
            value: "Nao neste momento",
            current: data.quer_doar_sangue,
            title: "Nao neste momento",
            text: "Ainda posso receber orientacao e acompanhar a causa.",
            tone: "brand",
            icon: "🤝"
          })}
        </div>
      </div>
    `;
  }

  if (step === 4) {
    return `
      <div class="wizard-step" data-wizard-step>
        <div class="miniapp-panel-copy">
          <span class="eyebrow">Orientacao sobre medula</span>
          <h3>Voce tambem quer receber orientacao sobre doacao de medula?</h3>
          <p>Medula ossea nao e medula espinhal. A orientacao correta reduz medo e ajuda uma decisao consciente.</p>
        </div>
        <div class="choice-grid choice-grid-3">
          ${renderChoiceButton({
            name: "quer_doar_medula",
            value: "Sim",
            current: data.quer_doar_medula,
            title: "Sim",
            text: "Quero receber orientacao e acompanhar campanhas de medula.",
            tone: "brand",
            icon: "🧬"
          })}
          ${renderChoiceButton({
            name: "quer_doar_medula",
            value: "Quero entender melhor",
            current: data.quer_doar_medula,
            title: "Quero entender melhor",
            text: "Ainda tenho duvidas e quero informacao responsavel.",
            tone: "brand",
            icon: "💬"
          })}
          ${renderChoiceButton({
            name: "quer_doar_medula",
            value: "Nao neste momento",
            current: data.quer_doar_medula,
            title: "Nao neste momento",
            text: "Prefiro seguir apenas acompanhando a rede agora.",
            tone: "brand",
            icon: "🤍"
          })}
        </div>
      </div>
    `;
  }

  if (step === 5) {
    return `
      <div class="wizard-step" data-wizard-step>
        <div class="miniapp-panel-copy">
          <span class="eyebrow">Contato e LGPD</span>
          <h3>Como a FlaMedula pode falar com voce?</h3>
          <p>Com sua autorizacao, a FlaMedula podera entrar em contato para orientacoes, campanhas e avisos quando houver paciente precisando de mobilizacao na sua regiao.</p>
        </div>
        <div class="field-grid field-grid-2">
          ${renderMiniSelect("canal_preferido", "Canal preferido", data.canal_preferido, ["WhatsApp", "E-mail", "Ligacao", "Tanto faz"])}
          <label class="field">
            <span>Observacoes</span>
            <textarea name="observacoes" rows="3" placeholder="Conte algo importante sobre seu interesse ou disponibilidade.">${escapeHtml(data.observacoes)}</textarea>
          </label>
        </div>
        <label class="checkbox-row">
          <input name="consentimento_contato" type="checkbox" required ${checked(data.consentimento_contato)} />
          <span>Autorizo a FlaMedula a entrar em contato comigo para orientacoes, campanhas e avisos relacionados a pacientes que possam precisar de mobilizacao na minha regiao.</span>
        </label>
        <label class="checkbox-row">
          <input name="quer_receber_campanhas" type="checkbox" ${checked(data.quer_receber_campanhas)} />
          <span>Quero receber campanhas, acoes e atualizacoes da rede FlaMedula.</span>
        </label>
      </div>
    `;
  }

  return renderSummary("donor", data, [
    ["Perfil", data.ja_doador_sangue === "Sim" ? "Ja e doador" : "Ainda nao e doador"],
    ["Nome", data.nome],
    ["Contato", `${data.telefone} / ${data.email}`],
    ["Cidade/Estado", `${data.cidade} / ${data.estado}`],
    ["Disponibilidade", data.disponibilidade],
    ["Interesse em sangue", data.quer_doar_sangue],
    ["Interesse em medula", data.quer_doar_medula],
    ["Canal preferido", data.canal_preferido],
    ["Consentimento de contato", data.consentimento_contato ? "Autorizado" : "Nao autorizado"],
    ["Receber campanhas", data.quer_receber_campanhas ? "Sim" : "Nao"]
  ]);
}

function renderPatientStep(state, options) {
  const data = state.patient;
  const step = state.steps.patient;

  if (state.success.patient) {
    return renderSuccess(
      "Caso recebido",
      "Recebemos as informacoes iniciais. A equipe pode analisar e orientar proximos passos. Qualquer divulgacao publica depende de autorizacao e validacao responsavel."
    );
  }

  if (step === 0) {
    return `
      <div class="wizard-step" data-wizard-step>
        <div class="miniapp-panel-copy">
          <span class="eyebrow">Quem cadastra</span>
          <h3>Quem esta cadastrando este caso?</h3>
          <p>Essa resposta ajusta as proximas perguntas e ajuda a equipe a entender o contexto de validacao.</p>
        </div>
        <div class="miniapp-context-note miniapp-context-note-patient">
          <span aria-hidden="true">🛡️</span>
          <p>Antes de qualquer divulgacao publica, a equipe pode precisar validar informacoes e autorizacoes com responsaveis ou profissionais.</p>
        </div>
        <div class="choice-grid choice-grid-3">
          ${options.patientRoles
            .map((role) =>
              renderChoiceButton({
                name: "cadastro_por",
                value: role,
                current: data.cadastro_por,
                title: role,
                text:
                  role === "Medico ou profissional de saude"
                    ? "Informe dados tecnicos e contato profissional."
                    : role === "Responsavel ou familiar"
                      ? "Cadastre o caso com seus dados de responsavel."
                      : "Ajude a rede a validar informacoes antes de divulgar.",
                tone: "patient",
                icon:
                  role === "Medico ou profissional de saude"
                    ? "🩺"
                    : role === "Responsavel ou familiar"
                      ? "👨‍👩‍👧"
                      : "🤝"
              })
            )
            .join("")}
        </div>
      </div>
    `;
  }

  if (step === 1) {
    return `
      <div class="wizard-step" data-wizard-step>
        <div class="miniapp-panel-copy">
          <span class="eyebrow">Dados do caso</span>
          <h3>Dados basicos do paciente/caso.</h3>
          <p>Informe apenas o necessario para leitura inicial e orientacao responsavel.</p>
        </div>
        <div class="field-grid field-grid-2">
          ${renderTextField({ name: "nome_paciente", label: "Nome do paciente", value: data.nome_paciente })}
          ${renderTextField({ name: "idade", label: "Idade", value: data.idade, type: "number", required: false, attrs: 'min="0" max="120"' })}
          ${renderTextField({ name: "cidade", label: "Cidade", value: data.cidade })}
          ${renderTextField({ name: "estado", label: "Estado", value: data.estado, attrs: 'maxlength="2" placeholder="UF"' })}
          ${renderTextField({ name: "hospital", label: "Hospital", value: data.hospital })}
        </div>
      </div>
    `;
  }

  if (step === 2) {
    return `
      <div class="wizard-step" data-wizard-step>
        <div class="miniapp-panel-copy">
          <span class="eyebrow">Necessidade</span>
          <h3>O que este caso precisa agora?</h3>
          <p>A FlaMedula orienta e mobiliza, mas nao substitui hospitais, hemocentros ou canais oficiais.</p>
        </div>
        <div class="field-grid field-grid-2">
          ${renderTextField({ name: "diagnostico", label: "Diagnostico", value: data.diagnostico })}
          ${renderMiniSelect("tipo_sanguineo", "Tipo sanguineo", data.tipo_sanguineo, ["Nao informado", ...options.bloodTypes], false)}
          ${renderMiniSelect("tipo_necessidade", "Necessidade principal", data.tipo_necessidade, options.patientNeedTypes)}
          ${renderMiniSelect("necessita_medula", "Necessita mobilizacao para medula?", data.necessita_medula, ["Sim", "Nao", "Em avaliacao"])}
          ${renderMiniSelect("urgencia", "Urgencia", data.urgencia, options.urgencyLevels)}
          ${renderTextField({ name: "data_limite", label: "Data limite", value: data.data_limite, type: "date", required: false })}
        </div>
      </div>
    `;
  }

  if (step === 3) {
    const isMedical = data.cadastro_por === "Medico ou profissional de saude";

    return `
      <div class="wizard-step" data-wizard-step>
        <div class="miniapp-panel-copy">
          <span class="eyebrow">${isMedical ? "Medico" : "Responsavel"}</span>
          <h3>${isMedical ? "Contato profissional do caso." : "Quem pode validar este caso?"}</h3>
          <p>${isMedical ? "Informe CRM e contato para possivel orientacao da equipe." : "Se voce e apoiador, informe o contato do responsavel quando possivel. A equipe pode precisar validar informacoes antes de qualquer mobilizacao publica."}</p>
        </div>
        <div class="field-grid field-grid-2">
          ${isMedical ? renderTextField({ name: "nome_medico", label: "Nome do medico", value: data.nome_medico }) : ""}
          ${isMedical ? renderTextField({ name: "crm_medico", label: "CRM do medico", value: data.crm_medico }) : ""}
          ${!isMedical ? renderTextField({ name: "nome_responsavel", label: "Nome do responsavel", value: data.nome_responsavel }) : ""}
          ${!isMedical ? renderTextField({ name: "relacao_paciente", label: "Relacao com o paciente", value: data.relacao_paciente }) : ""}
          ${renderTextField({ name: "telefone_responsavel", label: isMedical ? "Telefone de contato" : "Telefone do responsavel", value: data.telefone_responsavel, type: "tel" })}
          ${!isMedical ? renderTextField({ name: "email_responsavel", label: "E-mail do responsavel", value: data.email_responsavel, type: "email" }) : ""}
        </div>
      </div>
    `;
  }

  if (step === 4) {
    return `
      <div class="wizard-step" data-wizard-step>
        <div class="miniapp-panel-copy">
          <span class="eyebrow">Autorizacao e LGPD</span>
          <h3>Uso responsavel das informacoes.</h3>
          <p>As informacoes serao usadas para analise, orientacao e possivel mobilizacao responsavel. Qualquer divulgacao publica depende de autorizacao.</p>
        </div>
        <label class="checkbox-row">
          <input name="autorizacao_divulgacao" type="checkbox" ${checked(data.autorizacao_divulgacao)} />
          <span>Autorizo o uso das informacoes enviadas para analise, orientacao e possivel mobilizacao responsavel.</span>
        </label>
        <label class="checkbox-row">
          <input name="usar_nome_paciente" type="checkbox" ${checked(data.usar_nome_paciente)} />
          <span>Autorizo a divulgacao publica deste caso conforme as informacoes aprovadas neste cadastro.</span>
        </label>
        <label class="field">
          <span>Mensagem publica ou contexto adicional</span>
          <textarea name="mensagem_publica" rows="4" placeholder="Explique o contexto do caso, sempre com responsabilidade.">${escapeHtml(data.mensagem_publica)}</textarea>
        </label>
      </div>
    `;
  }

  return renderSummary("patient", data, [
    ["Quem cadastra", data.cadastro_por],
    ["Paciente", data.nome_paciente],
    ["Cidade/Estado", `${data.cidade} / ${data.estado}`],
    ["Hospital", data.hospital],
    ["Diagnostico", data.diagnostico],
    ["Necessidade", data.tipo_necessidade],
    ["Medula", data.necessita_medula],
    ["Urgencia", data.urgencia],
    ["Contato", data.telefone_responsavel || data.email_responsavel],
    ["Autorizacao de analise", data.autorizacao_divulgacao ? "Autorizado" : "Nao autorizado"],
    ["Uso publico do nome/caso", data.usar_nome_paciente ? "Autorizado" : "Nao autorizado"]
  ]);
}

function renderSummary(flow, data, rows) {
  return `
    <div class="wizard-step wizard-summary" data-wizard-step>
      <div class="miniapp-panel-copy">
        <span class="eyebrow">Resumo</span>
        <h3>Revise antes de enviar.</h3>
        <p>Se algo estiver errado, volte para corrigir. O envio so acontece depois desta confirmacao.</p>
      </div>
      <dl class="summary-list">
        ${rows
          .filter(([, value]) => value !== undefined && value !== null && value !== "")
          .map(
            ([label, value]) => `
              <div>
                <dt>${label}</dt>
                <dd>${escapeHtml(value)}</dd>
              </div>
            `
          )
          .join("")}
      </dl>
      <input type="hidden" name="${flow}-summary-ready" value="${escapeHtml(JSON.stringify(data))}" />
    </div>
  `;
}

function renderSuccess(title, text) {
  return `
    <div class="wizard-success" tabindex="-1">
      <span class="success-icon"><i data-lucide="check"></i></span>
      <h3>${title}</h3>
      <p>${text}</p>
      <button class="button button-secondary" type="button" data-reset-miniapp>Voltar ao inicio do mini app</button>
    </div>
  `;
}

function getFlowData(state) {
  return state.activeFlow === "donor" ? state.donor : state.patient;
}

function setFlowData(state, name, value) {
  if (!state.activeFlow || !(name in getFlowData(state))) {
    return;
  }

  getFlowData(state)[name] = value;
}

function collectCurrentStep(root, state) {
  const step = root.querySelector("[data-wizard-step]");
  if (!step || !state.activeFlow) {
    return true;
  }

  step.querySelectorAll("input, select, textarea").forEach((field) => {
    if (!field.name) {
      return;
    }

    setFlowData(state, field.name, field.type === "checkbox" ? field.checked : field.value);
  });

  const invalid = [...step.querySelectorAll("input, select, textarea")].find((field) => !field.checkValidity());
  if (invalid) {
    invalid.reportValidity();
    return false;
  }

  return true;
}

function validateChoice(state) {
  if (state.activeFlow === "donor" && state.steps.donor === 0 && !state.donor.ja_doador_sangue) {
    state.error = "Escolha uma opcao para continuar.";
    return false;
  }

  if (state.activeFlow === "donor" && state.steps.donor === 3 && !state.donor.quer_doar_sangue) {
    state.error = "Escolha seu interesse em doar sangue.";
    return false;
  }

  if (state.activeFlow === "donor" && state.steps.donor === 4 && !state.donor.quer_doar_medula) {
    state.error = "Escolha seu interesse em receber orientacao sobre medula.";
    return false;
  }

  if (state.activeFlow === "patient" && state.steps.patient === 0 && !state.patient.cadastro_por) {
    state.error = "Escolha quem esta cadastrando o caso.";
    return false;
  }

  state.error = "";
  return true;
}

function isAutoAdvanceStep(flow, step) {
  return (
    (flow === "donor" && [0, 3, 4].includes(step)) ||
    (flow === "patient" && step === 0)
  );
}

function donorPayload(data) {
  return {
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    cidade: data.cidade,
    estado: data.estado,
    idade: data.idade,
    peso: data.peso,
    tipo_sanguineo: data.tipo_sanguineo,
    ja_doador_sangue: data.ja_doador_sangue === "Sim",
    quer_doar_sangue: data.quer_doar_sangue,
    quer_doar_medula: data.quer_doar_medula,
    consentimento_contato: data.consentimento_contato,
    quer_receber_campanhas: data.quer_receber_campanhas,
    canal_preferido: data.canal_preferido,
    disponibilidade: data.disponibilidade,
    observacoes: data.observacoes,
    origem: "site_landing"
  };
}

function patientPayload(data) {
  return {
    nome_paciente: data.nome_paciente,
    idade: data.idade,
    diagnostico: data.diagnostico,
    tipo_sanguineo: data.tipo_sanguineo,
    necessita_medula: data.necessita_medula,
    hospital: data.hospital,
    cidade: data.cidade,
    estado: data.estado,
    nome_medico: data.nome_medico,
    crm_medico: data.crm_medico,
    telefone_responsavel: data.telefone_responsavel,
    tipo_necessidade: data.tipo_necessidade,
    urgencia: data.urgencia,
    data_limite: data.data_limite,
    autorizacao_divulgacao: data.autorizacao_divulgacao,
    usar_nome_paciente: data.usar_nome_paciente,
    mensagem_publica: data.mensagem_publica,
    nome_responsavel: data.nome_responsavel,
    relacao_paciente: data.relacao_paciente,
    email_responsavel: data.email_responsavel,
    origem: "site_landing"
  };
}

export function renderMiniAppsShell() {
  return `<div class="miniapps-root" data-miniapps-root tabindex="-1"></div>`;
}

export function initMiniApps({ miniAppOptions }) {
  const root = document.querySelector("[data-miniapps-root]");

  if (!root) {
    return;
  }

  const state = {
    activeFlow: null,
    steps: {
      donor: 0,
      patient: 0
    },
    donor: clone(DEFAULT_DONOR),
    patient: clone(DEFAULT_PATIENT),
    success: {
      donor: false,
      patient: false
    },
    submitting: false,
    status: null,
    error: ""
  };

  const openFlow = (flow, shouldFocus = true) => {
    state.activeFlow = flow === "patient" || flow === "paciente" ? "patient" : "donor";
    state.status = null;
    state.error = "";
    render();

    if (shouldFocus) {
      root.focus({ preventScroll: true });
      root.querySelector(".miniapps-frame")?.classList.add("is-highlighted");
      window.setTimeout(() => root.querySelector(".miniapps-frame")?.classList.remove("is-highlighted"), 1100);
    }
  };

  const render = () => {
    const isDonor = state.activeFlow === "donor";
    const isPatient = state.activeFlow === "patient";

    root.innerHTML = `
      <div class="miniapps-frame ${state.activeFlow ? `miniapps-frame-${state.activeFlow}` : ""}">
        <div class="miniapps-topbar">
          <div>
            <h3>Como voce quer participar?</h3>
            <p>${state.activeFlow ? `Cadastro de ${FLOW_LABELS[state.activeFlow].toLowerCase()} em etapas guiadas.` : "Escolha uma opcao para abrir o cadastro correto."}</p>
          </div>
          ${
            state.activeFlow
              ? `<button class="miniapp-link-button" type="button" data-reset-miniapp>← Voltar para escolher outra opcao</button>`
              : ""
          }
        </div>

        <div class="miniapps-tabs" role="tablist" aria-label="Escolha entre cadastro de doador ou paciente">
          <button class="miniapps-tab miniapps-tab-donor ${isDonor ? "is-active" : ""}" type="button" role="tab" aria-selected="${String(isDonor)}" data-open-mini-flow="donor">
            🩸 Doador
          </button>
          <button class="miniapps-tab miniapps-tab-patient ${isPatient ? "is-active" : ""}" type="button" role="tab" aria-selected="${String(isPatient)}" data-open-mini-flow="patient">
            🏥 Paciente
          </button>
        </div>

        ${state.activeFlow ? renderProgress(state) : ""}
        ${state.error ? `<p class="miniapp-status miniapp-status-error" aria-live="polite">${state.error}</p>` : ""}
        ${state.status ? `<p class="miniapp-status miniapp-status-${state.status.type}" aria-live="polite">${state.status.message}</p>` : ""}

        <form class="mini-form mini-wizard" data-mini-wizard novalidate>
          ${
            state.activeFlow === "donor"
              ? renderDonorStep(state, miniAppOptions)
              : state.activeFlow === "patient"
                ? renderPatientStep(state, miniAppOptions)
                : renderEntry()
          }

          ${state.activeFlow && !state.success[state.activeFlow] ? renderWizardActions(state) : ""}
        </form>
      </div>
    `;

    bindEvents();
  };

  const advanceCurrentStep = async () => {
    if (!state.activeFlow || state.submitting) {
      return;
    }

    if (!collectCurrentStep(root, state) || !validateChoice(state)) {
      render();
      return;
    }

    const steps = getSteps(state.activeFlow, state);
    const current = state.steps[state.activeFlow];
    const isSummary = current === steps.length - 2;

    if (!isSummary) {
      state.steps[state.activeFlow] = Math.min(current + 1, steps.length - 2);
      state.status = null;
      state.error = "";
      render();
      return;
    }

    state.submitting = true;
    state.status = null;
    state.error = "";
    render();

    const result =
      state.activeFlow === "donor"
        ? await submitDonorLead(donorPayload(state.donor))
        : await submitPatientCase(patientPayload(state.patient));

    state.submitting = false;
    state.status = { type: result.ok ? "success" : "error", message: result.message };

    if (result.ok) {
      state.success[state.activeFlow] = true;
      state.steps[state.activeFlow] = steps.length - 1;
    }

    render();
  };

  const renderWizardActions = () => {
    const steps = getSteps(state.activeFlow, state);
    const current = state.steps[state.activeFlow];
    const isSummary = current === steps.length - 2;
    const autoAdvance = isAutoAdvanceStep(state.activeFlow, current);

    if (autoAdvance) {
      return current === 0
        ? ""
        : `
          <div class="miniapp-actions miniapp-wizard-actions">
            <button class="button button-secondary" type="button" data-wizard-back>Voltar</button>
          </div>
        `;
    }

    return `
      <div class="miniapp-actions miniapp-wizard-actions">
        <button class="button button-secondary" type="button" data-wizard-back ${current === 0 ? "disabled" : ""}>Voltar</button>
        <button class="button ${state.activeFlow === "patient" ? "button-patient" : "button-brand"}" type="button" data-wizard-next ${state.submitting ? "disabled" : ""}>
          ${state.submitting ? "Enviando..." : isSummary ? "Confirmar e enviar" : "Continuar"}
        </button>
      </div>
    `;
  };

  const bindEvents = () => {
    root.querySelectorAll("[data-open-mini-flow]").forEach((button) => {
      button.addEventListener("click", () => openFlow(button.dataset.openMiniFlow, false));
    });

    root.querySelectorAll("[data-choice-name]").forEach((button) => {
      button.addEventListener("click", () => {
        const shouldAutoAdvance = isAutoAdvanceStep(state.activeFlow, state.steps[state.activeFlow]);
        setFlowData(state, button.dataset.choiceName, button.dataset.choiceValue);
        state.error = "";

        if (shouldAutoAdvance) {
          advanceCurrentStep();
          return;
        }

        render();
      });
    });

    root.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("input", () => {
        setFlowData(state, field.name, field.type === "checkbox" ? field.checked : field.value);
      });
      field.addEventListener("change", () => {
        setFlowData(state, field.name, field.type === "checkbox" ? field.checked : field.value);
      });
    });

    root.querySelector("[data-reset-miniapp]")?.addEventListener("click", () => {
      state.activeFlow = null;
      state.status = null;
      state.error = "";
      state.success.donor = false;
      state.success.patient = false;
      render();
    });

    root.querySelector("[data-wizard-back]")?.addEventListener("click", () => {
      if (!state.activeFlow) {
        return;
      }
      collectCurrentStep(root, state);
      state.steps[state.activeFlow] = Math.max(0, state.steps[state.activeFlow] - 1);
      state.status = null;
      state.error = "";
      render();
    });

    root.querySelector("[data-wizard-next]")?.addEventListener("click", advanceCurrentStep);
  };

  render();

  document.querySelectorAll("[data-open-flow], [data-miniapp-target]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const flow = link.dataset.openFlow ?? link.dataset.miniappTarget;

      if (!flow) {
        return;
      }

      event.preventDefault();
      document.querySelector("#cadastro")?.scrollIntoView({ behavior: "smooth", block: "start" });
      openFlow(flow);
    });
  });
}

import { getSupabaseClient } from "./supabaseClient.js";

const activeSubmissions = new Set();

function normalizeValue(value) {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) {
      return null;
    }

    if (/^-?\d+$/.test(trimmed)) {
      return Number.parseInt(trimmed, 10);
    }

    if (/^-?\d+\.\d+$/.test(trimmed)) {
      return Number.parseFloat(trimmed);
    }

    return trimmed;
  }

  if (typeof value === "boolean" || typeof value === "number") {
    return value;
  }

  return value;
}

function normalizePayload(payload) {
  return Object.fromEntries(
    Object.entries(payload).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.map((entry) => normalizeValue(entry)).filter(Boolean)];
      }

      return [key, normalizeValue(value)];
    })
  );
}

async function submitRow(table, payload, submissionKey) {
  if (activeSubmissions.has(submissionKey)) {
    return {
      ok: false,
      mode: "locked",
      message: "Já existe um envio em andamento. Aguarde alguns segundos."
    };
  }

  activeSubmissions.add(submissionKey);

  try {
    const normalized = normalizePayload(payload);
    const supabase = getSupabaseClient();

    if (!supabase) {
      await new Promise((resolve) => window.setTimeout(resolve, 650));
      return {
        ok: true,
        mode: "fallback",
        message: "Recebemos seus dados. A equipe poderá analisar as informações e orientar os próximos passos."
      };
    }

    const { error } = await supabase.from(table).insert(normalized);

    if (error) {
      throw error;
    }

    return {
      ok: true,
      mode: "supabase",
      message: "Dados enviados com sucesso."
    };
  } catch (error) {
    console.error(`Falha ao enviar dados para ${table}:`, error);

    return {
      ok: false,
      mode: "error",
      message:
        "Não foi possível concluir o envio agora. Revise os campos e tente novamente em instantes."
    };
  } finally {
    activeSubmissions.delete(submissionKey);
  }
}

export async function submitDonorLead(payload) {
  return submitRow("donor_leads", payload, "donor_leads");
}

export async function submitPatientCase(payload) {
  return submitRow("patients", payload, "patients");
}

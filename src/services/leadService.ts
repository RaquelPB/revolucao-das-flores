export const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/EouBVTrJfSLGfvKN5IaZ1z?mode=gi_t';

export const GOOGLE_SHEETS_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbzpYIEGa9t76_cJO9OqFoiWSKBvffnGNMBkJt9qVmxG1sUt3-8E_KUTbncci8rDXA31ug/exec';

export const formatLeadName = (name: string): string => {
  if (!name) return '';
  const prepositions = new Set(['de', 'da', 'do', 'das', 'dos', 'e']);
  return name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      if (index > 0 && prepositions.has(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const formatCurrentDateTime = (): string => {
  const now = new Date();
  return now.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Envia o lead formatado para a planilha do Google Sheets via Google Apps Script
 */
export const sendLeadToGoogleSheets = async (lead: {
  fullName: string;
  whatsapp: string;
  source?: string;
}): Promise<boolean> => {
  const url = GOOGLE_SHEETS_SCRIPT_URL;
  if (!url) return false;

  const nomeFormatado = formatLeadName(lead.fullName);
  const whatsappFormatado = formatBrazilianPhone(lead.whatsapp);
  const dataHoraFormatada = formatCurrentDateTime();

  const payload = {
    nome: nomeFormatado,
    fullName: nomeFormatado,
    whatsapp: whatsappFormatado,
    dataHora: dataHoraFormatada,
    source: lead.source || 'hero_form',
    submittedAt: new Date().toISOString(),
  };

  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    return true;
  } catch (error) {
    console.error('Erro ao enviar lead para o Google Sheets:', error);
    return false;
  }
};

export const formatBrazilianPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) {
    return digits.length ? `(${digits}` : '';
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

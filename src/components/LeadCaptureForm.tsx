import React, { useState } from "react";
import {
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import {
  formatBrazilianPhone,
  WHATSAPP_GROUP_URL,
  sendLeadToGoogleSheets,
} from "../services/leadService";

const NAME_CONNECTORS = new Set(["de", "da", "do", "das", "dos", "e"]);

const validateFullName = (value: string): string | null => {
  const name = value.trim().replace(/\s+/g, " ");

  if (!name) {
    return "Por favor, informe seu nome completo.";
  }

  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(name)) {
    return "O nome deve conter apenas letras.";
  }

  const words = name
    .split(" ")
    .filter((word) => !NAME_CONNECTORS.has(word.toLowerCase()));

  if (words.length < 2) {
    return "Por favor, digite seu nome e sobrenome.";
  }

  if (words.some((word) => word.replace(/['-]/g, "").length < 2)) {
    return "Por favor, digite seu nome completo, sem abreviações.";
  }

  return null;
};

const CORNER_BASE =
  "pointer-events-none absolute w-5 h-5 sm:w-6 sm:h-6 border-[#B08A43]";

const CardFrame: React.FC<{
  id?: string;
  badge?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, badge, className = "", children }) => (
  <div
    id={id}
    className={`relative rounded-[26px] p-0.5 bg-linear-to-br from-[#E6C887] via-[#D89886] to-[#8C4435] shadow-[0_0_0_6px_rgba(232,197,176,0.35),0_24px_60px_-16px_rgba(140,68,53,0.45)] ${className}`}
  >
    <div className="relative rounded-3xl bg-linear-to-b from-white to-[#FFFBF8] overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-[18px] border border-dashed border-[#D9B77A]/70"
      />
      <span
        aria-hidden="true"
        className={`${CORNER_BASE} top-3.5 left-3.5 border-t-2 border-l-2 rounded-tl-xl`}
      />
      <span
        aria-hidden="true"
        className={`${CORNER_BASE} top-3.5 right-3.5 border-t-2 border-r-2 rounded-tr-xl`}
      />
      <span
        aria-hidden="true"
        className={`${CORNER_BASE} bottom-3.5 left-3.5 border-b-2 border-l-2 rounded-bl-xl`}
      />
      <span
        aria-hidden="true"
        className={`${CORNER_BASE} bottom-3.5 right-3.5 border-b-2 border-r-2 rounded-br-xl`}
      />

      <div className="relative px-5 pt-7 pb-5 sm:px-8 sm:pt-9 sm:pb-7">
        {children}
      </div>
    </div>
  </div>
);

interface LeadCaptureFormProps {
  source?: string;
  buttonText?: string;
  className?: string;
  variant?: "card" | "inline" | "compact";
  onSuccess?: () => void;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  source = "hero_form",
  buttonText = "Entrar no Grupo do WhatsApp",
  className = "",
  variant = "card",
  onSuccess,
}) => {
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBrazilianPhone(e.target.value);
    setWhatsapp(formatted);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullNameError = validateFullName(fullName);
    if (fullNameError) {
      setError(fullNameError);
      setNameError(true);
      return;
    }

    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Por favor, digite um número de WhatsApp com DDD.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Garante o disparo para a planilha do Google Sheets com limite máximo de 1.2s
      await Promise.race([
        sendLeadToGoogleSheets({ fullName, whatsapp, source }),
        new Promise((resolve) => setTimeout(resolve, 1200)),
      ]);
    } catch (err) {
      console.error("Erro ao processar inscrição:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) onSuccess();

      // Redireciona automaticamente para o Grupo do WhatsApp após 1.2s
      setTimeout(() => {
        window.location.href = WHATSAPP_GROUP_URL;
      }, 1200);
    }
  };

  if (isSubmitted) {
    const confirmation = (
      <div className="text-center animate-fadeIn">
        <div className="w-11 h-11 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-[#6c7427]/10 flex items-center justify-center text-[#6c7427]">
          <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#6c7427]" />
        </div>
        <h4 className="text-lg sm:text-xl font-serif-luxury font-bold text-[#2D2A26] mb-1.5">
          Inscrição Confirmada!
        </h4>
        <p className="text-xs sm:text-sm text-[#5C4F48] mb-3.5 leading-relaxed">
          Redirecionando você para o <strong>Grupo do WhatsApp</strong>...
        </p>
        <a
          href={WHATSAPP_GROUP_URL}
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#6c7427] hover:bg-[#5b6221] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md w-full"
        >
          <span>Acessar Grupo Agora</span>
        </a>
      </div>
    );

    return variant === "card" ? (
      <CardFrame className={className}>{confirmation}</CardFrame>
    ) : (
      <div
        className={`p-4 sm:p-6 rounded-2xl bg-white/95 border border-[#6c7427]/30 shadow-lg ${className}`}
      >
        {confirmation}
      </div>
    );
  }

  const content = (
    <>
      <div className="mb-3.5 sm:mb-4 text-center">
        {variant !== "card" && (
          <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#6c7427] mb-1">
            Vagas Gratuitas Limitadas
          </div>
        )}
        <h3 className="text-lg sm:text-2xl font-serif-luxury font-bold text-[#2D2A26] leading-snug">
          Garanta seu lugar no Workshop
        </h3>
        <div
          aria-hidden="true"
          className="mx-auto mt-1.5 flex items-center justify-center gap-2 text-[#B08A43]"
        >
          <span className="h-px w-8 sm:w-12 bg-linear-to-r from-transparent to-[#D9B77A]" />
          <span className="text-[10px] leading-none">✦</span>
          <span className="h-px w-8 sm:w-12 bg-linear-to-l from-transparent to-[#D9B77A]" />
        </div>
        <p className="text-[11px] sm:text-sm text-[#6B5A52] mt-0.5 sm:mt-1 leading-relaxed">
          Preencha seus dados para receber o link das aulas ao vivo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
        <div>
          <label className="block text-[11px] sm:text-xs font-semibold text-[#4A3B32] mb-1">
            Nome Completo
          </label>
          <input
            type="text"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (error) setError(null);
              if (nameError) setNameError(false);
            }}
            placeholder="Ex: Maria Aparecida Silva"
            aria-invalid={nameError}
            className={`w-full px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border bg-[#FAF8F5] text-xs sm:text-sm text-[#2D2A26] placeholder-[#A6958B] focus:outline-none focus:ring-2 transition-colors ${
              nameError
                ? "border-red-400 focus:ring-red-200 focus:border-red-400"
                : "border-[#D9C4B7] focus:ring-[#B86F5D]/30 focus:border-[#B86F5D]"
            }`}
          />
          <p className="mt-1 text-[10px] sm:text-[11px] text-[#7A6B62]">
            Digite seu nome e sobrenome.
          </p>
        </div>

        <div>
          <label className="block text-[11px] sm:text-xs font-semibold text-[#4A3B32] mb-1">
            WhatsApp (com DDD)
          </label>
          <input
            type="tel"
            required
            value={whatsapp}
            onChange={handlePhoneChange}
            placeholder="(00) 00000-0000"
            className="w-full px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-[#D9C4B7] bg-[#FAF8F5] text-xs sm:text-sm text-[#2D2A26] placeholder-[#A6958B] focus:outline-none focus:ring-2 focus:ring-[#B86F5D]/30 focus:border-[#B86F5D] transition-colors"
          />
        </div>

        {error && (
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-red-50 text-red-700 text-[11px] border border-red-200">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Rose Button with CONSTANT Platinum Shimmer Animation - Compact on mobile */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative group w-full overflow-hidden px-4 py-3 sm:py-3.5 rounded-xl bg-linear-to-r from-[#B86F5D] via-[#A05646] to-[#8C4435] text-white font-semibold text-xs sm:text-base tracking-wide shadow-md hover:shadow-xl platinum-glow active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          {/* Constant sweeping platinum sheen */}
          <span className="absolute inset-0 w-2/3 h-full platinum-sheen pointer-events-none animate-platinum-shimmer" />

          <span className="relative z-10 whitespace-nowrap">
            {isSubmitting ? "Confirmando inscrição..." : buttonText}
          </span>
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-[#7A6B62] pt-0.5 text-center">
          <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#6c7427] shrink-0" />
          <span>
            Ao se inscrever, você será direcionada para o Grupo no WhatsApp.
          </span>
        </div>
      </form>
    </>
  );

  return variant === "card" ? (
    <CardFrame
      id="formulario-inscricao"
      badge="Vagas Gratuitas Limitadas"
      className={className}
    >
      {content}
    </CardFrame>
  ) : (
    <div
      id="formulario-inscricao"
      className={`relative p-3.5 sm:p-5 rounded-xl bg-white/90 border border-[#E8C5B0]/50 ${className}`}
    >
      {content}
    </div>
  );
};

import React, { useState } from "react";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { FloresDaPipolLogo } from "./components/FloresDaPipolLogo";
import { WorkshopLogo } from "./components/WorkshopLogo";
import { WhatsAppIcon } from "./components/WhatsAppIcon";
import { CountdownTimer } from "./components/CountdownTimer";
import { LeadCaptureForm } from "./components/LeadCaptureForm";
import { LeadCaptureModal } from "./components/LeadCaptureModal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("hero_button");

  const forceOpenModal = (source: string) => {
    setModalSource(source);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2A26] font-sans selection:bg-[#E8C5B0] selection:text-[#3B2820] overflow-x-clip">
      {/* FIXED TOP CONTAINER: Both Ribbon and Header are fixed together */}
      <div className="sticky top-0 z-40 shadow-xs">
        {/* 1. TOP NOTICE RIBBON - Mobile optimized */}
        <div className="bg-[#6c7427] text-white px-2.5 sm:px-4 py-1.5 sm:py-2 text-center text-[10.5px] sm:text-xs md:text-sm font-medium border-b border-[#5b6221]">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E2A695] animate-ping" />
            <span className="font-semibold text-white">
              Workshop Revolução das Flores:
            </span>
            <span className="hidden sm:inline">
              Aulas ao vivo em 19 e 20 de Outubro às 19h • 100% Online e
              Gratuito
            </span>
            <span className="inline sm:hidden">
              19 e 20 Out • 19h • Gratuito
            </span>
          </div>
        </div>

        {/* 2. TOP BAR HEADER - Compact on mobile */}
        <header className="bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8C5B0]/60 transition-all">
          <div className="max-w-6xl mx-auto px-3 sm:px-6 h-18 sm:h-23 flex items-center justify-between">
            {/* Zone 1: Brand Wordmark / Logo */}
            <a
              href="#"
              aria-label="Flores da Pipol - início"
              className="flex items-center group py-1 min-w-0"
            >
              <FloresDaPipolLogo size="md" variant="light" withName />
            </a>

            {/* Zone 3: Primary Action -> Opens the lead capture form with CONSTANT PLATINUM SHIMMER */}
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => forceOpenModal("header_cta")}
                className="relative group overflow-hidden px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-linear-to-r from-[#B86F5D] to-[#8C4435] text-white text-[11px] sm:text-xs font-semibold tracking-wide shadow-xs hover:shadow-md platinum-glow transition-all cursor-pointer whitespace-nowrap"
              >
                {/* Constant Sweeping Platinum Sheen */}
                <span className="absolute inset-0 w-2/3 h-full platinum-sheen pointer-events-none animate-platinum-shimmer" />

                <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                  <span className="hidden sm:inline">
                    Garantir Vaga Gratuita
                  </span>
                  <span className="inline sm:hidden font-bold">
                    Garantir Vaga
                  </span>
                </span>
              </motion.button>
            </div>
          </div>
        </header>
      </div>

      {/* 3. HERO SECTION */}
      <section
        id="workshop"
        className="relative pt-4 pb-14 sm:pt-8 sm:pb-20 md:pb-28 overflow-hidden"
      >
        {/* Soft atmospheric gradient background blooms */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-1/2 -translate-x-1/2 w-125 sm:w-175 h-87.5 sm:h-125 bg-linear-to-b from-[#F7DDD4]/50 via-[#F3E7DF]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        />
        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-20 w-60 sm:w-80 h-60 sm:h-80 bg-[#6c7427] rounded-full blur-3xl pointer-events-none -z-10"
        />

        <div className="max-w-4xl mx-auto px-3.5 sm:px-6">
          {/* Top Eyebrow Tag - Compact on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-3 sm:mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#E8C5B0]/30 border border-[#E8C5B0] text-[#8C4435] text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span className="hidden sm:inline">
                Aulas Ao Vivo • 19 e 20 de Outubro às 19h • 100% Gratuito
              </span>
              <span className="inline sm:hidden">
                Ao Vivo • 19 e 20 Out às 19h • 100% Gratuito
              </span>
            </span>
          </motion.div>

          {/* Workshop Logo Lockup */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-4 sm:mb-6"
          >
            <WorkshopLogo size="xl" showSubtitle={false} />
          </motion.div>

          {/* EXACT COPY REQUESTED BY USER - Mobile typography calibrated */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-5xl font-serif-luxury font-bold text-[#2D2A26] leading-tight text-balance"
            >
              Descubra a técnica que irá revolucionar o jeito de fazer flores.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.75,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-2.5 sm:mt-4 text-xs sm:text-base md:text-xl text-[#5C4D44] font-medium leading-relaxed max-w-2xl mx-auto text-balance"
            >
              No Workshop Revolução das Flores, você irá aprender uma técnica
              totalmente nova para criar flores com acabamento profissional, de
              um jeito rápido e prático.
            </motion.p>
          </div>

          {/* Countdown Clock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 sm:mb-10"
          >
            <CountdownTimer />
          </motion.div>

          {/* Centralized Lead Capture Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.75,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-xl mx-auto"
          >
            <LeadCaptureForm
              source="hero_primary"
              buttonText="Entrar no Grupo do WhatsApp"
              variant="card"
            />
          </motion.div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-linear-to-b from-[#F5ECE8] via-[#FAF5F0] to-[#FAF7F2] text-[#3D3530] py-10 sm:py-14 border-t-2 border-[#E8C5B0] text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 pb-6 sm:pb-8 border-b border-[#E8C5B0]/70">
            {/* Logo */}
            <FloresDaPipolLogo size="lg" variant="light" withName />
          </div>

          <div className="pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-[10.5px] sm:text-[11px] text-[#7A6B62] text-center sm:text-left">
            <div>
              © 2026 Flores da Pipol — Transformações. Workshop Revolução das
              Flores. Todos os direitos reservados.
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <span className="font-medium text-[#6c7427]">
                19 e 20 de Outubro às 19h
              </span>
              <span>•</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 6. FLOATING WHATSAPP BUTTON (Mobile responsive with short label) */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end"
      >
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => forceOpenModal("floating_whatsapp")}
          className="relative group flex items-center gap-2 sm:gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-colors cursor-pointer"
          title="Garantir Vaga no Grupo do WhatsApp"
        >
          {/* Subtle pulse ring around the button */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-pulse pointer-events-none" />

          {/* Notification Ping dot */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-red-500 text-[8px] sm:text-[9px] text-white font-bold items-center justify-center">
              1
            </span>
          </span>

          <WhatsAppIcon className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 shrink-0" />

          <span className="relative z-10 font-bold">
            <span className="hidden sm:inline">Garantir Vaga no WhatsApp</span>
            <span className="inline sm:hidden">Garantir Vaga</span>
          </span>
        </motion.button>
      </motion.div>

      {/* Registration Modal triggered by buttons (captures Name + WhatsApp before redirecting) */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source={modalSource}
      />
    </div>
  );
}

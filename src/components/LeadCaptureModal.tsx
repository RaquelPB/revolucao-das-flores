import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LeadCaptureForm } from './LeadCaptureForm';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  source = 'navbar_modal',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with motion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content with spring entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md max-h-[calc(100vh-2rem)] overflow-y-auto pt-4 px-1.5 pb-2"
          >
            <button
              onClick={onClose}
              className="absolute top-0 right-0 z-30 w-8 h-8 rounded-full bg-white shadow-md ring-1 ring-[#E8C5B0] hover:bg-[#FAF5F0] flex items-center justify-center text-[#5C4F48] transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-4 h-4" />
            </button>

            <LeadCaptureForm
              source={source}
              variant="card"
              buttonText="Garantir Vaga & Entrar no WhatsApp"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

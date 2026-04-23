import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, ChevronRight, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import clsx from 'clsx';

// ====================================================================
// CONFIGURAÇÃO: Cole aqui a URL do seu Google Apps Script Web App
// Siga o guia em /docs/google-sheets-setup.md para obter essa URL.
// ====================================================================
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

export function LeadCaptureModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [data, setData] = useState({
    type: '',
    imageName: '',
    length: '',
    width: '',
    cep: '',
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
  });

  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // Reset when closing
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setIsSubmitting(false);
      setSubmitError('');
      setData({
        type: '',
        imageName: '',
        length: '',
        width: '',
        cep: '',
        firstName: '',
        lastName: '',
        email: '',
        whatsapp: '',
      });
    }, 300);
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  // ── Submit to Google Sheets ──────────────────────────────────────
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      timestamp: new Date().toLocaleString('pt-BR'),
      tipo: data.type === 'tapete' ? 'Tapete' : 'Estofado',
      comprimento: data.length,
      largura: data.width,
      cep: data.cep,
      nome: data.firstName,
      sobrenome: data.lastName,
      email: data.email,
      whatsapp: data.whatsapp,
      imagemAnexada: data.imageName || 'Não',
    };

    try {
      if (!GOOGLE_SCRIPT_URL) {
        // Se a URL ainda não foi configurada, simula sucesso para dev
        console.warn(
          '[LeadCaptureModal] VITE_GOOGLE_SCRIPT_URL não configurada. Dados do lead:',
          payload
        );
        await new Promise((r) => setTimeout(r, 800));
        setStep(4);
        return;
      }

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script exige no-cors do frontend
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // no-cors retorna opaque response, então não podemos checar .ok
      // Se não houve exceção, consideramos sucesso.
      setStep(4);
    } catch (err) {
      console.error('Erro ao enviar dados:', err);
      setSubmitError('Ocorreu um erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-0">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-dark/60 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl glass-dark rounded-[2rem] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            {step > 1 && step < 4 && (
              <button
                onClick={prevStep}
                className="text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h3 className="font-sans font-bold text-xl text-white">
              {step === 1 && 'Solicitar Orçamento'}
              {step === 2 &&
                `Detalhes do ${data.type === 'tapete' ? 'Tapete' : 'Estofado'}`}
              {step === 3 && 'Seus Dados'}
              {step === 4 && 'Sucesso!'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 bg-white/5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {/* ── STEP 1: Type Selection ──────────────────────────── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col gap-6"
              >
                <p className="text-white/70 font-sans text-lg text-center mb-4">
                  O que você deseja higienizar hoje?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['tapete', 'estofado'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        updateField('type', type);
                        nextStep();
                      }}
                      className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col items-center gap-4 transition-all hover:bg-white/10 hover:border-accent hover:scale-[1.02]"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        {type === 'tapete' ? (
                          <div className="w-8 h-4 border-2 border-white/80 group-hover:border-accent border-dashed rounded-sm"></div>
                        ) : (
                          <div className="w-8 h-6 border-2 border-white/80 group-hover:border-accent rounded-md flex flex-col justify-end">
                            <div className="h-2 w-full border-t-2 border-inherit"></div>
                          </div>
                        )}
                      </div>
                      <span className="font-sans font-bold text-xl text-white capitalize">
                        {type}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Details ─────────────────────────────────── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col gap-6"
              >
                {data.type === 'tapete' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 font-sans text-sm font-medium">
                      Foto do Tapete
                    </label>
                    <label className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                      <UploadCloud className="text-white/40 group-hover:text-accent w-8 h-8 transition-colors" />
                      <span className="text-white/60 font-sans text-sm">
                        {data.imageName || 'Clique para selecionar a imagem'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) updateField('imageName', file.name);
                        }}
                      />
                    </label>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 font-sans text-sm font-medium">
                      Comprimento (m)
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 2.5"
                      value={data.length}
                      onChange={(e) => updateField('length', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 font-sans text-sm font-medium">
                      Largura (m)
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 1.8"
                      value={data.width}
                      onChange={(e) => updateField('width', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/80 font-sans text-sm font-medium">
                    CEP
                  </label>
                  <input
                    type="text"
                    placeholder="00000-000"
                    value={data.cep}
                    onChange={(e) => updateField('cep', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <button
                  onClick={nextStep}
                  className="mt-4 w-full bg-accent text-dark font-bold rounded-lg py-4 flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors"
                >
                  Continuar <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* ── STEP 3: Lead Info ───────────────────────────────── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 font-sans text-sm font-medium">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={data.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 font-sans text-sm font-medium">
                      Sobrenome
                    </label>
                    <input
                      type="text"
                      value={data.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/80 font-sans text-sm font-medium">
                    E-mail
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={data.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/80 font-sans text-sm font-medium">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={data.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Error message */}
                {submitError && (
                  <p className="text-red-400 text-sm font-sans text-center">
                    {submitError}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={clsx(
                    'mt-4 w-full bg-accent text-dark font-bold rounded-lg py-4 flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(247,166,147,0.3)]',
                    isSubmitting
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:bg-accent/90'
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Solicitar Orçamento'
                  )}
                </button>
              </motion.div>
            )}

            {/* ── STEP 4: Success ─────────────────────────────────── */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-6 py-8"
              >
                <div className="w-20 h-20 rounded-full bg-clean/20 flex items-center justify-center text-clean">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-3xl text-white mb-2">
                    Tudo Certo!
                  </h3>
                  <p className="text-white/70 font-sans">
                    Recebemos os detalhes do seu {data.type}. Nossa equipe
                    entrará em contato via WhatsApp em alguns minutos com o seu
                    orçamento personalizado.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="mt-4 px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
                >
                  Voltar ao site
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

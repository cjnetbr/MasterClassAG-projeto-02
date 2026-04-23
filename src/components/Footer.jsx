export function Footer() {
  return (
    <footer id="contato" className="bg-[#0A0F0C] pt-24 pb-12 px-6 rounded-t-[4rem] relative z-20 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-6 max-w-sm">
          <img
            src="https://mrcleaner.com.br/wp-content/uploads/2020/05/cropped-logo_mrr.png"
            alt="Mr. Cleaner Logo"
            className="h-12 object-contain w-max"
          />
          <p className="font-sans text-white/60 leading-relaxed">
            Inovamos na prestação de serviços de impermeabilização e higienização
            de estofados e tapetes residenciais e empresariais, agregando conforto
            e saúde para nossos clientes.
          </p>

          {/* Status */}
          <div className="flex items-center gap-3 mt-4 bg-white/5 border border-white/10 w-max px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-clean animate-pulse"></span>
            <span className="font-mono text-xs uppercase tracking-wider text-white/80">
              Sistema Operacional
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="font-sans font-bold text-lg mb-2">Navegação</h4>
            <a href="#servicos" className="text-white/60 hover:text-accent transition-colors font-sans text-sm">Serviços</a>
            <a href="#sobre" className="text-white/60 hover:text-accent transition-colors font-sans text-sm">Sobre Nós</a>
            <a href="#depoimentos" className="text-white/60 hover:text-accent transition-colors font-sans text-sm">Depoimentos</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-sans font-bold text-lg mb-2">Contato</h4>
            <a href="tel:+552132681433" className="text-white/60 hover:text-accent transition-colors font-sans text-sm">(21) 3268.1433</a>
            <a href="tel:+5521971586364" className="text-white/60 hover:text-accent transition-colors font-sans text-sm">(21) 97158.6364</a>
            <a href="mailto:atendimento@mrcleaner.com.br" className="text-white/60 hover:text-accent transition-colors font-sans text-sm">atendimento@mrcleaner.com.br</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/40 font-sans text-sm">
          © 2026 Mr. Cleaner. Todos os direitos reservados.
        </p>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/mrcleanerrj/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-sm">Instagram</a>
          <a href="https://www.facebook.com/mrcleaner.rj/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-sm">Facebook</a>
          <a href="https://www.linkedin.com/company/mr-cleaner-higieniza%C3%A7%C3%A3o-e-impermeabiliza%C3%A7%C3%A3o-de-estofados/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-sm">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

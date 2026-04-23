import { Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A0F0C] pt-24 pb-12 px-6 rounded-t-[4rem] relative z-20 text-white overflow-hidden mt-[-4rem]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col gap-6 max-w-sm">
          <span className="font-sans font-bold text-3xl tracking-tight text-white">Mister Cleaner.</span>
          <p className="font-sans text-white/60 leading-relaxed">
            Inovamos na prestação de serviços de impermeabilização e higienização, agregando conforto e saúde para nossos clientes.
          </p>
          
          <div className="flex items-center gap-3 mt-4 bg-white/5 border border-white/10 w-max px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-clean animate-pulse"></span>
            <span className="font-mono text-xs uppercase tracking-wider text-white/80">Sistema Operacional</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="font-sans font-bold text-lg mb-2">Links Úteis</h4>
            <a href="#" className="text-white/60 hover:text-accent transition-colors font-sans text-sm">Nossos Serviços</a>
            <a href="#" className="text-white/60 hover:text-accent transition-colors font-sans text-sm">O Protocolo</a>
            <a href="#" className="text-white/60 hover:text-accent transition-colors font-sans text-sm">Quem Somos</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-sans font-bold text-lg mb-2">Contato</h4>
            <a href="#" className="text-white/60 hover:text-accent transition-colors font-sans text-sm">(21) 3268.1433</a>
            <a href="#" className="text-white/60 hover:text-accent transition-colors font-sans text-sm">(21) 97158.6364</a>
            <a href="#" className="text-white/60 hover:text-accent transition-colors font-sans text-sm">atendimento@mrcleaner.com.br</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/40 font-sans text-sm">© 2026 Mister Cleaner. Todos os direitos reservados.</p>
        <div className="flex gap-4">
          <a href="#" className="text-white/40 hover:text-white transition-colors">Instagram</a>
          <a href="#" className="text-white/40 hover:text-white transition-colors">Facebook</a>
          <a href="#" className="text-white/40 hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

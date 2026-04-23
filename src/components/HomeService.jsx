import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, ShieldPlus, Car } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HomeService({ onOpenModal }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hs-reveal', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 px-6 bg-dark relative z-10 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Atendimento em Domicílio (4.7) */}
          <div className="flex flex-col gap-8">
            <div className="hs-reveal flex flex-col gap-6">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center">
                <Home className="w-7 h-7 text-accent" />
              </div>
              <h2 className="font-sans font-bold text-3xl md:text-4xl text-background tracking-tight">
                Atendimento em Domicílio
              </h2>
              <p className="font-sans text-background/70 text-lg leading-relaxed">
                Nossas equipes utilizam máscaras, luvas e calçados
                antimicrobianos. Tudo é higienizado a cada atendimento.
              </p>
              <button
                onClick={onOpenModal}
                className="hs-reveal mt-2 w-max overflow-hidden relative group rounded-full px-8 py-3.5 font-semibold text-sm uppercase tracking-wide bg-accent text-white transition-transform duration-300 hover:scale-[1.03] shadow-lg"
                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              >
                <span className="relative z-10">Solicite Seu Orçamento</span>
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              </button>
            </div>
          </div>

          {/* Right — Saúde Secundária (4.9) + Cuidados Especiais (4.10) */}
          <div className="flex flex-col gap-6">
            <div className="hs-reveal bg-white/5 backdrop-blur-sm rounded-[2rem] p-8 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <ShieldPlus className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-sans font-bold text-xl text-background mb-3">
                Vida Mais Saudável
              </h3>
              <p className="font-sans text-background/60 text-sm leading-relaxed">
                Limpeza profunda e desodorização de estofados deixando-os
                perfumados e com aspecto renovado. Nossa equipe de profissionais é
                altamente qualificada para realizar os serviços com os mais novos
                e modernos equipamentos do mercado, além de produtos certificados.
              </p>
            </div>

            <div className="hs-reveal bg-white/5 backdrop-blur-sm rounded-[2rem] p-8 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Car className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-sans font-bold text-xl text-background mb-3">
                Cuidados Especiais
              </h3>
              <p className="font-sans text-background/60 text-sm leading-relaxed">
                Carros novos e equipados com ar condicionado para que os
                colaboradores cheguem em segurança e não estejam suados ao
                manusear seus estofados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

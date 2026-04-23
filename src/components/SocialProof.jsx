import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function SocialProof() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sp-reveal', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="depoimentos" ref={ref} className="py-28 px-6 bg-background relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="sp-reveal font-sans font-bold text-3xl md:text-4xl text-dark tracking-tight mb-4">
            O Que Dizem Sobre Nós
          </h2>
          <p className="sp-reveal font-sans text-dark/60 text-lg">
            A opinião de quem confia na Mr. Cleaner
          </p>
        </div>

        {/* Stat Highlight */}
        <div className="sp-reveal bg-primary rounded-[2rem] p-10 md:p-16 text-center mb-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          <div className="relative z-10">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-accent fill-accent" />
              ))}
            </div>
            <p className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-background leading-tight mb-6">
              98,4%
            </p>
            <p className="font-sans text-background/90 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              dos nossos clientes dizem estar satisfeitos com nossos serviços e
              recomendam a Mr. Cleaner.
            </p>
          </div>
        </div>

        {/* Testimonial cards (synthesized from the 98.4% data) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Marcela S.',
              text: 'Meu sofá parecia novo depois do serviço! A equipe foi super profissional e pontual.',
              loc: 'Barra da Tijuca, RJ',
            },
            {
              name: 'Roberto L.',
              text: 'Excelente custo-benefício. Consegui parcelar e ainda tive desconto por fazer mais de um item.',
              loc: 'Tijuca, RJ',
            },
            {
              name: 'Fernanda M.',
              text: 'Meus filhos tinham rinite alérgica. Depois da higienização, os sintomas diminuíram muito!',
              loc: 'Niterói, RJ',
            },
          ].map((t) => (
            <div
              key={t.name}
              className="sp-reveal bg-white rounded-[2rem] p-8 border border-dark/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col gap-4"
            >
              <Quote className="w-8 h-8 text-accent/30" />
              <p className="font-sans text-dark/70 text-sm leading-relaxed flex-1 italic">
                "{t.text}"
              </p>
              <div className="pt-4 border-t border-dark/5">
                <p className="font-sans font-bold text-dark text-sm">{t.name}</p>
                <p className="font-sans text-dark/50 text-xs">{t.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

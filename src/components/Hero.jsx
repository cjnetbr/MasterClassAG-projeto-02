import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Hero({ onOpenModal }) {
  const heroRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRefs.current,
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.15, 
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000" 
          alt="Sofá de veludo escuro" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        {/* Additional noise over the image for texture */}
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
      </div>

      {/* Content - Bottom Left Third */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32">
        <div className="max-w-3xl">
          <h1 className="flex flex-col gap-2">
            <span 
              ref={addToRefs}
              className="font-sans font-bold text-background text-2xl md:text-3xl tracking-tight uppercase"
            >
              O renascimento do seu conforto é a
            </span>
            <span 
              ref={addToRefs}
              className="font-serif italic text-accent text-6xl md:text-8xl lg:text-[8rem] leading-[0.85] tracking-tight ml-[-4px]"
            >
              Purificação Absoluta.
            </span>
          </h1>
          
          <p 
            ref={addToRefs}
            className="mt-8 text-background/80 text-lg md:text-xl max-w-xl font-sans leading-relaxed"
          >
            Muito mais que limpeza. O verdadeiro SPA que seu estofado e tapete merecem, eliminando 99% das ameaças invisíveis.
          </p>

          <div ref={addToRefs} className="mt-10">
            <button 
              onClick={onOpenModal}
              className="overflow-hidden relative group rounded-full px-8 py-4 font-medium text-lg bg-accent text-dark transition-transform duration-300 hover:scale-[1.03] shadow-[0_0_40px_-10px_rgba(247,166,147,0.4)]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              <span className="relative z-10 font-bold tracking-wide uppercase text-sm">Iniciar Orçamento</span>
              <div className="absolute inset-0 bg-white/30 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

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
          delay: 0.3,
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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000"
          alt="Sofá elegante"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20"></div>
      </div>

      {/* Content — Bottom-Left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 md:pb-28">
        <div className="max-w-3xl">
          <h1 className="flex flex-col gap-2">
            <span
              ref={addToRefs}
              className="font-sans font-bold text-background text-2xl md:text-3xl tracking-tight uppercase"
            >
              Seu sofá está sujo?
            </span>
            <span
              ref={addToRefs}
              className="font-serif italic text-accent text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] tracking-tight"
            >
              O SPA do seu sofá.
            </span>
          </h1>

          <p
            ref={addToRefs}
            className="mt-8 text-background/80 text-lg md:text-xl max-w-xl font-sans leading-relaxed"
          >
            Chame a Mr. Cleaner. Serviços profissionais de higienização e
            impermeabilização para estofados e tapetes, agregando conforto e saúde
            para a sua família.
          </p>

          <div ref={addToRefs} className="mt-10">
            <button
              onClick={onOpenModal}
              className="overflow-hidden relative group rounded-full px-8 py-4 font-semibold text-sm uppercase tracking-wide bg-accent text-white transition-transform duration-300 hover:scale-[1.03] shadow-[0_0_40px_-10px_rgba(247,166,147,0.5)]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              <span className="relative z-10">Solicite Seu Orçamento</span>
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

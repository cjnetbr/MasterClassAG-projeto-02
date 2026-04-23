import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CreditCard, TrendingDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Payment({ onOpenModal }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.payment-reveal', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 bg-primary relative z-10 overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — Facilidade de Pagamento */}
          <div className="payment-reveal flex flex-col gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-background tracking-tight">
              Facilidade de Pagamento
            </h2>
            <p className="font-sans text-background/80 text-lg leading-relaxed">
              Parcelamos em até <span className="font-bold text-accent">6x sem juros</span> no cartão de crédito.
            </p>

            {/* Payment Flags */}
            <div className="flex gap-3 mt-2">
              {[
                'https://mrcleaner.com.br/wp-content/uploads/2021/05/01-1-min.png.webp',
                'https://mrcleaner.com.br/wp-content/uploads/2021/05/02-1-min.png.webp',
                'https://mrcleaner.com.br/wp-content/uploads/2021/05/03-1-min.png.webp',
                'https://mrcleaner.com.br/wp-content/uploads/2021/05/04-1-min.png.webp',
              ].map((src, i) => (
                <img key={i} src={src} alt="Bandeira de pagamento" className="h-8 rounded bg-white/90 px-1" />
              ))}
            </div>

            <button
              onClick={onOpenModal}
              className="mt-4 w-max overflow-hidden relative group rounded-full px-8 py-3.5 font-semibold text-sm uppercase tracking-wide bg-accent text-white transition-transform duration-300 hover:scale-[1.03] shadow-lg"
              style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              <span className="relative z-10">Solicite Seu Orçamento</span>
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
          </div>

          {/* Right — Descontos Progressivos */}
          <div className="payment-reveal bg-white/10 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 border border-white/15">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
              <TrendingDown className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-sans font-bold text-2xl md:text-3xl text-background tracking-tight mb-4">
              Descontos Progressivos
            </h3>
            <p className="font-sans text-background/80 text-lg leading-relaxed mb-6">
              Quanto mais itens no mesmo orçamento, mais descontos você tem.
            </p>

            {/* Visual hint */}
            <div className="flex items-end gap-3 mt-4">
              {[40, 60, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-lg bg-accent/30 transition-all duration-500"
                    style={{ height: `${h}px` }}
                  ></div>
                  <span className="font-mono text-xs text-background/60">{(i + 1)} item{i > 0 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

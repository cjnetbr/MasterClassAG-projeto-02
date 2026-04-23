import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

export function Protocol() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create the pinning logic for cards
      cardsRef.current.forEach((card, index) => {
        if (index === cardsRef.current.length - 1) return; // Skip last card

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: sectionRef.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          scrub: 1,
        });

        // Animation when the next card comes up
        const nextCard = cardsRef.current[index + 1];
        if (nextCard) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(10px)',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top bottom',
              end: 'top top',
              scrub: 1,
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const steps = [
    {
      id: "01",
      title: "Descontaminação Molecular",
      desc: "Extração profunda que remove ácaros, bactérias e fungos alojados nas camadas inferiores do estofado.",
      color: "bg-primary text-background",
      graphic: <PatternGraphic />
    },
    {
      id: "02",
      title: "Revitalização de Fibras",
      desc: "Limpeza especializada que restaura a cor vibrante original e a textura natural do tecido, de forma segura.",
      color: "bg-background text-dark",
      graphic: <LaserGraphic />
    },
    {
      id: "03",
      title: "Blindagem Invisível",
      desc: "Nossa impermeabilização inovadora que atua encapsulando as fibras sem alterar o toque ou a respirabilidade.",
      color: "bg-dark text-background",
      graphic: <PulseGraphic />
    }
  ];

  return (
    <section ref={sectionRef} id="o método" className="relative pb-24">
      <div className="max-w-5xl mx-auto px-6 pt-32 mb-12">
        <h2 className="font-sans font-bold text-4xl md:text-5xl text-dark tracking-tight">O Protocolo</h2>
      </div>

      <div className="flex flex-col relative w-full items-center">
        {steps.map((step, i) => (
          <div 
            key={step.id}
            ref={addToRefs}
            className={clsx(
              "w-full h-[100dvh] flex items-center justify-center p-6 sticky top-0 transform origin-top",
              step.color
            )}
          >
            <div className="w-full max-w-5xl rounded-[3rem] p-8 md:p-16 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.1)] flex flex-col md:flex-row gap-12 items-center justify-between glass-panel backdrop-blur-2xl bg-opacity-80 relative overflow-hidden">
              
              <div className="z-10 md:w-1/2 flex flex-col gap-6">
                <span className="font-mono text-xl opacity-50">[{step.id}]</span>
                <h3 className="font-sans font-bold text-4xl md:text-5xl leading-tight">{step.title}</h3>
                <p className="font-sans text-lg opacity-80 leading-relaxed max-w-md">{step.desc}</p>
              </div>

              <div className="z-10 md:w-1/2 h-64 md:h-80 w-full rounded-2xl overflow-hidden relative flex items-center justify-center">
                {step.graphic}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Graphics 
function PatternGraphic() {
  return (
    <svg className="w-full h-full animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3"/>
      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5"/>
      <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" opacity="0.7"/>
      <path d="M50 10 L50 90 M10 50 L90 50 M21.7 21.7 L78.3 78.3 M21.7 78.3 L78.3 21.7" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
    </svg>
  );
}

function LaserGraphic() {
  return (
    <div className="w-full h-full relative grid grid-cols-6 grid-rows-6 gap-2 p-4">
      {Array.from({length: 36}).map((_, i) => (
        <div key={i} className="bg-current opacity-10 rounded-sm"></div>
      ))}
      <div className="absolute left-0 right-0 h-1 bg-accent shadow-[0_0_15px_rgba(247,166,147,1)] animate-[ping-pong_4s_ease-in-out_infinite]" style={{top: '50%'}}></div>
      <style>{`
        @keyframes ping-pong {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
      `}</style>
    </div>
  );
}

function PulseGraphic() {
  return (
    <svg className="w-full h-24" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 50 H50 L65 20 L85 80 L100 50 H200" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" 
        className="stroke-dasharray-400 animate-[dash_3s_linear_infinite]" />
      <style>{`
        .stroke-dasharray-400 { stroke-dasharray: 400; stroke-dashoffset: 400; }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}

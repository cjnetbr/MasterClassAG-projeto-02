import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade up for the text since we don't have SplitText premium plugin
      gsap.from('.reveal-text', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-40 px-6 bg-dark overflow-hidden text-background">
      {/* Background texture */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000" 
          alt="Textura de tecido escuro" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12" ref={textRef}>
        <p className="reveal-text font-sans text-xl md:text-2xl text-background/60 max-w-2xl">
          A maioria do mercado foca em limpeza superficial que apenas disfarça a sujeira visível.
        </p>
        
        <h2 className="reveal-text font-serif italic text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-tight">
          Nós focamos em <br/>
          <span className="text-accent">Saúde Profunda.</span>
        </h2>
      </div>
    </section>
  );
}

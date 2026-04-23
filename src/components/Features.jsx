import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Sparkles, Activity } from 'lucide-react';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

export function Features() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="serviços" ref={containerRef} className="py-32 px-6 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Diagnostic Shuffler */}
          <DiagnosticShufflerCard />

          {/* Card 2: Telemetry Typewriter */}
          <TelemetryTypewriterCard />

          {/* Card 3: Cursor Protocol Scheduler */}
          <CursorSchedulerCard />

        </div>
      </div>
    </section>
  );
}

// 1. Diagnostic Shuffler: 3 cards rotating vertically
function DiagnosticShufflerCard() {
  const [items, setItems] = useState([
    { id: 1, label: 'Bactérias', status: 'Eliminado', color: 'text-red-500' },
    { id: 2, label: 'Ácaros', status: 'Neutralizado', color: 'text-orange-500' },
    { id: 3, label: 'Fungos', status: 'Extraído', color: 'text-primary' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="feature-card bg-white rounded-[2rem] p-8 border border-dark/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col h-[400px]">
      <div className="mb-auto">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Shield className="text-primary w-6 h-6" />
        </div>
        <h3 className="font-sans font-bold text-2xl text-dark mb-3">Higienização Profunda</h3>
        <p className="text-dark/60 font-sans leading-relaxed">
          Nossa tecnologia de extração atinge camadas onde a limpeza comum não chega, garantindo um ambiente purificado.
        </p>
      </div>

      <div className="relative h-32 mt-8 perspective-[1000px] flex items-end pb-2">
        {items.map((item, i) => (
          <div 
            key={item.id}
            className="absolute w-full bg-background rounded-xl p-4 flex justify-between items-center border border-dark/5 transition-all duration-700"
            style={{
              bottom: `${i * 12}px`,
              transform: `scale(${1 - i * 0.05}) translateY(${i * -5}px)`,
              opacity: 1 - i * 0.3,
              zIndex: 10 - i,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <span className="font-mono text-sm font-medium text-dark">{item.label}</span>
            <span className={clsx("font-mono text-xs font-bold uppercase", item.color)}>
              {i === 0 ? item.status : 'Scanning'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. Telemetry Typewriter: live monospaced feed
function TelemetryTypewriterCard() {
  const fullText = "Encapsulamento de fibras ativo. Proteção contra líquidos e manchas iniciada. O tecido respira livremente.";
  const [text, setText] = useState("");
  
  useEffect(() => {
    let i = 0;
    setText(""); // Reset on mount
    const typeWriter = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(typeWriter);
        // Loop after a delay
        setTimeout(() => {
          i = 0;
          setText("");
        }, 5000);
      }
    }, 50);
    
    return () => clearInterval(typeWriter);
  }, []);

  return (
    <div className="feature-card bg-dark rounded-[2rem] p-8 border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] flex flex-col h-[400px]">
      <div className="mb-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
            <Sparkles className="text-accent w-6 h-6" />
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-mono text-[10px] text-white/70 uppercase tracking-wider">Live Feed</span>
          </div>
        </div>
        <h3 className="font-sans font-bold text-2xl text-white mb-3">Impermeabilização</h3>
        <p className="text-white/60 font-sans leading-relaxed">
          Blindagem molecular avançada. Protege seu patrimônio sem alterar a cor ou o toque do tecido original.
        </p>
      </div>

      <div className="bg-black/50 rounded-xl p-4 mt-8 h-32 border border-white/5 overflow-hidden">
        <p className="font-mono text-accent text-sm leading-relaxed">
          <span className="text-white/30 mr-2">&gt;</span>
          {text}
          <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
        </p>
      </div>
    </div>
  );
}

// 3. Cursor Protocol Scheduler
function CursorSchedulerCard() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(3); // Wednesday active
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, scale: 1 });
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    // Animation loop for the fake cursor
    const runAnimation = async () => {
      // Move to a day
      const targetDay = Math.floor(Math.random() * 5) + 1;
      
      setCursorPos({ x: targetDay * 32 + 16, y: 30, scale: 1 });
      await new Promise(r => setTimeout(r, 800));
      
      // Click
      setIsPressing(true);
      setCursorPos(p => ({ ...p, scale: 0.9 }));
      setActiveDay(targetDay);
      await new Promise(r => setTimeout(r, 300));
      
      // Release
      setIsPressing(false);
      setCursorPos(p => ({ ...p, scale: 1 }));
      await new Promise(r => setTimeout(r, 600));
      
      // Move to "Book"
      setCursorPos({ x: 140, y: 80, scale: 1 });
      await new Promise(r => setTimeout(r, 800));
      
      // Click book
      setIsPressing(true);
      setCursorPos(p => ({ ...p, scale: 0.9 }));
      await new Promise(r => setTimeout(r, 300));
      
      setIsPressing(false);
      setCursorPos(p => ({ ...p, scale: 1 }));
    };

    const interval = setInterval(runAnimation, 4000);
    runAnimation();
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="feature-card bg-secondary rounded-[2rem] p-8 shadow-[0_20px_40px_-15px_rgba(27,176,206,0.3)] flex flex-col h-[400px]">
      <div className="mb-auto">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6">
          <Activity className="text-white w-6 h-6" />
        </div>
        <h3 className="font-sans font-bold text-2xl text-white mb-3">Conforto em Domicílio</h3>
        <p className="text-white/80 font-sans leading-relaxed">
          Equipes uniformizadas com EPIs antimicrobianos. O SPA vai até você com máxima segurança e comodidade.
        </p>
      </div>

      <div className="bg-white/10 rounded-xl p-6 mt-8 relative overflow-hidden h-32 border border-white/20">
        <div className="flex justify-between mb-4 relative z-10">
          {days.map((day, i) => (
            <div 
              key={i} 
              className={clsx(
                "w-6 h-6 flex items-center justify-center rounded-md font-mono text-xs font-bold transition-colors duration-300",
                activeDay === i ? "bg-white text-secondary" : "bg-transparent text-white/50"
              )}
            >
              {day}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center relative z-10">
          <div className={clsx(
            "px-6 py-2 rounded-full font-mono text-xs font-bold uppercase transition-transform duration-300",
            isPressing && cursorPos.y > 60 ? "bg-white text-secondary scale-95" : "bg-white/20 text-white"
          )}>
            Agendar
          </div>
        </div>

        {/* Fake Cursor */}
        <div 
          className="absolute z-20 transition-all duration-700 pointer-events-none"
          style={{ 
            transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) scale(${cursorPos.scale})`,
            transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 3.21V20.8C5.5 21.43 6.22 21.79 6.72 21.41L11.02 18.15C11.23 17.99 11.5 17.9 11.78 17.9H18.5C19.12 17.9 19.48 17.15 19.09 16.66L5.5 3.21Z" fill="#1A1A1A" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

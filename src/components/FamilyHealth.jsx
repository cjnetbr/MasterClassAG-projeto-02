import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Users, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function FamilyHealth() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fh-reveal', {
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
    <section id="sobre" ref={ref} className="py-28 px-6 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Top — Saúde e Família (4.5) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="fh-reveal">
            <img
              src="https://mrcleaner.com.br/wp-content/uploads/2021/04/familia.jpg.webp"
              alt="Família saudável"
              className="w-full h-[400px] object-cover rounded-[2rem] shadow-xl"
            />
          </div>
          <div className="fh-reveal flex flex-col gap-6">
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight">
              Mais Conforto e Saúde Para Sua Família!
            </h2>
            <div className="flex flex-col gap-4 font-sans text-dark/70 text-lg leading-relaxed">
              <p>
                Seus estofados estão sujos, com cheiros desagradáveis, encardidos
                ou já perderam aquele brilho de estofado novo?
              </p>
              <p>
                Comprar novos e descartar os antigos não fará bem ao seu bolso nem
                ao meio ambiente.
              </p>
              <p>
                A limpeza cotidiana não é suficiente para mantê-los limpos e
                confortáveis.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom — Valores da Empresa (4.6) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: 'Nossos Valores',
              desc: 'A segurança e a saúde dos colaboradores e clientes. O respeito ao meio ambiente. A ética e a integridade em nossos negócios.',
            },
            {
              icon: Users,
              title: 'Profissionais Qualificados',
              desc: 'Fazemos uma gestão cuidadosa dos nossos colaboradores, desde a seleção criteriosa, a capacitação técnica, uniformes, equipamentos de proteção e rigoroso monitoramento da saúde.',
            },
            {
              icon: Leaf,
              title: 'Produtos de Qualidade',
              desc: 'Todos os nossos produtos são biodegradáveis, atendem as normas ambientais e as exigências feitas pela ANVISA.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="fh-reveal bg-white rounded-[2rem] p-8 border border-dark/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-sans font-bold text-xl text-dark">
                  {item.title}
                </h3>
                <p className="font-sans text-dark/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

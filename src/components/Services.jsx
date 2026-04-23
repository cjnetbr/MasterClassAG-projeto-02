import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Droplets, BedDouble, Layers, Blinds } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Sparkles,
    title: 'Higienização de Estofados',
    description:
      'A limpeza e higienização agregam valor e durabilidade ao seu estofado. Além de revitalizar a cor e a textura do tecido, eliminam odores desagradáveis, removem ácaros, bactérias, fungos e vírus.',
    image:
      'https://mrcleaner.com.br/wp-content/uploads/elementor/thumbs/higienizacao-min2-qni7eauh9svjyg2t0whozspwsspe0wqkpjy590uz3g.jpg',
  },
  {
    icon: Droplets,
    title: 'Impermeabilização de Estofados',
    description:
      'Nosso método inovador de impermeabilização atua por meio do encapsulamento das fibras e dos fios, permitindo ao estofado "respirar" normalmente, sem alterar o toque ou a cor do tecido.',
    image:
      'https://mrcleaner.com.br/wp-content/uploads/elementor/thumbs/Impermeabilizacao22min-qni7eelu150p8vxcey479rrr6c6uvp5i22k364peek.jpg',
  },
  {
    icon: BedDouble,
    title: 'Higienização de Colchões',
    description:
      'Seu colchão acumula 1 milhão de ácaros e bactérias a cada ano, sem falar das manchas amareladas causadas pelo suor, que enfraquecem a fibra do tecido e diminuem a vida útil. Higienize a cada 6 meses.',
    image:
      'https://mrcleaner.com.br/wp-content/uploads/2021/05/limpeza-de-colchao.jpg.webp',
  },
  {
    icon: Layers,
    title: 'Higienização de Tapetes',
    description:
      'Utilizamos equipamentos e produtos de última geração. O processo inclui desodorização, escovação, enxague, centrifugação e secagem em estufa.',
    image:
      'https://mrcleaner.com.br/wp-content/uploads/2021/05/tapete-2-min.jpg.webp',
  },
  {
    icon: Blinds,
    title: 'Higienização de Cortinas e Persianas',
    description:
      'Cortinas e persianas funcionam como um filtro, retendo cerca de 70% da sujeira que entra na sua casa pelo ar. Nossos serviços incluem desmontagem, lavagem, revisão, manutenção e reinstalação.',
    image:
      'https://mrcleaner.com.br/wp-content/uploads/2021/05/limpeza-de-tapetes2-min.jpg.webp',
  },
];

export function Services() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current.querySelectorAll('.service-card');
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="servicos" ref={containerRef} className="py-28 px-6 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-dark tracking-tight mb-4">
            Nossos Serviços
          </h2>
          <p className="font-sans text-dark/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Realizados por profissionais especializados, com os produtos e
            equipamentos mais modernos do mercado, garantindo alta qualidade para
            você.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-card group bg-white rounded-[2rem] overflow-hidden border border-dark/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-sans font-bold text-xl text-dark mb-3">
                    {service.title}
                  </h3>
                  <p className="font-sans text-dark/60 text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

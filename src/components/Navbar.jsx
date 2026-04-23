import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

export function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center mt-4 sm:mt-6 px-4">
      <div 
        className={clsx(
          "flex items-center justify-between w-full max-w-5xl rounded-[2rem] px-6 py-3 transition-all duration-500",
          scrolled ? "glass-panel border-white/30" : "bg-transparent border-transparent"
        )}
      >
        <div className="flex items-center gap-2">
          {/* Using text logo to be clean, or the actual logo if desired. For cinematographic look, text is very sharp */}
          <span className={clsx(
            "font-sans font-bold text-xl tracking-tight transition-colors duration-500",
            scrolled ? "text-primary" : "text-background"
          )}>
            Mister Cleaner.
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Serviços', 'O Método', 'Depoimentos'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={clsx(
                "text-sm font-medium transition-all duration-300 hover:-translate-y-[1px]",
                scrolled ? "text-primary/70 hover:text-primary" : "text-background/80 hover:text-background"
              )}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenModal}
            className={clsx(
              "hidden md:block overflow-hidden relative group rounded-full px-6 py-2.5 font-medium text-sm transition-transform duration-300 hover:scale-[1.03]",
              scrolled ? "bg-accent text-dark" : "bg-background text-primary"
            )}
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            <span className="relative z-10">Solicitar Orçamento</span>
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          </button>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 
              <X className={scrolled ? "text-primary" : "text-background"} /> : 
              <Menu className={scrolled ? "text-primary" : "text-background"} />
            }
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[calc(100%+1rem)] left-4 right-4 glass-panel rounded-[2rem] p-6 flex flex-col gap-4 md:hidden">
          {['Serviços', 'O Método', 'Depoimentos'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-primary font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenModal();
            }}
            className="mt-4 bg-accent text-dark rounded-full px-6 py-3 font-medium w-full"
          >
            Solicitar Orçamento
          </button>
        </div>
      )}
    </header>
  );
}

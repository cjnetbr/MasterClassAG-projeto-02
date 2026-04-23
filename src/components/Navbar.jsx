import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

export function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center mt-4 sm:mt-6 px-4">
      <div
        className={clsx(
          "flex items-center justify-between w-full max-w-5xl rounded-[2rem] px-6 py-3 transition-all duration-500 border",
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-dark/10 shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
            : "bg-dark/30 backdrop-blur-md border-white/10"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://mrcleaner.com.br/wp-content/uploads/2020/05/cropped-logo_mrr.png"
            alt="Mr. Cleaner Logo"
            className="h-8 object-contain"
          />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Serviços', href: '#servicos' },
            { label: 'Sobre Nós', href: '#sobre' },
            { label: 'Depoimentos', href: '#depoimentos' },
            { label: 'Contato', href: '#contato' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={clsx(
                "text-sm font-medium transition-all duration-300 hover:-translate-y-[1px]",
                scrolled
                  ? "text-dark/70 hover:text-dark"
                  : "text-white/90 hover:text-white"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenModal}
            className={clsx(
              "hidden md:block overflow-hidden relative group rounded-full px-6 py-2.5 font-semibold text-sm transition-transform duration-300 hover:scale-[1.03]",
              scrolled
                ? "bg-accent text-white shadow-[0_4px_15px_rgba(247,166,147,0.4)]"
                : "bg-accent text-white shadow-[0_4px_15px_rgba(247,166,147,0.3)]"
            )}
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            <span className="relative z-10">Solicitar Orçamento</span>
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={scrolled ? "text-dark" : "text-white"} />
            ) : (
              <Menu className={scrolled ? "text-dark" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[calc(100%+0.5rem)] left-4 right-4 bg-white/95 backdrop-blur-xl border border-dark/10 shadow-xl rounded-[2rem] p-6 flex flex-col gap-4 md:hidden">
          {[
            { label: 'Serviços', href: '#servicos' },
            { label: 'Sobre Nós', href: '#sobre' },
            { label: 'Depoimentos', href: '#depoimentos' },
            { label: 'Contato', href: '#contato' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-dark font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenModal();
            }}
            className="mt-4 bg-accent text-white rounded-full px-6 py-3 font-semibold w-full"
          >
            Solicitar Orçamento
          </button>
        </div>
      )}
    </header>
  );
}

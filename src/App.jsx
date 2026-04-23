import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Payment } from './components/Payment';
import { FamilyHealth } from './components/FamilyHealth';
import { HomeService } from './components/HomeService';
import { SocialProof } from './components/SocialProof';
import { Footer } from './components/Footer';
import { LeadCaptureModal } from './components/LeadCaptureModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="noise-overlay"></div>

      <Navbar onOpenModal={openModal} />

      <main>
        {/* 4.1 Hero */}
        <Hero onOpenModal={openModal} />

        {/* 4.2 Serviços */}
        <Services />

        {/* 4.3 + 4.4 Pagamento & Descontos */}
        <Payment onOpenModal={openModal} />

        {/* 4.5 + 4.6 Saúde/Família & Valores */}
        <FamilyHealth />

        {/* 4.7 + 4.9 + 4.10 Domicílio, Saúde, Cuidados */}
        <HomeService onOpenModal={openModal} />

        {/* 4.8 Prova Social */}
        <SocialProof />
      </main>

      <Footer />

      <LeadCaptureModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default App;

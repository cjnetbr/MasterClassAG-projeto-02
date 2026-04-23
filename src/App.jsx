import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Philosophy } from './components/Philosophy';
import { Protocol } from './components/Protocol';
import { Footer } from './components/Footer';
import { LeadCaptureModal } from './components/LeadCaptureModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="noise-overlay"></div>
      
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <main>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <Features />
        <Philosophy />
        <Protocol />
      </main>

      <Footer />

      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}

export default App;

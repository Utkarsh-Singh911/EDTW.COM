
import React, { useState, useCallback, useRef, useEffect } from 'react';
import EncryptSection from './components/EncryptSection';
import DecryptSection from './components/DecryptSection';

type Tab = 'encrypt' | 'decrypt';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('encrypt');
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const infoModalRef = useRef<HTMLDivElement>(null);
  const infoIconRef = useRef<HTMLDivElement>(null);

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  const toggleInfoModal = () => {
    setInfoModalOpen(prev => !prev);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      isInfoModalOpen &&
      infoModalRef.current &&
      !infoModalRef.current.contains(event.target as Node) &&
      infoIconRef.current &&
      !infoIconRef.current.contains(event.target as Node)
    ) {
      setInfoModalOpen(false);
    }
  }, [isInfoModalOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
  

  const TabButton: React.FC<{ tabId: Tab; label: string }> = ({ tabId, label }) => (
    <button
      onClick={() => switchTab(tabId)}
      className={`py-2 px-6 rounded-full font-semibold transition-all duration-300 ${
        activeTab === tabId
          ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(255,140,0,0.5),_0_0_20px_rgba(255,140,0,0.3)]'
          : 'bg-orange-500/10 text-gray-700 border border-orange-500/30 hover:bg-orange-500/20'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white text-gray-800 min-h-screen flex flex-col items-center pt-10 px-4">
      <header className="relative flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold text-orange-500 [text-shadow:0_0_5px_rgba(255,140,0,0.5)]">
          Encryptrix - Hill Cipher Model
        </h1>
        <div 
          ref={infoIconRef}
          onClick={toggleInfoModal} 
          className="info-icon mt-1.5 flex items-center justify-center w-6 h-6 rounded-full border border-gray-500 text-gray-500 font-bold cursor-pointer transition-colors hover:border-orange-500 hover:text-orange-500"
        >
          i
        </div>

        {isInfoModalOpen && (
          <div 
            ref={infoModalRef}
            className="info-modal absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 max-w-xs p-4 bg-white rounded-lg shadow-2xl border border-orange-500 z-10 text-left text-sm text-gray-700"
          >
             <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-8 border-transparent border-b-orange-500"></div>
            This Encryption–Decryption Model works on the concept of Hill Cipher, a classical cryptographic technique based on linear algebra and matrix multiplication. It uses a 2x2 key matrix and mod 27 system to convert plaintext into encrypted text (ciphertext) through modular arithmetic.
          </div>
        )}
      </header>

      <div className="tabs flex gap-4 mb-8">
        <TabButton tabId="encrypt" label="Encrypt" />
        <TabButton tabId="decrypt" label="Decrypt" />
      </div>

      <main className="w-full max-w-lg">
        <div style={{ display: activeTab === 'encrypt' ? 'block' : 'none' }}>
          <EncryptSection />
        </div>
        <div style={{ display: activeTab === 'decrypt' ? 'block' : 'none' }}>
          <DecryptSection />
        </div>
      </main>
    </div>
  );
};

export default App;

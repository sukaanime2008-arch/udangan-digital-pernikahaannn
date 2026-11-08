import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, Image as ImageIcon, MessageSquareHeart } from 'lucide-react';

interface FloatingNavProps {
  isVisible: boolean;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ isVisible }) => {
  const [activeSection, setActiveSection] = useState('cover');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['cover', 'mempelai', 'acara', 'galeri', 'doa'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  if (!isVisible) return null;

  const navItems = [
    { id: 'cover', label: 'Sampul', icon: Home },
    { id: 'mempelai', label: 'Mempelai', icon: Users },
    { id: 'acara', label: 'Acara', icon: Calendar },
    { id: 'galeri', label: 'Galeri', icon: ImageIcon },
    { id: 'doa', label: 'Doa', icon: MessageSquareHeart },
  ];

  return (
    <nav
      aria-label="Navigasi Undangan"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-lg bg-[#FAF9F6]/95 backdrop-blur-md rounded-2xl sm:rounded-full border border-[#8FA9C4]/40 shadow-xl shadow-stone-900/10 px-3 py-2 transition-all duration-300"
    >
      <div className="grid grid-cols-5 items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`min-h-[52px] sm:min-h-[56px] flex flex-col items-center justify-center rounded-xl sm:rounded-full transition-all ${
                isActive
                  ? 'text-[#000080] font-bold'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl sm:rounded-full transition-transform ${
                  isActive ? 'bg-[#8FA9C4]/25 scale-110 shadow-xs' : ''
                }`}
              >
                <Icon
                  className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${
                    isActive ? 'text-[#000080]' : 'text-stone-400'
                  }`}
                />
              </div>
              <span className="text-[11px] sm:text-xs tracking-tight mt-1 leading-none font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

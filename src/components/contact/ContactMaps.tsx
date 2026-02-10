"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, MapPin, X } from 'lucide-react';

type MapCard = {
  key: 'hanoi' | 'dienbien';
  title: string;
  subtitle: string;
  address: string;
  href: string;
  embedSrc: string;
  imageSrc: string;
  badge: string;
};

const MAP_CARDS: readonly MapCard[] = [
  {
    key: 'hanoi',
    title: 'Hà Nội',
    subtitle: 'Văn phòng đại lý',
    address: '29 Đ. Đức Diễn, Phúc Diễn, Bắc Từ Liêm, Hà Nội',
    href: 'https://www.google.com/maps?q=29%20%C4%90.%20%C4%90%E1%BB%A9c%20Di%E1%BB%85n,%20Ph%C3%BAc%20Di%E1%BB%85n,%20B%E1%BA%AFc%20T%E1%BB%AB%20Li%C3%AAm,%20H%C3%A0%20N%E1%BB%99i&hl=vi',
    embedSrc: 'https://www.google.com/maps?q=29%20%C4%90.%20%C4%90%E1%BB%A9c%20Di%E1%BB%85n,%20Ph%C3%BAc%20Di%E1%BB%85n,%20B%E1%BA%AFc%20T%E1%BB%AB%20Li%C3%AAm,%20H%C3%A0%20N%E1%BB%99i&output=embed',
    imageSrc: '/maps/hanoi.jpg',
    badge: 'Đại lý',
  },
  {
    key: 'dienbien',
    title: 'Điện Biên',
    subtitle: 'Văn phòng tại Điện Biên',
    address: 'Điện Biên, Việt Nam',
    href: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29748.60782148131!2d102.99880025449221!3d21.24865653336059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312da63c482e1957%3A0xcd1dd4341aa09458!2zU2FtIE3hu6luLCBoLiDEkGnhu4duIEJpw6puLCDEkGnhu4duIEJpw6puLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1770733421813!5m2!1svi!2s',
    embedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29748.60782148131!2d102.99880025449221!3d21.24865653336059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312da63c482e1957%3A0xcd1dd4341aa09458!2zU2FtIE3hu6luLCBoLiDEkGnhu4duIEJpw6puLCDEkGnhu4duIEJpw6puLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1770733421813!5m2!1svi!2s',
    imageSrc: '/maps/dienbien.jpg',
    badge: 'Sản xuất',
  },
];

export default function ContactMaps() {
  const [openMapKey, setOpenMapKey] = useState<'hanoi' | 'dienbien' | null>(null);
  const [mounted, setMounted] = useState(false);

  const activeMap = openMapKey ? MAP_CARDS.find((m) => m.key === openMapKey) : null;
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {MAP_CARDS.map((card, index) => (
          <motion.button
            key={card.key}
            type="button"
            onClick={() => setOpenMapKey(card.key)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="card-premium overflow-hidden group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-premium-red/50 rounded-[2rem] border-border/60 hover:border-festive-gold/30 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.25)] bg-white"
            aria-label={`Open map popup - ${card.title}`}
          >
            <div className="relative aspect-[16/10] md:aspect-[16/9] w-full">
              <Image
                src={card.imageSrc}
                alt={`Map preview - ${card.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              <iframe
                title={`Mini map hover - ${card.title}`}
                src={card.embedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="pointer-events-none absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 border-0"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"/>
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center rounded-full border border-premium-red/20 bg-background/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-premium-red shadow-sm uppercase tracking-widest">
                  {card.badge}
                </span>
              </div>
              <div className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full border border-festive-gold/30 bg-background/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-foreground transition-all group-hover:bg-festive-gold group-hover:text-premium-red shadow-sm">
                <ExternalLink className="w-4 h-4 text-premium-red"/>
                Mở Maps
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-festive-gold animate-pulse shrink-0" />
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mt-2">{card.subtitle}</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/70">Xem maps</span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeMap && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
                onClick={() => setOpenMapKey(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="relative w-full max-w-5xl aspect-video bg-white rounded-[2rem] overflow-hidden shadow-2xl z-[10000]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setOpenMapKey(null)}
                    className="absolute top-6 right-6 z-10 p-3 bg-white/10 backdrop-blur-md hover:bg-premium-red hover:text-white text-white rounded-full transition-all border border-white/20"
                  >
                    <X size={24} />
                  </button>
                  
                  <div className="absolute top-6 left-6 z-10 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl max-w-sm hidden md:block">
                    <h4 className="text-xl font-bold text-foreground mb-2">{activeMap.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{activeMap.address}</p>
                    <a
                      href={activeMap.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-premium-red font-bold text-sm hover:underline"
                    >
                      <ExternalLink size={16} />
                      Mở trong Google Maps
                    </a>
                  </div>

                  <iframe
                    src={activeMap.embedSrc}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

"use client";

import { useState } from 'react';
import Image from 'next/image';
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
    href: 'https://www.google.com/maps?q=%C4%90i%E1%BB%87n%20Bi%C3%AAn,%20Vi%E1%BB%87t%20Nam&hl=vi',
    embedSrc: 'https://www.google.com/maps?q=%C4%90i%E1%BB%87n%20Bi%C3%AAn,%20Vi%E1%BB%87t%20Nam&output=embed',
    imageSrc: '/maps/dienbien.jpg',
    badge: 'Sản xuất',
  },
];

export default function ContactMaps() {
  const [openMapKey, setOpenMapKey] = useState<'hanoi' | 'dienbien' | null>(null);

  const activeMap = openMapKey ? MAP_CARDS.find((m) => m.key === openMapKey) : null;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {MAP_CARDS.map((card, index) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index }}
            className="group cursor-pointer"
            onClick={() => setOpenMapKey(card.key)}
          >
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl mb-6">
              <Image
                src={card.imageSrc}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-premium-red text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {card.badge}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-1">{card.title}</h3>
                <p className="text-white/70 text-sm">{card.subtitle}</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 border border-white/30">
                <MapPin className="text-white w-8 h-8" />
              </div>
            </div>
            <div className="flex items-start gap-4 p-2">
              <div className="w-10 h-10 rounded-xl bg-premium-red/5 flex items-center justify-center text-premium-red flex-shrink-0 group-hover:bg-premium-red group-hover:text-white transition-all duration-300">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  {card.address}
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <span className="text-xs font-bold text-premium-red uppercase tracking-wider">Xem bản đồ</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpenMapKey(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-white rounded-[2rem] overflow-hidden shadow-2xl"
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
      </AnimatePresence>
    </>
  );
}

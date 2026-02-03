"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { TrongDongBadge } from '@/components/TrongDongPattern';
import Reveal from '@/components/Reveal';

interface WhyChooseUsClientProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export default function WhyChooseUsClient({ icon, title, description, index }: WhyChooseUsClientProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const maxLength = 120;
  const isLongText = description.length > maxLength;

  const getExcerpt = (text: string) => {
    if (text.length <= maxLength) return text;
    const trimmed = text.slice(0, maxLength);
    const lastSpace = trimmed.lastIndexOf(' ');
    const cutIndex = lastSpace > 60 ? lastSpace : maxLength;
    return `${trimmed.slice(0, cutIndex).trim()}...`;
  };

  return (
    <Reveal
      delay={index * 0.15}
      y={30}
      className="h-full"
    >
      <motion.div
        layout
        whileHover={{ y: -10 }}
        className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-premium-red/10 hover:border-festive-gold/40 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.15)] transition-all duration-500 relative group overflow-hidden flex flex-col h-full"
      >
        {/* Card Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] -mr-8 -mt-8 group-hover:opacity-[0.08] group-hover:scale-110 group-hover:text-festive-gold transition-all duration-700 pointer-events-none">
          <TrongDongBadge className="w-full h-full text-premium-red" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            layout
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-premium-red/10 to-festive-gold/10 flex items-center justify-center mb-6 relative group/icon"
          >
            <div className="absolute inset-0 bg-festive-gold/20 blur-xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
            {icon}
          </motion.div>
          
          <motion.h3 layout className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-premium-red transition-colors duration-300">
            {title}
          </motion.h3>

          <div className="flex-1 overflow-hidden">
            <motion.div
              layout
              initial={false}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              <AnimatePresence mode="wait">
                {!isExpanded ? (
                  <motion.p
                    key="excerpt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getExcerpt(description)}
                  </motion.p>
                ) : (
                  <motion.p
                    key="full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Festive Decorative Line */}
          <motion.div 
            layout
            className="h-0.5 w-8 bg-premium-red/20 mt-6 group-hover:w-full group-hover:bg-festive-gold/30 transition-all duration-500" 
          />

          {/* Expand/Collapse */}
          {isLongText && (
            <motion.button
              layout
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              className="mt-6 inline-flex items-center text-premium-red hover:text-festive-gold transition-colors duration-300 w-fit"
            >
              <span className="text-xs font-bold uppercase tracking-widest mr-2">
                {isExpanded ? 'Thu gọn' : 'Xem thêm'}
              </span>
              <div className={`p-1 rounded-full bg-premium-red/5 group-hover:bg-festive-gold/10 transition-colors duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronRight
                  className="w-3 h-3 transition-transform duration-300"
                />
              </div>
            </motion.button>
          )}
        </div>
      </motion.div>
    </Reveal>
  );
}

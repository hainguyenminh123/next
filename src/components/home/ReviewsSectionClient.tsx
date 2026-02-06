"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Review } from '@/types/database';
import Reveal from '@/components/Reveal';

interface ReviewsSectionClientProps {
  allReviews: Review[];
}

export default function ReviewsSectionClient({ allReviews }: ReviewsSectionClientProps) {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;
  const totalPages = Math.max(1, Math.ceil(allReviews.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paginatedReviews = allReviews.slice(start, start + PAGE_SIZE);

  const goto = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <>
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {paginatedReviews.map((review, index) => (
          <Reveal
            key={review.id}
            delay={index * 0.06}
            y={40}
            className="h-full"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-card/80 backdrop-blur-sm p-6 md:p-7 rounded-3xl border border-premium-red/10 hover:border-festive-gold/40 hover:shadow-[0_15px_30px_-10px_rgba(212,175,55,0.12)] transition-all duration-500 relative group overflow-hidden flex flex-col h-full"
            >
              <Quote className="w-8 h-8 text-premium-red/10 group-hover:text-premium-red/20 transition-colors duration-500 mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-festive-gold text-festive-gold drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]"
                  />
                ))}
              </div>
              
              <p className="text-foreground leading-relaxed mb-6 text-sm font-light italic line-clamp-4 flex-1">
              &quot;{review.content}&quot;
              </p>
              
              <div className="flex items-center justify-between pt-5 border-t border-premium-red/5 mt-auto">
                <div>
                  <p className="font-bold text-sm text-foreground group-hover:text-premium-red transition-colors duration-300">{review.name}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{review.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  {review.createdAt && (
                    <span className="text-[10px] font-bold text-premium-red/60 bg-premium-red/5 px-3 py-1 rounded-full inline-flex items-center border border-premium-red/10">
                      <Calendar className="w-3 h-3 mr-1.5" />
                      {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="h-0.5 w-8 bg-premium-red/20 absolute bottom-0 left-0 group-hover:w-full group-hover:bg-festive-gold/40 transition-all duration-700" />
            </motion.div>
          </Reveal>
        ))}
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12 px-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => goto(page - 1)}
              disabled={page === 1}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-bold shadow-sm ${
                page === 1
                  ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  : 'bg-white text-premium-red hover:bg-premium-red hover:text-white border border-premium-red/10'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Trước
            </button>
            
            <button
              onClick={() => goto(page + 1)}
              disabled={page === totalPages}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-bold shadow-sm ${
                page === totalPages
                  ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  : 'bg-white text-premium-red hover:bg-premium-red hover:text-white border border-premium-red/10'
              }`}
            >
              Sau
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => {
              const p = i + 1;
              const isVisible = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
              if (!isVisible) {
                if (p === 2 || p === totalPages - 1) return <span key={p} className="text-muted-foreground">...</span>;
                return null;
              }
              return (
                <button
                  key={p}
                  onClick={() => goto(p)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all duration-300 ${
                    page === p
                      ? 'bg-premium-red text-white shadow-md'
                      : 'bg-white text-foreground hover:bg-premium-red/5 border border-transparent'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

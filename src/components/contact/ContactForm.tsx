"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import useSubmitContact from '@/hooks/useContact';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const submitContact = useSubmitContact();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      toast.error('Vui lòng điền họ tên và nội dung tin nhắn');
      return;
    }

    submitContact.mutate(
      {
        name: formData.name.trim(),
        email: formData.email.trim() || '',
        phone: formData.phone.trim() || '',
        message: formData.message.trim(),
      },
      {
        onSuccess: () => {
          toast.success('Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất có thể.');
          setFormData({ name: '', email: '', phone: '', message: '' });
        },
        onError: (error: any) => {
          console.error('Contact submission error:', error);
          toast.error('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-bold text-foreground/60 uppercase tracking-[0.1em] ml-1">
            Họ tên <span className="text-premium-red">*</span>
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Nguyễn Văn A"
            className="w-full bg-secondary/30 border-2 border-transparent focus:border-premium-red/20 focus:bg-white rounded-2xl px-5 py-3 sm:px-6 sm:py-4 outline-none transition-all duration-300 placeholder:text-muted-foreground/50 font-medium text-sm"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-xs font-bold text-foreground/60 uppercase tracking-[0.1em] ml-1">
            Số điện thoại
          </label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="09xx xxx xxx"
            className="w-full bg-secondary/30 border-2 border-transparent focus:border-premium-red/20 focus:bg-white rounded-2xl px-5 py-3 sm:px-6 sm:py-4 outline-none transition-all duration-300 placeholder:text-muted-foreground/50 font-medium text-sm"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-xs font-bold text-foreground/60 uppercase tracking-[0.1em] ml-1">
          Địa chỉ Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="vidu@gmail.com"
          className="w-full bg-secondary/30 border-2 border-transparent focus:border-premium-red/20 focus:bg-white rounded-2xl px-5 py-3 sm:px-6 sm:py-4 outline-none transition-all duration-300 placeholder:text-muted-foreground/50 font-medium text-sm "
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-bold text-foreground/60 uppercase tracking-[0.1em] ml-1">
          Nội dung <span className="text-premium-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleInputChange}
          required
          placeholder="Bạn cần tư vấn về sản phẩm nào? Hãy để lại lời nhắn cho chúng mình..."
          className="w-full bg-secondary/30 border-2 border-transparent focus:border-premium-red/20 focus:bg-white rounded-2xl px-5 py-3 sm:px-6 sm:py-4 outline-none transition-all duration-300 placeholder:text-muted-foreground/50 font-medium resize-none text-sm "
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
        <div className="flex items-center gap-3 text-muted-foreground bg-secondary/20 px-4 py-2 rounded-full border border-border/50 w-full sm:w-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-festive-gold animate-pulse shrink-0" />
          <p className="text-[10px] sm:text-[11px] font-medium leading-tight">
            Tiệm Của Bản cam kết bảo mật thông tin của bạn
          </p>
        </div>
        <button
          type="submit"
          disabled={submitContact.isPending}
          className="relative group overflow-hidden bg-premium-red text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(185,28,28,0.4)] hover:-translate-y-1 disabled:opacity-50 w-full sm:w-auto text-sm "
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          {submitContact.isPending ? (
            'ĐANG GỬI...'
          ) : (
            'TIẾP TỤC GỬI'
          )}
        </button>
      </div>
    </form>
  );
}

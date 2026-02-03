"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { useSubmitContact } from '@/hooks/useContact';

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
        onError: () => {
          toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-bold text-foreground uppercase tracking-wider ml-1">
            Họ và tên <span className="text-premium-red">*</span>
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Nguyễn Văn A"
            className="w-full px-6 py-4 rounded-2xl bg-secondary/50 border border-premium-red/5 focus:border-premium-red/30 focus:bg-white outline-none transition-all duration-300"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-bold text-foreground uppercase tracking-wider ml-1">
            Số điện thoại
          </label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="09xx xxx xxx"
            className="w-full px-6 py-4 rounded-2xl bg-secondary/50 border border-premium-red/5 focus:border-premium-red/30 focus:bg-white outline-none transition-all duration-300"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-bold text-foreground uppercase tracking-wider ml-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="email@example.com"
          className="w-full px-6 py-4 rounded-2xl bg-secondary/50 border border-premium-red/5 focus:border-premium-red/30 focus:bg-white outline-none transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-bold text-foreground uppercase tracking-wider ml-1">
          Lời nhắn <span className="text-premium-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleInputChange}
          required
          placeholder="Bạn cần tư vấn về sản phẩm nào..."
          className="w-full px-6 py-4 rounded-2xl bg-secondary/50 border border-premium-red/5 focus:border-premium-red/30 focus:bg-white outline-none transition-all duration-300 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitContact.isPending}
        className="w-full py-5 bg-premium-red text-white rounded-2xl font-bold text-lg hover:bg-premium-red-light transition-all duration-300 shadow-xl shadow-premium-red/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitContact.isPending ? 'ĐANG GỬI...' : 'GỬI TIN NHẮN'}
      </button>
    </form>
  );
}

"use client";

import {useQuery} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import {CheckCircle2, Clock, Mail, Package, ShoppingCart, Star, TrendingUp,} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import {motion} from 'framer-motion';
import Link from 'next/link';

export default function AdminDashboardPage() {
	const {data: stats, isLoading} = useQuery({
		queryKey: ['admin-stats'],
		queryFn: async () => {
			const [ordersRes, productsRes, reviewsRes, contactsRes] = await Promise.all([
				supabase.from('orders').select('id, status', {count: 'exact'}),
				supabase.from('products').select('id', {count: 'exact'}),
				supabase.from('reviews').select('id', {count: 'exact'}),
				supabase.from('contacts').select('id, is_read', {count: 'exact'}),
			]);
			
			const pendingOrders = ordersRes.data?.filter((o) => o.status === 'pending').length || 0;
			const unreadContacts = contactsRes.data?.filter((c) => !c.is_read).length || 0;
			
			return {
				totalOrders: ordersRes.count || 0,
				pendingOrders,
				totalProducts: productsRes.count || 0,
				totalReviews: reviewsRes.count || 0,
				totalContacts: contactsRes.count || 0,
				unreadContacts,
			};
		},
	});
	
	if (isLoading) {
		return (
				<div className="flex items-center justify-center min-h-[400px]">
					<LoadingSpinner size="lg" withText text="Đang thống kê số liệu..."/>
				</div>
		);
	}
	
	const cards = [
		{
			title: 'Đơn hàng',
			value: stats?.totalOrders || 0,
			subtitle: `${stats?.pendingOrders || 0} chờ xử lý`,
			icon: ShoppingCart,
			gradient: 'from-blue-500 to-blue-600',
			bgLight: 'bg-blue-50',
			textColor: 'text-blue-600',
			link: '/quan-ly/don-hang',
			badge: stats?.pendingOrders || 0,
		},
		{
			title: 'Sản phẩm',
			value: stats?.totalProducts || 0,
			subtitle: 'Tổng sản phẩm',
			icon: Package,
			gradient: 'from-emerald-500 to-emerald-600',
			bgLight: 'bg-emerald-50',
			textColor: 'text-emerald-600',
			link: '/quan-ly/san-pham',
		},
		{
			title: 'Đánh giá',
			value: stats?.totalReviews || 0,
			subtitle: 'Tổng đánh giá',
			icon: Star,
			gradient: 'from-amber-500 to-amber-600',
			bgLight: 'bg-amber-50',
			textColor: 'text-amber-600',
			link: '/quan-ly/danh-gia',
		},
		{
			title: 'Liên hệ',
			value: stats?.totalContacts || 0,
			subtitle: `${stats?.unreadContacts || 0} chưa đọc`,
			icon: Mail,
			gradient: 'from-violet-500 to-violet-600',
			bgLight: 'bg-violet-50',
			textColor: 'text-violet-600',
			link: '/quan-ly/lien-he',
			badge: stats?.unreadContacts || 0,
		},
	];
	
	const quickStats = [
		{
			label: 'Chờ xử lý',
			value: stats?.pendingOrders || 0,
			icon: Clock,
			color: 'text-amber-500',
		},
		{
			label: 'Liên hệ mới',
			value: stats?.unreadContacts || 0,
			icon: Mail,
			color: 'text-blue-500',
		},
		{
			label: 'Hoàn thành',
			value:
					(stats?.totalOrders || 0) -
					(stats?.pendingOrders || 0),
			icon: CheckCircle2,
			color: 'text-emerald-500',
		},
	];
	
	return (
			<div className="p-4 lg:p-8 space-y-8">
				<div>
					<h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
						Xin chào, Admin 👋
					</h1>
					<p className="text-muted-foreground mt-2 text-lg">
						Đây là tổng quan hoạt động cửa hàng của bạn
					</p>
				</div>
				
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
					{quickStats.map((stat, index) => (
							<motion.div
									key={stat.label}
									initial={{opacity: 0, y: 20}}
									animate={{opacity: 1, y: 0}}
									transition={{delay: index * 0.1}}
									className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3"
							>
								<div className={`p-2 rounded-xl bg-muted ${stat.color}`}>
									<stat.icon className="w-5 h-5"/>
								</div>
								<div>
									<p className="text-2xl font-bold text-foreground">{stat.value}</p>
									<p className="text-md text-muted-foreground">{stat.label}</p>
								</div>
							</motion.div>
					))}
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
					{cards.map((card, index) => (
							<motion.div
									key={card.title}
									initial={{opacity: 0, y: 20}}
									animate={{opacity: 1, y: 0}}
									transition={{delay: 0.2 + index * 0.1}}
							>
								<Link
										href={card.link}
										className="block bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group relative overflow-hidden"
								>
									<div
											className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
									>
										<card.icon className="w-7 h-7 text-white"/>
									</div>
									
									<p className="text-md font-medium text-muted-foreground mb-1">
										{card.title}
									</p>
									<p className="text-3xl font-bold text-foreground mb-1">{card.value}</p>
									<p className="text-md text-muted-foreground flex items-center gap-1">
										<TrendingUp className="w-4 h-4"/>
										{card.subtitle}
									</p>
									
									<div
											className={`absolute inset-0 ${card.bgLight} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
									/>
								</Link>
							</motion.div>
					))}
				</div>
				
				<motion.div
						initial={{opacity: 0, y: 20}}
						animate={{opacity: 1, y: 0}}
						transition={{delay: 0.6}}
						className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-6 lg:p-8 text-primary-foreground relative overflow-hidden"
				>
					<div className="relative z-10">
						<h2 className="font-heading font-bold mb-3 text-xl lg:text-3xl">
							Chào mừng đến với Trang Quản Trị
						</h2>
						<p className="text-primary-foreground/80 max-w-xl text-md lg:text-lg">
							Quản lý đơn hàng, sản phẩm, đánh giá và liên hệ của khách hàng tại
							đây. Chúc bạn một ngày làm việc hiệu quả!
						</p>
					</div>
					<div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"/>
					<div className="absolute -right-5 -top-5 w-20 h-20 bg-white/10 rounded-full blur-xl"/>
				</motion.div>
			</div>
	);
}

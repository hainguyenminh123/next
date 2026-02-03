"use client";

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useAdminCheck, useAuth} from '@/hooks/useAuth';
import {Button} from '@/components/ui/button';
import {ChevronRight, LayoutDashboard, LogOut, Mail, Menu, Package, ShoppingCart, Star, Store, X,} from 'lucide-react';
import {cn} from '@/lib/utils';
import {AnimatePresence, motion} from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminLayout({children}: { children: React.ReactNode }) {
	const {user, loading: authLoading, signOut} = useAuth();
	const {isAdmin, loading: adminLoading} = useAdminCheck(user?.id);
	const router = useRouter();
	const pathname = usePathname();
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	
	useEffect(() => {
		if (!authLoading && !user) {
			router.replace('/quan-ly/dang-nhap');
			return;
		}
		
		if (!authLoading && !adminLoading && user && isAdmin === false) {
			router.replace('/quan-ly/dang-nhap');
		}
	}, [user, isAdmin, authLoading, adminLoading, router]);
	
	useEffect(() => {
		setMobileMenuOpen(false);
	}, [pathname]);
	
	if (authLoading || adminLoading || (user && isAdmin === null)) {
		return (
				<div className="min-h-screen bg-background flex items-center justify-center">
					<LoadingSpinner size="lg" withText text="Đang tải..."/>
				</div>
		);
	}
	
	if (!user || isAdmin !== true) {
		return (
				<div className="min-h-screen bg-background flex items-center justify-center">
					<LoadingSpinner size="lg" withText text="Đang chuyển hướng..."/>
				</div>
		);
	}
	
	const menuItems = [
		{path: '/quan-ly', icon: LayoutDashboard, label: 'Tổng quan', exact: true},
		{path: '/quan-ly/don-hang', icon: ShoppingCart, label: 'Đơn hàng'},
		{path: '/quan-ly/san-pham', icon: Package, label: 'Sản phẩm'},
		{path: '/quan-ly/danh-gia', icon: Star, label: 'Đánh giá'},
		{path: '/quan-ly/lien-he', icon: Mail, label: 'Liên hệ'},
	];
	
	const isActive = (path: string, exact?: boolean) => {
		if (!pathname) return false;
		if (exact) return pathname === path;
		return pathname.startsWith(path);
	};
	
	const handleSignOut = async () => {
		try {
			await signOut();
			router.replace('/quan-ly/dang-nhap');
		} catch (error) {
			console.error('Error signing out:', error);
			router.replace('/quan-ly/dang-nhap');
		}
	};
	
	const NavItem = ({
		                 item,
		                 collapsed = false,
	                 }: {
		item: (typeof menuItems)[0];
		collapsed?: boolean;
	}) => {
		const active = isActive(item.path, item.exact);
		return (
				<Link
						href={item.path}
						className={cn(
								'group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative',
								active
										? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
										: 'text-muted-foreground hover:bg-muted hover:text-foreground'
						)}
				>
					<item.icon className={cn('w-5 h-5 flex-shrink-0', active && 'text-primary-foreground')}/>
					{!collapsed && (
							<span className="font-medium truncate">{item.label}</span>
					)}
					{active && !collapsed && (
							<ChevronRight className="w-4 h-4 ml-auto opacity-70"/>
					)}
				</Link>
		);
	};
	
	return (
			<div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
				<header
						className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-sm border-b border-border z-50 flex items-center justify-between px-4">
					<div className="flex items-center gap-3">
						<Button
								variant="ghost"
								size="icon"
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
						</Button>
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
								<Store className="w-4 h-4 text-primary-foreground"/>
							</div>
							<span className="font-heading font-bold text-foreground">Admin</span>
						</div>
					</div>
					<Button variant="ghost" size="icon" onClick={handleSignOut} className="text-destructive">
						<LogOut className="w-5 h-5"/>
					</Button>
				</header>
				
				<AnimatePresence>
					{mobileMenuOpen && (
							<>
								<motion.div
										initial={{opacity: 0}}
										animate={{opacity: 1}}
										exit={{opacity: 0}}
										className="lg:hidden fixed inset-0 bg-black/50 z-40"
										onClick={() => setMobileMenuOpen(false)}
								/>
								<motion.aside
										initial={{x: -280}}
										animate={{x: 0}}
										exit={{x: -280}}
										transition={{type: 'spring', damping: 25, stiffness: 200}}
										className="lg:hidden fixed left-0 top-16 bottom-0 w-72 bg-card border-r border-border z-50 overflow-y-auto"
								>
									<nav className="p-4 space-y-2">
										{menuItems.map((item) => (
												<NavItem key={item.path} item={item}/>
										))}
									</nav>
									<div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
										<p className="text-sm text-muted-foreground truncate mb-3 px-2">
											{user?.email}
										</p>
										<Button
												variant="ghost"
												className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
												onClick={handleSignOut}
										>
											<LogOut className="w-5 h-5"/>
											<span>Đăng xuất</span>
										</Button>
									</div>
								</motion.aside>
							</>
					)}
				</AnimatePresence>
				
				<aside
						className={cn(
								'hidden lg:flex flex-col fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-all duration-300',
								sidebarOpen ? 'w-64' : 'w-20'
						)}
				>
					<div className="p-4 border-b border-border">
						<div className="flex items-center gap-3">
							<div
									className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
								<Store className="w-6 h-6 text-primary-foreground"/>
							</div>
							{sidebarOpen && (
									<motion.div
											initial={{opacity: 0, x: -10}}
											animate={{opacity: 1, x: 0}}
											className="overflow-hidden"
									>
										<h3 className="font-heading font-bold text-foreground leading-tight">
											Tiệm Của Bản
										</h3>
										<p className="text-md text-muted-foreground">Trang quản trị</p>
									</motion.div>
							)}
						</div>
					</div>
					
					<Button
							variant="ghost"
							size="sm"
							onClick={() => setSidebarOpen(!sidebarOpen)}
							className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-sm hover:bg-muted p-0"
					>
						<ChevronRight
								className={cn(
										'w-4 h-4 transition-transform duration-300',
										sidebarOpen && 'rotate-180'
								)}
						/>
					</Button>
					
					<nav className="flex-1 p-3 space-y-1 overflow-y-auto">
						{menuItems.map((item) => (
								<NavItem key={item.path} item={item} collapsed={!sidebarOpen}/>
						))}
					</nav>
					
					<div className="p-3 border-t border-border">
						{sidebarOpen && (
								<div className="mb-3 px-3">
									<p className="text-sm text-muted-foreground truncate">{user?.email}</p>
								</div>
						)}
						<Button
								variant="ghost"
								className={cn(
										'w-full gap-3 text-destructive hover:text-destructive hover:bg-destructive/10',
										sidebarOpen ? 'justify-start' : 'justify-center'
								)}
								onClick={handleSignOut}
						>
							<LogOut className="w-5 h-5 flex-shrink-0"/>
							{sidebarOpen && <span>Đăng xuất</span>}
						</Button>
					</div>
				</aside>
				
				<main
						className={cn(
								'min-h-screen transition-all duration-300 pt-16 lg:pt-0',
								sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
						)}
				>
					{children}
				</main>
			</div>
	);
}

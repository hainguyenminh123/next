"use client";

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAdminCheck, useAuth} from '@/hooks/useAuth';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useToast} from '@/hooks/use-toast';
import {ArrowRight, Lock, Mail, ShieldCheck} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import {motion} from 'framer-motion';

export default function AdminLoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const {user, loading: authLoading, signIn} = useAuth();
	const {isAdmin, loading: adminLoading} = useAdminCheck(user?.id);
	const router = useRouter();
	const {toast} = useToast();
	
	const from = '/quan-ly';
	
	useEffect(() => {
		if (!authLoading && !adminLoading && user && isAdmin === true) {
			router.replace(from);
		}
	}, [user, isAdmin, authLoading, adminLoading, router, from]);

	useEffect(() => {
		if (!authLoading && !adminLoading && user && isAdmin === false) {
			toast({
				title: 'Truy cập bị từ chối',
				description: 'Bạn không có quyền quản trị viên.',
				variant: 'destructive',
			});
		}
	}, [user, isAdmin, authLoading, adminLoading, toast]);
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!email || !password) {
			toast({
				title: 'Lỗi',
				description: 'Vui lòng nhập đầy đủ email và mật khẩu',
				variant: 'destructive',
			});
			return;
		}
		
		setIsLoading(true);
		try {
			const {error} = await signIn(email, password);
			
			if (error) {
				toast({
					title: 'Đăng nhập thất bại',
					description:
							error.message === 'Invalid login credentials'
									? 'Email hoặc mật khẩu không đúng'
									: error.message,
					variant: 'destructive',
				});
			}
		} catch (error: any) {
			toast({
				title: 'Lỗi hệ thống',
				description: error.message || 'Đã có lỗi xảy ra khi đăng nhập',
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};
	
	if (authLoading) {
		return (
				<div
						className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
					<LoadingSpinner size="lg" withText text="Đang kiểm tra bảo mật..."/>
				</div>
		);
	}
	
	return (
			<div
					className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"/>
					<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"/>
				</div>
				
				<motion.div
						initial={{opacity: 0, y: 20}}
						animate={{opacity: 1, y: 0}}
						transition={{duration: 0.5}}
						className="w-full max-w-md relative z-10"
				>
					<div className="bg-card rounded-3xl shadow-xl border border-border/50 overflow-hidden">
						<div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-center">
							<motion.div
									initial={{scale: 0}}
									animate={{scale: 1}}
									transition={{delay: 0.2, type: 'spring', stiffness: 200}}
									className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-4"
							>
								<ShieldCheck className="w-10 h-10 text-white"/>
							</motion.div>
							<h1 className="text-2xl font-heading font-bold text-white">
								Trang Quản Trị
							</h1>
							<p className="text-white/80 mt-1">Tiệm Của Bản</p>
						</div>
						
						<div className="p-8">
							<form onSubmit={handleSubmit} className="space-y-5">
								<div className="space-y-2">
									<Label htmlFor="email" className="text-sm font-medium">
										Email
									</Label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
										<Input
												id="email"
												type="email"
												placeholder="admin@example.com"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className="pl-11 h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
										/>
									</div>
								</div>
								
								<div className="space-y-2">
									<Label htmlFor="password" className="text-sm font-medium">
										Mật khẩu
									</Label>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
										<Input
												id="password"
												type="password"
												placeholder="••••••••"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												className="pl-11 h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
										/>
									</div>
								</div>
								
								<Button
										type="submit"
										className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
										disabled={isLoading}
								>
									{isLoading ? (
											<>
												<LoadingSpinner size="sm"/>
												Đang đăng nhập...
											</>
									) : (
											<>
												Đăng nhập
												<ArrowRight className="ml-2 h-5 w-5"/>
											</>
									)}
								</Button>
							</form>
						</div>
					</div>
					
					<p className="text-center text-sm text-muted-foreground mt-6">
						© 2025 Tiệm Của Bản. Quản trị viên.
					</p>
				</motion.div>
			</div>
	);
}

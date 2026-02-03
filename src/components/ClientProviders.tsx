"use client";

import {TooltipProvider} from "@/components/ui/tooltip";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useEffect, useState} from "react";

export default function ClientProviders({children}: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	useEffect(() => {
		// Đảm bảo trình duyệt không tự động cuộn về vị trí cũ khi reload
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}
		
		// Cuộn về đầu trang ngay khi trang được tải
		window.scrollTo(0, 0);
	}, []);
	
	return (
			<QueryClientProvider client={queryClient}>
				<TooltipProvider>
					<Toaster/>
					<Sonner/>
					{children}
				</TooltipProvider>
			</QueryClientProvider>
	);
}

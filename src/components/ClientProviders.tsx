"use client";

import {TooltipProvider} from "@/components/ui/tooltip";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import NextTopLoader from "nextjs-toploader";

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
					<NextTopLoader
							color="hsl(var(--premium-red))"
							shadow="0 0 12px hsl(var(--premium-red) / 0.6), 0 0 8px hsl(var(--premium-red) / 0.4)"
							showSpinner={false}
							height={4}
					/>
					<Sonner/>
					{children}
				</TooltipProvider>
			</QueryClientProvider>
	);
}

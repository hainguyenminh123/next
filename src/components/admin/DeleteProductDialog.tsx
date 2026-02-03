import {useMutation, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {useToast} from '@/hooks/use-toast';
import {Loader2} from 'lucide-react';

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	product: { id: string; name: string } | null;
}

export default function DeleteProductDialog({open, onOpenChange, product}: Props) {
	const queryClient = useQueryClient();
	const {toast} = useToast();
	
	const deleteMutation = useMutation({
		mutationFn: async (productId: string) => {
			// Delete related weight options first
			await supabase
					.from('product_weight_options')
					.delete()
					.eq('product_id', productId);
			
			// Delete related blog sections
			await supabase
					.from('product_blog_sections')
					.delete()
					.eq('product_id', productId);
			
			// Delete product
			const {error} = await supabase
					.from('products')
					.delete()
					.eq('id', productId);
			
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['admin-products']});
			queryClient.invalidateQueries({queryKey: ['products']});
			toast({title: 'Đã xóa sản phẩm'});
			onOpenChange(false);
		},
		onError: (error: any) => {
			toast({title: 'Lỗi xóa sản phẩm', description: error.message, variant: 'destructive'});
		},
	});
	
	const handleDelete = () => {
		if (product) {
			deleteMutation.mutate(product.id);
		}
	};
	
	return (
			<AlertDialog open={open} onOpenChange={onOpenChange}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Xác nhận xóa sản phẩm</AlertDialogTitle>
						<AlertDialogDescription>
							Bạn có chắc chắn muốn xóa sản phẩm <strong>&quot;{product?.name}&quot;</strong>?
							Hành động này không thể hoàn tác và sẽ xóa tất cả dữ liệu liên quan
							(tùy chọn khối lượng, bài viết blog).
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={deleteMutation.isPending}>Hủy</AlertDialogCancel>
						<AlertDialogAction
								onClick={handleDelete}
								disabled={deleteMutation.isPending}
								className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{deleteMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>}
							Xóa sản phẩm
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
	);
}

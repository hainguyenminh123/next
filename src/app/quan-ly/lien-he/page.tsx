"use client";

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog';
import {Calendar, Eye, Loader2, Mail, MailOpen, Phone, Trash2, User} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';
import {format} from 'date-fns';
import {vi} from 'date-fns/locale';
import {useState} from 'react';
import {motion} from 'framer-motion';

interface Contact {
	id: string;
	name: string;
	email: string;
	phone: string | null;
	subject: string | null;
	message: string;
	is_read: boolean;
	created_at: string;
}

export default function AdminContactsPage() {
	const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const queryClient = useQueryClient();
	const {toast} = useToast();
	
	const {data: contacts, isLoading} = useQuery({
		queryKey: ['admin-contacts'],
		queryFn: async () => {
			const {data, error} = await supabase
					.from('contacts')
					.select('*')
					.order('created_at', {ascending: false});
			
			if (error) throw error;
			return data as Contact[];
		},
	});
	
	const markAsReadMutation = useMutation({
		mutationFn: async (contactId: string) => {
			const {error} = await supabase
					.from('contacts')
					.update({is_read: true})
					.eq('id', contactId);
			
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['admin-contacts']});
		},
		onError: () => {
			toast({
				title: 'Lỗi',
				description: 'Không thể đánh dấu tin nhắn là đã đọc',
				variant: 'destructive',
			});
		},
	});
	
	const deleteContactMutation = useMutation({
		mutationFn: async (contactId: string) => {
			const {error} = await supabase
					.from('contacts')
					.delete()
					.eq('id', contactId);
			
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['admin-contacts']});
			toast({title: 'Đã xóa tin nhắn'});
		},
		onError: () => {
			toast({title: 'Lỗi xóa', variant: 'destructive'});
		},
	});
	
	const handleViewDetails = (contact: Contact) => {
		setSelectedContact(contact);
		setDetailsOpen(true);
		if (!contact.is_read) {
			markAsReadMutation.mutate(contact.id);
		}
	};
	
	if (isLoading) {
		return (
				<div className="flex items-center justify-center h-screen">
					<Loader2 className="w-8 h-8 animate-spin text-primary"/>
				</div>
		);
	}
	
	const unreadCount = contacts?.filter(c => !c.is_read).length || 0;
	
	const totalItems = contacts?.length || 0;
	const totalPages = Math.ceil(totalItems / pageSize);
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const paginatedContacts = contacts?.slice(startIndex, endIndex) || [];
	
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};
	
	const handlePageSizeChange = (size: string) => {
		setPageSize(Number(size));
		setCurrentPage(1);
	};
	
	return (
			<div className="p-8">
				<div className="mb-8">
					<h1 className="text-3xl font-heading font-bold text-foreground">
						Tin nhắn liên hệ
					</h1>
					<p className="text-muted-foreground mt-1">
						{unreadCount} chưa đọc · {contacts?.length || 0} tổng tin nhắn
					</p>
				</div>
				
				<div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
					<div className="overflow-x-auto">
						<Table className="min-w-[800px]">
							<TableHeader>
								<TableRow className="bg-muted/50 border-b-2 border-border/50">
									<TableHead className="w-12 h-12"></TableHead>
									<TableHead className="font-bold text-foreground h-12">Người gửi</TableHead>
									<TableHead className="font-bold text-foreground h-12">Nội dung</TableHead>
									<TableHead className="font-bold text-foreground h-12">Ngày gửi</TableHead>
									<TableHead className="font-bold text-foreground h-12 text-right">Thao tác</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paginatedContacts.map((contact, index) => (
										<motion.tr
												key={contact.id}
												initial={{opacity: 0, x: -10}}
												animate={{opacity: 1, x: 0}}
												transition={{delay: index * 0.03}}
												className={`group border-b border-border/50 hover:bg-muted/20 transition-all duration-200 ${
														!contact.is_read ? 'bg-primary/5' : ''
												}`}
										>
											<TableCell className="py-4">
												<div className="flex justify-center">
													{contact.is_read ? (
															<MailOpen className="w-4 h-4 text-muted-foreground/50"/>
													) : (
															<div className="relative">
																<Mail className="w-4 h-4 text-primary"/>
																<span
																		className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
															</div>
													)}
												</div>
											</TableCell>
											<TableCell className="py-4">
												<div className="flex flex-col gap-0.5">
													<p className={`font-semibold leading-tight ${!contact.is_read ? 'text-foreground' : 'text-foreground/80'}`}>
														{contact.name}
													</p>
													<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
														<User className="w-3 h-3"/>
														{contact.email}
													</div>
													{contact.phone && (
															<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
																<Phone className="w-3 h-3"/>
																{contact.phone}
															</div>
													)}
												</div>
											</TableCell>
											<TableCell className="max-w-xs py-4">
												<div className="flex flex-col gap-1">
													<p className="line-clamp-2 text-sm text-muted-foreground/80">{contact.message}</p>
												</div>
											</TableCell>
											<TableCell className="py-4 text-muted-foreground">
												<div className="flex flex-col gap-0.5">
													<div className="flex items-center gap-1.5 text-sm font-medium text-foreground/70">
														<Calendar className="w-3.5 h-3.5"/>
														{format(new Date(contact.created_at), 'dd/MM/yyyy', {locale: vi})}
													</div>
													<p className="text-[11px] ml-5 italic">
														{format(new Date(contact.created_at), 'HH:mm', {locale: vi})}
													</p>
												</div>
											</TableCell>
											<TableCell className="py-4 text-right">
												<div className="flex justify-end gap-1">
													<Button
															variant="ghost"
															size="sm"
															className="h-8 w-8 p-0 border-primary/10 hover:bg-primary/10 hover:text-primary transition-all"
															onClick={() => handleViewDetails(contact)}
													>
														<Eye className="w-4 h-4"/>
													</Button>
													<Button
															variant="ghost"
															size="sm"
															className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
															onClick={() => {
																if (confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')) {
																	deleteContactMutation.mutate(contact.id);
																}
															}}
													>
														<Trash2 className="w-4 h-4"/>
													</Button>
												</div>
											</TableCell>
										</motion.tr>
								))}
							</TableBody>
						</Table>
					</div>
					
					{totalItems > 0 && (
							<div
									className="px-6 py-4 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/20">
								<div className="flex items-center gap-4">
									<span className="text-sm text-muted-foreground whitespace-nowrap">Hiển thị</span>
									<Select
											value={pageSize.toString()}
											onValueChange={handlePageSizeChange}
									>
										<SelectTrigger className="w-[80px] h-9">
											<SelectValue/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="10">10</SelectItem>
											<SelectItem value="20">20</SelectItem>
											<SelectItem value="50">50</SelectItem>
										</SelectContent>
									</Select>
									<span className="text-sm text-muted-foreground whitespace-nowrap">
                mỗi trang (Tổng {totalItems})
              </span>
								</div>
								
								<div className="flex items-center gap-2">
									<Pagination>
										<PaginationContent>
											<PaginationItem>
												<PaginationPrevious
														onClick={() => handlePageChange(currentPage - 1)}
														disabled={currentPage === 1}
														className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
												/>
											</PaginationItem>
											
											{Array.from({length: totalPages}, (_, i) => i + 1)
													.filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
													.map((p, i, arr) => {
														const elements = [];
														if (i > 0 && p - arr[i - 1] > 1) {
															elements.push(
																	<PaginationItem key={`ellipsis-${p}`}>
																		<span className="px-2">...</span>
																	</PaginationItem>
															);
														}
														elements.push(
																<PaginationItem key={p}>
																	<PaginationLink
																			isActive={currentPage === p}
																			onClick={() => handlePageChange(p)}
																			className="cursor-pointer"
																	>
																		{p}
																	</PaginationLink>
																</PaginationItem>
														);
														return elements;
													})}
											
											<PaginationItem>
												<PaginationNext
														onClick={() => handlePageChange(currentPage + 1)}
														disabled={currentPage === totalPages}
														className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
												/>
											</PaginationItem>
										</PaginationContent>
									</Pagination>
								</div>
							</div>
					)}
				</div>
				
				<Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
					<DialogContent className="max-w-lg">
						<DialogHeader>
							<DialogTitle>Chi tiết tin nhắn</DialogTitle>
							<DialogDescription>
								Xem thông tin chi tiết và phản hồi tin nhắn từ khách hàng.
							</DialogDescription>
						</DialogHeader>
						
						{selectedContact && (
								<div className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<h4 className="font-medium text-sm text-muted-foreground mb-1">Tên</h4>
											<p>{selectedContact.name}</p>
										</div>
										<div>
											<h4 className="font-medium text-sm text-muted-foreground mb-1">Email</h4>
											<p>{selectedContact.email}</p>
										</div>
									</div>
									
									{selectedContact.phone && (
											<div>
												<h4 className="font-medium text-sm text-muted-foreground mb-1">Số điện thoại</h4>
												<p>{selectedContact.phone}</p>
											</div>
									)}
									
									<div>
										<h4 className="font-medium text-sm text-muted-foreground mb-1">Nội dung</h4>
										<p className="whitespace-pre-wrap bg-muted/50 p-4 rounded-xl">
											{selectedContact.message}
										</p>
									</div>
									
									<div className="text-sm text-muted-foreground">
										Gửi lúc: {format(new Date(selectedContact.created_at), 'dd/MM/yyyy HH:mm', {locale: vi})}
									</div>
									
									<div className="flex gap-2 pt-4">
										<Button
												className="flex-1"
												onClick={() => window.open(`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Liên hệ từ Tây Bắc Food'}`)}
										>
											<Mail className="w-4 h-4 mr-2"/>
											Gửi email phản hồi
										</Button>
									</div>
								</div>
						)}
					</DialogContent>
				</Dialog>
			</div>
	);
}

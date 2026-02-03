import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import type {CreateReviewInput, DBReview, Review} from '@/types/database';

// Transform DB review to frontend Review
const transformReview = (dbReview: DBReview): Review => ({
	id: dbReview.id,
	productId: dbReview.product_id,
	name: dbReview.name,
	location: dbReview.location,
	rating: dbReview.rating,
	content: dbReview.content,
	avatar: dbReview.avatar,
	createdAt: dbReview.created_at,
});

// Fetch all approved reviews
export const useReviews = (limit?: number) => {
	return useQuery({
		queryKey: ['reviews', limit],
		queryFn: async (): Promise<Review[]> => {
			let query = supabase
					.from('reviews')
					.select('*')
					.order('created_at', {ascending: false});
			
			if (limit) {
				query = query.limit(limit);
			}
			
			const {data, error} = await query;
			
			if (error) throw error;
			return (data || []).map(r => transformReview(r as DBReview));
		},
	});
};


// Submit a new review
export const useSubmitReview = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: async (input: CreateReviewInput) => {
			const {data, error} = await supabase
					.from('reviews')
					.insert(input)
					.select()
					.single();
			
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['reviews']});
		},
	});
};

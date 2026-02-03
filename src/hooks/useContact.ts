import {useMutation} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import type {CreateContactInput} from '@/types/database';

export const useSubmitContact = () => {
	return useMutation({
		mutationFn: async (input: CreateContactInput) => {
			const {data, error} = await supabase
					.from('contacts')
					.insert(input)
					.select()
					.single();
			
			if (error) throw error;
			return data;
		},
	});
};

import {useMutation} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import type {CreateContactInput} from '@/types/database';

const useSubmitContact = () => {
	return useMutation({
		mutationFn: async (input: CreateContactInput) => {
			const {data, error} = await supabase.rpc('create_contact', {
				p_name: input.name,
				p_email: input.email,
				p_phone: input.phone ?? "",
				p_message: input.message
			});
			
			if (error) throw error;
			return data;
		},
	});
};
export default useSubmitContact

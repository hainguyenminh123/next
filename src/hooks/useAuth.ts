import {useEffect, useState} from 'react';
import {Session, User} from '@supabase/supabase-js';
import {supabase} from '@/integrations/supabase/client';

export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		// Set up auth state listener FIRST
		const {data: {subscription}} = supabase.auth.onAuthStateChange(
				(event, session) => {
					setSession(session);
					setUser(session?.user ?? null);
					setLoading(false);
				}
		);
		
		// THEN check for existing session
		supabase.auth.getSession().then(({data: {session}}) => {
			setSession(session);
			setUser(session?.user ?? null);
			setLoading(false);
		});
		
		return () => subscription.unsubscribe();
	}, []);
	
	const signIn = async (email: string, password: string) => {
		const {error} = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		return {error};
	};
	
	const signUp = async (email: string, password: string) => {
		const redirectUrl = `${window.location.origin}/`;
		
		const {error} = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: redirectUrl,
			},
		});
		return {error};
	};
	
	const signOut = async () => {
		const {error} = await supabase.auth.signOut();
		if (!error) {
			setUser(null);
			setSession(null);
		}
		return {error};
	};
	
	return {
		user,
		session,
		loading,
		signIn,
		signUp,
		signOut,
	};
};

export const useAdminCheck = (userId: string | undefined) => {
	const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		let cancelled = false;
		
		const check = async () => {
			// chưa có userId thì chưa check gì cả
			if (!userId) {
				if (!cancelled) {
					setIsAdmin(null);
					setLoading(false);
				}
				return;
			}
			
			if (!cancelled) {
				setLoading(true);
				setIsAdmin(null);
			}
			
			const {data, error} = await supabase.rpc('has_role', {
				_user_id: userId,
				_role: 'admin',
			});
			
			if (cancelled) return;
			
			if (error) {
				console.error('has_role error:', error);
				setIsAdmin(false);
			} else {
				setIsAdmin(Boolean(data));
			}
			
			setLoading(false);
		};
		
		check();
		
		return () => {
			cancelled = true;
		};
	}, [userId]);
	
	return {isAdmin, loading};
};

import {createSupabaseBrowserClient} from "@/lib/supabase/browser";
import type {Database} from "./types";

export const supabase = createSupabaseBrowserClient() as unknown as ReturnType<
		typeof import("@supabase/supabase-js").createClient<Database>
>;

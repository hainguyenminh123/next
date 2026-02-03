export type Json =
		| string
		| number
		| boolean
		| null
		| { [key: string]: Json | undefined }
		| Json[]

export type Database = {
	__InternalSupabase: {
		PostgrestVersion: "14.1"
	}
	public: {
		Tables: {
			contacts: {
				Row: {
					created_at: string
					email: string
					id: string
					is_read: boolean
					message: string
					name: string
					phone: string | null
					subject: string | null
				}
				Insert: {
					created_at?: string
					email: string
					id?: string
					is_read?: boolean
					message: string
					name: string
					phone?: string | null
					subject?: string | null
				}
				Update: {
					created_at?: string
					email?: string
					id?: string
					is_read?: boolean
					message?: string
					name?: string
					phone?: string | null
					subject?: string | null
				}
				Relationships: []
			}
			order_items: {
				Row: {
					created_at: string
					id: string
					order_id: string
					price: number
					product_id: string | null
					product_image: string | null
					product_name: string
					quantity: number
					weight: string
				}
				Insert: {
					created_at?: string
					id?: string
					order_id: string
					price: number
					product_id?: string | null
					product_image?: string | null
					product_name: string
					quantity: number
					weight: string
				}
				Update: {
					created_at?: string
					id?: string
					order_id?: string
					price?: number
					product_id?: string | null
					product_image?: string | null
					product_name?: string
					quantity?: number
					weight?: string
				}
				Relationships: [
					{
						foreignKeyName: "order_items_order_id_fkey"
						columns: ["order_id"]
						isOneToOne: false
						referencedRelation: "orders"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "order_items_product_id_fkey"
						columns: ["product_id"]
						isOneToOne: false
						referencedRelation: "products"
						referencedColumns: ["id"]
					},
				]
			}
			orders: {
				Row: {
					created_at: string
					customer_email: string | null
					customer_name: string
					customer_phone: string
					id: string
					note: string | null
					order_number: string
					shipping_address: string
					shipping_fee: number
					shipping_province: string
					status: Database["public"]["Enums"]["order_status"]
					subtotal: number
					total: number
					updated_at: string
				}
				Insert: {
					created_at?: string
					customer_email?: string | null
					customer_name: string
					customer_phone: string
					id?: string
					note?: string | null
					order_number: string
					shipping_address: string
					shipping_fee?: number
					shipping_province: string
					status?: Database["public"]["Enums"]["order_status"]
					subtotal: number
					total: number
					updated_at?: string
				}
				Update: {
					created_at?: string
					customer_email?: string | null
					customer_name?: string
					customer_phone?: string
					id?: string
					note?: string | null
					order_number?: string
					shipping_address?: string
					shipping_fee?: number
					shipping_province?: string
					status?: Database["public"]["Enums"]["order_status"]
					subtotal?: number
					total?: number
					updated_at?: string
				}
				Relationships: []
			}
			product_blog_sections: {
				Row: {
					content: string
					created_at: string
					id: string
					image: string | null
					product_id: string
					sort_order: number
					thumbnail: string | null
					title: string
				}
				Insert: {
					content: string
					created_at?: string
					id?: string
					image?: string | null
					product_id: string
					sort_order?: number
					thumbnail?: string | null
					title: string
				}
				Update: {
					content?: string
					created_at?: string
					id?: string
					image?: string | null
					product_id?: string
					sort_order?: number
					thumbnail?: string | null
					title?: string
				}
				Relationships: [
					{
						foreignKeyName: "product_blog_sections_product_id_fkey"
						columns: ["product_id"]
						isOneToOne: false
						referencedRelation: "products"
						referencedColumns: ["id"]
					},
				]
			}
			product_images: {
				Row: {
					alt_text: string | null
					blog_section_id: string | null
					created_at: string
					id: string
					image_type: string
					image_url: string
					product_id: string
					sort_order: number
				}
				Insert: {
					alt_text?: string | null
					blog_section_id?: string | null
					created_at?: string
					id?: string
					image_type?: string
					image_url: string
					product_id: string
					sort_order?: number
				}
				Update: {
					alt_text?: string | null
					blog_section_id?: string | null
					created_at?: string
					id?: string
					image_type?: string
					image_url?: string
					product_id?: string
					sort_order?: number
				}
				Relationships: [
					{
						foreignKeyName: "product_images_blog_section_id_fkey"
						columns: ["blog_section_id"]
						isOneToOne: false
						referencedRelation: "product_blog_sections"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "product_images_product_id_fkey"
						columns: ["product_id"]
						isOneToOne: false
						referencedRelation: "products"
						referencedColumns: ["id"]
					},
				]
			}
			product_weight_options: {
				Row: {
					created_at: string
					id: string
					price: number
					product_id: string
					weight: string
				}
				Insert: {
					created_at?: string
					id?: string
					price: number
					product_id: string
					weight: string
				}
				Update: {
					created_at?: string
					id?: string
					price?: number
					product_id?: string
					weight?: string
				}
				Relationships: [
					{
						foreignKeyName: "product_weight_options_product_id_fkey"
						columns: ["product_id"]
						isOneToOne: false
						referencedRelation: "products"
						referencedColumns: ["id"]
					},
				]
			}
			products: {
				Row: {
					base_price: number
					blog_intro: string | null
					category: Database["public"]["Enums"]["product_category"]
					cooking_tips: string | null
					created_at: string
					description: string
					id: string
					in_stock: boolean
					is_best_seller: boolean
					name: string
					origin: string | null
					short_description: string | null
					slug: string
					storage_info: string | null
					updated_at: string
				}
				Insert: {
					base_price: number
					blog_intro?: string | null
					category: Database["public"]["Enums"]["product_category"]
					cooking_tips?: string | null
					created_at?: string
					description: string
					id?: string
					in_stock?: boolean
					is_best_seller?: boolean
					name: string
					origin?: string | null
					short_description?: string | null
					slug: string
					storage_info?: string | null
					updated_at?: string
				}
				Update: {
					base_price?: number
					blog_intro?: string | null
					category?: Database["public"]["Enums"]["product_category"]
					cooking_tips?: string | null
					created_at?: string
					description?: string
					id?: string
					in_stock?: boolean
					is_best_seller?: boolean
					name?: string
					origin?: string | null
					short_description?: string | null
					slug?: string
					storage_info?: string | null
					updated_at?: string
				}
				Relationships: []
			}
			reviews: {
				Row: {
					avatar: string | null
					content: string
					created_at: string
					id: string
					is_approved: boolean
					location: string | null
					name: string
					product_id: string | null
					rating: number
				}
				Insert: {
					avatar?: string | null
					content: string
					created_at?: string
					id?: string
					is_approved?: boolean
					location?: string | null
					name: string
					product_id?: string | null
					rating: number
				}
				Update: {
					avatar?: string | null
					content?: string
					created_at?: string
					id?: string
					is_approved?: boolean
					location?: string | null
					name?: string
					product_id?: string | null
					rating?: number
				}
				Relationships: [
					{
						foreignKeyName: "reviews_product_id_fkey"
						columns: ["product_id"]
						isOneToOne: false
						referencedRelation: "products"
						referencedColumns: ["id"]
					},
				]
			}
			user_roles: {
				Row: {
					created_at: string
					id: string
					role: Database["public"]["Enums"]["app_role"]
					user_id: string
				}
				Insert: {
					created_at?: string
					id?: string
					role: Database["public"]["Enums"]["app_role"]
					user_id: string
				}
				Update: {
					created_at?: string
					id?: string
					role?: Database["public"]["Enums"]["app_role"]
					user_id?: string
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			has_role: {
				Args: {
					_role: Database["public"]["Enums"]["app_role"]
					_user_id: string
				}
				Returns: boolean
			}
		}
		Enums: {
			app_role: "admin" | "moderator" | "user"
			order_status:
					| "pending"
					| "confirmed"
					| "shipping"
					| "delivered"
					| "cancelled"
			product_category: "Đặc sản khô" | "THỊT GÁC BẾP" | "NÔNG SẢN"
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
		DefaultSchemaTableNameOrOptions extends | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
				| { schema: keyof DatabaseWithoutInternals },
		TableName extends DefaultSchemaTableNameOrOptions extends {
					schema: keyof DatabaseWithoutInternals
				}
				? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
						DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
				: never = never,
> = DefaultSchemaTableNameOrOptions extends {
			schema: keyof DatabaseWithoutInternals
		}
		? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
					Row: infer R
				}
				? R
				: never
		: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
						DefaultSchema["Views"])
				? (DefaultSchema["Tables"] &
						DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
							Row: infer R
						}
						? R
						: never
				: never

export type TablesInsert<
		DefaultSchemaTableNameOrOptions extends | keyof DefaultSchema["Tables"]
				| { schema: keyof DatabaseWithoutInternals },
		TableName extends DefaultSchemaTableNameOrOptions extends {
					schema: keyof DatabaseWithoutInternals
				}
				? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
				: never = never,
> = DefaultSchemaTableNameOrOptions extends {
			schema: keyof DatabaseWithoutInternals
		}
		? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
					Insert: infer I
				}
				? I
				: never
		: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
				? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
							Insert: infer I
						}
						? I
						: never
				: never

export type TablesUpdate<
		DefaultSchemaTableNameOrOptions extends | keyof DefaultSchema["Tables"]
				| { schema: keyof DatabaseWithoutInternals },
		TableName extends DefaultSchemaTableNameOrOptions extends {
					schema: keyof DatabaseWithoutInternals
				}
				? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
				: never = never,
> = DefaultSchemaTableNameOrOptions extends {
			schema: keyof DatabaseWithoutInternals
		}
		? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
					Update: infer U
				}
				? U
				: never
		: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
				? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
							Update: infer U
						}
						? U
						: never
				: never

export type Enums<
		DefaultSchemaEnumNameOrOptions extends | keyof DefaultSchema["Enums"]
				| { schema: keyof DatabaseWithoutInternals },
		EnumName extends DefaultSchemaEnumNameOrOptions extends {
					schema: keyof DatabaseWithoutInternals
				}
				? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
				: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
			schema: keyof DatabaseWithoutInternals
		}
		? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
		: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
				? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
				: never

export type CompositeTypes<
		PublicCompositeTypeNameOrOptions extends | keyof DefaultSchema["CompositeTypes"]
				| { schema: keyof DatabaseWithoutInternals },
		CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
					schema: keyof DatabaseWithoutInternals
				}
				? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
				: never = never,
> = PublicCompositeTypeNameOrOptions extends {
			schema: keyof DatabaseWithoutInternals
		}
		? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
		: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
				? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
				: never

export const Constants = {
	public: {
		Enums: {
			app_role: ["admin", "moderator", "user"],
			order_status: [
				"pending",
				"confirmed",
				"shipping",
				"delivered",
				"cancelled",
			],
			product_category: ["Đặc sản khô", "THỊT GÁC BẾP", "NÔNG SẢN"],
		},
	},
} as const

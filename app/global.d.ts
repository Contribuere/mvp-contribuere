import { Database as DB } from '@/types/database.types'

declare global {
	type Database = DB
	type Profile = DB['public']['Tables']['profiles']['Row']
	type Transaction = DB['public']['Tables']['transactions']['Row']
}

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
	const { email, password } = await request.json()

	const supabase = createRouteHandlerClient({ cookies })

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		return new NextResponse('Error singin', { status: 400 })
	}

	return new NextResponse('Logged in', { status: 201 })
}

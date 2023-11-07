import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
	const requestUrl = new URL(request.url)

	const { email, password, username } = await request.json()

	const supabase = createRouteHandlerClient<Database>({ cookies })

	const { data: createdUser, error: errorSignUp } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${requestUrl.origin}/auth/callback`,
		},
	})

	if (errorSignUp) {
		return new NextResponse('Could not authenticate user', { status: 301 })
	}

	const { user } = createdUser

	const { error: profileError } = await supabase
		.from('profiles')
		.insert({ id: user?.id!, email: user?.email, username })

	if (profileError) {
		return new NextResponse('Could not authenticate user', { status: 301 })
	}

	return new NextResponse('Check email to continue sign in process', { status: 201 })
}

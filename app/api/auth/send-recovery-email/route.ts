import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	if (req.method === 'POST') {
		const cookieStore = cookies()
		const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

		const { email } = await req.json()

		if (!email) {
			return new NextResponse('Email is required', { status: 400 })
		}

		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${req.nextUrl.origin}/reset` })

		if (error) {
			return new NextResponse('Error sending recovery email', { status: 400 })
		}

		return new NextResponse('Recovery email sent', { status: 201 })
	} else {
		return new NextResponse('Method not allowed', { status: 405 })
	}
}

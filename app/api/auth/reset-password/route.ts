import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	if (req.method === 'POST') {
		const cookieStore = cookies()
		const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

		const { password, confirmPassword } = await req.json()

		if (!password || !confirmPassword) {
			return new NextResponse('Password and confirm password are required', { status: 400 })
		}

		if (password !== confirmPassword) {
			return new NextResponse('Passwords do not match', { status: 400 })
		}

		const { error } = await supabase.auth.updateUser({
			password: password,
		})

		if (error) {
			return new NextResponse(error.message, { status: 400 })
		}

		return new NextResponse('Password reset successfully', { status: 201 })
	} else {
		return new NextResponse('Method not allowed', { status: 405 })
	}
}

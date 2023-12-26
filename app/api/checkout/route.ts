import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	if (request.method !== 'POST') {
		return new NextResponse(null, { status: 405 })
	}

	const cookieStore = cookies()
	const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

	const values = await request.json()

	const { comment, diamonds, slug } = values

	if (!comment || !diamonds || !slug) {
		return new NextResponse('Missing fields', { status: 400 })
	}

	const { data, error } = await supabase.from('profiles').select('id').eq('username', slug).single()

	if (error) {
		return new NextResponse('Error getting profile', { status: 400 })
	}

	const creatorId = data.id

	const { error: checkoutError } = await supabase
		.from('transactions')
		.insert({ creator_id: creatorId, comment, diamonds })

	if (checkoutError) {
		return new NextResponse('Error creating checkout', { status: 400 })
	}

	return new NextResponse('Checkout created', { status: 201 })
}

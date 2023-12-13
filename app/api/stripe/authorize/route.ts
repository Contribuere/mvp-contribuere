import stripe from '@/config/stripe'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const cookieStore = cookies()
		const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

		const { data: user } = await supabase.auth.getUser()

		if (!user) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		let accountId

		try {
			const account = await stripe.accounts.create({
				country: 'US',
				type: 'express',
				capabilities: {
					card_payments: {
						requested: true,
					},
					transfers: {
						requested: true,
					},
				},
				business_type: 'individual',
			})
			accountId = account.id
		} catch (error) {
			throw error
		}

		let accountLink

		try {
			const response = await stripe.accountLinks.create({
				account: accountId,
				refresh_url: 'http://localhost:3000/api/stripe/authorize',
				return_url: 'http://localhost:3000/profile/edit',
				type: 'account_onboarding',
			})

			accountLink = response
		} catch (error) {
			throw error
		}

		return NextResponse.json({ data: accountLink.url })
	} catch (error) {
		console.log({ error })
		return new NextResponse('Internal server error', { status: 500 })
	}
}

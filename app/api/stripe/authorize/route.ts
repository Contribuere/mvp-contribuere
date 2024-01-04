import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')
const supabaseConfig = { cookies: () => cookies() }
const refreshURL = 'http://localhost:3000/api/stripe/authorize'
const returnURL = 'http://localhost:3000/profile/edit'

export async function GET(req: NextRequest) {
	try {
		const cookieStore = cookies()
		const supabase = createRouteHandlerClient(supabaseConfig)

		const { data: user } = await supabase.auth.getUser()

		if (!user) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		let accountId

		try {
			const account = await stripe.accounts.create({
				country: 'US',
				type: 'express',
				email: 'lucas123@gmail.com',
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
			console.error('Error creating Stripe account:', error)
			throw new Error('Error creating Stripe account')
		}

		try {
			const response = await stripe.accountLinks.create({
				account: accountId,
				refresh_url: refreshURL,
				return_url: returnURL,
				type: 'account_onboarding',
			})
			return NextResponse.json({ data: response.url })
		} catch (error) {
			console.error('Error creating account link:', error)
			throw new Error('Error creating account link')
		}
	} catch (error) {
		console.error('Internal server error:', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}

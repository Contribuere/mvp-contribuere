'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'

export const StripeSection: React.FC = () => {
	async function setupStripe() {
		try {
			const response = await axios.get('/api/stripe/authorize')
			console.log(response)
		} catch (error) {
			console.log({ error })
		}
	}

	return (
		<>
			<p>
				Connect your account to Stripe. We use Stripe to make sure you get paid on time and keep your personal and bank
				details secure.
			</p>
			<Button onClick={setupStripe}>Set up payments</Button>
		</>
	)
}

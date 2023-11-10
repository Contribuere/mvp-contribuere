import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CheckoutForm } from './_components/checkout-form'
import { CreatorCard } from './_components/creator-card'

interface CheckoutPageProps {
	params: {
		creatorSlug: string
		diamonds: string
	}
}
export default async function CheckoutPage({ params }: CheckoutPageProps) {
	const { creatorSlug, diamonds } = params

	const supabase = createServerComponentClient<Database>({ cookies })

	const { error: profileError, data: profile } = await supabase
		.from('profiles')
		.select('*')
		.eq('username', creatorSlug)
		.single()

	if (profileError) {
		return redirect(`/${creatorSlug}`)
	}

	return (
		<section className="min-h-screen w-full flex flex-col justify-center items-center container p-4 space-y-4">
			<header className="self-start">
				<h1 className="text-2xl">Titulo</h1>
				<p className="text-sm">
					Thank you for choosing <span className="font-bold text-rose-600">Incognito.cash</span>
				</p>
			</header>
			<main className="w-full flex-1">
				<section className="flex flex-col gap-4">
					<CreatorCard creator={profile.username} diamonds={diamonds} imageUrl={profile.avatar_url} />
					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<span>10% Fee:</span> <span>$USD {diamonds}</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-rose-600">Total:</span>{' '}
							<span className="text-rose-600">$USD {Number(diamonds) * 1.1}</span>
						</div>
					</div>
				</section>
				<section>
					<CheckoutForm />
				</section>
			</main>
		</section>
	)
}

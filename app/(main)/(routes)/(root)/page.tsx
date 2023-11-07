import { Button } from '@/components/ui/button'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import TopCreator from '../../_components/TopCreator'

export const dynamic = 'force-dynamic'

export default async function Index() {
	const supabase = createServerComponentClient({ cookies })

	const {
		data: { user },
	} = await supabase.auth.getUser()

	return (
		<section className="min-h-screen w-full flex flex-col p-4">
			<header className="p-4 flex flex-col items-center gap-4 space-y-4 mb-6">
				<div className="py-10">
					<Image src="/images/logo.png" width={100} height={100} alt="@shadcn" />
				</div>
				<h1 className="text-2xl font-bold text-center">Fast anonymous payments with no fees.</h1>
				<p className="text-base font-normal text-center">The best way to get money from your fans.</p>
				<Link className="flex flex-col gap-2" href={'/signup'}>
					<Button className="bg-transparent hover:text-white text-rose-600 border-2 border-rose-600 py-[2em] px-3">
						Start making fast anonymous money NOW
					</Button>

					<p className="text-base font-normal text-rose-600 self-center">
						Powered by <strong>stripe</strong>
					</p>
				</Link>
			</header>
			<main className="flex flex-1 flex-col items-center space-y-8 p-4">
				<h2 className="text-xs font-semibold">The top creators of november</h2>
				<ul className="flex flex-grow flex-col gap-4">
					{[1, 2, 3, 4, 5].map((_, index) => (
						<div key={index}>
							<TopCreator />
						</div>
					))}
				</ul>

				<div className="flex flex-col gap-2 items-center mt-auto">
					<Link href={'/login'}>
						<Button className="px-10" variant={'default'}>
							Creator Log in
						</Button>
					</Link>
					<p className="text-xs font-normal">By Ecoterreans</p>
				</div>
			</main>
		</section>
	)
}

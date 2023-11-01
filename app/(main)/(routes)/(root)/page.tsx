import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import TopCreator from '../../_components/TopCreator'

export const dynamic = 'force-dynamic'

export default async function Index() {
	const supabase = createServerComponentClient({ cookies })

	const {
		data: { user },
	} = await supabase.auth.getUser()

	return (
		<div className="w-full flex flex-col p-4">
			<header className="p-4 flex flex-col items-center gap-4 space-y-4 mb-6">
				<Avatar className="w-24 h-24">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<h1 className="text-2xl font-bold text-center">Fast anonymous payments with no fees.</h1>
				<p className="text-base font-normal text-center">The best way to get money from your fans.</p>
				<Button className="bg-transparent hover:text-white text-rose-500 border-2 border-rose-500 py-[2em] px-3">
					Start making fast anonymous money NOW
				</Button>
			</header>
			<main className="flex flex-col items-center space-y-8 p-4">
				<h2 className="text-xs font-semibold">The top creators of november</h2>
				<ul className="flex flex-col gap-4">
					{[1, 2, 3, 4, 5].map((_, index) => (
						<div key={index}>
							<TopCreator />
						</div>
					))}
				</ul>

				<div className="flex flex-col gap-2 items-center">
					<Button className="px-10" variant={'default'}>
						Creator Log in
					</Button>
					<p className="text-xs font-normal">By Ecoterreans</p>
				</div>
			</main>
		</div>
	)
}

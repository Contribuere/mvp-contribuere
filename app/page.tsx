import LogoutButton from '@/components/LogoutButton'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const resources = [
	{
		id: 1,
		name: 'pies',
		imageUrl: 'https://unsplash.com/random/200×200/?fruit',
	},
	{
		id: 2,
		name: 'cara',
		imageUrl: 'https://unsplash.com/random/200×200/?fruit',
	},
	{
		id: 3,
		name: 'cara',
		imageUrl: 'https://unsplash.com/random/200×200/?fruit',
	},
	{
		id: 4,
		name: 'cara',
		imageUrl: 'https://unsplash.com/random/200×200/?fruit',
	},
	{
		id: 5,
		name: 'cara',
		imageUrl: 'https://unsplash.com/random/200×200/?fruit',
	},
	{
		id: 6,
		name: 'cara',
		imageUrl: 'https://unsplash.com/random/200×200/?fruit',
	},
	{
		id: 7,
		name: 'cara',
		imageUrl: 'https://unsplash.com/random/200×200/?fruit',
	},
	{
		id: 8,
		name: 'cara',
		imageUrl: 'https://unsplash.com/random/200×200/?fruit',
	},
	{
		id: 9,
		name: 'cara',
		imageUrl: 'https://unsplash.com/random/200×200/?fruit',
	},
	{
		id: 10,
		name: 'cara',
		imageUrl: 'https://unsplash.com/random/200×200/?fruit',
	},
	{
		id: 11,
		name: 'cara',
		imageUrl: 'https://unsplash.com/random/200×200/?fruit',
	},
	{
		id: 12,
		name: 'cara',
		imageUrl: 'https://unsplash.com/random/200×200/?fruit',
	},
]

export default async function Index() {
	const supabase = createServerComponentClient({ cookies })

	const {
		data: { user },
	} = await supabase.auth.getUser()

	return (
		<div className="w-full flex flex-col flex-1 p-4">
			<header className="w-full p-4 flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-semibold">Contribuere</h1>
					<nav>
						{user ? (
							<div className="flex items-center gap-4">
								<LogoutButton />
							</div>
						) : (
							<Link
								href="/login"
								className="py-2 px-4 border border-black rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
							>
								Creator Login
							</Link>
						)}
					</nav>
				</div>
				<p>The no email no password way to buy content</p>
			</header>
			<main className="w-full p-4">
				<ul className="w-full flex flex-col md:grid md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
					{resources.map((item) => {
						return (
							<li key={item.id} className="w-full border border-black p-4 flex gap-2">
								<img className="border" src={item.imageUrl} alt={item.name} width={80} height={80} />
								<span>{item.name}</span>
							</li>
						)
					})}
				</ul>
			</main>
		</div>
	)
}

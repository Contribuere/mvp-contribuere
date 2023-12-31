import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { ImageIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const Profile = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const {
		error,
		data: { user },
	} = await supabase.auth.getUser()

	if (error) {
		return redirect('/')
	}

	const { error: profileError, data: profile } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user?.id!)
		.single()

	return (
		<section className="min-h-screen w-full flex flex-col">
			<header className="relative bg-slate-400">
				<AspectRatio ratio={3 / 1}>
					{profile?.banner_url && (
						<Image src={profile?.banner_url} priority alt="Image" fill className="object-cover" />
					)}
				</AspectRatio>
				<div className="absolute bottom-14 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<div className="flex flex-col items-center gap-4">
						<Avatar className="rounded-full w-28 h-28">
							{profile?.avatar_url ? (
								<AvatarImage src={profile?.avatar_url} />
							) : (
								<AvatarFallback>
									<ImageIcon className="h-10 w-10 text-slate-500" />
								</AvatarFallback>
							)}
						</Avatar>

						<span className="text-xl font-semibold">@{profile?.username}</span>
					</div>
				</div>
			</header>

			<main className="flex flex-col flex-1 w-full justify-center items-center p-4 space-y-4">
				<section className="w-full mb-auto mt-16 flex justify-center py-16">
					<p className="text-base">
						{profile?.description ??
							'm ipsum dolor sit amet consectetur adipisicing elit. Officia porro atque impedit aliquid ipsam suscipit, nisi nesciunt excepturi voluptatem incidunt perferendis voluptas at tempora, deleniti nihil ad esse consequatur sequi'}
					</p>
				</section>
				<section className="w-full flex flex-grow flex-col">
					<div className="flex flex-wrap justify-evenly items-center gap-y-4 gap-x-2 w-full">
						<Link href="/profile/edit">
							<Button variant={'outline'}>Edit profile</Button>
						</Link>
						<Button>
							<span>Share profile</span>
						</Button>
					</div>
				</section>
			</main>
		</section>
	)
}

export default Profile

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { FacebookIcon, ImageIcon, InstagramIcon, TwitterIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

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
		<section className="w-full flex flex-1 flex-col bg-lime-200">
			<header className="relative">
				<AspectRatio ratio={3 / 1}>
					{profile?.banner_url && (
						<Image src={profile?.banner_url} priority alt="Image" fill className="object-cover" />
					)}
				</AspectRatio>
				<div className="absolute top-0 left-0 -bottom-4 flex items-end w-full justify-start">
					<Avatar className="rounded-md w-24 h-24 ml-6">
						{profile?.avatar_url ? (
							<AvatarImage src={profile?.avatar_url} />
						) : (
							<AvatarFallback>
								<ImageIcon className="h-10 w-10 text-slate-500" />
							</AvatarFallback>
						)}
					</Avatar>
				</div>
				<div className="absolute top-0 left-0 bottom-0 flex items-end w-full justify-end py-2">
					<ul className="relative flex gap-2 mr-4 px-4 py-2 bg-transparent backdrop-blur-lg">
						<FacebookIcon color="white" />

						<InstagramIcon color="white" />

						<TwitterIcon color="white" />
					</ul>
				</div>
			</header>
			<main className="flex-1 p-8 space-y-4 bg-blue-100">
				<div className="flex justify-between items-baseline">
					<h1 className="text-2xl font-semibold">{profile?.username}</h1>
					<Link href={'/profile/edit-profile'}>
						<Button>Editar perfil</Button>
					</Link>
				</div>
				<p className="bg-slate-400 rounded-md p-4">{profile?.description}</p>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<label htmlFor="">Cuerpo</label>
						<select name="" id=""></select>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="">Cuerpo</label>
						<select name="" id=""></select>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="h-56 bg-blue-400 flex justify-center items-center">+</div>
					<div className="h-56 bg-blue-400"></div>
					<div className="h-56 bg-blue-400"></div>
					<div className="h-56 bg-blue-400"></div>
				</div>
			</main>
		</section>
	)
}

export default Profile

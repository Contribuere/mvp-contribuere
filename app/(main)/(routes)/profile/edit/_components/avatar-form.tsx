'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useRef } from 'react'

interface AvatarFormProps {
	avatarUrl?: Profile['avatar_url']
	profileId: Profile['id']
}

export const AvatarForm = ({ avatarUrl, profileId }: AvatarFormProps) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()
	const supabase = createClientComponentClient()

	function handleImageClick() {
		inputRef?.current?.click()
	}

	async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.files && event.target.files.length > 0) {
			const selectedFile = event.target.files[0]

			try {
				if (selectedFile && profileId) {
					const { data, error } = await supabase.storage
						.from('avatars')
						.upload(`${profileId}/${selectedFile.name}`, selectedFile, { upsert: true })

					if (error) throw error

					const res = supabase.storage.from('avatars').getPublicUrl(data.path)
					const publicUrl = res.data.publicUrl
					const updateUserResponse = await supabase
						.from('profiles')
						.update({ avatar_url: publicUrl })
						.eq('id', profileId)
					if (updateUserResponse.error) throw updateUserResponse.error
					router.refresh()
				}
			} catch (error) {
				console.log('error', error)
			}
		}
	}

	async function removeFile() {
		try {
			const updateUserResponse = await supabase.from('profiles').update({ avatar_url: null }).eq('id', profileId)
			if (updateUserResponse.error) throw updateUserResponse.error
			router.refresh()
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<div className="border border-dashed min-h-[15rem] border-rose-600 p-2 rounded-md space-y-2">
			{!avatarUrl ? (
				<div className="w-full h-[15rem] flex items-center justify-center bg-transparent rounded-md">
					<Input type="file" ref={inputRef} accept="images/*" className="hidden" onChange={handleFileChange} />
					<p
						onClick={handleImageClick}
						className="h-full w-full flex justify-center items-center text-rose-600 text-base cursor-pointer"
					>
						Change your profile picture
					</p>
				</div>
			) : (
				<div className="relative h-60 w-full aspect-auto">
					<Button
						title="Remove profile picture"
						className="absolute top-2 right-2 z-10"
						variant={'outline'}
						size={'icon'}
						onClick={removeFile}
					>
						<Trash className="hover:text-rose-600" />
					</Button>
					<Image alt="profile picture" fill className="object-cover rounded-md italic" src={avatarUrl} />
				</div>
			)}
		</div>
	)
}

'use client'

import axios from 'axios'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'

interface AvatarFormProps {
	initialData: Profile
	profileId: string
}

const formSchema = z.object({
	avatar_url: z.string().min(1, {
		message: 'Image is required',
	}),
})

export const AvatarForm = ({ initialData, profileId }: AvatarFormProps) => {
	const [isEditing, setIsEditing] = useState(false)

	const toggleEdit = () => setIsEditing((current) => !current)

	const router = useRouter()

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/profiles/${profileId}`, values)
			toast.success('Course updated')
			toggleEdit()
			router.refresh()
		} catch {
			toast.error('Something went wrong')
		}
	}

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Profile picture
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing && <>Cancel</>}
					{!isEditing && !initialData.avatar_url && (
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Add an image
						</>
					)}
					{!isEditing && initialData.avatar_url && (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Edit image
						</>
					)}
				</Button>
			</div>
			{!isEditing &&
				(!initialData.avatar_url ? (
					<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
						<ImageIcon className="h-10 w-10 text-slate-500" />
					</div>
				) : (
					<div className="relative aspect-video mt-2">
						<Image alt="Upload" fill className="object-cover rounded-md" src={initialData.avatar_url} />
					</div>
				))}
			{isEditing && (
				<div>
					<FileUpload
						endpoint="profileImage"
						onChange={(url) => {
							if (url) {
								onSubmit({ avatar_url: url })
							}
						}}
					/>
					<div className="text-xs text-muted-foreground mt-4">16:9 aspect ratio recommended</div>
				</div>
			)}
		</div>
	)
}
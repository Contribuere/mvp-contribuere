'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Pencil } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface UsernameFormProps {
	initialData: {
		username: string
	}
	profileId: string
}

const formSchema = z.object({
	username: z.string().min(1, {
		message: 'Username is required',
	}),
})

export const UsernameForm: React.FC<UsernameFormProps> = ({ initialData, profileId }) => {
	const [isEditing, setIsEditing] = useState(false)
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	})

	const { isSubmitting, isValid } = form.formState

	const toggleEditing = () => setIsEditing(!isEditing)

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/profiles/${profileId}`, values)
			toast.success('Profile updated.')
			toggleEditing()
			router.refresh()
		} catch (error) {
			toast.error('Something went wrong')
		}
	}

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Username
				<Button onClick={toggleEditing} variant={'ghost'}>
					{isEditing ? (
						<>Cancel</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Edit username
						</>
					)}
				</Button>
			</div>
			{isEditing ? (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input disabled={isSubmitting} placeholder="'e.g. 'Jhon Doe'" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-x-2">
							<Button disabled={!isValid || isSubmitting} type="submit">
								Save
							</Button>
						</div>
					</form>
				</Form>
			) : (
				<p className="text-sm mt-2">{initialData.username}</p>
			)}
		</div>
	)
}

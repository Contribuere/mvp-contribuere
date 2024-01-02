'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: 'Email is required',
		})
		.email({ message: 'Invalid email' }),
})

export const RecoverForm: React.FC = () => {
	const router = useRouter()

	const [message, setMessage] = useState('')
	const [status, setStatus] = useState('idle')

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
		},
	})

	const { isSubmitting } = form.formState

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.post('/api/auth/send-recovery-email', values)
			setStatus('success')
			setMessage('Success! Check your email to reset your password.')
		} catch (error) {
			setMessage('Something went wrong')
			setStatus('error')
		} finally {
			form.reset()
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="text" disabled={isSubmitting} placeholder="e.g. example@gmail.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex flex-col gap-2 justify-center">
					<Button className="px-[3.5em] mt-8" disabled={isSubmitting} type="submit">
						Send email
					</Button>

					{status === 'success' && <p className="text-green-500">{message}</p>}
					{status === 'error' && <p className="text-red-500">{message}</p>}
				</div>
			</form>
		</Form>
	)
}

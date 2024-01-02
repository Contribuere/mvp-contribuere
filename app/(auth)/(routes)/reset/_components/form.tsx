'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

const formSchema = z
	.object({
		password: z.string().min(1, {
			message: 'Password is required',
		}),
		confirmPassword: z.string().min(1, {
			message: 'Password is required',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export const ResetForm: React.FC = () => {
	const router = useRouter()

	const [showPassword, setShowPassword] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	})

	const { isSubmitting } = form.formState

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const response = await axios.post('/api/auth/reset-password', values)
			toast.success(response.data)
			router.push('/login')
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data)
			}
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									disabled={isSubmitting}
									type={showPassword ? 'text' : 'password'}
									placeholder="e.g. example@gmail.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input type={showPassword ? 'text' : 'password'} disabled={isSubmitting} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<p
					onClick={() => setShowPassword(!showPassword)}
					className="text-center cursor-pointer hover:underline hover:underline-offset-4"
				>
					{showPassword ? 'Hide' : 'Show'} password
				</p>

				<div className="flex justify-center">
					<Button className="px-[3.5em] mt-8" disabled={isSubmitting} type="submit">
						Confirm
					</Button>
				</div>
			</form>
		</Form>
	)
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const formSchema = z.object({
	email: z.string().min(1, {
		message: 'Email is required',
	}),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
})

export const SignInForm: React.FC = () => {
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const { isSubmitting } = form.formState

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.post('/api/auth/sign-in', values)
			toast.success('Login success')
			router.push('/profile')
		} catch (error) {
			toast('Something went wrong')
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
								<Input disabled={isSubmitting} placeholder="e.g. example@gmail.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" disabled={isSubmitting} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-center">
					<Button className="px-[3.5em] mt-8" disabled={isSubmitting} type="submit">
						Log in
					</Button>
				</div>
			</form>
		</Form>
	)
}

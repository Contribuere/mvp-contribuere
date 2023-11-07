'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const formSchema = z
	.object({
		email: z
			.string()
			.min(1, {
				message: 'Email is required',
			})
			.email({
				message: 'Must be a valid email',
			}),
		username: z.string().min(1, {
			message: 'Username is required',
		}),
		password: z.string().min(1, {
			message: 'Password is required',
		}),
		confirmPassword: z.string().min(1, {
			message: 'Confirm password is required',
		}),
		terms: z.boolean(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})
	.refine((data) => data.terms === true, {
		message: 'You must accept terms and conditions',
		path: ['terms'],
	})

export const SignUpForm: React.FC = () => {
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
			terms: false,
		},
	})

	const { isSubmitting } = form.formState

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const { data } = await axios.post('/api/auth/sign-up', values)
			router.push('login')
			toast.success(data)
			form.reset()
		} catch (error) {
			if (error instanceof AxiosError) toast.error(error.response?.data)
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
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input disabled={isSubmitting} placeholder="e.g. DuaLipa" {...field} />
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

				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Repeat Password</FormLabel>
							<FormControl>
								<Input type="password" disabled={isSubmitting} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="terms"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<div className="flex flex-row items-start space-x-3 space-y-0 p-4 shadow">
								<FormControl>
									<Checkbox disabled={isSubmitting} checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<FormLabel>Accept terms and conditions</FormLabel>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-center">
					<Button className="px-[3.5em] mt-8" disabled={isSubmitting} type="submit">
						Sign up
					</Button>
				</div>
			</form>
		</Form>
	)
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

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
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

export const SignUpForm: React.FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		},
	})

	const { isSubmitting } = form.formState

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values)
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

				<div className="flex justify-center">
					<Button className="px-[3.5em] mt-8" disabled={isSubmitting} type="submit">
						Sign up
					</Button>
				</div>
			</form>
		</Form>
	)
}

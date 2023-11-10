'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'

const formSchema = z.object({
	diamonds: z.coerce
		.number({ invalid_type_error: 'Amount must be a number', required_error: 'Amount is required' })
		.gt(0, {
			message: 'Amount must be greater than 0',
		}),
})

export const DiamondsForm: React.FC = () => {
	const router = useRouter()
	const pathname = usePathname()

	console.log(pathname)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			diamonds: 0,
		},
	})

	const { isSubmitting } = form.formState

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			router.push(`${pathname}/checkout/${values.diamonds}`)
		} catch (error) {
			console.log({ error })
			toast.error('Something went wrong')
		}
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 flex flex-col items-center">
					<FormField
						control={form.control}
						name="diamonds"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter amount</FormLabel>
								<FormControl>
									<Input
										className="focus:border-none border-dashed border-rose-600"
										disabled={isSubmitting}
										placeholder="e.g. 400"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex items-center">
						<Button size={'lg'} disabled={isSubmitting} type="submit">
							Send
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

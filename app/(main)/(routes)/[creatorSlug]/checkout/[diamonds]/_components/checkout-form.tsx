'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const formSchema = z
	.object({
		comment: z.string().optional(),
		terms: z.boolean(),
		diamonds: z.string().min(1),
		slug: z.string().min(1),
	})
	.refine((data) => data.terms === true, {
		message: 'Must accept terms and conditions',
		path: ['terms'],
	})

interface CheckoutFormProps {
	diamonds: string
	slug: string
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ diamonds, slug }) => {
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			comment: '',
			terms: false,
			diamonds: diamonds,
			slug: slug,
		},
	})

	const { isSubmitting } = form.formState

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const response = await axios.post('/api/checkout', values)
			toast.success(response.data)
			router.push(`/${slug}`)
		} catch (error) {
			console.log({ error })
			toast.error('Something went wrong')
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 flex flex-col items-center">
				<FormField
					control={form.control}
					name="comment"
					render={({ field }) => (
						<FormItem className="w-full border-rose-600">
							<FormLabel>Add Message</FormLabel>
							<FormControl>
								<Textarea disabled={isSubmitting} placeholder="Message..." {...field} />
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
							<div className="flex flex-row items-start space-x-4 space-y-0 p-4 shadow">
								<FormControl>
									<Checkbox disabled={isSubmitting} checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>

								<div>
									<FormLabel>
										I agree to the terms of service and privacy policy and the following statements:
									</FormLabel>
									<FormDescription>I am making a non-refundable cash gift donation.</FormDescription>
									<FormDescription className="text-rose-600 font-semibold italic">
										I expect no product or service in return from the gift recipient. I have taken the necessary steps
										to confirm the whislist owner is authentic and i understand that incognito.cash will not be held
										responsible for ant issues arising from a catfishing situation.
									</FormDescription>
									<FormDescription>
										I understand that by violating these terms I may be subject to legal action or can fall a victim of
										scams. I understand that by checking the box above and the clicking checkout. I will have created a
										legally binding e-signature to this agreement.
									</FormDescription>
								</div>
							</div>
							<FormMessage className="self-center" />
						</FormItem>
					)}
				/>

				<div className="flex items-center py-2">
					<Button size={'lg'} disabled={isSubmitting} type="submit">
						Checkout
					</Button>
				</div>
			</form>
		</Form>
	)
}

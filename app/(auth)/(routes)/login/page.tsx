import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { SignInForm } from './_components/form'

export default function Login() {
	return (
		<div className="h-full flex flex-col justify-center items-center mx-auto px-8  w-full sm:max-w-md">
			<div className="flex flex-col justify-center items-center my-auto space-y-4">
				<Avatar className="w-24 h-24 mb-10">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>

				<div className="flex flex-col self-start gap-1">
					<h1 className="text-3xl font-medium">Log In</h1>
					<p className="text-xs font-normal">Enter in your account</p>
				</div>

				<SignInForm />
			</div>

			<div className="flex items-center gap-3 py-8">
				<p>New user?</p>
				<Link href={'/signup'}>Sign up</Link>
			</div>
		</div>
	)
}

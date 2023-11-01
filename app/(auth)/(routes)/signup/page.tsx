import Link from 'next/link'
import { SignUpForm } from './_components/form'

export default function SignUp() {
	return (
		<div className="h-full flex flex-col justify-center items-center mx-auto px-8 w-full sm:max-w-md">
			<div className="flex flex-col justify-center items-center my-auto space-y-4">
				<div className="flex flex-col self-start gap-1">
					<h1 className="text-3xl font-medium">Account</h1>
					<p className="text-xs font-normal">Create your account</p>
				</div>
				<SignUpForm />
			</div>

			<div className="flex items-center gap-3 py-8">
				<p>Already user?</p>
				<Link href={'/login'}>Log in</Link>
			</div>
		</div>
	)
}

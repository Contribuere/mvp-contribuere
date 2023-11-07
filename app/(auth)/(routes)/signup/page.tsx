import Link from 'next/link'
import { SignUpForm } from './_components/form'

export default function SignUp() {
	return (
		<section className="min-h-screen flex flex-col justify-center items-center mx-auto px-4 w-full sm:max-w-md">
			<div className="flex flex-col justify-center items-center my-auto space-y-4">
				<div className="flex flex-col pt-10 pb-4 self-start gap-1">
					<h1 className="text-3xl font-medium">Account</h1>
					<p className="text-xs font-normal">Create your account</p>
				</div>
				<SignUpForm />
			</div>

			<div className="flex items-center gap-3 mt-auto py-8">
				<p>Already user?</p>
				<Link href={'/login'}>Log in</Link>
			</div>
		</section>
	)
}

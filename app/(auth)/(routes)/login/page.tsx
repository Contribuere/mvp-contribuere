'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SignInForm } from './_components/form'

export default function Login() {
	return (
		<section className="min-h-screen flex flex-col justify-center items-center mx-auto px-4  w-full sm:max-w-md">
			<div className="flex flex-col justify-center items-center my-auto space-y-4">
				<div className="py-10">
					<Link href={'/'}>
						<Image src="/images/logo.png" width={100} height={100} alt="@contribuere" />
					</Link>
				</div>

				<div className="flex flex-col self-start gap-1">
					<h1 className="text-3xl font-medium">Log In</h1>
					<p className="text-xs font-normal">Enter in your account</p>
				</div>

				<SignInForm />
			</div>

			<div className="flex flex-col mt-auto pb-4">
				<Link href={'/recover-password'} className="text-sm cursor-pointer hover:underline hover:text-rose-600">
					Forget your password?
				</Link>

				<div className="flex items-center gap-3">
					<p>New user?</p>
					<Link className="hover:text-rose-600 hover:underline" href={'/signup'}>
						Sign up
					</Link>
				</div>
			</div>
		</section>
	)
}

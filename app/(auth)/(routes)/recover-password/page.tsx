import Image from 'next/image'
import Link from 'next/link'
import { RecoverForm } from './_components/form'

export default function RecoverPassword() {
	return (
		<section className="min-h-screen flex flex-col justify-center items-center mx-auto px-4  w-full sm:max-w-md">
			<div className="flex flex-col justify-center items-center my-auto space-y-4">
				<div className="py-10">
					<Link href={'/'}>
						<Image src="/images/logo.png" width={100} height={100} alt="@contribuere" />
					</Link>
				</div>

				<div className="flex flex-col self-start gap-1">
					<h1 className="text-3xl font-medium">Password recovery</h1>
					<p className="text-xs font-normal">Enter your email in order to receive a reset link</p>
				</div>

				<RecoverForm />
			</div>

			<div className="flex flex-col mt-auto pb-4">
				<Link className="hover:text-rose-600 hover:underline" href={'/login'}>
					Sign in
				</Link>
			</div>
		</section>
	)
}

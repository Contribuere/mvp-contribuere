import Image from 'next/image'
import Link from 'next/link'
import { ResetForm } from './_components/form'

export default function Reset() {
	return (
		<section className="min-h-screen flex flex-col justify-center items-center mx-auto px-4  w-full sm:max-w-md">
			<div className="flex flex-col justify-center items-center my-auto space-y-4">
				<div className="py-10">
					<Link href={'/'}>
						<Image src="/images/logo.png" width={100} height={100} alt="@contribuere" />
					</Link>
				</div>

				<div className="flex flex-col self-start gap-1">
					<h1 className="text-3xl font-medium">Reset your password</h1>
				</div>

				<ResetForm />
			</div>
		</section>
	)
}

import { Button } from '@/components/ui/button'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { AvatarForm } from './_components/avatar-form'
import { BannerForm } from './_components/banner-form'
import { DescriptionForm } from './_components/description-form'
import { StripeSection } from './_components/stripe-section'
import { UsernameForm } from './_components/username-form'

async function EditProfile() {
	const supabase = createServerComponentClient<Database>({ cookies })

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return redirect('/')
	}

	const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()

	if (error) {
		return redirect('/')
	}

	const profile = data

	const requiredFields = [profile.username, profile.description, profile.avatar_url, profile.banner_url]

	const totalFields = requiredFields.length
	const completedFields = requiredFields.filter(Boolean).length

	const completionText = `(${completedFields}/${totalFields})`

	return (
		<section className="w-full min-h-screen flex flex-col justify-center items-center space-y-4 p-4">
			<div className="flex flex-col w-full gap-y-1 self-start pt-6">
				<h1 className="text-2xl font-medium">Profile</h1>
				<span>Update your professional profile</span>
				{completedFields !== totalFields ? (
					<span className="text-sm">Setup your profile {completionText}</span>
				) : (
					<span className="text-sm text-rose-600">Profile setup completed</span>
				)}
			</div>
			<div className="flex flex-col w-full gap-y-4 flex-grow">
				<AvatarForm avatarUrl={profile.avatar_url} profileId={profile.id} />
				<BannerForm bannerUrl={profile.banner_url} profileId={profile.id} />
				<UsernameForm initialData={profile} profileId={profile.id} />
				<DescriptionForm initialData={profile} profileId={profile.id} />
				<StripeSection />
				<Link className="mt-auto mx-auto" href="/profile">
					<Button variant={'link'}>Cancel</Button>
				</Link>
			</div>
		</section>
	)
}

export default EditProfile

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AvatarForm } from './_components/avatar-form'
import { BannerForm } from './_components/banner-form'
import { DescriptionForm } from './_components/description-form'
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
		<section className="bg-red-300 w-full flex flex-col space-y-4 px-2 py-4">
			<h1 className="text-3xl font-bold text-center ">¡Welcome contribuere!</h1>
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-y-2">
					<h1 className="text-2xl font-medium">Profile setup</h1>
					{completedFields !== totalFields ? (
						<span className="text-sm text-slate-700">Setup your profile {completionText}</span>
					) : (
						<span className="text-sm text-slate-700">Profile setup completed</span>
					)}
				</div>
			</div>
			<span>{user?.email}</span>
			<BannerForm initialData={profile} profileId={profile.id} />
			<UsernameForm initialData={profile} profileId={profile.id} />
			<DescriptionForm initialData={profile} profileId={profile.id} />
			<AvatarForm initialData={profile} profileId={profile.id} />
		</section>
	)
}

export default EditProfile

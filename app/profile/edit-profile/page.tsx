import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { UsernameForm } from './_components/username-form'

async function EditProfile() {
	const supabase = createServerComponentClient({ cookies })

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

	return (
		<section className="bg-red-300 w-full flex flex-col space-y-4 px-2 py-4">
			<h1 className="text-3xl font-bold text-center ">¡Welcome contribuere!</h1>
			<span>{user?.email}</span>
			<UsernameForm initialData={profile} profileId={profile.id} />
		</section>
	)
}

export default EditProfile

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { profileId: string } }) {
	try {
		const cookieStore = cookies()
		const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

		const { profileId } = params
		const values = await req.json()

		const { username } = values

		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!user) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const { data, error } = await supabase.from('profiles').update({ username: username }).eq('id', profileId)

		if (error) {
			console.log('ERROR_UPDATE', error.message)
			return new NextResponse('Error updating profile', { status: 400 })
		}

		console.log(data)

		return new NextResponse('Success', { status: 200 })
	} catch (error) {
		console.log('[COURSE_ID]', error)
		return new NextResponse('Internal Error', { status: 500 })
	}
}

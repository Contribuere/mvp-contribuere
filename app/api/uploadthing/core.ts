import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

const handleAuth = async () => {
	const supabase = createClientComponentClient<Database>()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (user?.id) throw new Error('Unauthorized')

	return { userId: user?.id }
}
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	profileImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
		.middleware(() => handleAuth())
		.onUploadComplete(() => {}),
	bannerImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
		.middleware(() => handleAuth())
		.onUploadComplete(() => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

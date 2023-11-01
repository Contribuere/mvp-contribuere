export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex">
			<main className="flex-1">{children}</main>
		</div>
	)
}

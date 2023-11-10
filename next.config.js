/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	images: {
		domains: ['tdqtkqerlwxgocpkvhyh.supabase.co', 'utfs.io'],
	},
}

module.exports = nextConfig

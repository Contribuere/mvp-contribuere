'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageIcon } from 'lucide-react'

export const CreatorCard: React.FC<{
	imageUrl: Profile['avatar_url']
	creator: Profile['username']
	diamonds: string
}> = ({ imageUrl, diamonds, creator }) => {
	return (
		<Card className="w-full">
			<CardHeader className="grid grid-cols-2 gap-1">
				<Avatar className="w-14 h-14 rounded-full">
					{imageUrl ? (
						<AvatarImage src={imageUrl} />
					) : (
						<AvatarFallback>
							<ImageIcon />
						</AvatarFallback>
					)}
				</Avatar>
				<CardTitle className="text-sm self-center">$USD {diamonds}</CardTitle>
				<CardDescription className="col-start-2 text-sm">
					Your about to send a {diamonds}💎 to <span className="font-semibold text-white">{creator}</span>
				</CardDescription>
			</CardHeader>
		</Card>
	)
}

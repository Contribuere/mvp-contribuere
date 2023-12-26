import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface TopCreatorProps {
	creator: {
		id: string
		username: string | null
		avatar_url: string | null
		transactions: {
			id: string
			diamonds: string
		}[]
	}
}

const TopCreator: React.FC<TopCreatorProps> = ({ creator }) => {
	const diamonds = creator.transactions.reduce((acc, curr) => acc + parseInt(curr.diamonds), 0)

	let diamondsDisplay = ''

	if (diamonds >= 500 && diamonds <= 1000) {
		diamondsDisplay = `💎`
	} else if (diamonds > 1000 && diamonds <= 2500) {
		diamondsDisplay = `💎💎`
	} else if (diamonds > 2500 && diamonds <= 5000) {
		diamondsDisplay = `💎💎💎`
	} else if (diamonds > 5000 && diamonds <= 10000) {
		diamondsDisplay = `💎💎💎💎`
	} else {
		diamondsDisplay = `💎💎💎💎💎`
	}

	return (
		<li className="inline-flex items-center gap-4">
			<Avatar>
				<AvatarImage src={creator.avatar_url!} alt="@shadcn" />
				<AvatarFallback>{creator.username}</AvatarFallback>
			</Avatar>

			<span className="text-sm uppercase">{creator.username}</span>

			<span className="text-sm text-ellipsis truncate">{diamondsDisplay}</span>

			<span className="text-rose-600 italic text-xs"> ( {diamonds} ) </span>
		</li>
	)
}

export default TopCreator

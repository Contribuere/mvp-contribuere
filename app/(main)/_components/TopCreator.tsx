import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function TopCreator() {
	return (
		<li className="inline-flex items-center gap-2">
			<Avatar>
				<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>

			<span className="text-xs">creator name</span>

			<span className="text-xs text-ellipsis truncate">{'💎'.repeat(5)}</span>
		</li>
	)
}

export default TopCreator

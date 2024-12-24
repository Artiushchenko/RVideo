export function getInitials(fullName: string): string {
	const [firstName, lastName] = fullName.split(' ')

	return `${firstName[0]}${lastName[0]}`.toUpperCase()
}

export function transformCount(count: number): string {
	let formattedCount: string

	if (count >= 1_000_000_000) {
		formattedCount = (count / 1_000_000_000).toFixed(1)

		formattedCount = formattedCount.endsWith('.0') ? formattedCount.slice(0, -2) : formattedCount

		return `${formattedCount}B`
	} else if (count >= 1_000_000) {
		formattedCount = (count / 1_000_000).toFixed(1)

		formattedCount = formattedCount.endsWith('.0') ? formattedCount.slice(0, -2) : formattedCount

		return `${formattedCount}M`
	} else if (count >= 1_000) {
		formattedCount = (count / 1_000).toFixed(1)

		formattedCount = formattedCount.endsWith('.0') ? formattedCount.slice(0, -2) : formattedCount

		return `${formattedCount}K`
	} else {
		return `${count}`
	}
}

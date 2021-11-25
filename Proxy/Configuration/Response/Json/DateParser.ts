export namespace DateParser {
	export function parseMonth(date: string) {
		const monthYear = Array.from(date.matchAll(/([0-9]+)/g))

		let month = monthYear[0][0]

		if (month.length > 2)
			month = month.substring(0, month.length - 2)

		return parseInt(month)
	}

	export function parseYear(date: string) {
		const monthYear = Array.from(date.matchAll(/([0-9]+)/g))

		let year: string
		if (monthYear.length > 1)
			year = monthYear[1][0]
		else
			year = monthYear[0][0]

		if (year.length > 2)
			year = year.substring(year.length - 2)

		return parseInt(year)
	}
}

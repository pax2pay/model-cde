export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export namespace Month {
	export function is(value: Month | any): value is Month {
		return typeof value == "number" && Number.isInteger(value) && value >= 1 && value <= 12
	}
	export function parse(month: string): Month | undefined {
		const result = parseInt(month)
		return is(result) ? result : undefined
	}
}

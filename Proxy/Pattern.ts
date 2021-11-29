export type Pattern = RegExp | string

export namespace Pattern {
	export function get(data: string, pattern: Pattern): [] {
		let result: any
		if (typeof pattern == "string") {
			pattern = new RegExp(pattern)
		}

		const matches = Array.from(data.matchAll(pattern))
		result = matches.map(match => match[0].toString())

		return result
	}

	export function set(data: string, pattern: Pattern, value: string): string {
		if (typeof pattern == "string") {
			pattern = new RegExp(pattern)
		}
		data.replaceAll(pattern, value)
		return data
	}
}

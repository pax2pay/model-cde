export type Pattern = RegExp | string

export namespace Pattern {
	export function is(value: Pattern | any): value is Pattern {
		return typeof value == "string" || value instanceof RegExp
	}
	export function getInXml(data: string, pattern: Pattern): string {
		let result: string | null
		if (typeof pattern == "string") {
			const matched = data.match(new RegExp(pattern + ">" + "[^<]*"))
			if (matched == null) {
				throw Error
			} else {
				result = matched[0].toString()
			}
		} else {
			const matched = data.match(new RegExp(pattern.source.toString() + ">" + "[^<]*"))
			if (matched == null) {
				throw Error
			} else {
				result = matched[0].toString()
			}
		}

		return result != null ? result.substring(result.indexOf(">") + 1) : ""
	}

	export function setInXml(data: any, pattern: Pattern, value: any): string {
		let matched
		if (typeof pattern == "string") {
			matched = data.matchAll(new RegExp("<" + pattern + ">", "g"))
			if (matched == null) {
				throw Error
			}
		} else {
			matched = data.matchAll(new RegExp("<" + pattern.source.toString() + ">", "g"))
			if (matched == null) {
				throw Error
			}
		}

		for (const match of matched) {
			if (match.index) {
				const length = match[0].length
				const firstIndex = match.index + length
				const nextIndex = data.substring(match.index + length).indexOf("<")
				const before = data.substring(0, firstIndex)
				const after = data.substring(firstIndex + nextIndex)

				data = before + value + after
			}
		}

		const result: string | null = data
		if (result == null) {
			throw Error
		}
		return result
	}

	export function getInPlain(data: any, pattern: Pattern, matchDelimiter: string, nameValueDelimiter: string): string {
		let result: string | null
		const regex = new RegExp(
			(typeof pattern == "string" ? pattern : pattern.source.toString()) +
				nameValueDelimiter +
				"(.*?)" +
				"(?=" +
				matchDelimiter +
				"|$)"
		)

		const matched = data.match(regex)
		if (matched == null) {
			throw Error
		} else {
			result = matched[0].toString()
		}

		return result != null ? result.substring(result.indexOf(nameValueDelimiter) + nameValueDelimiter.length) : ""
	}

	export function setInPlain(
		data: any,
		pattern: Pattern,
		value: any,
		matchDelimiter: string,
		nameValueDelimiter: string
	): string {
		const matched = data.matchAll(
			new RegExp((typeof pattern == "string" ? pattern : pattern.source.toString()) + nameValueDelimiter, "g")
		)
		if (matched == null) {
			throw Error
		}

		for (const match of matched) {
			if (match.index != undefined) {
				const length = match[0].length
				const firstIndex = match.index + length
				const nextIndex = data.substring(match.index + length).indexOf(matchDelimiter)
				const before = data.substring(0, firstIndex)
				const after = nextIndex > 0 ? data.substring(firstIndex + nextIndex) : ""

				data = before + value + after
			}
		}
		const result: string | null = data
		if (result == null) {
			throw Error
		}
		return result
	}
}

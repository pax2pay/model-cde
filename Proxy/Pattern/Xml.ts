import { Pattern } from "."
import { BasePattern } from "./BasePattern"

export class Xml extends BasePattern {
	constructor() {
		super()
	}

	extract(data: string, pattern: Pattern): string {
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

	apply(data: any, pattern: Pattern, value: any): string {
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
}

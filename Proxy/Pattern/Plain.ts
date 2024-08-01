import { Plain as ConfigPlain } from "../Configuration/Tokenize/Text/Plain"
import { Pattern } from "."
import { BasePattern } from "./BasePattern"

export class Plain extends BasePattern {
	#entryDelimiter: string
	#equalsDelimiter: string
	constructor(readonly configuration: ConfigPlain) {
		super()
		this.#equalsDelimiter = configuration.equalsDelimiter
		this.#entryDelimiter = configuration.entryDelimiter
	}

	extract(data: string, pattern: Pattern): string {
		const regex = new RegExp(
			(typeof pattern == "string" ? pattern : pattern.source.toString()) +
				this.#equalsDelimiter +
				"(.*?)" +
				"(?=" +
				this.#entryDelimiter +
				"|$)"
		)

		const matched = data.match(regex)
		if (matched == null || !matched[0]) {
			throw Error
		}

		const result = matched[0].toString()

		return result.length ? result.substring(result.indexOf(this.#equalsDelimiter) + this.#equalsDelimiter.length) : ""
	}

	apply(data: any, pattern: Pattern, value: any): string {
		const matched = data.matchAll(
			new RegExp((typeof pattern == "string" ? pattern : pattern.source.toString()) + this.#equalsDelimiter, "g")
		)
		if (matched == null) {
			throw Error
		}

		for (const match of matched) {
			if (match.index != undefined) {
				const length = match[0].length
				const firstIndex = match.index + length
				const nextIndex = data.substring(match.index + length).indexOf(this.#entryDelimiter)
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

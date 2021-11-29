import { Card } from "Card"
import { Pattern } from "Proxy"

export interface Text {
	card: {
		pan: Pattern
		csc: Pattern
		month: Pattern
		year: Pattern
	}
	set: (
		| {
				find: Pattern
				value?: string
		  }
		| string
	)[]
}

export namespace Text {
	export function extract(configuration: Text, body: string): Card {}
	export function process(configuration: Text, token: Card.Token, body: string): string {
		const masked: Card.Masked = Card.Token.unpack(token)
		const variables = {
			token,
			...masked,
			expires: Card.Expires.stringify(masked.expires),
			month: masked.expires[0].toString(),
			year: masked.expires[1].toString(),
		}
		for (rule of configuration.set) {
			break
		}
	}
}

/* export function process(configuration: Json, token: Card.Token, body: Record<string, any>): Record<string, any> {
		const masked: Card.Masked = Card.Token.unpack(token)
		const variables = {
			token,
			...masked,
			expires: Card.Expires.stringify(masked.expires),
			month: masked.expires[0].toString(),
			year: masked.expires[1].toString(),
		}
		return configuration.set.reduce((r, replacement) => {
			if (typeof replacement == "string")
				replacement = { find: replacement }
			return Selector.set(
				r,
				replacement.find,
				replacement.value == undefined ? undefined : replace(replacement.value, variables)
			)
		}, body)
	} */

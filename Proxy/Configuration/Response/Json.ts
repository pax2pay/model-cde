import { Card } from "../../../Card"
import { Selector } from "../../Selector"

export interface Json {
	card: {
		pan: Selector
		csc: Selector
		month: Selector
		year: Selector
	}
	set: (
		| {
				find: Selector
				value?: string
		  }
		| string
	)[]
}
export namespace Json {
	export function extract(configuration: Json, body: Record<string, any>): Card {
		return {
			pan: Selector.get<string>(body, configuration.card.pan),
			csc: Selector.get<string>(body, configuration.card.csc),
			expires: [
				Selector.get<Card.Expires.Month>(body, configuration.card.month),
				Selector.get<Card.Expires.Year>(body, configuration.card.year),
			],
		}
	}
	export function process(configuration: Json, token: Card.Token, body: Record<string, any>): Record<string, any> {
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
	}
	function replace(data: string, variables: Record<string, string | undefined>): string {
		return data.replaceAll(/\$\(([a-zA-Z]\w*)\)/g, (match, variable) => variables[variable] || match)
	}
}

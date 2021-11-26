import { Card } from "../../../../Card"
import { Selector } from "../../../Selector"

export interface Json {
	card: {
		pan: Selector
		csc: Selector
	} & (
		| {
				month: Selector
				year: Selector
		  }
		| {
				expires?: Selector
		  }
	)
	set: (
		| {
				find: Selector
				value?: string
		  }
		| string
	)[]
}
export namespace Json {
	export function is(value: Json | any): value is Json {
		return (
			typeof value == "object" &&
			typeof value.card == "object" &&
			typeof 
		)
	}
	export function hasExpires(value: Json): value is Json & { card: { expires: Selector }} {
		return Selector.is((value.card as any).expires)
	}
	export function hasMonthYear(value: Json): value is Json & { card: { 	month: Selector
				year: Selector }} {
		return Selector.is((value.card as any).year) && Selector.is((value.card as any).year)
	}
	export function extract(configuration: Json, body: Record<string, any>): Card {
		let month = Selector.get(body, configuration.card.month)
		let year = Selector.get(body, configuration.card.year)

		if (month == year) {
			month = DateParser.parseMonth(month)
			year = DateParser.parseYear(year)
		} else {
			if (typeof month == "string")
				month = parseInt(month)
			if (typeof year == "string")
				year = parseInt(year.substring(year.length - 2))
			else if (typeof year == "number" && year > 99) {
				const yearString = year.toString()
				year = parseInt(yearString.substring(yearString.length - 2))
			}
		}
		return {
			pan: Selector.get<string>(body, configuration.card.pan),
			csc: Selector.get<string>(body, configuration.card.csc),
			expires: [month, year],
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
